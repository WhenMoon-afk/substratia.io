import type { Command, Shortcut } from '@/data/cheatSheetData'

export function CommandList({ commands }: { commands: Command[] }) {
  return (
    <ul className="space-y-1 text-sm">
      {commands.map((c) => (
        <li key={c.cmd} className="flex gap-2">
          <code className="text-forge-cyan font-mono text-xs">{c.cmd}</code>
          <span className="text-gray-400 text-xs">- {c.desc}</span>
        </li>
      ))}
    </ul>
  )
}

export function ShortcutList({ shortcuts }: { shortcuts: Shortcut[] }) {
  return (
    <ul className="space-y-1 text-sm">
      {shortcuts.map((s) => (
        <li key={s.keys} className="flex gap-2">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded-sm text-xs font-mono">{s.keys}</kbd>
          <span className="text-gray-400 text-xs">{s.desc}</span>
        </li>
      ))}
    </ul>
  )
}
