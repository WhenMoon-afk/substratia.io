export interface Memory {
  id: string;
  content: string;
  context: string;
  importance: number;
  timesUsed: number;
}

export interface ChatMessage {
  role: string;
  text: string;
}

// Realistic memories that feel like they came from actual dev work
export const REALISTIC_MEMORIES: Memory[] = [
  {
    id: "mem_1",
    content: "Use Bun instead of npm - this project uses bun.lock",
    context: "Project setup",
    importance: 9,
    timesUsed: 12,
  },
  {
    id: "mem_2",
    content: "Don't add comments to unchanged code",
    context: "Code style preference",
    importance: 8,
    timesUsed: 23,
  },
  {
    id: "mem_3",
    content: "Auth tokens stored in httpOnly cookies, not localStorage",
    context: "Security decision",
    importance: 10,
    timesUsed: 8,
  },
  {
    id: "mem_4",
    content: "Tests go in __tests__ folder, not alongside components",
    context: "Project structure",
    importance: 7,
    timesUsed: 15,
  },
  {
    id: "mem_5",
    content: "Always run 'bun test' before committing",
    context: "Workflow",
    importance: 8,
    timesUsed: 31,
  },
];

// What you'd have to say WITHOUT memory
export const WITHOUT_MEMORY_EXCHANGE: ChatMessage[] = [
  {
    role: "claude",
    text: "I'll help you set up the test. Should I put it in a `__tests__` folder or next to the component?",
  },
  { role: "user", text: "Tests go in __tests__ folder" },
  {
    role: "claude",
    text: "Got it. I'll use npm to install the testing library\u2014",
  },
  { role: "user", text: "No, use Bun. This project uses bun.lock" },
  {
    role: "claude",
    text: "Right, Bun it is. I'll add some helpful comments\u2014",
  },
  { role: "user", text: "Please don't add comments to unchanged code" },
  {
    role: "claude",
    text: "Understood. For the auth test, should tokens be in localStorage or cookies?",
  },
  { role: "user", text: "httpOnly cookies. We decided this for security." },
];

// What happens WITH memory
export const WITH_MEMORY_EXCHANGE: ChatMessage[] = [
  {
    role: "claude",
    text: "I'll create the test in `__tests__/` using Bun, no comments on unchanged code. Testing the httpOnly cookie auth flow.",
  },
  { role: "user", text: "Perfect." },
];
