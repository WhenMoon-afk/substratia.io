interface BlogAuthorProps {
  name?: string;
  tagline?: string;
  initial?: string;
}

export default function BlogAuthor({
  name = "Substratia Team",
  tagline = "Building developer tools for Claude Code",
  initial = "S",
}: BlogAuthorProps) {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-forge-purple/30 rounded-full flex items-center justify-center font-bold">
          {initial}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-400">{tagline}</div>
        </div>
      </div>
    </div>
  );
}
