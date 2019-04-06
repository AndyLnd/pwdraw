export const store = (key, value) => localStorage.setItem(key, value);
export const storeJson = (key, value) => store(key, JSON.stringify(value));

export const load = name => localStorage.getItem(name);
export const loadJson = name => {
  try {
    return JSON.parse(load(name));
  } catch {
    return null;
  }
};
