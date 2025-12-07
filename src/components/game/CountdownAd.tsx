"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "@/styles/game/CountdownAd.module.css";

type Props = {
  onClose: () => void;
  seconds?: number;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const DEFAULT_SECONDS = 20;

export function CountdownAd({
  onClose,
  seconds = DEFAULT_SECONDS,
  href,
  imageSrc = "/ads/countdown.png",
  imageAlt = "ad",
}: Props) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    setLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (left <= 0) return;
    const t = window.setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => window.clearTimeout(t);
  }, [left]);

  const isExternal = !!href && href.startsWith("http");

  const progress = useMemo(() => {
    const done = Math.max(0, seconds - left);
    return Math.min(100, Math.round((done / seconds) * 100));
  }, [left, seconds]);

  return (
    <div className={styles.card} role="dialog" aria-label="Ad">
      <div className={styles.header}>
        <span className={styles.badge}>Sponsored</span>
        <span className={styles.title}></span>
      </div>

      <div className={styles.body}>
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

        <div className={styles.headline}>
          Wanna know more?
          <span className={styles.timer}>{left}s</span>
        </div>

        {href ? (
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={styles.cta}
          >
            Show me
          </a>
        ) : (
          <div className={styles.ctaGhost}>
            Show me
          </div>
        )}

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          className={left > 0 ? styles.closeDisabled : styles.closeEnabled}
          onClick={left > 0 ? undefined : onClose}
          aria-disabled={left > 0}
        >
          Close ad
        </button>
      </div>
    </div>
  );
}
