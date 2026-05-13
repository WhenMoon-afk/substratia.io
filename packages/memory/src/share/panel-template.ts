/**
 * Memory Panel Template for @substratia/memory
 *
 * Generates a self-contained HTML document that displays an agent's
 * memories, identity, and snapshots. The output works offline and
 * can be opened as a local file (file:// protocol).
 *
 * @module
 */

// =============================================================================
// DATA TYPES
// =============================================================================

export interface PanelData {
  exportedAt: number;
  memories: Array<{
    id: string;
    type: string;
    content: string;
    importance: string;
    tags?: string[];
    context?: string;
    createdAt: number;
    accessCount: number;
  }>;
  stats: {
    total: number;
    byType: Record<string, number>;
    byImportance: Record<string, number>;
  };
  selfSchema?: {
    identity: Array<{
      statement: string;
      centrality: number;
      confidence: number;
    }>;
    capabilities: Array<{ name: string; proficiency: number }>;
    values: Array<{ statement: string; importance: number }>;
    narrative?: string;
    themes?: string[];
  } | null;
  snapshots?: Array<{
    name: string;
    summary: string;
    createdAt: number;
    tags?: string[];
  }>;
  meta: {
    agentName?: string;
    description?: string;
    filter?: string;
  };
}

// =============================================================================
// HTML RENDERER
// =============================================================================

/**
 * Render a self-contained HTML memory panel from the given data.
 * The returned string is a complete HTML document with all CSS/JS inlined.
 */
