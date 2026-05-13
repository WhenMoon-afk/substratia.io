export default function Tip({
  emoji,
  title,
  children,
}: {
  emoji: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="glass rounded-lg p-3">
      <div className="flex items-start gap-2">
        <span className="text-lg">{emoji}</span>
        <div>
          <h5 className="text-sm font-semibold">{title}</h5>
          <p className="text-xs text-gray-400">{children}</p>
        </div>
      </div>
    </div>
  )
}
