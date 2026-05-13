/**
 * Dashboard UI for @substratia/memory
 *
 * Self-contained HTML document with inline CSS and JavaScript.
 * Served by the dashboard server at `/`.
 *
 * @module
 */

export const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Substratia Dashboard</title>
<style>
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

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .header-logo {
    font-size: 24px;
    line-height: 1;
  }
  .header h1 {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .header-version {
    font-size: 12px;
    color: var(--text-muted);
    padding: 2px 8px;
    border: 1px solid var(--border);
    border-radius: 999px;
  }
  .header-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text-dim);
  }
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* Stats cards */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    padding: 20px 24px;
  }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 20px;
    transition: border-color var(--transition);
  }
  .stat-card:hover {
    border-color: var(--border-light);
  }
  .stat-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .stat-value {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }
  .stat-value.accent { color: var(--accent-light); }
  .stat-value.cyan { color: var(--cyan); }
  .stat-value.green { color: var(--green); }
  .stat-value.yellow { color: var(--yellow); }

  /* Main layout */
  .main-layout {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 0;
    min-height: calc(100vh - 160px);
  }
  @media (max-width: 900px) {
    .main-layout { grid-template-columns: 1fr; }
  }

  /* Sidebar */
  .sidebar {
    border-right: 1px solid var(--border);
    padding: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 160px);
  }

  /* Identity section (hero) */
  .identity-section {
    margin-bottom: 24px;
  }
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-dim);
    margin-bottom: 14px;
  }
  .section-icon {
    font-size: 16px;
  }
  .identity-hero {
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(6, 182, 212, 0.08));
    border: 1px solid rgba(124, 58, 237, 0.25);
    border-radius: var(--radius);
    padding: 20px;
    margin-bottom: 14px;
  }
  .identity-hero-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent-light);
    margin-bottom: 10px;
  }
  .identity-narrative {
    font-size: 14px;
    color: var(--text);
    line-height: 1.7;
    font-style: italic;
  }
  .identity-narrative.empty {
    color: var(--text-muted);
    font-style: normal;
  }

  .identity-statements {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .identity-statement {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 14px;
    transition: border-color var(--transition), background var(--transition);
  }
  .identity-statement:hover {
    border-color: var(--accent);
    background: var(--surface-hover);
  }
  .identity-text {
    font-size: 13px;
    color: var(--text);
    margin-bottom: 6px;
  }
  .identity-meta {
    display: flex;
    gap: 12px;
    font-size: 11px;
    color: var(--text-muted);
  }
  .centrality-bar {
    display: inline-block;
    width: 40px;
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
    transition: width var(--transition);
  }

  /* Capabilities, Values, Limitations */
  .detail-group {
    margin-top: 16px;
  }
  .detail-group-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 8px;
  }
  .detail-chip {
    display: inline-block;
    padding: 4px 10px;
    font-size: 12px;
    background: var(--accent-bg);
    color: var(--accent-light);
    border: 1px solid rgba(124, 58, 237, 0.2);
    border-radius: 999px;
    margin: 0 6px 6px 0;
  }
  .detail-chip.cyan {
    background: var(--cyan-bg);
    color: var(--cyan-light);
    border-color: rgba(6, 182, 212, 0.2);
  }

  /* Snapshots */
  .snapshots-section {
    margin-top: 8px;
  }
  .snapshot-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 14px;
    margin-bottom: 10px;
    transition: border-color var(--transition);
  }
  .snapshot-card:hover {
    border-color: var(--cyan);
  }
  .snapshot-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
  }
  .snapshot-summary {
    font-size: 12px;
    color: var(--text-dim);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .snapshot-date {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  /* Main content */
  .main-content {
    padding: 20px 24px;
    overflow-y: auto;
    max-height: calc(100vh - 160px);
  }

  /* Search and filters */
  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }
  .search-input {
    flex: 1;
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
  .filter-btn:hover {
    border-color: var(--border-light);
    color: var(--text);
  }
  .filter-btn.active {
    background: var(--accent-bg);
    border-color: var(--accent);
    color: var(--accent-light);
  }

  /* Memory cards */
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
  }
  .memory-card:hover {
    border-color: var(--border-light);
    box-shadow: var(--shadow);
  }
  .memory-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .memory-badges {
    display: flex;
    gap: 6px;
    align-items: center;
  }
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
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .memory-context {
    font-size: 12px;
    color: var(--text-dim);
    margin-bottom: 8px;
    padding-left: 10px;
    border-left: 2px solid var(--border);
  }
  .memory-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: var(--text-muted);
  }
  .memory-meta {
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .memory-delete {
    background: none;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    padding: 4px 10px;
    font-size: 12px;
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--transition);
  }
  .memory-delete:hover {
    border-color: var(--red);
    color: var(--red);
    background: rgba(239, 68, 68, 0.08);
  }

  /* Load more */
  .load-more {
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-dim);
    font-size: 13px;
    cursor: pointer;
    transition: all var(--transition);
  }
  .load-more:hover {
    border-color: var(--accent);
    color: var(--accent-light);
  }
  .load-more:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* Empty states */
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--text-muted);
  }
  .empty-state-icon {
    font-size: 40px;
    margin-bottom: 12px;
    opacity: 0.5;
  }
  .empty-state-text {
    font-size: 14px;
    line-height: 1.6;
  }

  /* Loading spinner */
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

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

  /* Confirm dialog */
  .confirm-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 1000;
    align-items: center;
    justify-content: center;
  }
  .confirm-overlay.show { display: flex; }
  .confirm-dialog {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    max-width: 400px;
    box-shadow: var(--shadow-lg);
  }
  .confirm-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .confirm-text {
    font-size: 14px;
    color: var(--text-dim);
    margin-bottom: 20px;
  }
  .confirm-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  .confirm-btn {
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 500;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition);
  }
  .confirm-cancel {
    background: var(--surface-hover);
    border: 1px solid var(--border);
    color: var(--text-dim);
  }
  .confirm-cancel:hover {
    border-color: var(--border-light);
    color: var(--text);
  }
  .confirm-delete {
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: var(--red);
  }
  .confirm-delete:hover {
    background: rgba(239, 68, 68, 0.25);
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--border-light); }
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <div class="header-left">
    <span class="header-logo">&#129504;</span>
    <h1>Substratia Dashboard</h1>
    <span class="header-version">v0.1.0</span>
  </div>
  <div class="header-status">
    <span class="status-dot"></span>
    <span id="status-text">Connected</span>
  </div>
