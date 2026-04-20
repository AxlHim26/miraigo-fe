"use client";

import Paper from "@mui/material/Paper";
import * as React from "react";

import {
  defaultKanjiRoadmapLevelId,
  type KanjiRoadmapLevel,
  kanjiRoadmapLevels,
  type OrbitPlacement,
  type RoadmapNodeLayout,
  roadmapNodeLayout,
} from "@/features/kanji/data/kanji-roadmap";
import { cn } from "@/shared/utils/cn";

const ORBIT_SPAN = 220;
const ORBIT_RADIUS_X = 112;
const ORBIT_RADIUS_Y = 90;

type DayState = "complete" | "current" | "upcoming";
type RoadmapNode = KanjiRoadmapLevel["days"][number] & RoadmapNodeLayout;

const orbitAngleCenter: Record<OrbitPlacement, number> = {
  top: 270,
  right: 0,
  bottom: 90,
  left: 180,
};

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const value = Number.parseInt(expanded, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `${r}, ${g}, ${b}`;
};

const withAlpha = (hex: string, alpha: number) => `rgba(${hexToRgb(hex)}, ${alpha})`;

const getDayState = (day: number, currentDay: number): DayState => {
  if (day < currentDay) return "complete";
  if (day === currentDay) return "current";
  return "upcoming";
};

const buildConnectorPath = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  index: number,
) => {
  const horizontalOffset = index % 2 === 0 ? -14 : 14;
  const controlX = (start.x + end.x) / 2 + horizontalOffset;
  const controlY = (start.y + end.y) / 2 - 4;

  return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
};

const getOrbitOffset = (index: number, total: number, placement: OrbitPlacement) => {
  const center = orbitAngleCenter[placement];
  const startAngle = center - ORBIT_SPAN / 2;
  const step = total > 1 ? ORBIT_SPAN / (total - 1) : 0;
  const angle = ((startAngle + step * index) * Math.PI) / 180;

  return {
    x: Math.cos(angle) * ORBIT_RADIUS_X,
    y: Math.sin(angle) * ORBIT_RADIUS_Y,
  };
};

const buildOrbitArcPath = (placement: OrbitPlacement) => {
  const center = orbitAngleCenter[placement];
  const startAngle = ((center - ORBIT_SPAN / 2) * Math.PI) / 180;
  const endAngle = ((center + ORBIT_SPAN / 2) * Math.PI) / 180;
  const cx = 140;
  const cy = 130;
  const radiusX = ORBIT_RADIUS_X + 16;
  const radiusY = ORBIT_RADIUS_Y + 16;
  const startX = cx + Math.cos(startAngle) * radiusX;
  const startY = cy + Math.sin(startAngle) * radiusY;
  const endX = cx + Math.cos(endAngle) * radiusX;
  const endY = cy + Math.sin(endAngle) * radiusY;

  return `M ${startX} ${startY} A ${radiusX} ${radiusY} 0 1 1 ${endX} ${endY}`;
};

const getNodeStyles = (state: DayState, level: KanjiRoadmapLevel, isHovered: boolean) => {
  if (state === "complete") {
    return {
      background: `linear-gradient(135deg, ${level.palette.solid}, ${withAlpha(level.palette.solid, 0.78)})`,
      borderColor: withAlpha(level.palette.solid, 0.24),
      color: "#ffffff",
      boxShadow: isHovered
        ? `0 28px 60px -30px ${withAlpha(level.palette.solid, 0.72)}`
        : `0 22px 46px -34px ${withAlpha(level.palette.solid, 0.6)}`,
    };
  }

  if (state === "current") {
    return {
      background: `linear-gradient(135deg, #ffffff, ${level.palette.soft})`,
      borderColor: withAlpha(level.palette.solid, 0.22),
      color: level.palette.solid,
      boxShadow: isHovered
        ? `0 30px 70px -34px ${withAlpha(level.palette.solid, 0.72)}`
        : `0 24px 60px -36px ${withAlpha(level.palette.solid, 0.56)}`,
    };
  }

  return {
    background: "rgba(255,255,255,0.92)",
    borderColor: "rgba(148,163,184,0.28)",
    color: "#64748b",
    boxShadow: isHovered
      ? `0 20px 50px -36px ${withAlpha(level.palette.solid, 0.45)}`
      : "0 20px 44px -38px rgba(15,23,42,0.6)",
  };
};

