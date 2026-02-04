import { CreditBalance } from "@/components/credit-balance";
import { StatCard } from "@/components/stat-card";
import { Button } from "@repo/ui/components/button";
import { FileText, Plus, TrendingUp } from "lucide-react";
import { SectionCard } from "@/components/section-card";
import { CompetenceList } from "@/components/competence-list";
import { EvolutionGraph } from "@/components/evolution-graph";
import { RecentEssaysList } from "@/components/recent-essays-list";
import { getDashboardData } from "@/services/get-dashboard-data";


export default async function DashboardPage() {

  const data = await getDashboardData();

  if (!data) return null;

  return (
    <div className="space-y-8 px-4 md:px-10 lg:px-12 py-4">

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Olá, {data.user.firstName}!
          </h1>
          <p className="text-slate-500 text-md mt-1">
            Pronto para escrever sua próxima nota 1000?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <CreditBalance amount={data.user.credits} />
          <Button className="rounded-full h-14 gap-2 w-full sm:w-auto px-6 shadow-lg shadow-yellow-400/20 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold">
            <Plus className="size-5" />
            Enviar nova redação
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Média Geral"
          value={data.metrics.hasData ? data.metrics.averageScore : 0}
          variant="yellow"
        />
        <StatCard
          title="Última Nota"
          value={data.metrics.lastScore}
          variant="blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard
          title="Média por Competência"
          icon={FileText}
          hasData={data.charts.hasEssays}
          emptyDescription="Envie sua primeira redação para ver o detalhamento por competência."
        >
          <CompetenceList scores={data.charts.competenceScores} />
        </SectionCard>

        <SectionCard
          title="Evolução no Tempo"
          icon={TrendingUp}
          hasData={data.charts.hasHistory}
          emptyDescription="Seu gráfico de progresso será gerado automaticamente."
        >
          <EvolutionGraph data={data.charts.evolutionData} />
        </SectionCard>
      </div>

      <RecentEssaysList
        hasData={data.recentEssays.hasEssays}
        essays={data.recentEssays.list}
      />
    </div>
  );
}