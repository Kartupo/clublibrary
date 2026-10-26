import { ApiError, request, setAccessToken, USE_MOCK } from "./client";
import { clearSession, loadSession, saveSession } from "./session";

export type User = {
  id: number;
  email: string;
  name: string;
  verified: boolean;
};

export type LoginResponse = { access_token: string; user: User };

const UNIVERSITY_DOMAIN = "@itu.edu.tr";

// Assumed contract (to be agreed with the backend lead):
//   POST /auth/register            {email, password, name} -> 201 {message}
//   POST /auth/resend-verification {email}                 -> 200 {message}
//   POST /auth/login               {email, password}       -> 200 {access_token, user}
//                                  403 if the e-mail is not verified yet
//   POST /auth/forgot-password     {email}                 -> 200 {message}
//   POST /auth/reset-password      {token, password}       -> 200 {message}
//                                  400 if the token is invalid or expired
//
// Mock mode: an e-mail starting with "unverified" gets a 403 on login,
// a wrong password is "wrong", and a reset token "expired" is rejected.
export function isUniversityEmail(email: string) {
  return email.trim().toLowerCase().endsWith(UNIVERSITY_DOMAIN);
}

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function register(input: {
  email: string;
  password: string;
  name: string;
}): Promise<{ message: string }> {
  if (USE_MOCK) {
    await delay();
    if (!isUniversityEmail(input.email)) {
      throw new ApiError(400, `Use your ${UNIVERSITY_DOMAIN} address`);
    }
    return { message: "Verification e-mail sent" };
  }
  return request("/auth/register", { method: "POST", body: input });
}

export async function resendVerification(email: string) {
  if (USE_MOCK) {
    await delay();
    return { message: "Verification e-mail sent" };
  }
  return request<{ message: string }>("/auth/resend-verification", {
    method: "POST",
    body: { email },
  });
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  let result: LoginResponse;
  if (USE_MOCK) {
    await delay();
    if (input.email.toLowerCase().startsWith("unverified")) {
      throw new ApiError(403, "Please verify your e-mail first");
    }
    if (input.password === "wrong") {
      throw new ApiError(401, "Invalid e-mail or password");
    }
    result = {
      access_token: "mock-token",
      user: { id: 1, email: input.email, name: "Mock User", verified: true },
    };
  } else {
    result = await request("/auth/login", { method: "POST", body: input });
  }
  setAccessToken(result.access_token);
  await saveSession(result.access_token, result.user);
  return result;
}

export async function restoreSession(): Promise<User | null> {
  const session = await loadSession<User>();
  if (!session) return null;
  setAccessToken(session.token);
  return session.user;
}

export async function logout() {
  setAccessToken(null);
  await clearSession();
}

export async function forgotPassword(email: string) {
  if (USE_MOCK) {
    await delay();
    return { message: "If this e-mail exists, a reset link was sent" };
  }
  return request<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

export async function resetPassword(input: { token: string; password: string }) {
  if (USE_MOCK) {
    await delay();
    if (input.token.trim().toLowerCase() === "expired") {
      throw new ApiError(400, "This reset link has expired. Request a new one.");
    }
    return { message: "Password updated" };
  }
  return request<{ message: string }>("/auth/reset-password", {
    method: "POST",
    body: input,
  });
}
