
import { TopicsList } from "@/components/topics-list";
import { getTopicsList } from "@/services/get-topics";

export default async function TopicsPage() {

  const topics = await getTopicsList();

  return (
    <div className="space-y-12 min-h-screen px-4 md:px-10 lg:px-12 py-4 pb-10">

      {/* --- TODO: SEÇÃO 1: TEMAS SUGERIDOS --- */}

      <TopicsList topics={topics} />
    </div>
  );
}