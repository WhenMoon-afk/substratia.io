export type ThinkingMode = "normal" | "thinkhard" | "ultrathink";

export interface Snippet {
  id: string;
  name: string;
  category: "autonomous" | "parallel" | "simulator" | "structure" | "interrupt";
  content: string;
  description: string;
}

export const thinkingModes: {
  id: ThinkingMode;
  name: string;
  description: string;
  prefix: string;
}[] = [
  {
    id: "normal",
    name: "Normal",
    description: "Standard reasoning",
    prefix: "",
  },
  {
    id: "thinkhard",
    name: "Think Hard",
    description: "Deep reasoning for complex problems",
    prefix: "thinkhard about this:\n\n",
  },
  {
    id: "ultrathink",
    name: "Ultrathink",
    description: "Maximum reasoning depth",
    prefix: "ultrathink about this:\n\n",
  },
];

export const snippets: Snippet[] = [
  // Autonomous patterns
  {
    id: "continue-complete",
    name: "Continue Until Complete",
    category: "autonomous",
    content:
      "Continue working on this task until you reach a natural stopping point or encounter an issue that requires my input.",
    description: "Basic autonomous loop",
  },
  {
    id: "iterate-improve",
    name: "Iterate & Improve",
    category: "autonomous",
    content:
      "Iterate on this solution, improving it with each pass. Continue for 5 iterations or until you are satisfied with the result.",
    description: "Self-improving loop",
  },
  {
    id: "autonomous-work",
    name: "Work Autonomously",
    category: "autonomous",
    content:
      "Work autonomously on this. Only pause if you need clarification on requirements or encounter a blocking error.",
    description: "Minimal interruption mode",
  },

  // Parallel execution
  {
    id: "parallel-research",
    name: "Parallel Research",
    category: "parallel",
    content:
      "Use subagents in parallel to research these topics simultaneously. Synthesize findings when all complete.",
    description: "Concurrent research tasks",
  },
  {
    id: "spawn-tasks",
    name: "Spawn Concurrent Tasks",
    category: "parallel",
    content:
      "Spawn concurrent tasks for the items listed above. Coordinate and combine results at the end.",
    description: "Multiple simultaneous tasks",
  },
  {
    id: "parallel-execute",
    name: "Execute in Parallel",
    category: "parallel",
    content:
      "Execute these independent tasks in parallel, then combine and summarize outputs.",
    description: "General parallel execution",
  },

  // Simulator patterns
  {
    id: "user-simulator",
    name: "User Feedback Simulator",
    category: "simulator",
    content:
      "Create a user feedback simulator subagent that will evaluate each iteration from a user perspective. Use its feedback to guide improvements. Continue until the simulator rates the output 8/10 or higher.",
    description: "Simulated user testing",
  },
  {
    id: "qa-tester",
    name: "QA Tester Subagent",
    category: "simulator",
    content:
      "Generate a QA tester subagent that will find issues with this code. Fix each issue found. Repeat until no issues remain.",
    description: "Automated QA loop",
  },
  {
    id: "critic-subagent",
    name: "Critic Subagent",
    category: "simulator",
    content:
      "Create a critic subagent that will evaluate the output against best practices and suggest improvements. Incorporate feedback and iterate.",
    description: "Self-critique pattern",
  },

  // Structure templates
  {
    id: "context-first",
    name: "Context Block",
    category: "structure",
    content:
      "## Context\n[Describe the current situation, codebase, or problem domain]\n\n## Task\n[What you want accomplished]\n\n## Constraints\n[Any limitations or requirements]",
    description: "Structured prompt format",
  },
  {
    id: "step-by-step",
    name: "Step by Step",
    category: "structure",
    content:
      "Think through this step by step:\n1. First, analyze the problem\n2. Then, identify potential solutions\n3. Evaluate each solution\n4. Implement the best approach",
    description: "Explicit reasoning steps",
  },

  // Interrupt patterns
  {
    id: "stop-interrupt",
    name: "STOP Interrupt",
    category: "interrupt",
    content:
      'Continue this process until you receive a message containing "STOP" or "DONE". Check for interrupt messages between each major step.',
    description: "Keyword-based stopping",
  },
  {
    id: "phase-check",
    name: "Phase Check",
    category: "interrupt",
    content:
      "Work on this in phases. After each phase, pause briefly to check for user input. If no input, continue to the next phase.",
    description: "Phased execution with checkpoints",
  },
];

export const categoryLabels: Record<Snippet["category"], string> = {
  autonomous: "Autonomous Loops",
  parallel: "Parallel Execution",
  simulator: "Simulator Subagents",
  structure: "Structure Templates",
  interrupt: "Interrupt Patterns",
};

export const categoryColors: Record<Snippet["category"], string> = {
  autonomous: "cyan",
  parallel: "purple",
  simulator: "green",
  structure: "yellow",
  interrupt: "red",
};
