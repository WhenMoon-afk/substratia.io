export interface Session {
  id: string;
  date: string;
  inputTokens: number;
  outputTokens: number;
  model: string;
}

const STORAGE_KEY = "substratia-cost-sessions";

export function loadSessions(): Session[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: Session[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}
