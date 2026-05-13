export default function SupportedSyntax() {
  return (
    <div className="mt-6 bg-linear-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
      <h3 className="font-medium mb-3">Supported Syntax</h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
        <ul className="space-y-1">
          <li>- Headers (# to ######)</li>
          <li>- **Bold** and *italic*</li>
          <li>- ~~Strikethrough~~</li>
          <li>- [Links](url)</li>
        </ul>
        <ul className="space-y-1">
          <li>- ![Images](url)</li>
          <li>- `Inline code`</li>
          <li>- ```Code blocks```</li>
          <li>- &gt; Blockquotes</li>
        </ul>
        <ul className="space-y-1">
          <li>- Unordered lists (-, *, +)</li>
          <li>- Ordered lists (1., 2.)</li>
          <li>- [ ] Task lists</li>
          <li>- --- Horizontal rules</li>
        </ul>
      </div>
    </div>
  )
}
