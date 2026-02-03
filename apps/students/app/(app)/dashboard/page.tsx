import { CreditBalance } from "@/components/credit-balance";
import { StatCard } from "@/components/stat-card";
import { Button } from "@repo/ui/components/button";
import { createClient } from "@/lib/server";
import { FileText, Plus, TrendingUp } from "lucide-react";
import { SectionCard } from "@/components/section-card";
import { CompetenceList } from "@/components/competence-list";
import { EvolutionGraph } from "@/components/evolution-graph";
import { RecentEssaysList } from "@/components/recent-essays-list";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const fullName = user?.user_metadata?.full_name || "Estudante";
  const firstName = fullName.split(" ")[0];

  const MOCK_SCORES = {
    C1: 180,
    C2: 160,
    C3: 200,
    C4: 140,
    C5: 165,
  };

  const MOCK_EVOLUTION = [
    { month: "MAI", score: 380 },
    { month: "JUN", score: 520 },
    { month: "JUL", score: 680 },
    { month: "AGO", score: 640 },
    { month: "SET", score: 810 },
    { month: "OUT", score: 920 },
  ];

  const MOCK_ESSAYS = [
    {
      id: "1",
      title: "Mobilidade Urbana Sustentável no Século XXI",
      date: "Enviada hoje às 14:30",
      status: "pending",
    },
    {
      id: "2",
      title: "Os Impactos da IA na Educação Brasileira",
      date: "12 de Out, 2023",
      status: "done",
      score: 920,
    },
    {
      id: "3",
      title: "O Desafio das Fake News na Democracia",
      date: "28 de Set, 2023",
      status: "done",
      score: 780,
    },
  ] as const;

  const hasData = true;

  return (
    <div className="space-y-8">

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Olá, {firstName}!
          </h1>
          <p className="text-slate-500 text-md mt-1">
            Pronto para escrever sua próxima nota 1000?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <CreditBalance amount={12} />
          <Button className="rounded-full h-14 gap-2 w-full sm:w-auto px-6 shadow-lg shadow-yellow-400/20 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold">
            <Plus className="size-5" />
            Enviar nova redação
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <StatCard
          title="Média Geral"
        // value={845}
        // variant="yellow"
        // trendText="+42 pontos em relação ao mês anterior"
        />


        <StatCard
          title="Última Nota"
        // value={920}
        // variant="blue"
        // trendText="Nível Avançado • 12 de Out"
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard
          title="Média por Competência"
          icon={FileText}
          hasData={hasData}
          emptyDescription="Envie sua primeira redação para ver o detalhamento por competência."
        >
          <CompetenceList scores={MOCK_SCORES} />
        </SectionCard>

        <SectionCard
          title="Evolução no Tempo"
          icon={TrendingUp}
          hasData={hasData}
          emptyDescription="Seu gráfico de progresso será gerado automaticamente."
        >
          <EvolutionGraph data={MOCK_EVOLUTION} />
        </SectionCard>
      </div>

      <RecentEssaysList
        hasData={hasData}
        // @ts-expect-error mock data
        essays={hasData ? MOCK_ESSAYS : []}
      />

    </div>
  )
}