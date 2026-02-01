// Strip markdown formatting from text
export function stripMarkdown(text: string): string {
  if (!text) return "";

  let result = text;

  // Remove code blocks (``` ... ```)
  result = result.replace(/```[\s\S]*?```/g, (match) => {
    // Keep the code content, just remove the backticks
    return match.replace(/```\w*\n?/g, "").replace(/```/g, "");
  });

  // Remove inline code (`code`)
  result = result.replace(/`([^`]+)`/g, "$1");

  // Remove images ![alt](url)
  result = result.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");

  // Remove links [text](url) - keep the text
  result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove reference links [text][ref]
  result = result.replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1");

  // Remove reference definitions [ref]: url
  result = result.replace(/^\[[^\]]+\]:\s*\S+.*$/gm, "");

  // Remove headers (# ## ### etc)
  result = result.replace(/^#{1,6}\s+/gm, "");

  // Remove bold/italic (**text**, *text*, __text__, _text_)
  result = result.replace(/(\*\*|__)(.*?)\1/g, "$2");
  result = result.replace(/(\*|_)(.*?)\1/g, "$2");

  // Remove strikethrough ~~text~~
  result = result.replace(/~~(.*?)~~/g, "$1");

  // Remove blockquotes (> text)
  result = result.replace(/^>\s*/gm, "");

  // Remove horizontal rules (---, ***, ___)
  result = result.replace(/^[-*_]{3,}\s*$/gm, "");

  // Remove unordered list markers (-, *, +)
  result = result.replace(/^[\s]*[-*+]\s+/gm, "");

  // Remove ordered list markers (1., 2., etc)
  result = result.replace(/^[\s]*\d+\.\s+/gm, "");

  // Remove task list markers [ ] and [x]
  result = result.replace(/\[[ x]\]\s*/gi, "");

  // Remove HTML tags (loop to prevent incomplete sanitization, e.g. "<scr<script>ipt>")
  let prev = "";
  while (prev !== result) {
    prev = result;
    result = result.replace(/<[^>]+>/g, "");
  }

  // Remove extra blank lines (collapse multiple newlines to max 2)
  result = result.replace(/\n{3,}/g, "\n\n");

  // Trim whitespace
  result = result.trim();

  return result;
}
