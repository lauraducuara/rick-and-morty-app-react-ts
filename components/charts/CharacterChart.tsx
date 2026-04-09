"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
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
import { groupBySpecies, groupByStatus, groupByGender } from "@/utils/chartHelpers";
import { LoadingSpinner } from "@/components/ui/Feedback";

type ChartCategory = "species" | "status" | "gender";
type ChartType = "bar" | "pie";

const COLORS = [
  "#10b981","#34d399","#6ee7b7",
  "#a7f3d0","#059669","#047857",
  "#065f46","#d1fae5"
];

const CATEGORY_OPTIONS: Record<ChartCategory, string> = {
  species: "Especie",
  status:  "Estado",
  gender:  "Género",
};

export function CharacterChart() {
  const { data: characters, isLoading } = useAllCharactersForChart();
  const [category, setCategory] = useState<ChartCategory>("species");
  const [chartType, setChartType] = useState<ChartType>("bar");

  const dataMap: Record<ChartCategory, typeof groupBySpecies> = {
    species: groupBySpecies,
    status:  groupByStatus,
    gender:  groupByGender,
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
                px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${category === cat
                  ? "bg-green-500 text-zinc-900"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                }
              `}
            >
              {CATEGORY_OPTIONS[cat]}
            </button>
          ))}

          <div className="flex gap-1 bg-zinc-800 rounded-lg p-1">
            {(["bar", "pie"] as ChartType[]).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`
                  px-2.5 py-1 rounded-md text-xs transition-colors
                  ${chartType === type
                    ? "bg-zinc-600 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                  }
                `}
              >
                {type === "bar" ? "Barras" : "Pastel"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-64">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: -20 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#e4e4e7" }}
                itemStyle={{ color: "#10b981" }}
                cursor={{ fill: "rgba(16,185,129,0.08)" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Personajes">
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
                outerRadius={90}
                fontSize={11}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: "#a1a1aa" }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}