"use client";

import { useEffect, useRef } from "react";

export default function AdsterraBanner468() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '326f8b7b9c50f288f3423018b03813d7',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.src =
      "https://www.highrevenueformat.com/326f8b7b9c50f288f3423018b03813d7/invoke.js";
    script2.async = true;

    adRef.current.appendChild(script1);
    adRef.current.appendChild(script2);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-6">
      <div ref={adRef} />
    </div>
  );
}
