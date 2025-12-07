"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "@/styles/game/VideoPlayerShell.module.css";

type Props = {
  ad?: ReactNode;
  remainingAds?: number;

  canPlay?: boolean;
  onPlay?: () => void;

  isLoading?: boolean;

  titleText?: string;
  watermarkText?: string;
};

export function VideoPlayerShell({
  ad,
  remainingAds,

  canPlay,
  onPlay,

  isLoading = false,

  titleText = "Puff-Puff in Battleground",
  watermarkText = "PoronHub",
}: Props) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (typeof remainingAds !== "number") return;
    setPulse(true);
    const t = window.setTimeout(() => setPulse(false), 220);
    return () => window.clearTimeout(t);
  }, [remainingAds]);

  const isZero = typeof remainingAds === "number" && remainingAds <= 0;

  const derivedCanPlay = useMemo(() => {
    if (typeof canPlay === "boolean") return canPlay;
    if (typeof remainingAds === "number") return remainingAds <= 0;
    return false;
  }, [canPlay, remainingAds]);

  const handlePlay = () => {
    if (!derivedCanPlay) return;
    if (isLoading) return;
    onPlay?.();
  };

  return (
    <div className={styles.playerCard}>
      <div className={styles.playerHeader}>
        <div>
          <div className={styles.title}>{titleText}</div>
        </div>

        {typeof remainingAds === "number" && (
          <div
            className={[
              styles.adsHud,
              pulse ? styles.adsHudPulse : "",
              isZero ? styles.adsHudFinal : "",
            ].join(" ")}
            aria-live="polite"
          >
            <span className={styles.adsHudLabel}>Ads left</span>
            <span
              className={[
                styles.adsHudNum,
                pulse ? styles.adsHudNumPulse : "",
              ].join(" ")}
            >
              {remainingAds}
            </span>
          </div>
        )}
      </div>

      <div className={styles.playerArea}>
        <div className={styles.thumbnailLayer}>
          <div className={styles.thumbnailText} />
          <div className={styles.fakeWatermark}>{watermarkText}</div>
        </div>

        <button
          type="button"
          className={[
            styles.mainPlayButton,
            derivedCanPlay ? styles.mainPlayReady : styles.mainPlayLocked,
          ].join(" ")}
          aria-label="Play"
          disabled={!derivedCanPlay || isLoading}
          onClick={handlePlay}
          title={derivedCanPlay ? "Play" : "Ads remaining"}
        >
          <span className={styles.mainPlayIcon} />
        </button>

        <div className={styles.controlsBar}>
          <div className={styles.timeText}>00:00</div>

          <div className={styles.seekWrap}>
            <div className={styles.seekTrack}>
              <div className={styles.seekFill} style={{ width: "8%" }} />
              <div className={styles.seekThumb} style={{ left: "8%" }} />
            </div>
          </div>

          <div className={styles.timeText}>09:99</div>

          <div className={styles.controlsRight}>
            <span className={styles.volIcon} />
            <div className={styles.volTrack}>
              <div className={styles.volFill} style={{ width: "40%" }} />
            </div>

            <button type="button" className={styles.ctrlButton} aria-label="Settings">
              <span className={styles.iconGear} />
            </button>

            <button type="button" className={styles.ctrlButton} aria-label="Fullscreen">
              <span className={styles.iconFull} />
            </button>
          </div>
        </div>

        {ad && <div className={styles.adSlot}>{ad}</div>}

        {isLoading && (
          <div className={styles.loadingOverlay} role="status" aria-live="polite">
            <span className={styles.spinner} />
            <span className={styles.loadingText}>Loading video...</span>
          </div>
        )}
      </div>
    </div>
  );
}
