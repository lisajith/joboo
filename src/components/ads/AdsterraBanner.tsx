"use client";

import { useEffect, useRef } from "react";

export default function AdsterraBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    const script1 = document.createElement("script");

    script1.innerHTML = `
      atOptions = {
        'key' : 'dd55eab26085ec4196c944037ac0184d',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.src =
      "https://www.highrevenueformat.com/dd55eab26085ec4196c944037ac0184d/invoke.js";
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
    <div className="flex justify-center py-6">
      <div ref={adRef} />
    </div>
  );
}
