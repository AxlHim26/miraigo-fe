import { Metadata } from "next";

import JlptMockListView from "@/features/practice/components/jlpt-mock-list-view";

export const metadata: Metadata = {
  title: "Danh sách đề thi JLPT",
  description: "Chọn đề thi thử JLPT",
};

export default async function JlptMockListPage(props: { params: Promise<{ level: string }> }) {
  const params = await props.params;
  return <JlptMockListView level={params.level} />;
}
