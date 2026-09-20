"use client";

import { useEffect } from "react";

export default function AdsterraSocialBar() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://pl31425239.profitableratecpmnetwork.com/7c/95/9b/7c959bea2d94aa1cfa51f38d2632f0a8.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
