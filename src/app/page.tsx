"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/intro/IntroPage.module.css";

const TITLE_VERB = "PLAY";

const SLIDES = [
  {
    caption: "#1",
    headline: "あなたはある動画サイトにいる",
    lines: ["その目的はただ1つ", "動画を再生すること"],
  },
  {
    caption: "#2",
    headline: "立ちはだかるのは広告だけ",
    lines: ["悪質広告を乗り越え", "再生アイコンを押せ",]
  },
  {
    caption: "#3",
    headline: "すべてがジョークだ",
    lines: ["おおらかな心で見て", "最後まで楽しんでくれ"],
  },
];

const AUTO_MS = 5000;

export default function HomePage() {
  const title = useMemo(() => `TUTORIAL`, []);

  const router = useRouter();
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleNext = () => {
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setIndex((v) => (v + 1) % SLIDES.length);
    }, AUTO_MS);
  };

  const goNext = () => {
    setIndex((v) => (v + 1) % SLIDES.length);
  };

  const startGame = () => {
    router.push("/game");
  };

  useEffect(() => {
    scheduleNext();
    return clearTimer;
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        goNext();
      }
      if (e.key.toLowerCase() === "s") {
        startGame();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const slide = SLIDES[index];

  return (
    <main className={styles.root} onClick={goNext}>
      <div className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.brandBadge}>Poron</span>
          <span className={styles.brandMain}>Hub</span>
        </div>
        <div className={styles.topHint}>LOADING...</div>
      </div>

      <div className={styles.stageWrap}>
        <div className={styles.stageFrame}>
          <div className={styles.stageHeader}>
            <div className={styles.stageTitle}></div>
            <div className={styles.stageMeta}>
            </div>
          </div>

          <div className={styles.stageScreen}>
            <div className={styles.scanlines} />
            <div className={styles.vignette} />

            <div className={styles.gameTitle}>{title}</div>

            <div className={styles.slideBox}>
              <div className={styles.caption}>{slide.caption}</div>
              <div className={styles.headline}>{slide.headline}</div>
              <div className={styles.lines}>
                {slide.lines.map((t, i) => (
                  <div key={i} className={styles.line}>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.progress}>
              {SLIDES.map((_, i) => (
                <span
                  key={i}
                  className={[
                    styles.bar,
                    i === index ? styles.barOn : "",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className={styles.ctaRow}>
              <div className={styles.ctaButtons}>
                <button
                  type="button"
                  className={styles.ctaButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                >
                  NEXT
                </button>

                <button
                  type="button"
                  className={styles.ctaButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    startGame();
                  }}
                >
                  START
                </button>
              </div>

              <div className={styles.ctaBlink}>CLICK TO STRAT</div>
            </div>
          </div>

          <div className={styles.stageFooter}>
            <div className={styles.footerLeft}>
              <span className={styles.footerDot} />
              <span>Buf 99%</span>
            </div>
            <div className={styles.footerRight}>
              <span className={styles.footerButton}></span>
              <span className={styles.footerButton}></span>
              <span className={styles.footerButton}></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
