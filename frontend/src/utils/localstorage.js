const currentLocalStorage = {}

export const setItem = (key, value) => {
  currentLocalStorage[key] = value
  localStorage.setItem(key, value)
}

export const getItem = (key) => {
  if (currentLocalStorage[key]) {
    return currentLocalStorage[key]
  }

  const storedValue = localStorage.getItem(key)

  try {
    return JSON.parse(storedValue)
  } catch {
    return storedValue
  }
}

export const removeItem = (key) => {
  delete currentLocalStorage[key]
  localStorage.removeItem(key)
}