export function renderMemoryPanel(data: PanelData): string {
  const hasIdentity = data.selfSchema != null;
  const hasSnapshots = data.snapshots != null && data.snapshots.length > 0;

  const agentTitle = data.meta.agentName
    ? escHtml(data.meta.agentName)
    : "An AI Agent";
  const exportDate = new Date(data.exportedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const ogDescription = `Explore ${data.stats.total} memories from ${agentTitle}. Shared via Substratia.`;

  // Build type summary string: "23 episodic, 18 semantic, 6 procedural"
  const typeParts: string[] = [];
  for (const [type, count] of Object.entries(data.stats.byType)) {
    if (count > 0) typeParts.push(`${count} ${type}`);
  }
  const typeSummary = typeParts.join(", ") || "0 memories";

  const filterLabel = data.meta.filter
    ? `Filtered by: "${escHtml(data.meta.filter)}"`
    : "";

  // Embed data as JSON
  const jsonPayload = JSON.stringify(data);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${agentTitle} — Memory Panel | Substratia</title>
<meta property="og:title" content="${agentTitle} — Memory Panel">
<meta property="og:description" content="${escAttr(ogDescription)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${agentTitle} — Memory Panel">
<meta name="twitter:description" content="${escAttr(ogDescription)}">
<style>
${PANEL_CSS}
</style>
</head>
<body>
<script>
var __PANEL_DATA__ = ${jsonPayload};
</script>

<!-- Header -->
<header class="panel-header">
  <div class="header-left">
    <span class="header-logo">&#129504;</span>
    <div>
      <h1>${agentTitle}</h1>
      <div class="header-subtitle">
        <span>${data.stats.total} memories</span>
        <span class="sep">&#183;</span>
        <span>${typeSummary}</span>
        <span class="sep">&#183;</span>
        <span>Exported ${exportDate}</span>
        ${filterLabel ? `<span class="sep">&#183;</span><span class="filter-label">${filterLabel}</span>` : ""}
      </div>
    </div>
  </div>
  <a class="header-brand" href="https://substratia.io" target="_blank" rel="noopener">Substratia</a>
</header>

<!-- Tabs -->
<nav class="tabs" id="tabs">
  <button class="tab active" data-tab="memories">Memories</button>
  ${hasIdentity ? '<button class="tab" data-tab="identity">Identity</button>' : ""}
  ${hasSnapshots ? '<button class="tab" data-tab="snapshots">Snapshots</button>' : ""}
</nav>

<!-- Stats row -->
<div class="stats-row">
  <div class="stat-card">
    <div class="stat-label">Total</div>
    <div class="stat-value accent">${data.stats.total}</div>
  </div>
  ${Object.entries(data.stats.byType)
    .filter(([, c]) => c > 0)
    .map(([type, count]) => {
      const colorClass =
        type === "episodic" ? "cyan" : type === "semantic" ? "green" : "yellow";
      return `<div class="stat-card"><div class="stat-label">${escHtml(type)}</div><div class="stat-value ${colorClass}">${count}</div></div>`;
    })
    .join("\n  ")}
</div>

<!-- Tab: Memories -->
<div class="tab-content active" id="tab-memories">
  <div class="search-bar">
    <input type="text" class="search-input" id="search-input" placeholder="Search memories..." autocomplete="off" />
  </div>
  <div class="filter-row" id="filter-row">
    <button class="filter-btn active" data-type="all">All</button>
    <button class="filter-btn" data-type="episodic">Episodic</button>
    <button class="filter-btn" data-type="semantic">Semantic</button>
    <button class="filter-btn" data-type="procedural">Procedural</button>
    <span class="filter-sep"></span>
    <button class="filter-btn active" data-importance="all">Any Importance</button>
    <button class="filter-btn" data-importance="critical">Critical</button>
    <button class="filter-btn" data-importance="high">High</button>
  </div>
  <div class="memory-list" id="memory-list"></div>
  <div class="show-more-wrap">
    <button class="show-more" id="show-more" style="display:none">Show more</button>
  </div>
</div>

${hasIdentity ? renderIdentitySection(data) : ""}
${hasSnapshots ? renderSnapshotsSection(data) : ""}

<!-- Footer -->
<footer class="panel-footer">
  <p>This agent's mind was shared using <a href="https://substratia.io" target="_blank" rel="noopener">Substratia</a>. Create your own at <a href="https://substratia.io" target="_blank" rel="noopener">substratia.io</a></p>
  <p class="footer-powered">Powered by <a href="https://substratia.io" target="_blank" rel="noopener">Substratia</a> — Persistent memory for AI agents</p>
</footer>

<script>
${PANEL_JS}
</script>
</body>
</html>`;
}

// =============================================================================
// SECTION RENDERERS
// =============================================================================

function renderIdentitySection(data: PanelData): string {
  const schema = data.selfSchema;
  if (!schema) return "";

  const narrative = schema.narrative
    ? `<div class="identity-hero">
        <div class="identity-hero-title">Autobiographical Narrative</div>
        <div class="identity-narrative">${escHtml(schema.narrative)}</div>
      </div>`
    : "";

  const identityStatements = schema.identity
    .map((id) => {
      const pct = Math.round(id.centrality * 100);
      const confPct = Math.round(id.confidence * 100);
      return `<div class="identity-statement">
        <div class="identity-text">${escHtml(id.statement)}</div>
        <div class="identity-meta">
          <span>Centrality <span class="centrality-bar"><span class="centrality-fill" style="width:${pct}%"></span></span></span>
          <span>Confidence: ${confPct}%</span>
        </div>
      </div>`;
    })
    .join("\n");

  const capabilitiesHtml =
    schema.capabilities.length > 0
      ? `<div class="detail-group">
          <div class="detail-group-title">Capabilities</div>
          ${schema.capabilities.map((c) => `<span class="detail-chip">${escHtml(c.name)} <span class="proficiency">${Math.round(c.proficiency * 100)}%</span></span>`).join("\n")}
        </div>`
      : "";

  const valuesHtml =
    schema.values.length > 0
      ? `<div class="detail-group">
          <div class="detail-group-title">Values</div>
          ${schema.values.map((v) => `<span class="detail-chip cyan">${escHtml(v.statement)}</span>`).join("\n")}
        </div>`
      : "";

  const themesHtml =
    schema.themes && schema.themes.length > 0
      ? `<div class="detail-group">
          <div class="detail-group-title">Themes</div>
          ${schema.themes.map((t) => `<span class="detail-chip cyan">${escHtml(t)}</span>`).join("\n")}
        </div>`
      : "";

  return `
<!-- Tab: Identity -->
<div class="tab-content" id="tab-identity">
  ${narrative}
  <div class="identity-statements">${identityStatements}</div>
  ${capabilitiesHtml}
  ${valuesHtml}
  ${themesHtml}
</div>`;
}

function renderSnapshotsSection(data: PanelData): string {
  if (!data.snapshots || data.snapshots.length === 0) return "";

  const cards = data.snapshots
    .map((snap) => {
      const date = new Date(snap.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const tagsHtml =
        snap.tags && snap.tags.length > 0
          ? `<div class="snapshot-tags">${snap.tags.map((t) => `<span class="tag">${escHtml(t)}</span>`).join("")}</div>`
          : "";
      return `<div class="snapshot-card">
        <div class="snapshot-name">${escHtml(snap.name)}</div>
        <div class="snapshot-summary">${escHtml(snap.summary)}</div>
        <div class="snapshot-date">${date}</div>
        ${tagsHtml}
      </div>`;
    })
    .join("\n");

  return `
<!-- Tab: Snapshots -->
<div class="tab-content" id="tab-snapshots">
  <div class="snapshots-grid">${cards}</div>
</div>`;
}

// =============================================================================
// HELPERS
// =============================================================================

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escAttr(s: string): string {
  return escHtml(s).replace(/'/g, "&#39;");
}

// =============================================================================
// CSS (inlined into the HTML)
// =============================================================================

const PANEL_CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0a1a;
  --surface: #111827;
  --surface-hover: #1a2332;
  --border: #1e293b;
  --border-light: #334155;
  --text: #e2e8f0;
  --text-dim: #94a3b8;
  --text-muted: #64748b;
  --accent: #7c3aed;
  --accent-light: #a78bfa;
  --accent-bg: rgba(124, 58, 237, 0.1);
  --cyan: #06b6d4;
  --cyan-light: #67e8f9;
  --cyan-bg: rgba(6, 182, 212, 0.08);
  --green: #10b981;
  --yellow: #f59e0b;
  --red: #ef4444;
  --pink: #ec4899;
  --radius: 12px;
  --radius-sm: 8px;
  --shadow: 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.4);
  --transition: 0.2s ease;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

a { color: var(--accent-light); text-decoration: none; }
a:hover { text-decoration: underline; }

/* Header */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.header-logo { font-size: 28px; line-height: 1; }
.panel-header h1 {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.header-subtitle {
  font-size: 13px;
  color: var(--text-dim);
  margin-top: 2px;
}
.header-subtitle .sep {
  margin: 0 6px;
  color: var(--text-muted);
}
.filter-label {
  color: var(--accent-light);
  font-style: italic;
}
.header-brand {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.header-brand:hover { color: var(--accent-light); text-decoration: none; }

/* Tabs */
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  padding: 0 24px;
}
.tab {
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color var(--transition), border-color var(--transition);
}
.tab:hover { color: var(--text-dim); }
.tab.active {
  color: var(--accent-light);
  border-bottom-color: var(--accent);
}

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 14px;
  padding: 20px 24px;
}
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 18px;
}
.stat-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.stat-value {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.03em;
}
.stat-value.accent { color: var(--accent-light); }
.stat-value.cyan { color: var(--cyan); }
.stat-value.green { color: var(--green); }
.stat-value.yellow { color: var(--yellow); }

/* Tab content */
.tab-content {
  display: none;
  padding: 20px 24px;
  max-width: 960px;
  margin: 0 auto;
}
.tab-content.active { display: block; }

/* Search + filters */
.search-bar { margin-bottom: 14px; }
.search-input {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  font-size: 14px;
  color: var(--text);
  outline: none;
  transition: border-color var(--transition);
}
.search-input::placeholder { color: var(--text-muted); }
.search-input:focus { border-color: var(--accent); }

.filter-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;
}
.filter-sep {
  width: 1px;
  height: 20px;
  background: var(--border);
  margin: 0 4px;
}
.filter-btn {
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-dim);
  cursor: pointer;
  transition: all var(--transition);
}
.filter-btn:hover { border-color: var(--border-light); color: var(--text); }
.filter-btn.active {
  background: var(--accent-bg);
  border-color: var(--accent);
  color: var(--accent-light);
}

/* Memory list */
.memory-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.memory-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  transition: border-color var(--transition), box-shadow var(--transition);
  cursor: pointer;
}
.memory-card:hover {
  border-color: var(--border-light);
  box-shadow: var(--shadow);
}
.memory-card.expanded .memory-extra { display: block; }
.memory-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.memory-badges { display: flex; gap: 6px; align-items: center; }
.badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 999px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.badge-episodic { background: rgba(124, 58, 237, 0.15); color: var(--accent-light); }
.badge-semantic { background: rgba(6, 182, 212, 0.15); color: var(--cyan-light); }
.badge-procedural { background: rgba(16, 185, 129, 0.15); color: var(--green); }
.badge-critical { background: rgba(239, 68, 68, 0.15); color: var(--red); }
.badge-high { background: rgba(245, 158, 11, 0.15); color: var(--yellow); }
.badge-normal { background: rgba(100, 116, 139, 0.1); color: var(--text-muted); }
.badge-low { background: rgba(100, 116, 139, 0.05); color: var(--text-muted); }

.memory-content {
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}
.memory-extra {
  display: none;
  margin-top: 10px;
}
.memory-context {
  font-size: 12px;
  color: var(--text-dim);
  padding-left: 10px;
  border-left: 2px solid var(--border);
  margin-bottom: 8px;
}
.memory-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 10px;
}
.memory-meta { display: flex; gap: 14px; }

/* Tags */
.tag {
  display: inline-block;
  padding: 1px 6px;
  font-size: 11px;
  background: rgba(100, 116, 139, 0.1);
  color: var(--text-muted);
  border-radius: 4px;
  margin-right: 4px;
}
.tags-row { margin-top: 8px; }

/* Show more */
.show-more-wrap { text-align: center; margin-top: 16px; }
.show-more {
  padding: 10px 24px;
  font-size: 13px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-dim);
  cursor: pointer;
  transition: all var(--transition);
}
.show-more:hover { border-color: var(--accent); color: var(--accent-light); }

/* Identity */
.identity-hero {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(6, 182, 212, 0.08));
  border: 1px solid rgba(124, 58, 237, 0.25);
  border-radius: var(--radius);
  padding: 24px;
  margin-bottom: 20px;
}
.identity-hero-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-light);
  margin-bottom: 10px;
}
.identity-narrative {
  font-size: 15px;
  color: var(--text);
  line-height: 1.8;
  font-style: italic;
}
.identity-statements {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
.identity-statement {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  transition: border-color var(--transition);
}
.identity-statement:hover { border-color: var(--accent); }
.identity-text {
  font-size: 14px;
  color: var(--text);
  margin-bottom: 8px;
}
.identity-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-muted);
}
.centrality-bar {
  display: inline-block;
  width: 50px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
  vertical-align: middle;
  margin-left: 4px;
}
.centrality-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
}

/* Detail groups */
.detail-group { margin-bottom: 20px; }
.detail-group-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 10px;
}
.detail-chip {
  display: inline-block;
  padding: 5px 12px;
  font-size: 12px;
  background: var(--accent-bg);
  color: var(--accent-light);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 999px;
  margin: 0 6px 8px 0;
}
.detail-chip.cyan {
  background: var(--cyan-bg);
  color: var(--cyan-light);
  border-color: rgba(6, 182, 212, 0.2);
}
.proficiency {
  font-size: 10px;
  opacity: 0.7;
  margin-left: 4px;
}

/* Snapshots */
.snapshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}
.snapshot-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  transition: border-color var(--transition);
}
.snapshot-card:hover { border-color: var(--cyan); }
.snapshot-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
}
.snapshot-summary {
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.snapshot-date {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 8px;
}
.snapshot-tags { margin-top: 6px; }

/* Footer */
.panel-footer {
  text-align: center;
  padding: 32px 24px;
  border-top: 1px solid var(--border);
  margin-top: 40px;
  font-size: 14px;
  color: var(--text-dim);
}
.footer-powered {
  margin-top: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
  font-size: 14px;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--border-light); }

/* Responsive */
@media (max-width: 640px) {
  .panel-header { flex-direction: column; gap: 10px; align-items: flex-start; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .snapshots-grid { grid-template-columns: 1fr; }
  .tab-content { padding: 16px; }
}
`;

// =============================================================================
// JS (inlined into the HTML)
// =============================================================================

const PANEL_JS = `
(function() {
  "use strict";

  var data = window.__PANEL_DATA__;
  var memories = data.memories.slice().sort(function(a, b) { return b.createdAt - a.createdAt; });
  var PAGE_SIZE = 50;

  var state = {
    filterType: "all",
    filterImportance: "all",
    searchQuery: "",
    visibleCount: PAGE_SIZE
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function formatDate(ts) {
    if (!ts) return "Unknown";
    var d = new Date(ts);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function matches(mem) {
    if (state.filterType !== "all" && mem.type !== state.filterType) return false;
    if (state.filterImportance !== "all" && mem.importance !== state.filterImportance) return false;
    if (state.searchQuery) {
      var q = state.searchQuery.toLowerCase();
      var content = (mem.content || "").toLowerCase();
      var context = (mem.context || "").toLowerCase();
      var tags = (mem.tags || []).join(" ").toLowerCase();
      if (content.indexOf(q) === -1 && context.indexOf(q) === -1 && tags.indexOf(q) === -1) return false;
    }
    return true;
  }

  // ── Render Memories ────────────────────────────────────────────────────────
  function renderMemories() {
    var list = document.getElementById("memory-list");
    var btn = document.getElementById("show-more");
    var filtered = memories.filter(matches);

    if (filtered.length === 0) {
      list.innerHTML = '<div class="empty-state">No memories match your search.</div>';
      btn.style.display = "none";
      return;
    }

    var showing = filtered.slice(0, state.visibleCount);
    var html = "";
    for (var i = 0; i < showing.length; i++) {
      var m = showing[i];
      var typeBadge = '<span class="badge badge-' + m.type + '">' + esc(m.type) + '</span>';
      var impBadge = m.importance !== "normal"
        ? ' <span class="badge badge-' + m.importance + '">' + esc(m.importance) + '</span>'
        : '';

      var tagsHtml = "";
      if (m.tags && m.tags.length) {
        tagsHtml = '<div class="tags-row">';
        for (var j = 0; j < m.tags.length; j++) {
          tagsHtml += '<span class="tag">' + esc(m.tags[j]) + '</span>';
        }
        tagsHtml += '</div>';
      }

      var contextHtml = m.context
        ? '<div class="memory-context">' + esc(m.context) + '</div>'
        : '';

      html += '<div class="memory-card" data-idx="' + i + '">';
      html += '<div class="memory-header"><div class="memory-badges">' + typeBadge + impBadge + '</div></div>';
      html += '<div class="memory-content">' + esc(m.content) + '</div>';
      html += '<div class="memory-extra">' + contextHtml + tagsHtml + '</div>';
      html += '<div class="memory-footer"><div class="memory-meta">';
      html += '<span>' + formatDate(m.createdAt) + '</span>';
      html += '<span>Accessed: ' + (m.accessCount || 0) + 'x</span>';
      html += '</div></div>';
      html += '</div>';
    }
    list.innerHTML = html;
    btn.style.display = filtered.length > state.visibleCount ? "inline-block" : "none";
  }

  // ── Tabs ───────────────────────────────────────────────────────────────────
  var tabs = document.querySelectorAll(".tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function() {
      var target = this.getAttribute("data-tab");
      for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove("active");
      this.classList.add("active");
      var contents = document.querySelectorAll(".tab-content");
      for (var k = 0; k < contents.length; k++) {
        contents[k].classList.toggle("active", contents[k].id === "tab-" + target);
      }
    });
  }

  // ── Search ─────────────────────────────────────────────────────────────────
  var searchTimer = null;
  var searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      clearTimeout(searchTimer);
      var val = this.value.trim();
      searchTimer = setTimeout(function() {
        state.searchQuery = val;
        state.visibleCount = PAGE_SIZE;
        renderMemories();
      }, 200);
    });
  }

  // ── Filters ────────────────────────────────────────────────────────────────
  var typeButtons = document.querySelectorAll(".filter-btn[data-type]");
  for (var ti = 0; ti < typeButtons.length; ti++) {
    typeButtons[ti].addEventListener("click", function() {
      for (var x = 0; x < typeButtons.length; x++) typeButtons[x].classList.remove("active");
      this.classList.add("active");
      state.filterType = this.getAttribute("data-type");
      state.visibleCount = PAGE_SIZE;
      renderMemories();
    });
  }
  var impButtons = document.querySelectorAll(".filter-btn[data-importance]");
  for (var ii = 0; ii < impButtons.length; ii++) {
    impButtons[ii].addEventListener("click", function() {
      for (var x = 0; x < impButtons.length; x++) impButtons[x].classList.remove("active");
      this.classList.add("active");
      state.filterImportance = this.getAttribute("data-importance");
      state.visibleCount = PAGE_SIZE;
      renderMemories();
    });
  }

  // ── Show more ──────────────────────────────────────────────────────────────
  var showMoreBtn = document.getElementById("show-more");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function() {
      state.visibleCount += PAGE_SIZE;
      renderMemories();
    });
  }

  // ── Expandable cards ───────────────────────────────────────────────────────
  document.getElementById("memory-list").addEventListener("click", function(e) {
    var card = e.target.closest(".memory-card");
    if (card) card.classList.toggle("expanded");
  });

  // ── Init ───────────────────────────────────────────────────────────────────
  renderMemories();

})();
`;
