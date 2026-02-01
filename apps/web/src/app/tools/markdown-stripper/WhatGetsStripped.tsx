export default function WhatGetsStripped() {
  return (
    <div className="mt-6 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
      <h3 className="font-medium mb-3">What Gets Stripped</h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
        <ul className="space-y-1">
          <li>- Headers (#, ##, ###)</li>
          <li>- Bold (**text**)</li>
          <li>- Italic (*text*)</li>
          <li>- Strikethrough (~~text~~)</li>
        </ul>
        <ul className="space-y-1">
          <li>- Links [text](url)</li>
          <li>- Images ![alt](url)</li>
          <li>- Code blocks (```)</li>
          <li>- Inline code (`code`)</li>
        </ul>
        <ul className="space-y-1">
          <li>- Lists (-, *, 1.)</li>
          <li>- Blockquotes (&gt;)</li>
          <li>- Horizontal rules (---)</li>
          <li>- HTML tags</li>
        </ul>
      </div>
    </div>
  );
}
