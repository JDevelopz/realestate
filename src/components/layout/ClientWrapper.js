"use client";

import { useEffect } from "react";
import { useAppContext } from "@/app/providers";

export default function ClientWrapper({ children }) {
  const { setState } = useAppContext();

  useEffect(() => {
    // Initialize any client-side state here
    const initializeClientState = async () => {
      try {
        // Example: Load user preferences from localStorage
        const theme = localStorage.getItem("theme") || "light";
        setState((prev) => ({ ...prev, theme }));
      } catch (error) {
        console.error("Error initializing client state:", error);
      }
    };

    initializeClientState();
  }, [setState]);

  return <>{children}</>;
}
