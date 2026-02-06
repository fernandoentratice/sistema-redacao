import { Competencies, Essay } from "@repo/types";

const COMPETENCIES_INFO = {
  c1: {
    id: 1,
    name: "C1: Norma Culta",
    description: "Demonstrar domínio da modalidade escrita formal da língua portuguesa.",
  },
  c2: {
    id: 2,
    name: "C2: Compreensão do Tema",
    description:
      "Compreender a proposta de redação e aplicar conceitos de várias áreas de conhecimento.",
  },
  c3: {
    id: 3,
    name: "C3: Argumentação",
    description:
      "Selecionar, relacionar, organizar e interpretar informações em defesa de um ponto de vista.",
  },
  c4: {
    id: 4,
    name: "C4: Coesão",
    description:
      "Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.",
  },
  c5: {
    id: 5,
    name: "C5: Proposta de Intervenção",
    description:
      "Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos.",
  },
};

export function mapEssayToCompetencies(essay: Essay): Competencies[] {
  return [
    {
      ...COMPETENCIES_INFO.c1,
      score: essay.score_c1,
      comment: essay.comment_c1,
    },
    {
      ...COMPETENCIES_INFO.c2,
      score: essay.score_c2,
      comment: essay.comment_c2,
    },
    {
      ...COMPETENCIES_INFO.c3,
      score: essay.score_c3,
      comment: essay.comment_c3,
    },
    {
      ...COMPETENCIES_INFO.c4,
      score: essay.score_c4,
      comment: essay.comment_c4,
    },
    {
      ...COMPETENCIES_INFO.c5,
      score: essay.score_c5 ?? 0,
      comment: essay.comment_c5,
    },
  ];
}
