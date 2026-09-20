"use client";

import { useEffect, useRef } from "react";

export default function AdsterraNativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous contents to prevent duplicates
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl31428098.profitableratecpmnetwork.com/81b31d9abcab3405afbdcc73c84acb3b/invoke.js";

    const div = document.createElement("div");
    div.id = "container-81b31d9abcab3405afbdcc73c84acb3b";

    containerRef.current.appendChild(script);
    containerRef.current.appendChild(div);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-6">
      <div ref={containerRef} />
    </div>
  );
}
