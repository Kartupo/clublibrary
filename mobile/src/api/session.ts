import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

export async function saveSession(token: string, user: unknown) {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch {
    // Storage unavailable (e.g. web): the session just won't survive a restart
  }
}

export async function loadSession<U>(): Promise<{ token: string; user: U } | null> {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const user = await SecureStore.getItemAsync(USER_KEY);
    if (token && user) return { token, user: JSON.parse(user) as U };
  } catch {
    // ignore and treat as logged out
  }
  return null;
}

export async function clearSession() {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch {
    // ignore
  }
}
