"use client";

import { useEffect, useRef } from "react";

export default function AdsterraBanner728() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '4cb1bc15b9f63bdf1328fab4401a44c8',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.src = "https://www.highrevenueformat.com/4cb1bc15b9f63bdf1328fab4401a44c8/invoke.js";
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
    <div className="flex justify-center my-6 overflow-x-auto">
      <div ref={adRef} />
    </div>
  );
}