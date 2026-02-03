import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { RotateCcw, Plus, Calendar, MessageSquareText, Star } from "lucide-react";

const COMPETENCY_STYLES = {
  1: { // C1: Norma Culta (Vermelho/Rosa)
    badge: "bg-[#FFEDEA] text-[#CC3725]",
    border: "border-[#CC3725]",
  },
  2: { // C2: Compreensão (Azul)
    badge: "bg-[#E6F0FF] text-[#0052CC]",
    border: "border-[#0052CC]",
  },
  3: { // C3: Argumentação (Amarelo)
    badge: "bg-[#FFF9E6] text-[#B58500]",
    border: "border-[#FFC400]", // Um pouco mais forte para a borda
  },
  4: { // C4: Coesão (Verde)
    badge: "bg-[#E3FCEF] text-[#006644]",
    border: "border-[#00875A]",
  },
  5: { // C5: Intervenção (Roxo)
    badge: "bg-[#F3E9FF] text-[#6E40C9]",
    border: "border-[#8755DE]",
  }
};

const mockEssayDetail = {
  id: "1",
  title: "O Dilema da Conectividade na Era Digital",
  date: "24 de Outubro",
  totalScore: 880,
  category: "Tecnologia",

  contentHtml: `
    <p class="mb-4">Historicamente, a humanidade sempre buscou formas de encurtar distâncias e facilitar a comunicação. No entanto, <span class="bg-yellow-100 px-1 rounded border-b-2 border-yellow-300">com o advento da internet e a onipresença da tecnologia</span> no cotidiano, percebe-se um fenômeno paradoxal: embora estejamos mais conectados virtualmente, o isolamento social parece crescer em proporções alarmantes.</p>
    
    <p class="mb-4">Em primeira análise, é fundamental observar como as redes sociais alteraram a dinâmica das relações interpessoais. <span class="bg-red-100 px-1 rounded border-b-2 border-red-300">A tecnologia ela proporciona</span> uma sensação de proximidade constante que, muitas vezes, é superficial. O vício em dopamina, gerado pelas curtidas e notificações, faz com que o indivíduo priorize a validação digital em detrimento das interações físicas.</p>
    
    <p class="mb-4">Além disso, a desinformação propiciada pela rapidez dos fluxos de dados compromete a capacidade crítica dos cidadãos. <span class="bg-blue-100 px-1 rounded border-b-2 border-blue-300">Este cenário exige uma postura mais ativa das instituições de ensino</span> no sentido de promover o letramento digital, garantindo que o progresso tecnológico não resulte em um retrocesso intelectual ou social.</p>
  `,

  generalComment: "Sua redação apresenta uma excelente base argumentativa e uma estrutura bem definida, respeitando as quatro etapas fundamentais da dissertação-argumentativa. O repertório sociocultural foi bem mobilizado na introdução, criando um gancho interessante para o desenvolvimento. Entretanto, atente-se para pequenos desvios de gramática (pleonasmos) e para o detalhamento da proposta de intervenção.",

  competencies: [
    { id: 1, name: "C1: Norma Culta", description: "Domínio da norma culta da língua escrita.", score: 160, comment: "Cuidado com repetições desnecessárias e pleonasmos como 'A tecnologia ela'. Revise a concordância em períodos longos." },
    { id: 2, name: "C2: Compreensão do Tema", description: "Compreender a proposta e aplicar conceitos.", score: 200, comment: "Excelente uso de repertório sociocultural. A relação entre isolamento e hiperconectividade foi muito bem abordada." },
    { id: 3, name: "C3: Argumentação", description: "Selecionar, relacionar e interpretar informações.", score: 160, comment: "Seus argumentos são sólidos, mas poderiam ser mais detalhados no segundo parágrafo de desenvolvimento." },
    { id: 4, name: "C4: Coesão", description: "Conhecimento dos mecanismos linguísticos.", score: 200, comment: "Uso exemplar de conectivos interparágrafos e intraparágrafos. O texto flui com muita naturalidade." },
    { id: 5, name: "C5: Proposta de Intervenção", description: "Elaborar proposta para o problema abordado.", score: 160, comment: "Faltou detalhar o 'como'. Explique melhor a dinâmica das parcerias entre o MEC e as empresas de tecnologia." },
  ]
};

export default function EssayFeedbackPage({ params }: { params: { id: string } }) {

  return (
    <div className="min-h-screen  p-6 md:p-10 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Análise Detalhada: {mockEssayDetail.title}</h1>
            <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
              Avaliação seguindo critérios oficiais do ENEM • <Calendar className="size-3" /> {mockEssayDetail.date}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 font-bold gap-2 h-10 rounded-full">
              <RotateCcw className="size-4" />
              Refazer Redação
            </Button>
            <Link href="/temas">
              <Button className="bg-[#EBC84C] text-slate-900 hover:bg-[#d9b842] font-bold gap-2 h-10 rounded-full shadow-md shadow-yellow-500/10">
                <Plus className="size-4" />
                Nova Redação
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

            <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Texto do Aluno</span>

              <div className="flex flex-wrap gap-2">
                {mockEssayDetail.competencies
                  .filter((comp) => comp.score === 200)
                  .map((comp) => {
                    const style = COMPETENCY_STYLES[comp.id as keyof typeof COMPETENCY_STYLES];
                    const cleanName = comp.name.split(":")[1]?.trim();

                    return (
                      <span
                        key={comp.id}
                        className={`
            px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider 
            ${style.badge} ${style.border} bg-opacity-50
          `}
                      >
                        {cleanName}
                      </span>
                    );
                  })}
              </div>
            </div>

            <h2 className="text-xl font-bold text-center text-slate-900 mb-8 max-w-2xl mx-auto leading-tight">
              {mockEssayDetail.title}
            </h2>

            <div
              className="prose prose-slate max-w-none text-slate-600 leading-loose text-justify font-serif text-lg"
              dangerouslySetInnerHTML={{ __html: mockEssayDetail.contentHtml }}
            />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <MessageSquareText className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Comentário Geral do Corretor</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {mockEssayDetail.generalComment}
            </p>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0F172A] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Star className="size-22" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nota Total ENEM</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-[#EBC84C]">{mockEssayDetail.totalScore}</span>
              <span className="text-xl text-slate-400 font-medium">/ 1000</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <span className="bg-[#EBC84C] w-1 h-4 rounded-full block"></span>
              Desempenho por Competência
            </h4>

            {mockEssayDetail.competencies.map((comp) => {
              const style = COMPETENCY_STYLES[comp.id as keyof typeof COMPETENCY_STYLES];
              return (
                <div key={comp.id} className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">{comp.name}</h5>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{comp.description}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}>
                      {comp.score}/200
                    </span>
                  </div>

                  <div className={`mt-3 p-3 rounded-r-xl rounded-bl-xl border-l-4 ${style.border} bg-slate-50`}>
                    <p className="text-xs text-slate-600 italic leading-relaxed font-medium">
                      {`"${comp.comment}"`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}