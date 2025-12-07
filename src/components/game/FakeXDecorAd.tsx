"use client";

import Image from "next/image";
import styles from "@/styles/game/FakeXDecorAd.module.css";

type Props = {
  onClose: () => void;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const DEFAULT_HREF = "https://www.bunka.go.jp/seisaku/chosakuken/seidokaisetsu/";

export function FakeXDecorAd({
  onClose,
  href = DEFAULT_HREF,
  imageSrc = "/ads/fakex.png",
  imageAlt = "ad",
}: Props) {
  const isExternal = href.startsWith("http");

  return (
    <div className={styles.card} role="dialog" aria-label="Ad">
      <div className={styles.header}>
        <span className={styles.badge}>Sponsored</span>
      </div>

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
            sizes="320px"
            className={styles.mediaImg}
            priority
          />
          <span className={styles.fakeX} aria-hidden>
            ×
          </span>
        </div>
      </a>

      <button
        type="button"
        className={styles.realClose}
        onClick={onClose}
        aria-label="Close ad"
        title="Close ad"
      >
        Close ad
      </button>
    </div>
  );
}
