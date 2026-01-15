'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { capabilities, rulesets, categoryLabels, Capability, Ruleset } from '@/data/presets'
import AIAssistant from '@/components/AIAssistant'
import { DraggableCapability, SelectedCapabilityChip } from '@/components/DraggableCapability'

interface AgentConfig {
  name: string
  description: string
  selectedCapabilities: string[]
  selectedRulesets: string[]
  customRules: string[]
}

export default function BuilderPage() {
  const [config, setConfig] = useState<AgentConfig>({
    name: 'My AI Agent',
    description: 'A helpful AI assistant',
    selectedCapabilities: [],
    selectedRulesets: [],
    customRules: []
  })

  const [customRule, setCustomRule] = useState('')
  const [activeTab, setActiveTab] = useState<'capabilities' | 'rules' | 'preview'>('capabilities')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  // Load config from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const configParam = params.get('config')
    if (configParam) {
      try {
        const decoded = JSON.parse(atob(configParam))
        if (decoded) {
          setConfig(decoded)
          setActiveTab('preview')
        }
      } catch {
        // Invalid config param, ignore
      }
    }
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      const activeIdStr = active.id as string
      const overIdStr = over.id as string

      // Handle reordering of selected capabilities
      if (activeIdStr.startsWith('selected-') && overIdStr.startsWith('selected-')) {
        const oldIndex = config.selectedCapabilities.indexOf(activeIdStr.replace('selected-', ''))
        const newIndex = config.selectedCapabilities.indexOf(overIdStr.replace('selected-', ''))

        setConfig(prev => ({
          ...prev,
          selectedCapabilities: arrayMove(prev.selectedCapabilities, oldIndex, newIndex)
        }))
      }
    }
  }

  const toggleCapability = (id: string) => {
    setConfig(prev => ({
      ...prev,
      selectedCapabilities: prev.selectedCapabilities.includes(id)
        ? prev.selectedCapabilities.filter(c => c !== id)
        : [...prev.selectedCapabilities, id]
    }))
  }

  const toggleRuleset = (id: string) => {
    setConfig(prev => ({
      ...prev,
      selectedRulesets: prev.selectedRulesets.includes(id)
        ? prev.selectedRulesets.filter(r => r !== id)
        : [...prev.selectedRulesets, id]
    }))
  }

  const addCustomRule = () => {
    if (customRule.trim()) {
      setConfig(prev => ({
        ...prev,
        customRules: [...prev.customRules, customRule.trim()]
      }))
      setCustomRule('')
    }
  }

  const removeCustomRule = (index: number) => {
    setConfig(prev => ({
      ...prev,
      customRules: prev.customRules.filter((_, i) => i !== index)
    }))
  }

  const generatedMarkdown = useMemo(() => {
    const selectedCaps = capabilities.filter(c => config.selectedCapabilities.includes(c.id))
    const selectedRules = rulesets.filter(r => config.selectedRulesets.includes(r.id))

    let md = `# ${config.name}\n\n`
    md += `${config.description}\n\n`
    md += `---\n\n`

    if (selectedCaps.length > 0) {
      md += `## Core Principles\n\n`
      selectedCaps.forEach(cap => {
        md += `${cap.content}\n`
      })
      md += `\n`
    }

    const negativeRules = selectedRules.filter(r => r.type === 'negative')
    const positiveRules = selectedRules.filter(r => r.type === 'positive')

    if (negativeRules.length > 0 || config.customRules.length > 0) {
      md += `## Negative Prompt (Critical Rules)\n\n`
      md += `### NEVER DO\n`
      negativeRules.forEach(ruleset => {
        ruleset.rules.forEach(rule => {
          md += `- ${rule}\n`
        })
      })
      md += `\n`
    }

    if (positiveRules.length > 0) {
      md += `## Positive Guidelines\n\n`
      md += `### ALWAYS DO\n`
      positiveRules.forEach(ruleset => {
        ruleset.rules.forEach(rule => {
          md += `- ${rule}\n`
        })
      })
      md += `\n`
    }

    if (config.customRules.length > 0) {
      md += `## Custom Rules\n\n`
      config.customRules.forEach(rule => {
        md += `- ${rule}\n`
      })
    }

    return md
  }, [config])

  const downloadMarkdown = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${config.name.toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generatedMarkdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedMarkdown])

  const shareConfig = useCallback(async () => {
    const configStr = btoa(JSON.stringify(config))
    const shareUrl = `${window.location.origin}${window.location.pathname}?config=${configStr}`
    await navigator.clipboard.writeText(shareUrl)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }, [config])

  const groupedCapabilities = useMemo(() => {
    const groups: Record<string, Capability[]> = {}
    capabilities.forEach(cap => {
      if (!groups[cap.category]) groups[cap.category] = []
      groups[cap.category].push(cap)
    })
    return groups
  }, [])

  const selectedCapsList = capabilities.filter(c => config.selectedCapabilities.includes(c.id))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agent Builder</h1>
          <p className="text-gray-400">Build your CLAUDE.md or agents.md file with drag-and-drop simplicity</p>
        </div>

        {/* Agent Details */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Agent Name</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                value={config.description}
                onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan"
              />
            </div>
          </div>
        </div>

        {/* Selected Capabilities Bar */}
        {selectedCapsList.length > 0 && (
          <div className="bg-forge-purple/10 border border-forge-purple/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-forge-cyan">Selected Capabilities</span>
              <span className="text-xs px-2 py-0.5 bg-forge-purple/30 rounded-full">
                {selectedCapsList.length}
              </span>
              <span className="text-xs text-gray-500 ml-2">Drag to reorder</span>
            </div>
            <SortableContext
              items={config.selectedCapabilities.map(id => `selected-${id}`)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-wrap gap-2">
                {selectedCapsList.map(cap => (
                  <SelectedCapabilityChip
                    key={cap.id}
                    capability={cap}
                    onRemove={() => toggleCapability(cap.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['capabilities', 'rules', 'preview'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-forge-purple text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Selection */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:col-span-1">
            {activeTab === 'capabilities' && (
              <>
                <h2 className="text-xl font-semibold mb-4">Select Capabilities</h2>
                {Object.entries(groupedCapabilities).map(([category, caps]) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-sm font-medium text-forge-cyan mb-2">
                      {categoryLabels[category as Capability['category']]}
                    </h3>
                    <div className="space-y-2">
                      {caps.map(cap => (
                        <button
                          key={cap.id}
                          onClick={() => toggleCapability(cap.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            config.selectedCapabilities.includes(cap.id)
                              ? 'bg-forge-purple/30 border border-forge-purple'
                              : 'bg-white/5 border border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="font-medium">{cap.name}</div>
                          <div className="text-sm text-gray-400">{cap.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'rules' && (
              <>
                <h2 className="text-xl font-semibold mb-4">Select Rulesets</h2>
                <div className="space-y-4 mb-6">
                  {rulesets.map(ruleset => (
                    <button
                      key={ruleset.id}
                      onClick={() => toggleRuleset(ruleset.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        config.selectedRulesets.includes(ruleset.id)
                          ? 'bg-forge-purple/30 border border-forge-purple'
                          : 'bg-white/5 border border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          ruleset.type === 'negative' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {ruleset.type}
                        </span>
                        <span className="font-medium">{ruleset.name}</span>
                      </div>
                      <div className="text-sm text-gray-400">{ruleset.description}</div>
                      <ul className="mt-2 text-sm text-gray-500">
                        {ruleset.rules.slice(0, 2).map((rule, i) => (
                          <li key={i}>- {rule}</li>
                        ))}
                        {ruleset.rules.length > 2 && (
                          <li className="text-gray-600">+ {ruleset.rules.length - 2} more</li>
                        )}
                      </ul>
                    </button>
                  ))}
                </div>

                {/* Custom Rules */}
                <h3 className="text-lg font-medium mb-3">Custom Rules</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={customRule}
                    onChange={(e) => setCustomRule(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomRule()}
                    placeholder="Add a custom rule..."
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan"
                  />
                  <button
                    onClick={addCustomRule}
                    className="px-4 py-2 bg-forge-cyan text-forge-dark font-medium rounded-lg hover:bg-forge-cyan/80"
                  >
                    Add
                  </button>
                </div>
                {config.customRules.length > 0 && (
                  <div className="space-y-2">
                    {config.customRules.map((rule, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                        <span className="flex-1 text-sm">{rule}</span>
                        <button
                          onClick={() => removeCustomRule(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'preview' && (
              <>
                <h2 className="text-xl font-semibold mb-4">Preview & Export</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy Markdown'}
                  </button>
                  <button
                    onClick={downloadMarkdown}
                    className="px-4 py-2 bg-forge-purple hover:bg-forge-purple/80 rounded-lg transition-all"
                  >
                    Download .md
                  </button>
                  <button
                    onClick={shareConfig}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      shared
                        ? 'bg-green-500 text-white'
                        : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                    }`}
                  >
                    {shared ? 'Link Copied!' : 'Share URL'}
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  Selected: {config.selectedCapabilities.length} capabilities, {config.selectedRulesets.length} rulesets
                </div>
              </>
            )}
          </div>

          {/* Middle Panel - Live Preview */}
          <div className="bg-forge-dark border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-forge-cyan">{'</>'}</span>
              Live Preview
            </h2>
            <pre className="code-preview text-sm text-gray-300 whitespace-pre-wrap overflow-auto max-h-[600px]">
              {generatedMarkdown}
            </pre>
          </div>

          {/* Right Panel - AI Assistant */}
          <div className="lg:col-span-1">
            <AIAssistant />
          </div>
        </div>
      </div>
    </main>

    {/* Drag Overlay for visual feedback */}
    <DragOverlay>
      {activeId ? (
        <div className="px-3 py-1.5 bg-forge-purple border border-forge-purple rounded-lg shadow-lg">
          <span className="text-sm">
            {capabilities.find(c => activeId.includes(c.id))?.name || 'Dragging...'}
          </span>
        </div>
      ) : null}
    </DragOverlay>
    </DndContext>
  )
}
