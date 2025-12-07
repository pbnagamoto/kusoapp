"use client";

import Image from "next/image";
import styles from "@/styles/game/MisleadingChoiceAd.module.css";

type Props = {
  onSkip: () => void;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const DEFAULT_HREF = "https://academy.jasrac.or.jp/";

export function MisleadingChoiceAd({
  onSkip,
  href = DEFAULT_HREF,
  imageSrc = "/ads/mislead.png",
  imageAlt = "ad",
}: Props) {
  const isExternal = href.startsWith("http");

  return (
    <div className={styles.card} role="dialog" aria-label="Ad">
      <div className={styles.header}>
        <span className={styles.badge}>Sponsored</span>
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

        <div className={styles.buttonRow}>
          <button
            type="button"
            className={styles.skipButton}
            onClick={onSkip}
            aria-label="Skip ad"
          >
            SKIP
          </button>

          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={styles.continueButton}
          >
            CONTINUE
          </a>

        </div>
      </div>
    </div>
  );
}
