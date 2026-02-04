export interface UserData {
  name: string;
  email: string;
  avatarUrl: string | null;
}

export type ThematicAxis =
  | 'Meio Ambiente'
  | 'Questões Sociais'
  | 'Saúde'
  | 'Cultura'
  | 'Direitos e Cidadania'
  | 'Educação'
  | 'Tecnologia'
  | 'Economia';

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