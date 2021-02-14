
type KEY_EMAIL = "email";
type KEY_ADDRESS = "address";

type StorableKey = KEY_EMAIL | KEY_ADDRESS;

export function set(key: StorableKey, value: string) {
  return localStorage.setItem(key, value);
}

export function get(key: StorableKey) {
  return localStorage.getItem(key);
}

export function clear() {
  return localStorage.clear()
}
