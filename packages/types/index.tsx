export type ThematicAxis =
  | 'Meio Ambiente'
  | 'Questões Sociais'
  | 'Saúde'
  | 'Cultura'
  | 'Direitos e Cidadania'
  | 'Educação'
  | 'Tecnologia'
  | 'Economia';
export interface MotivationalText {
  id: string;
  topic_id: string;
  text_number: number;
  body_text: string | null;
  image_url: string | null;
  source_reference: string | null;
}
export interface EssayTopic {
  id: string;
  title: string;
  axis: ThematicAxis;
  source_type: 'ENEM' | 'AUTORAL';
  source_year: number | null;
  active: boolean;
  created_at: string;
}
export interface EssayTopicDetail extends EssayTopic {
  motivational_texts: MotivationalText[];
}