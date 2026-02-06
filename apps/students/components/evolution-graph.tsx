"use client";

import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

interface EvolutionData {
  month: string;
  score: number;
}

interface EvolutionGraphProps {
  data: EvolutionData[];
}

export function EvolutionGraph({ data }: EvolutionGraphProps) {
  const [timeRange, setTimeRange] = useState<"3M" | "6M">("6M");

  // Filtro visual simples (apenas para exemplo de interatividade)
  const displayData = timeRange === "3M" ? data.slice(-3) : data;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Seletor de Período (Topo Direito) */}
      <div className="flex justify-end gap-2 mb-4">
        {["3 Meses", "6 Meses"].map((label) => {
          const value = label.startsWith("3") ? "3M" : "6M";
          const isActive = timeRange === value;
          return (
            <button
              key={value}
              onClick={() => setTimeRange(value as "3M" | "6M")}
              className={`
                px-3 py-1 rounded-full text-xs font-bold transition-colors
                ${isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Área do Gráfico */}
      <div className="w-full h-[200px] -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData}>
            {/* Linhas de grade horizontais bem sutis */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              opacity={0.5}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              dy={10}
            />

            <Tooltip
              cursor={{ stroke: 'var(--color-muted)', strokeWidth: 2 }}
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />

            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--secondary))" // Usa a variável CSS azul
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "hsl(var(--secondary))",
                stroke: "#fff",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 8,
                fill: "hsl(var(--secondary))",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}