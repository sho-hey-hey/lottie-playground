"use client";

import { useEffect, useRef, useState } from "react";
import type Lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

export const LottieUploader: React.FC = () => {
  const drawElemRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<AnimationItem | null>(null);
  const [lottie, setLottie] = useState<typeof Lottie | null>(null);

  useEffect(() => {
    import('lottie-web').then((l) => setLottie(l.default))
  }, [])

  return <>
    <input
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="file"
      accept="application/json"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            if(!drawElemRef.current || !lottie) return;
            const json = JSON.parse(event.target?.result as string);
            if(itemRef.current) {
              itemRef.current.destroy();
            }
            itemRef.current = lottie.loadAnimation({
              container: drawElemRef.current,
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: json,
            });
          } catch (error) {
            console.error("Invalid JSON file.", error);
          }
        };
        reader.readAsText(file);
      }}
    />
    <div ref={drawElemRef} />
  </>;
};