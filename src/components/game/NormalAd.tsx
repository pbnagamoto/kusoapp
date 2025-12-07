"use client";

import Image from "next/image";
import styles from "@/styles/game/NormalAd.module.css";

type Props = {
  onClose: () => void;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const DEFAULT_HREF = "https://pf.bunka.go.jp/chosaku/tanoshiku/";

export function NormalAd({
  onClose,
  href = DEFAULT_HREF,
  imageSrc = "/ads/normal.png",
  imageAlt = "ad",
}: Props) {
  return (
    <div className={styles.card} role="dialog" aria-label="Ad">
      <div className={styles.header}>
        <div className={styles.badge}>Sponsored</div>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close ad"
        >
          ×
        </button>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
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
        </div>
      </a>
    </div>
  );
}
