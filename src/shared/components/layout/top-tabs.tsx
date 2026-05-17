import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import type { TopTab } from "@/shared/types/navigation";
import { cn } from "@/shared/utils/cn";

type TopTabsProps = {
  tabs: TopTab[];
};

export default function TopTabs({ tabs }: TopTabsProps) {
  const pathname = usePathname();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const dragStateRef = React.useRef({
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
    dragging: false,
    clickBlocked: false,
  });
  const [isHovering, setIsHovering] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [scrollState, setScrollState] = React.useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const updateScrollState = React.useCallback(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    setScrollState({
      canScrollLeft: element.scrollLeft > 1,
      canScrollRight: element.scrollLeft < maxScrollLeft - 1,
    });
  }, []);

  React.useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [tabs, updateScrollState]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    const element = scrollRef.current;
    if (!element) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: element.scrollLeft,
      dragging: false,
      clickBlocked: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = scrollRef.current;
    const dragState = dragStateRef.current;
    if (!element || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    if (!dragState.dragging && Math.abs(deltaX) > 10) {
      dragState.dragging = true;
      dragState.clickBlocked = true;
      element.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }

    if (dragState.dragging) {
      event.preventDefault();
      element.scrollLeft = dragState.scrollLeft - deltaX;
      updateScrollState();
    }
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = scrollRef.current;
    const dragState = dragStateRef.current;
    if (!element || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    if (!dragState.dragging) {
      dragState.clickBlocked = false;
    }
    dragState.pointerId = -1;
    setIsDragging(false);
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.clickBlocked) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current.clickBlocked = false;
  };

  return (
    <div
      className="group relative rounded-2xl bg-[var(--app-surface-2)] p-1 shadow-inner"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={scrollRef}
        className={cn(
          "no-scrollbar flex touch-pan-x flex-nowrap gap-1 overflow-x-auto scroll-smooth",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab",
        )}
        onClickCapture={handleClickCapture}
        onPointerCancel={endDrag}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onScroll={updateScrollState}
      >
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              className={cn(
                "flex shrink-0 select-none items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition [-webkit-user-drag:none]",
                active
                  ? "bg-white text-blue-600 shadow-sm dark:border dark:border-[var(--app-active-border)] dark:bg-[var(--app-active-bg)] dark:text-[var(--app-active-fg)]"
                  : "text-[var(--app-muted)] hover:text-[var(--app-fg)]",
              )}
            >
              {tab.icon}
              {tab.label}
            </Link>
          );
        })}
      </div>
      {scrollState.canScrollLeft && (
        <div
          className={cn(
            "via-[var(--app-surface-2)]/80 pointer-events-none absolute bottom-1 left-1 top-1 w-8 rounded-l-xl bg-gradient-to-r from-[var(--app-surface-2)] to-transparent transition-opacity",
            isHovering || isDragging ? "opacity-100" : "opacity-0",
          )}
        >
          <svg
            aria-hidden="true"
            className="absolute left-1 top-1/2 h-7 w-4 -translate-y-1/2 text-cyan-500 drop-shadow-[0_0_5px_rgba(6,182,212,0.45)]"
            viewBox="0 0 12 28"
            fill="none"
          >
            <path
              d="M9 3 C3 7 2 21 9 25"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
      {scrollState.canScrollRight && (
        <div
          className={cn(
            "via-[var(--app-surface-2)]/80 pointer-events-none absolute bottom-1 right-1 top-1 w-8 rounded-r-xl bg-gradient-to-l from-[var(--app-surface-2)] to-transparent transition-opacity",
            isHovering || isDragging ? "opacity-100" : "opacity-0",
          )}
        >
          <svg
            aria-hidden="true"
            className="absolute right-1 top-1/2 h-7 w-4 -translate-y-1/2 text-cyan-500 drop-shadow-[0_0_5px_rgba(6,182,212,0.45)]"
            viewBox="0 0 12 28"
            fill="none"
          >
            <path
              d="M3 3 C9 7 10 21 3 25"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
