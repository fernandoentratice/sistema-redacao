import { BarChart3, FileText, Award } from "lucide-react";

interface UserStatsProps {
  stats: {
    totalEssays: number;
    averageScore: number;
    bestScore: number;
  };
}

export function UserStats({ stats }: UserStatsProps) {
  //TODO: ajustar footers

  const statCards = [
    {
      label: "Média Geral",
      value: stats.averageScore,
      footer: "+15 pts que a média nacional",
      icon: BarChart3,
      styles: {
        iconBg: "bg-[#FFF9E6]",
        iconColor: "text-[#EBC84C]",
        footerText: "font-bold text-[#22C55E]",
      },
    },
    {
      label: "Redações Enviadas",
      value: stats.totalEssays,
      footer: "Meta mensal: 12/15",
      icon: FileText,
      styles: {
        iconBg: "bg-[#EDF4FF]",
        iconColor: "text-[#3B82F6]",
        footerText: "text-[#8A8A8A]",
      },
    },
    {
      label: "Melhor Competência",
      value: stats.bestScore,
      footer: "960 pts em média",
      icon: Award,
      styles: {
        iconBg: "bg-[#FFF4ED]",
        iconColor: "text-[#F97316]",
        footerText: "font-bold text-[#F97316]",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((item, index) => (
        <div
          key={index}
          className="p-6 rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2.5 rounded-xl ${item.styles.iconBg} ${item.styles.iconColor}`}>
              <item.icon className="size-6" />
            </div>
            <span className="font-bold text-[#8A8A8A] text-sm">
              {item.label}
            </span>
          </div>

          <div>
            <h3 className={`text-4xl font-extrabold ${item.value > 0 ? 'text-slate-900' : 'text-slate-300'} mb-1 tracking-tight`}>
              {item.value && item.value > 0 ? item.value : "—"}
            </h3>
            {/* <p className={`text-xs ${item.styles.footerText}`}>
              {item.footer}
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
}