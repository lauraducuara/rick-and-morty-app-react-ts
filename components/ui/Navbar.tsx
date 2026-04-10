"use client";

import { useRouter, usePathname } from "next/navigation";
import { useFilterStore } from "@/store/filterStore";
import { useRef, useState } from "react";

type Tab = "characters" | "stats";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useFilterStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const handleTab = (tab: Tab) => {
    setActiveTab(tab);
    if (pathname !== "/") router.push("/");
  };

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/rick-and-morty-intro.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleTab("characters")}
        >
          <span className="text-2xl">🧬</span>
          <h1
            className="font-bold text-white leading-none hover:text-green-400 transition-colors"
            style={{ fontSize: "28px" }}
          >
            Rick & Morty
          </h1>
        </div>

        <div className="flex items-center gap-3">
              <button
            onClick={toggleMusic}
            title={playing ? "Pausar música" : "Reproducir intro"}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              border transition-all text-sm
              ${playing
                ? "border-green-500 text-green-400 bg-green-500/10 animate-pulse"
                : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
              }
            `}
          >
            {playing ? "🔊" : "🔇"}
          </button>

          <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            {([
              { key: "characters", label: "👾 Personajes" },
              { key: "stats",      label: "📊 Estadísticas" },
            ] as { key: Tab; label: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTab(tab.key)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeTab === tab.key && pathname === "/"
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}