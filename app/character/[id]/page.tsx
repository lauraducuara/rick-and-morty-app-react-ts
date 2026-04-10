"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useCharacter } from "@/hooks/useCharacters";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/Feedback";

export default function CharacterDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const { data: c, isLoading, isError, error } = useCharacter(id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !c) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ErrorMessage message={error?.message || "No se pudo cargar el personaje."} />
            </div>
        );
    }

    const statusColor = {
        Alive: "from-green-500/20 to-transparent",
        Dead: "from-red-500/20 to-transparent",
        unknown: "from-zinc-500/20 to-transparent",
    }[c.status];

    return (
        <main className="min-h-screen pb-16">

            <div className="relative h-72 sm:h-96 overflow-hidden">
                <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover object-top scale-110 blur-sm opacity-40"
                    priority
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${statusColor}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <button
                    onClick={() => router.back()}
                    className="absolute top-6 left-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Volver
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
                <div className="grid md:grid-cols-[280px_1fr] gap-8">

                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="relative w-48 h-48 md:w-full md:h-72 rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl shadow-black/50">
                            <Image
                                src={c.image}
                                alt={c.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
                            <p className="text-zinc-400 text-sm font-medium">
                                🎬 {c.episode.length} episodios
                            </p>
                            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                                {c.episode.map((ep) => (
                                    <span
                                        key={ep}
                                        className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
                                    >
                                        Ep. {ep.split("/").pop()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 pt-4">
                        <div className="space-y-3">
                            <StatusBadge status={c.status} />
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                                {c.name}
                            </h1>
                            <p className="text-zinc-500 text-sm font-mono">
                                #{c.id.toString().padStart(3, "0")}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: "🧬", label: "Especie", value: c.species },
                                { icon: "⚧", label: "Género", value: c.gender },
                                { icon: "🔬", label: "Tipo", value: c.type || "—" },
                                { icon: "📡", label: "Estado", value: c.status },
                            ].map(({ icon, label, value }) => (
                                <div
                                    key={label}
                                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-1 hover:border-zinc-600 transition-colors"
                                >
                                    <p className="text-lg">{icon}</p>
                                    <p className="text-zinc-500 text-xs">{label}</p>
                                    <p className="text-zinc-100 text-sm font-semibold">{value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 hover:border-zinc-600 transition-colors">
                                <span className="text-2xl">🌍</span>
                                <div>
                                    <p className="text-zinc-500 text-xs">Origen</p>
                                    <p className="text-zinc-100 text-sm font-semibold">{c.origin.name}</p>
                                </div>
                            </div>

                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 hover:border-zinc-600 transition-colors">
                                <span className="text-2xl">📍</span>
                                <div>
                                    <p className="text-zinc-500 text-xs">Última ubicación</p>
                                    <p className="text-zinc-100 text-sm font-semibold">{c.location.name}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-zinc-600 text-xs border-t border-zinc-800 pt-4">
                            Registrado en la API el {new Date(c.created).toLocaleDateString("es-ES", {
                                year: "numeric", month: "long", day: "numeric"
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}