export default function KanjiRoadmapView() {
  const [activeLevelId, setActiveLevelId] = React.useState(defaultKanjiRoadmapLevelId);
  const [hoveredDayId, setHoveredDayId] = React.useState<string | null>(null);
  const fallbackLevel = kanjiRoadmapLevels[0];

  const activeLevel = React.useMemo(
    () => kanjiRoadmapLevels.find((level) => level.id === activeLevelId) ?? fallbackLevel,
    [activeLevelId, fallbackLevel],
  );

  const nodes = React.useMemo<RoadmapNode[]>(
    () =>
      activeLevel.days.flatMap((day, index) => {
        const layout = roadmapNodeLayout[index];

        return layout
          ? [
              {
                ...day,
                ...layout,
              },
            ]
          : [];
      }),
    [activeLevel],
  );

  const connectorSegments = React.useMemo(
    () =>
      nodes.flatMap((node, index) => {
        if (index === 0) {
          return [];
        }

        const previousNode = nodes[index - 1];

        return previousNode ? [{ previousNode, node, index: index - 1 }] : [];
      }),
    [nodes],
  );

  React.useEffect(() => {
    setHoveredDayId(null);
  }, [activeLevelId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <Paper
        elevation={0}
        className="rounded-[32px] border border-[var(--app-border)] bg-[linear-gradient(180deg,rgba(250,252,255,0.96),rgba(243,247,255,0.98))] p-5 shadow-[0_26px_60px_-42px_rgba(15,23,42,0.5)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(17,24,39,0.98))] sm:p-6"
      >
        <div className="space-y-3">
          {kanjiRoadmapLevels.map((level) => {
            const isActive = level.id === activeLevel.id;

            return (
              <button
                key={level.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveLevelId(level.id)}
                className={cn(
                  "w-full rounded-[28px] border p-4 text-left transition duration-300 sm:p-5",
                  isActive
                    ? "translate-x-1"
                    : "hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white/90 dark:hover:border-slate-700 dark:hover:bg-slate-900/70",
                )}
                style={{
                  borderColor: isActive
                    ? withAlpha(level.palette.solid, 0.18)
                    : "rgba(148,163,184,0.18)",
                  background: isActive
                    ? `linear-gradient(135deg, rgba(255,255,255,0.98), ${level.palette.soft})`
                    : "rgba(255,255,255,0.72)",
                  boxShadow: isActive
                    ? `0 26px 55px -38px ${withAlpha(level.palette.solid, 0.62)}`
                    : "0 18px 42px -38px rgba(15,23,42,0.48)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-3">
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      Hán Tự {level.level}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: level.palette.solid }}
                      />
                      <span
                        className="h-1.5 w-12 rounded-full"
                        style={{ backgroundColor: withAlpha(level.palette.solid, 0.3) }}
                      />
                      <span className="h-1.5 w-7 rounded-full bg-slate-200/90 dark:bg-slate-700/90" />
                    </div>
                  </div>

                  <div
                    className="rounded-[24px] px-4 py-3 text-right"
                    style={{
                      backgroundColor: withAlpha(level.palette.solid, isActive ? 0.12 : 0.08),
                    }}
                  >
                    <div
                      className="text-2xl font-black"
                      style={{ color: isActive ? level.palette.solid : "#334155" }}
                    >
                      {level.progress}%
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Done
                    </div>
                  </div>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800/80">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${level.progress}%`,
                      background: `linear-gradient(90deg, ${level.palette.solid}, ${withAlpha(level.palette.solid, 0.72)})`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </Paper>

      <Paper
        elevation={0}
        className="overflow-hidden rounded-[36px] border border-[var(--app-border)] bg-white shadow-[0_30px_70px_-44px_rgba(15,23,42,0.55)]"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.98), ${activeLevel.palette.shell})`,
        }}
      >
        <div
          className="relative h-[620px] overflow-hidden px-4 py-6 sm:h-[700px] sm:px-6 sm:py-8 lg:h-[760px] lg:px-8"
          onMouseLeave={() => setHoveredDayId(null)}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 14% 18%, ${withAlpha(activeLevel.palette.solid, 0.12)}, transparent 28%),
                radial-gradient(circle at 84% 14%, rgba(255,255,255,0.98), transparent 25%),
                radial-gradient(circle at 68% 78%, ${withAlpha(activeLevel.palette.solid, 0.08)}, transparent 34%)
              `,
            }}
          />

          <div className="bg-white/34 pointer-events-none absolute inset-[22px] rounded-[32px] border border-white/70 backdrop-blur-[2px]" />

          <svg
            className="pointer-events-none absolute inset-[22px] h-[calc(100%-44px)] w-[calc(100%-44px)]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {connectorSegments.map(({ previousNode, node, index }) => {
              const segmentState =
                node.day < activeLevel.currentDay
                  ? "complete"
                  : node.day === activeLevel.currentDay
                    ? "current"
                    : "upcoming";

              return (
                <path
                  key={`${previousNode.id}-${node.id}`}
                  d={buildConnectorPath(previousNode, node, index)}
                  fill="none"
                  stroke={
                    segmentState === "complete"
                      ? withAlpha(activeLevel.palette.solid, 0.72)
                      : segmentState === "current"
                        ? withAlpha(activeLevel.palette.solid, 0.54)
                        : "rgba(148,163,184,0.4)"
                  }
                  strokeWidth={1.3}
                  strokeDasharray={segmentState === "upcoming" ? "5 9" : "6 7"}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const state = getDayState(node.day, activeLevel.currentDay);
            const isHovered = hoveredDayId === node.id;
            const nodeStyle = getNodeStyles(state, activeLevel, isHovered);

            return (
              <div
                key={node.id}
                className="absolute z-10"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-1/2 hidden h-[260px] w-[280px] -translate-x-1/2 -translate-y-1/2 sm:block",
                    isHovered ? "opacity-100" : "opacity-0",
                  )}
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 280 260"
                    aria-hidden="true"
                  >
                    <path
                      d={buildOrbitArcPath(node.orbitPlacement)}
                      fill="none"
                      stroke={withAlpha(activeLevel.palette.line, 0.76)}
                      strokeWidth={2.2}
                      strokeDasharray="7 10"
                      strokeLinecap="round"
                    />
                  </svg>

                  {node.kanji.map((kanji, index) => {
                    const orbit = getOrbitOffset(index, node.kanji.length, node.orbitPlacement);

                    return (
                      <div
                        key={`${node.id}-${kanji}-${index}`}
                        className={cn(
                          "absolute flex h-10 w-10 items-center justify-center rounded-full border text-base font-semibold text-slate-900 shadow-[0_20px_35px_-28px_rgba(15,23,42,0.9)] transition duration-300 sm:h-11 sm:w-11 sm:text-lg",
                          isHovered ? "scale-100 opacity-100" : "scale-75 opacity-0",
                        )}
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(-50% + ${orbit.x}px), calc(-50% + ${orbit.y}px))`,
                          transitionDelay: isHovered ? `${index * 18}ms` : "0ms",
                          backgroundColor: "rgba(255,255,255,0.96)",
                          borderColor: withAlpha(activeLevel.palette.solid, 0.15),
                        }}
                      >
                        {kanji}
                      </div>
                    );
                  })}
                </div>

                {state === "current" ? (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[28px]"
                    style={{
                      transform: "scale(1.28)",
                      backgroundColor: withAlpha(activeLevel.palette.solid, 0.12),
                      boxShadow: `0 0 0 14px ${withAlpha(activeLevel.palette.solid, 0.07)}`,
                    }}
                  />
                ) : null}

                <button
                  type="button"
                  aria-label={`Ngày ${node.day} - ${node.focus}`}
                  onMouseEnter={() => setHoveredDayId(node.id)}
                  onMouseLeave={() =>
                    setHoveredDayId((current) => (current === node.id ? null : current))
                  }
                  onFocus={() => setHoveredDayId(node.id)}
                  onBlur={() =>
                    setHoveredDayId((current) => (current === node.id ? null : current))
                  }
                  onClick={() =>
                    setHoveredDayId((current) => (current === node.id ? null : node.id))
                  }
                  className={cn(
                    "relative flex h-[64px] w-[64px] items-center justify-center rounded-[24px] border text-lg font-black transition duration-300 sm:h-[72px] sm:w-[72px] sm:text-xl",
                    isHovered || state === "current" ? "scale-110" : "scale-100",
                  )}
                  style={nodeStyle}
                >
                  <span>{node.day}</span>
                  {state !== "upcoming" ? (
                    <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-white/90" />
                  ) : null}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 px-4 pb-4 pt-3 sm:px-6 sm:pb-6 lg:px-8">
          <div className="bg-white/92 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.8)]">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: activeLevel.palette.solid }}
            />
            Đã đi qua
          </div>
          <div className="bg-white/92 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.8)]">
            <span
              className="h-2.5 w-2.5 rounded-full border-2"
              style={{ borderColor: activeLevel.palette.solid }}
            />
            Đang học
          </div>
          <div className="bg-white/92 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.8)]">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            Sắp tới
          </div>
        </div>
      </Paper>
    </div>
  );
}
