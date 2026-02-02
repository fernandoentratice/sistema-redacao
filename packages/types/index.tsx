export type ThematicAxis =
  | 'Educação'
  | 'Meio Ambiente'
  | 'Cidadania e Direitos Humanos'
  | 'Saúde'
  | 'Cultura'
  | 'Tecnologia'
  | 'Trabalho'
  | 'Segurança';

export type TopicOrigin = 'ENEM' | 'AUTORAL';

export interface MotivatingText {
  label: string;
  type: 'text' | 'image' | 'mixed';
  content?: string;
  image_url?: string;
  source?: string;
}

export interface EssayTopic {
  id: string;
  title: string;
  description: string;
  slug: string;
  axis: ThematicAxis;
  origin: TopicOrigin;
  exam_year: number | null;
  motivating_texts: MotivatingText[];
  active: boolean;
  created_at: string;
}