'use client'

/** Global styles for the markdown preview rendering */
export default function MarkdownStyles() {
  return (
    <style jsx global>{`
      .markdown-preview {
        color: #e5e7eb;
        line-height: 1.7;
      }
      .markdown-preview h1 {
        font-size: 2em;
        font-weight: bold;
        margin: 0.67em 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 0.3em;
      }
      .markdown-preview h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.83em 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 0.3em;
      }
      .markdown-preview h3 {
        font-size: 1.25em;
        font-weight: bold;
        margin: 1em 0;
      }
      .markdown-preview h4, .markdown-preview h5, .markdown-preview h6 {
        font-size: 1em;
        font-weight: bold;
        margin: 1em 0;
      }
      .markdown-preview p {
        margin: 1em 0;
      }
      .markdown-preview strong {
        font-weight: bold;
        color: #fff;
      }
      .markdown-preview em {
        font-style: italic;
      }
      .markdown-preview del {
        text-decoration: line-through;
        opacity: 0.7;
      }
      .markdown-preview a.markdown-link {
        color: #00d9ff;
        text-decoration: none;
      }
      .markdown-preview a.markdown-link:hover {
        text-decoration: underline;
      }
      .markdown-preview ul, .markdown-preview ol {
        margin: 1em 0;
        padding-left: 2em;
      }
      .markdown-preview ul {
        list-style-type: disc;
      }
      .markdown-preview ol {
        list-style-type: decimal;
      }
      .markdown-preview li {
        margin: 0.25em 0;
      }
      .markdown-preview blockquote {
        border-left: 4px solid #7c3aed;
        padding-left: 1em;
        margin: 1em 0;
        color: #9ca3af;
        font-style: italic;
      }
      .markdown-preview hr {
        border: none;
        border-top: 1px solid rgba(255,255,255,0.2);
        margin: 2em 0;
      }
      .markdown-preview code.inline-code {
        background: rgba(255,255,255,0.1);
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.9em;
        color: #f472b6;
      }
      .markdown-preview pre.code-block {
        background: rgba(0,0,0,0.5);
        padding: 1em;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1em 0;
      }
      .markdown-preview pre.code-block code {
        font-family: monospace;
        font-size: 0.9em;
        color: #e5e7eb;
        background: none;
        padding: 0;
      }
      .markdown-preview .task-checkbox {
        width: 1em;
        height: 1em;
        margin-right: 0.5em;
        accent-color: #00d9ff;
      }
      .markdown-preview img {
        max-width: 100%;
        border-radius: 8px;
        margin: 1em 0;
      }
      .markdown-preview table {
        border-collapse: collapse;
        width: 100%;
        margin: 1em 0;
      }
      .markdown-preview th, .markdown-preview td {
        border: 1px solid rgba(255,255,255,0.2);
        padding: 8px 12px;
        text-align: left;
      }
      .markdown-preview th {
        background: rgba(255,255,255,0.1);
        font-weight: bold;
      }
      .markdown-preview tr:nth-child(even) {
        background: rgba(255,255,255,0.05);
      }
    `}</style>
  )
}
