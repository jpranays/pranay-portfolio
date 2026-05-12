import { useEffect } from "react";

const AWAY_TITLE  = "Come back! 👋 — Pranay Jadhav";
const HOME_TITLE  = "Pranay Jadhav — Senior Software Developer";

export function useTabTitle() {
  useEffect(() => {
    const handler = () => {
      document.title = document.hidden ? AWAY_TITLE : HOME_TITLE;
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
}
