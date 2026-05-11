"use client";

import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import IconButton from "@mui/material/IconButton";

interface VoiceRecorderButtonProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

export default function VoiceRecorderButton({
  isRecording,
  onStart,
  onStop,
  disabled = false,
  size = "large",
}: VoiceRecorderButtonProps) {
  const px = size === "large" ? 72 : size === "medium" ? 56 : 40;

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Pulse ring khi recording */}
      {isRecording && (
        <span
          className="absolute animate-ping rounded-full opacity-30"
          style={{
            width: px + 16,
            height: px + 16,
            backgroundColor: "var(--app-danger)",
          }}
        />
      )}

      <IconButton
        onClick={isRecording ? onStop : onStart}
        disabled={disabled}
        aria-label={isRecording ? "Dừng thu âm" : "Bắt đầu thu âm"}
        sx={{
          width: px,
          height: px,
          background: isRecording ? "var(--app-danger)" : "var(--app-primary)",
          color: "#fff",
          transition: "all 200ms ease",
          "&:hover": {
            background: isRecording ? "var(--app-danger)" : "var(--app-primary-hover)",
            transform: "scale(1.06)",
          },
          "&.Mui-disabled": {
            background: "var(--app-border)",
            color: "var(--app-muted)",
          },
        }}
      >
        {isRecording ? (
          <StopIcon sx={{ fontSize: px * 0.4 }} />
        ) : (
          <MicIcon sx={{ fontSize: px * 0.4 }} />
        )}
      </IconButton>
    </div>
  );
}
