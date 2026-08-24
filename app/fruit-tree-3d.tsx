"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { FRUIT_META } from "./fruit-tree-data";
import type { FruitKind } from "./fruit-tree-data";

const TREE_IMAGE = "/brand/fruit-tree-cinematic-dense-v2.webp";
const TREE_SIZE = 1254;

const FRUIT_HOTSPOTS = [
  { kind: "mango", cx: 490, cy: 220, radius: 142, depth: 56 },
  { kind: "passion", cx: 750, cy: 181, radius: 128, depth: 68 },
  { kind: "raspberry", cx: 1035, cy: 361, radius: 134, depth: 58 },
  { kind: "orange", cx: 272, cy: 485, radius: 150, depth: 46 },
  { kind: "blueberry", cx: 583, cy: 488, radius: 108, depth: 72 },
  { kind: "pineapple", cx: 782, cy: 524, radius: 170, depth: 78 },
  { kind: "lime", cx: 263, cy: 734, radius: 125, depth: 62 },
  { kind: "strawberry", cx: 1004, cy: 681, radius: 142, depth: 70 },
] as const satisfies ReadonlyArray<{
  kind: FruitKind;
  cx: number;
  cy: number;
  radius: number;
  depth: number;
}>;

type HotspotStyle = CSSProperties & {
  "--fruit-x": string;
  "--fruit-y": string;
  "--fruit-size": string;
  "--fruit-z": string;
  "--fruit-bg-size": string;
  "--fruit-bg-x": string;
  "--fruit-bg-y": string;
};

function createHotspotStyle(cx: number, cy: number, radius: number, depth: number): HotspotStyle {
  const cropSize = radius * 2;
  const backgroundPositionX = (cx - radius) / (TREE_SIZE - cropSize) * 100;
  const backgroundPositionY = (cy - radius) / (TREE_SIZE - cropSize) * 100;

  return {
    "--fruit-x": `${cx / TREE_SIZE * 100}%`,
    "--fruit-y": `${cy / TREE_SIZE * 100}%`,
    "--fruit-size": `${cropSize / TREE_SIZE * 100}%`,
    "--fruit-z": `${depth}px`,
    "--fruit-bg-size": `${TREE_SIZE / cropSize * 100}%`,
    "--fruit-bg-x": `${backgroundPositionX}%`,
    "--fruit-bg-y": `${backgroundPositionY}%`,
  };
}

