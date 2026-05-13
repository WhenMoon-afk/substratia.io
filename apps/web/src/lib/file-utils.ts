/**
 * Shared file download and clipboard utilities.
 *
 * Eliminates the repeated blob→objectURL→click→revoke pattern
 * found across 15+ tool and review pages.
 */

type MimeType =
  | 'text/plain'
  | 'text/markdown'
  | 'text/html'
  | 'application/json'

/**
 * Trigger a browser file download from in-memory content.
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: MimeType = 'text/plain',
): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Download a plain text file.
 */
export function downloadText(content: string, filename: string): void {
  downloadFile(content, filename, 'text/plain')
}

/**
 * Download a markdown file.
 */
export function downloadMarkdown(content: string, filename: string): void {
  downloadFile(content, filename, 'text/markdown')
}

/**
 * Download an HTML file.
 */
export function downloadHtml(content: string, filename: string): void {
  downloadFile(content, filename, 'text/html')
}

/**
 * Download a JSON file from a serializable value.
 */
export function downloadJson(data: unknown, filename: string): void {
  downloadFile(JSON.stringify(data, null, 2), filename, 'application/json')
}

/**
 * Copy text to the clipboard.
 * Returns a promise that resolves when the copy succeeds.
 */
export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}