</div>

<!-- Stats row -->
<div class="stats-row">
  <div class="stat-card">
    <div class="stat-label">Total Memories</div>
    <div class="stat-value accent" id="stat-total">--</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Episodic</div>
    <div class="stat-value cyan" id="stat-episodic">--</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Semantic</div>
    <div class="stat-value green" id="stat-semantic">--</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Procedural</div>
    <div class="stat-value yellow" id="stat-procedural">--</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Unconsolidated</div>
    <div class="stat-value" id="stat-unconsolidated" style="color: var(--text-dim)">--</div>
  </div>
</div>

<!-- Main layout -->
<div class="main-layout">
  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Identity Persistence Layer (Hero) -->
    <div class="identity-section">
      <div class="section-title">
        <span class="section-icon">&#10024;</span>
        Identity Persistence Layer
      </div>

      <!-- Narrative hero -->
      <div class="identity-hero">
        <div class="identity-hero-title">Autobiographical Narrative</div>
        <div class="identity-narrative" id="identity-narrative">
          Loading...
        </div>
      </div>

      <!-- Identity statements -->
      <div class="identity-statements" id="identity-statements">
        <!-- Populated by JS -->
      </div>

      <!-- Capabilities -->
      <div class="detail-group" id="capabilities-group" style="display:none">
        <div class="detail-group-title">Capabilities</div>
        <div id="capabilities-list"></div>
      </div>

      <!-- Values -->
      <div class="detail-group" id="values-group" style="display:none">
        <div class="detail-group-title">Values</div>
        <div id="values-list"></div>
      </div>

      <!-- Limitations -->
      <div class="detail-group" id="limitations-group" style="display:none">
        <div class="detail-group-title">Limitations</div>
        <div id="limitations-list"></div>
      </div>
    </div>

    <!-- Snapshots -->
    <div class="snapshots-section">
      <div class="section-title">
        <span class="section-icon">&#128247;</span>
        Recent Snapshots
      </div>
      <div id="snapshots-list">
        <!-- Populated by JS -->
      </div>
    </div>
  </div>

  <!-- Main content: Memories -->
  <div class="main-content">
    <div class="section-title">
      <span class="section-icon">&#128218;</span>
      Memories
    </div>

    <!-- Search -->
    <div class="search-bar">
      <input type="text" class="search-input" id="search-input" placeholder="Search memories..." autocomplete="off" />
    </div>

    <!-- Filters -->
    <div class="filter-row">
      <button class="filter-btn active" data-type="all">All</button>
      <button class="filter-btn" data-type="episodic">Episodic</button>
      <button class="filter-btn" data-type="semantic">Semantic</button>
      <button class="filter-btn" data-type="procedural">Procedural</button>
      <span style="width:1px;background:var(--border);margin:0 4px"></span>
      <button class="filter-btn" data-importance="all">Any Importance</button>
      <button class="filter-btn" data-importance="critical">Critical</button>
      <button class="filter-btn" data-importance="high">High</button>
    </div>

    <!-- Memory list -->
    <div class="memory-list" id="memory-list">
      <div class="empty-state">
        <div class="empty-state-icon">&#128065;</div>
        <div class="empty-state-text">Loading memories...</div>
      </div>
    </div>

    <!-- Load more -->
    <button class="load-more" id="load-more" style="display:none">Load more memories</button>
  </div>
