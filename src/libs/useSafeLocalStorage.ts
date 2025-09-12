import { useEffect, useState } from "react";

export function useSafeLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  // ambil dari localStorage hanya di client
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading localStorage", error);
    }
  }, [key]);

  // update localStorage kalau state berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing localStorage", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
