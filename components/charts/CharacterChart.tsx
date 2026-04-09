"use client";

import { useState } from "react";
import {  BarChart, Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { useAllCharactersForChart } from "@/hooks/useCharacters";
import { 
  groupBySpecies, 
  groupByStatus, 
  groupByGender,
  groupByTopEpisodes,   
  ChartDataPoint
} from "@/utils/chartHelpers";
import { LoadingSpinner } from "@/components/ui/Feedback";
import { Character } from "@/types/character";

type ChartCategory = "species" | "status" | "gender" | "episode";   

type ChartType = "bar" | "pie";

const COLORS = [
  "#fbbf24", "#f59e0b", "#d97706", "#eab308",
  "#84cc16", "#22c55e", "#a3e635", "#fef08c"
];

const CATEGORY_OPTIONS: Record<ChartCategory, string> = {
  species: "Especie",
  status:  "Estado",
  gender:  "Género",
  episode: "Episodios",       
};

export function CharacterChart() {
  const { data: characters, isLoading } = useAllCharactersForChart();
  const [category, setCategory] = useState<ChartCategory>("species");
  const [chartType, setChartType] = useState<ChartType>("bar");

  const dataMap: Record<ChartCategory, (chars: Character[]) => ChartDataPoint[]> = {
    species: groupBySpecies,
    status:  groupByStatus,
    gender:  groupByGender,
    episode: groupByTopEpisodes,    
  };

  const chartData = characters ? dataMap[category](characters) : [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-zinc-100 font-semibold text-base">
            Distribución de Personajes
          </h2>
          <p className="text-zinc-500 text-xs mt-0.5">
            {characters ? `${characters.length} personajes en total` : ""}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(Object.keys(CATEGORY_OPTIONS) as ChartCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${category === cat 
                  ? "bg-yellow-400 text-zinc-900 font-semibold" 
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }
              `}
            >
              {CATEGORY_OPTIONS[cat]}
            </button>
          ))}

          <div className="flex gap-1 bg-zinc-800 rounded-xl p-1">
            {(["bar", "pie"] as ChartType[]).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`
                  px-4 py-1.5 rounded-lg text-sm transition-colors
                  ${chartType === type 
                    ? "bg-zinc-700 text-white" 
                    : "text-zinc-400 hover:text-white"
                  }
                `}
              >
                {type === "bar" ? "Barras" : "Pastel"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-80">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: -10 }}>
              <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #fbbf24",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#e4e4e7" }}
                itemStyle={{ color: "#fbbf24" }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #fbbf24", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#a1a1aa" }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}