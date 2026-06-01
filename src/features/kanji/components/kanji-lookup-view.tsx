import Stack from "@mui/material/Stack";

import KanjiMapView from "@/features/kanji/components/kanji-map-view";

export default function KanjiLookupView() {
  return (
    <Stack spacing={4}>
      <KanjiMapView />
    </Stack>
  );
}
