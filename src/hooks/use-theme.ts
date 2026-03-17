"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    return saved ?? "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function updateTheme(nextTheme: "light" | "dark") {
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  return {
    theme,
    setTheme: updateTheme,
  };
}