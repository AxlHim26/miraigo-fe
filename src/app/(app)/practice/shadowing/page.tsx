import type { Metadata } from "next";

import PracticeShadowingView from "@/features/practice/components/practice-shadowing-view";

export const metadata: Metadata = {
  title: "Shadowing",
  description: "Luyện Shadowing tiếng Nhật với AI chấm điểm từng ký tự",
};

export default function PracticeShadowingPage() {
  return <PracticeShadowingView />;
}
