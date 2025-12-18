export type Plan = 'Basic' | 'Standard' | 'Premium';

export interface User {
  name: string;
  email: string;
  password?: string;
  phone?: string;
}

export interface Subscription {
  plan: Plan;
  startedAt: string; // ISO
  expiresAt: string; // ISO
  autoRenew: boolean;
  paymentMethod: string;
}

const USERS_KEY = 'app_users_v1';
const CURRENT_USER_KEY = 'app_current_user_v1';

function readUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signUp(user: User) {
  const users = readUsers();
  if (users.find(u => u.email === user.email)) {
    throw new Error('User already exists');
  }
  users.push(user);
  writeUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, user.email);
  return user;
}

export function login(email: string, password?: string) {
  const users = readUsers();
  const u = users.find(x => x.email === email);
  if (!u) throw new Error('User not found');
  // For this mock we don't validate password strictly
  localStorage.setItem(CURRENT_USER_KEY, email);
  return u;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  const email = localStorage.getItem(CURRENT_USER_KEY);
  if (!email) return null;
  return readUsers().find(u => u.email === email) || null;
}

const subscriptionKey = (email: string) => `subscription_${email}_v1`;

export function getSubscriptionFor(email: string): Subscription | null {
  const raw = localStorage.getItem(subscriptionKey(email));
  if (!raw) return null;
  try { return JSON.parse(raw) as Subscription; } catch { return null; }
}

export function activateSubscription(email: string, plan: Plan, months = 1, paymentMethod = 'Card', autoRenew = true) {
  const started = new Date();
  const expires = new Date(started);
  expires.setMonth(expires.getMonth() + months);
  const sub: Subscription = {
    plan,
    startedAt: started.toISOString(),
    expiresAt: expires.toISOString(),
    autoRenew,
    paymentMethod,
  };
  localStorage.setItem(subscriptionKey(email), JSON.stringify(sub));
  return sub;
}

export function cancelSubscription(email: string) {
  // mark subscription as expired immediately
  const sub = getSubscriptionFor(email);
  if (!sub) return null;
  sub.expiresAt = new Date().toISOString();
  localStorage.setItem(subscriptionKey(email), JSON.stringify(sub));
  return sub;
}

export function updateAutoRenew(email: string, enabled: boolean) {
  const sub = getSubscriptionFor(email);
  if (!sub) return null;
  sub.autoRenew = enabled;
  localStorage.setItem(subscriptionKey(email), JSON.stringify(sub));
  return sub;
}

export function changePlan(email: string, plan: Plan, months = 1) {
  // simple plan change: restart subscription from now
  return activateSubscription(email, plan, months);
}

export function updatePaymentMethod(email: string, method: string) {
  const sub = getSubscriptionFor(email);
  if (!sub) return null;
  sub.paymentMethod = method;
  localStorage.setItem(subscriptionKey(email), JSON.stringify(sub));
  return sub;
}
