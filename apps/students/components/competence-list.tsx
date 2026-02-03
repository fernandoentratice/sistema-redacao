"use client";

const COMPETENCES = [
  { id: "C1", label: "Domínio da Norma Culta" },
  { id: "C2", label: "Compreensão do Tema" },
  { id: "C3", label: "Organização de Ideias" },
  { id: "C4", label: "Coesão Textual" },
  { id: "C5", label: "Proposta de Intervenção" },
];

interface CompetenceListProps {
  scores: Record<string, number>;
}

export function CompetenceList({ scores }: CompetenceListProps) {
  return (
    <div className="w-full space-y-5 px-2">
      {COMPETENCES.map((item) => {
        const score = scores[item.id] || 0;
        const max = 200;
        const percentage = (score / max) * 100;

        return (
          <div key={item.id} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-end text-sm">
              <span className="font-bold text-foreground/80">
                <span className="text-foreground font-extrabold mr-1">{item.id}:</span>
                {item.label}
              </span>
              <span className="font-bold">
                <span className="text-md text-primary">
                  {score}
                </span>
                <span className="text-muted-foreground/60 text-xs ml-0.5">
                  / {max}
                </span>
              </span>
            </div>

            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 bg-primary"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}