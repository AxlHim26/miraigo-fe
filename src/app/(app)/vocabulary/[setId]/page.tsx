import VocabularySetView from "@/features/vocabulary/components/vocabulary-set-view";

interface PageProps {
  params: Promise<{ setId: string }>;
}

export default async function VocabularySetPage({ params }: PageProps) {
  const { setId } = await params;

  return <VocabularySetView setId={setId} />;
}
