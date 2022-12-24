export function getLocalValue<T>(key: string): null | T {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
}

export function setLocalValue<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalValue(key: string) {
  localStorage.removeItem(key);
}

export function getSessionValue<T>(key: string): null | T {
  const value = sessionStorage.getItem(key);
  return value && JSON.parse(value);
}

export function setSessionValue<T>(key: string, value: T) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeSessionValue(key: string) {
  sessionStorage.removeItem(key);
}
