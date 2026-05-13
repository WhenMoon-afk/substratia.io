/** Generate a full HTML document for download */
export function wrapHtmlForDownload(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Markdown Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.7; color: #333; }
    h1, h2 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    code { background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 4px; font-family: monospace; }
    pre { background: #f4f4f4; padding: 1em; border-radius: 8px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; padding-left: 1em; margin: 1em 0; color: #666; }
    a { color: #0066cc; }
    hr { border: none; border-top: 1px solid #eee; margin: 2em 0; }
    ul, ol { padding-left: 2em; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; }
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`
}

/** Generate a print-optimized HTML document for PDF export */
export function wrapHtmlForPrint(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Markdown Document</title>
  <style>
    @media print {
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 100%; margin: 0; padding: 20px; line-height: 1.7; color: #000; }
      h1, h2 { border-bottom: 1px solid #ccc; padding-bottom: 0.3em; }
      code { background: #eee; padding: 0.2em 0.4em; border-radius: 4px; font-family: monospace; }
      pre { background: #f5f5f5; padding: 1em; border-radius: 8px; overflow-x: auto; border: 1px solid #ddd; }
      pre code { background: none; padding: 0; }
      blockquote { border-left: 4px solid #999; padding-left: 1em; margin: 1em 0; color: #555; }
      a { color: #0066cc; text-decoration: underline; }
      hr { border: none; border-top: 1px solid #ccc; margin: 2em 0; }
      ul, ol { padding-left: 2em; }
      table { border-collapse: collapse; width: 100%; margin: 1em 0; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background: #f5f5f5; }
    }
  </style>
</head>
<body>
${bodyHtml}
<script>window.onload = function() { window.print(); window.close(); }</script>
</body>
</html>`
}