export default function FruitTree3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const reducedMotionRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [activeKind, setActiveKind] = useState<FruitKind | null>(null);
  const [selectedKind, setSelectedKind] = useState<FruitKind | null>(null);

  const resetTreePosition = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--tree-rx", "0deg");
    stage.style.setProperty("--tree-ry", "0deg");
    stage.style.setProperty("--tree-glow-x", "54%");
    stage.style.setProperty("--tree-glow-y", "43%");
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      reducedMotionRef.current = preference.matches;
      if (preference.matches) resetTreePosition();
    };

    syncPreference();
    preference.addEventListener?.("change", syncPreference);
    return () => preference.removeEventListener?.("change", syncPreference);
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete || image.naturalWidth <= 0) return;

    void image.decode()
      .catch(() => undefined)
      .finally(() => setIsReady(true));
  }, []);

  const updateTipPosition = (cx: number, cy: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--fruit-tip-x", `${cx / TREE_SIZE * 100}%`);
    stage.style.setProperty("--fruit-tip-y", `${cy / TREE_SIZE * 100}%`);
  };

  const activateFruit = (kind: FruitKind, cx: number, cy: number) => {
    updateTipPosition(cx, cy);
    setActiveKind(kind);
  };

  const selectFruit = (kind: FruitKind, cx: number, cy: number) => {
    const isSameFruit = selectedKind === kind;
    setSelectedKind(isSameFruit ? null : kind);
    setActiveKind(isSameFruit ? null : kind);
    updateTipPosition(cx, cy);

    if (!reducedMotionRef.current && !isSameFruit) {
      const stage = stageRef.current;
      const normalizedX = cx / TREE_SIZE - 0.5;
      const normalizedY = cy / TREE_SIZE - 0.5;
      stage?.style.setProperty("--tree-ry", `${normalizedX * 8}deg`);
      stage?.style.setProperty("--tree-rx", `${normalizedY * -5}deg`);
    } else if (isSameFruit) {
      resetTreePosition();
    }
  };

  const resetFocus = () => {
    setSelectedKind(null);
    setActiveKind(null);
    resetTreePosition();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current || event.pointerType !== "mouse" || selectedKind) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const normalizedY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    const x = normalizedX - 0.5;
    const y = normalizedY - 0.5;

    event.currentTarget.style.setProperty("--tree-ry", `${x * 12}deg`);
    event.currentTarget.style.setProperty("--tree-rx", `${y * -8}deg`);
    event.currentTarget.style.setProperty("--tree-glow-x", `${normalizedX * 100}%`);
    event.currentTarget.style.setProperty("--tree-glow-y", `${normalizedY * 100}%`);
  };

  const activeMeta = activeKind ? FRUIT_META[activeKind] : null;
  const stageStyle = activeMeta
    ? ({ "--fruit-accent": activeMeta.accent } as CSSProperties)
    : undefined;

  return (
    <div
      ref={stageRef}
      className={`fruit-tree-stage is-25d ${isReady ? "is-ready" : "is-loading"} ${selectedKind ? "has-fruit-focus" : ""}`}
      style={stageStyle}
      role="group"
      aria-label="Интерактивное 2.5D-дерево Fresh Harvest. Наведите курсор, сфокусируйте или нажмите на плод, чтобы узнать о нём больше."
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        if (!selectedKind) {
          setActiveKind(null);
          resetTreePosition();
        }
      }}
    >
      <div className="fruit-tree-drift">
        <div className="fruit-tree-art">
          <div className="fruit-tree-depth-shadow" aria-hidden="true" />
          <img
            ref={imageRef}
            className="fruit-tree-image"
            src={TREE_IMAGE}
            alt="Дерево Fresh Harvest с манго, маракуйей, малиной, апельсинами, черникой, ананасом, лаймом и клубникой"
            width="1254"
            height="1254"
            fetchPriority="high"
            decoding="async"
            onLoad={(event) => {
              void event.currentTarget.decode()
                .catch(() => undefined)
                .finally(() => setIsReady(true));
            }}
          />

          <div className="tree-fruit-controls" aria-label="Плоды на дереве">
            {FRUIT_HOTSPOTS.map(({ kind, cx, cy, radius, depth }) => {
              const meta = FRUIT_META[kind];
              const isActive = activeKind === kind;
              const isSelected = selectedKind === kind;

              return (
                <button
                  className={`tree-fruit-hotspot ${isActive ? "is-active" : ""} ${isSelected ? "is-selected" : ""}`}
                  style={createHotspotStyle(cx, cy, radius, depth)}
                  type="button"
                  key={kind}
                  aria-label={`${meta.name}: ${meta.note}`}
                  aria-pressed={isSelected}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") activateFruit(kind, cx, cy);
                  }}
                  onPointerLeave={() => setActiveKind(selectedKind)}
                  onFocus={() => activateFruit(kind, cx, cy)}
                  onBlur={() => setActiveKind(selectedKind)}
                  onClick={() => selectFruit(kind, cx, cy)}
                >
                  <span className="tree-fruit-visual" aria-hidden="true" />
                  <span className="tree-fruit-pulse" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fruit-tree-vignette" aria-hidden="true" />
      <div className="fruit-tree-orbits" aria-hidden="true"><i /><i /><i /></div>

      <div className="tree-render-badge" aria-hidden="true">
        <i>2.5D</i><span>8 интерактивных плодов</span>
      </div>

      <div className={`fruit-hover-tip ${activeMeta ? "is-visible" : ""}`} aria-hidden="true">
        <i />{activeMeta?.name}
      </div>

      <div className={`fruit-focus-card ${activeMeta ? "is-visible" : ""}`} aria-live="polite">
        <span>{selectedKind ? "Выбранный плод · зафиксирован" : "Коллекция Fresh Harvest"}</span>
        <strong>{activeMeta?.name}</strong>
        <small>{activeMeta?.note}</small>
      </div>

      {selectedKind ? (
        <button className="fruit-focus-reset" type="button" onClick={resetFocus}>
          Всё дерево <span aria-hidden="true">↗</span>
        </button>
      ) : null}

      <div className="fruit-tree-loading" aria-hidden="true">
        <span>Загружаем дерево</span><i />
      </div>
    </div>
  );
}