</div>

<!-- Confirm dialog -->
<div class="confirm-overlay" id="confirm-overlay">
  <div class="confirm-dialog">
    <div class="confirm-title">Delete Memory</div>
    <div class="confirm-text" id="confirm-text">Are you sure you want to delete this memory?</div>
    <div class="confirm-actions">
      <button class="confirm-btn confirm-cancel" id="confirm-cancel">Cancel</button>
      <button class="confirm-btn confirm-delete" id="confirm-delete">Delete</button>
    </div>
  </div>
</div>

<script>
(function() {
  "use strict";

  // ─── State ──────────────────────────────────────────────────────────────────
  var state = {
    memories: [],
    offset: 0,
    limit: 30,
    searchQuery: "",
    filterType: "all",
    filterImportance: "all",
    hasMore: true,
    loading: false,
    deleteTarget: null
  };

  var searchTimer = null;
  var refreshTimer = null;

  // ─── API helpers ────────────────────────────────────────────────────────────
  function api(path) {
    return fetch(path).then(function(r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  function apiDelete(path) {
    return fetch(path, { method: "DELETE" }).then(function(r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  // ─── Date formatting ───────────────────────────────────────────────────────
  function formatDate(ts) {
    if (!ts) return "Unknown";
    var d = new Date(ts);
    var now = new Date();
    var diff = now.getTime() - d.getTime();
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return Math.floor(diff / 60000) + "m ago";
    if (diff < 86400000) return Math.floor(diff / 3600000) + "h ago";
    if (diff < 604800000) return Math.floor(diff / 86400000) + "d ago";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  // ─── Escape HTML ────────────────────────────────────────────────────────────
  function esc(str) {
    if (!str) return "";
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ─── Load Stats ─────────────────────────────────────────────────────────────
  function loadStats() {
    api("/api/stats").then(function(stats) {
      document.getElementById("stat-total").textContent = stats.totalMemories || 0;
      var byType = stats.byType || {};
      document.getElementById("stat-episodic").textContent = byType.episodic || 0;
      document.getElementById("stat-semantic").textContent = byType.semantic || 0;
      document.getElementById("stat-procedural").textContent = byType.procedural || 0;
      document.getElementById("stat-unconsolidated").textContent = stats.unconsolidated || 0;
    }).catch(function(e) {
      console.error("Failed to load stats:", e);
    });
  }

  // ─── Load Self-Schema ───────────────────────────────────────────────────────
  function loadSelfSchema() {
    api("/api/self-schema").then(function(schema) {
      var narrativeEl = document.getElementById("identity-narrative");
      var statementsEl = document.getElementById("identity-statements");

      if (!schema) {
        narrativeEl.className = "identity-narrative empty";
        narrativeEl.textContent = "No identity has been established yet. Use the CLI to create identity statements and build your self-schema.";
        statementsEl.innerHTML = "";
        return;
      }

      // Narrative
      var narrative = schema.autobiographicalNarrative;
      if (narrative && narrative.coreSummary) {
        narrativeEl.className = "identity-narrative";
        narrativeEl.textContent = narrative.coreSummary;
      } else {
        narrativeEl.className = "identity-narrative empty";
        narrativeEl.textContent = "No narrative synthesized yet.";
      }

      // Identity statements
      var identities = (schema.presentSelf && schema.presentSelf.coreIdentity) || [];
      if (identities.length === 0) {
        statementsEl.innerHTML = '<div style="font-size:13px;color:var(--text-muted)">No identity statements established.</div>';
      } else {
        var html = "";
        for (var i = 0; i < identities.length; i++) {
          var id = identities[i];
          var pct = Math.round((id.centrality || 0) * 100);
          html += '<div class="identity-statement">';
          html += '<div class="identity-text">' + esc(id.statement) + '</div>';
          html += '<div class="identity-meta">';
          html += '<span>Centrality <span class="centrality-bar"><span class="centrality-fill" style="width:' + pct + '%"></span></span></span>';
          html += '<span>Confidence: ' + Math.round((id.confidence || 0) * 100) + '%</span>';
          html += '<span>' + formatDate(id.establishedAt) + '</span>';
          html += '</div></div>';
        }
        statementsEl.innerHTML = html;
      }

      // Capabilities
      var capabilities = (schema.presentSelf && schema.presentSelf.capabilities) || [];
      var capGroup = document.getElementById("capabilities-group");
      var capList = document.getElementById("capabilities-list");
      if (capabilities.length > 0) {
        capGroup.style.display = "block";
        var capHtml = "";
        for (var j = 0; j < capabilities.length; j++) {
          capHtml += '<span class="detail-chip">' + esc(capabilities[j].name) + '</span>';
        }
        capList.innerHTML = capHtml;
      } else {
        capGroup.style.display = "none";
      }

      // Values
      var values = (schema.presentSelf && schema.presentSelf.values) || [];
      var valGroup = document.getElementById("values-group");
      var valList = document.getElementById("values-list");
      if (values.length > 0) {
        valGroup.style.display = "block";
        var valHtml = "";
        for (var k = 0; k < values.length; k++) {
          valHtml += '<span class="detail-chip cyan">' + esc(values[k].statement) + '</span>';
        }
        valList.innerHTML = valHtml;
      } else {
        valGroup.style.display = "none";
      }

      // Limitations
      var limitations = (schema.presentSelf && schema.presentSelf.limitations) || [];
      var limGroup = document.getElementById("limitations-group");
      var limList = document.getElementById("limitations-list");
      if (limitations.length > 0) {
        limGroup.style.display = "block";
        var limHtml = "";
        for (var m = 0; m < limitations.length; m++) {
          limHtml += '<span class="detail-chip">' + esc(limitations[m].description) + '</span>';
        }
        limList.innerHTML = limHtml;
      } else {
        limGroup.style.display = "none";
      }

      // Narrative chapters (themes section)
      if (narrative && narrative.themes && narrative.themes.length > 0) {
        var themeGroup = document.getElementById("values-group");
        if (values.length === 0 && themeGroup) {
          themeGroup.style.display = "block";
          document.querySelector("#values-group .detail-group-title").textContent = "Narrative Themes";
          var thHtml = "";
          for (var t = 0; t < narrative.themes.length; t++) {
            thHtml += '<span class="detail-chip cyan">' + esc(narrative.themes[t].name) + '</span>';
          }
          document.getElementById("values-list").innerHTML = thHtml;
        }
      }
    }).catch(function(e) {
      console.error("Failed to load self-schema:", e);
      document.getElementById("identity-narrative").className = "identity-narrative empty";
      document.getElementById("identity-narrative").textContent = "Could not load identity data.";
    });
  }

  // ─── Load Snapshots ─────────────────────────────────────────────────────────
  function loadSnapshots() {
    api("/api/snapshots?limit=5").then(function(snapshots) {
      var container = document.getElementById("snapshots-list");
      if (!snapshots || snapshots.length === 0) {
        container.innerHTML = '<div class="empty-state" style="padding:20px"><div class="empty-state-text" style="font-size:13px">No snapshots yet.</div></div>';
        return;
      }
      var html = "";
      for (var i = 0; i < snapshots.length; i++) {
        var snap = snapshots[i];
        html += '<div class="snapshot-card">';
        html += '<div class="snapshot-name">' + esc(snap.name) + '</div>';
        html += '<div class="snapshot-summary">' + esc(snap.summary) + '</div>';
        html += '<div class="snapshot-date">' + formatDate(snap.createdAt) + '</div>';
        if (snap.tags && snap.tags.length) {
          html += '<div style="margin-top:6px">';
          for (var j = 0; j < snap.tags.length; j++) {
            html += '<span class="tag">' + esc(snap.tags[j]) + '</span>';
          }
          html += '</div>';
        }
        html += '</div>';
      }
      container.innerHTML = html;
    }).catch(function(e) {
      console.error("Failed to load snapshots:", e);
    });
  }

  // ─── Render Memory Card ─────────────────────────────────────────────────────
  function renderMemoryCard(mem) {
    var typeBadge = '<span class="badge badge-' + mem.type + '">' + mem.type + '</span>';
    var impBadge = mem.importance !== "normal"
      ? '<span class="badge badge-' + mem.importance + '">' + mem.importance + '</span>'
      : '';

    var tagsHtml = "";
    if (mem.tags && mem.tags.length) {
      for (var i = 0; i < mem.tags.length; i++) {
        tagsHtml += '<span class="tag">' + esc(mem.tags[i]) + '</span>';
      }
    }

    var contextHtml = mem.context
      ? '<div class="memory-context">' + esc(mem.context) + '</div>'
      : '';

    return '<div class="memory-card" data-id="' + esc(mem.id) + '">'
      + '<div class="memory-header">'
      + '<div class="memory-badges">' + typeBadge + impBadge + '</div>'
      + '<button class="memory-delete" onclick="window.__deleteMem(\\'' + esc(mem.id) + '\\')">Delete</button>'
      + '</div>'
      + '<div class="memory-content">' + esc(mem.content) + '</div>'
      + contextHtml
      + (tagsHtml ? '<div style="margin-bottom:8px">' + tagsHtml + '</div>' : '')
      + '<div class="memory-footer">'
      + '<div class="memory-meta">'
      + '<span>' + formatDate(mem.createdAt) + '</span>'
      + '<span>Accessed: ' + (mem.accessCount || 0) + 'x</span>'
      + '</div>'
      + '</div>'
      + '</div>';
  }

  // ─── Load Memories ──────────────────────────────────────────────────────────
  function loadMemories(append) {
    if (state.loading) return;
    state.loading = true;

    var listEl = document.getElementById("memory-list");
    var loadMoreBtn = document.getElementById("load-more");

    if (!append) {
      state.offset = 0;
      state.memories = [];
      listEl.innerHTML = '<div class="empty-state"><div class="spinner"></div></div>';
    }

    var url;
    if (state.searchQuery) {
      url = "/api/memories/search?q=" + encodeURIComponent(state.searchQuery) + "&limit=" + state.limit;
    } else {
      url = "/api/memories?limit=" + state.limit + "&offset=" + state.offset + "&orderBy=createdAt&order=desc";
    }

    api(url).then(function(memories) {
      if (!Array.isArray(memories)) memories = [];

      // Filter client-side for type/importance if needed
      var filtered = memories;
      if (state.filterType !== "all") {
        filtered = filtered.filter(function(m) { return m.type === state.filterType; });
      }
      if (state.filterImportance !== "all") {
        filtered = filtered.filter(function(m) { return m.importance === state.filterImportance; });
      }

      if (append) {
        state.memories = state.memories.concat(filtered);
      } else {
        state.memories = filtered;
      }

      state.hasMore = memories.length === state.limit;
      state.offset += memories.length;
      state.loading = false;

      if (state.memories.length === 0) {
        listEl.innerHTML = '<div class="empty-state">'
          + '<div class="empty-state-icon">&#128065;</div>'
          + '<div class="empty-state-text">'
          + (state.searchQuery ? 'No memories found for "' + esc(state.searchQuery) + '"' : 'No memories stored yet.<br>Use <code>substratia learn</code> to create your first memory.')
          + '</div></div>';
        loadMoreBtn.style.display = "none";
        return;
      }

      var html = "";
      for (var i = 0; i < state.memories.length; i++) {
        html += renderMemoryCard(state.memories[i]);
      }
      listEl.innerHTML = html;
      loadMoreBtn.style.display = state.hasMore && !state.searchQuery ? "block" : "none";
    }).catch(function(e) {
      console.error("Failed to load memories:", e);
      state.loading = false;
      if (!append) {
        listEl.innerHTML = '<div class="empty-state"><div class="empty-state-text" style="color:var(--red)">Failed to load memories: ' + esc(e.message) + '</div></div>';
      }
    });
  }

  // ─── Delete Memory ──────────────────────────────────────────────────────────
  window.__deleteMem = function(id) {
    state.deleteTarget = id;
    var mem = state.memories.find(function(m) { return m.id === id; });
    var preview = mem ? (mem.content || "").substring(0, 80) : id;
    document.getElementById("confirm-text").textContent = 'Delete memory: "' + preview + (preview.length >= 80 ? '...' : '') + '"?';
    document.getElementById("confirm-overlay").classList.add("show");
  };

  document.getElementById("confirm-cancel").addEventListener("click", function() {
    state.deleteTarget = null;
    document.getElementById("confirm-overlay").classList.remove("show");
  });

  document.getElementById("confirm-delete").addEventListener("click", function() {
    if (!state.deleteTarget) return;
    var id = state.deleteTarget;
    document.getElementById("confirm-overlay").classList.remove("show");

    apiDelete("/api/memories/" + encodeURIComponent(id)).then(function() {
      // Remove from local state
      state.memories = state.memories.filter(function(m) { return m.id !== id; });
      var card = document.querySelector('.memory-card[data-id="' + id + '"]');
      if (card) card.remove();
      loadStats();
    }).catch(function(e) {
      console.error("Failed to delete memory:", e);
    });

    state.deleteTarget = null;
  });

  // Close overlay on background click
  document.getElementById("confirm-overlay").addEventListener("click", function(e) {
    if (e.target === this) {
      state.deleteTarget = null;
      this.classList.remove("show");
    }
  });

  // ─── Search ─────────────────────────────────────────────────────────────────
  document.getElementById("search-input").addEventListener("input", function(e) {
    clearTimeout(searchTimer);
    var query = e.target.value.trim();
    searchTimer = setTimeout(function() {
      state.searchQuery = query;
      loadMemories(false);
    }, 300);
  });

  // ─── Filters ────────────────────────────────────────────────────────────────
  document.querySelectorAll(".filter-btn[data-type]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".filter-btn[data-type]").forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.filterType = btn.getAttribute("data-type");
      loadMemories(false);
    });
  });

  document.querySelectorAll(".filter-btn[data-importance]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".filter-btn[data-importance]").forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.filterImportance = btn.getAttribute("data-importance");
      loadMemories(false);
    });
  });

  // ─── Load More ──────────────────────────────────────────────────────────────
  document.getElementById("load-more").addEventListener("click", function() {
    loadMemories(true);
  });

  // ─── Auto-refresh ───────────────────────────────────────────────────────────
  function startAutoRefresh() {
    refreshTimer = setInterval(function() {
      loadStats();
      loadSelfSchema();
      loadSnapshots();
      // Only auto-refresh memories if not searching
      if (!state.searchQuery) {
        loadMemories(false);
      }
    }, 30000);
  }

  // ─── Init ───────────────────────────────────────────────────────────────────
  loadStats();
  loadSelfSchema();
  loadSnapshots();
  loadMemories(false);
  startAutoRefresh();

})();
</script>
</body>
</html>`;
