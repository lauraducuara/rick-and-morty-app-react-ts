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
    const [showTip, setShowTip] = useState(true);

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
                <div
                    className="flex items-center gap-2 cursor-pointer shrink-0"
                    onClick={() => handleTab("characters")}
                >
                    <span className="text-xl sm:text-2xl">🧬</span>
                    <h1 className="font-bold text-white leading-none hover:text-green-400 transition-colors text-lg sm:text-2xl">
                        Rick & Morty
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button
                            onClick={() => {
                                toggleMusic();
                                setShowTip(false);
                            }}
                            title={playing ? "Pausar música" : "Reproducir intro"}
                            className={`
                                    w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                                    border transition-all text-xs sm:text-sm shrink-0
                                    ${playing
                                    ? "border-green-500 text-green-400 bg-green-500/10 animate-pulse"
                                    : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
                                }
                            `}
                        >
                            {playing ? "🔊" : "🔇"}
                        </button>

                        {showTip && (
                            <div className="absolute -bottom-9 right-0 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap z-50">
                                🎵 Dale play a la intro
                                <div className="absolute -top-1 right-3 w-2 h-2 bg-zinc-800 border-l border-t border-zinc-700 rotate-45" />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-0.5 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                        {([
                            { key: "characters", label: "👾", labelFull: "Personajes" },
                            { key: "stats", label: "📊", labelFull: "Estadísticas" },
                        ] as { key: Tab; label: string; labelFull: string }[]).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleTab(tab.key)}
                                className={`
                                    px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all
                                    ${activeTab === tab.key && pathname === "/"
                                        ? "bg-zinc-700 text-white"
                                        : "text-zinc-500 hover:text-zinc-300"
                                    }
                                 `}
                            >
                                <span className="sm:hidden">{tab.label}</span>
                                <span className="hidden sm:inline">{tab.label} {tab.labelFull}</span>
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </header>
    );
}