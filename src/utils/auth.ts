import type { SessionData } from '../types';

const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
} as const;

const SESSION_KEY_LOCAL = 'adminSession';
const SESSION_DURATION = 86400000; // 24 heures

export const login = (username: string, password: string, remember = false): boolean => {
  if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
    const sessionData: SessionData = {
      username,
      loggedIn: true,
      timestamp: Date.now()
    };

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY_LOCAL, JSON.stringify(sessionData));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY_LOCAL);
  sessionStorage.removeItem(SESSION_KEY_LOCAL);
};

export const isAuthenticated = (): boolean => {
  const sessionStr = localStorage.getItem(SESSION_KEY_LOCAL) || sessionStorage.getItem(SESSION_KEY_LOCAL);
  if (!sessionStr) return false;

  try {
    const data = JSON.parse(sessionStr) as SessionData;
    if (!data.loggedIn || (Date.now() - data.timestamp) > SESSION_DURATION) {
      logout();
      return false;
    }
    return true;
  } catch {
    logout();
    return false;
  }
};

export const getUsername = (): string | null => {
  const sessionStr = localStorage.getItem(SESSION_KEY_LOCAL) || sessionStorage.getItem(SESSION_KEY_LOCAL);
  if (!sessionStr) return null;

  try {
    const data = JSON.parse(sessionStr) as SessionData;
    return data.username;
  } catch {
    return null;
  }
};
