"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/game/EscapingButtonAd.module.css";

type Props = {
  onClose: () => void;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  maxEscapes?: number;
};

const DEFAULT_HREF = "https://www.accsjp.or.jp/";
const DEFAULT_MAX_ESCAPES = 4;

type Pos = { left: number; top: number };

export function EscapingButtonAd({
  onClose,
  href = DEFAULT_HREF,
  imageSrc = "/ads/escape.png",
  imageAlt = "ad",
  maxEscapes = DEFAULT_MAX_ESCAPES,
}: Props) {
  const isExternal = href.startsWith("http");
  const frameRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [pos, setPos] = useState<Pos | null>(null);
  const [escapes, setEscapes] = useState(0);

  const canEscape = escapes < maxEscapes;

  const moveButton = () => {
    const frame = frameRef.current;
    const btn = btnRef.current;
    if (!frame || !btn) return;
    if (!canEscape) return;

    const frameRect = frame.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxLeft = Math.max(0, frameRect.width - btnRect.width);
    const maxTop = Math.max(0, frameRect.height - btnRect.height);

    const left = Math.round(Math.random() * maxLeft);
    const top = Math.round(Math.random() * maxTop);

    setPos({ left, top });
    setEscapes((v) => v + 1);
  };

  useEffect(() => {
    const frame = frameRef.current;
    const btn = btnRef.current;
    if (!frame || !btn) return;

    const frameRect = frame.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const left = Math.max(0, Math.round(frameRect.width - btnRect.width - 8));
    const top = Math.max(0, Math.round(frameRect.height - btnRect.height - 8));

    setPos({ left, top });
  }, []);

  const hint = useMemo(() => {
    if (!canEscape) return "Now you can close it.";
    if (escapes === 0) return "Try closing it.";
    if (escapes === 1) return "It moved.";
    if (escapes === 2) return "Still moving.";
    return "Almost done.";
  }, [canEscape, escapes]);

  return (
    <div className={styles.card} role="dialog" aria-label="Ad">
      <div className={styles.header}>
        <span className={styles.badge}>Sponsored</span>
      </div>

      <div className={styles.body}>
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={styles.mediaLink}
        >
          <div className={styles.media}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="360px"
              className={styles.mediaImg}
              priority
            />
          </div>
        </a>

        <div className={styles.subRow}>
          <span className={styles.subText}>{hint}</span>
          <span className={styles.subCounter}>
            {Math.min(escapes, maxEscapes)}/{maxEscapes}
          </span>
        </div>

        <div ref={frameRef} className={styles.escapeFrame}>
          <button
            ref={btnRef}
            type="button"
            className={`${styles.closeButton} ${!canEscape ? styles.closeReady : ""}`}
            style={pos ? { left: pos.left, top: pos.top } : undefined}
            onMouseEnter={moveButton}
            onPointerEnter={moveButton}
            onClick={() => {
              if (canEscape) {
                moveButton();
                return;
              }
              onClose();
            }}
            aria-label="Close ad"
            title="Close ad"
          >
            Close ad
          </button>
        </div>
      </div>
    </div>
  );
}
