import type { Metadata } from "next";

import PracticeConversationView from "@/features/practice/components/practice-conversation-view";

export const metadata: Metadata = {
  title: "Hội Thoại Realtime",
  description: "Hội thoại giọng nói thời gian thực với AI nhận diện ngôn ngữ",
};

export default function PracticeConversationPage() {
  return <PracticeConversationView />;
}
