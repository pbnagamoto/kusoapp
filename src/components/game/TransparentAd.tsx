"use client";

import Image from "next/image";
import styles from "@/styles/game/TransparentAd.module.css";

type Props = {
  onClose: () => void;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  openInNewTab?: boolean;
};

const DEFAULT_HREF = "https://www.cric.or.jp/";

export function TransparentAd({
  onClose,
  href = DEFAULT_HREF,
  imageSrc = "/ads/transparent.png",
  imageAlt = "ad",
  openInNewTab = false,
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();

    if (openInNewTab) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = href;
  };

  return (
    <a
      href={href}
      className={styles.card}
      onClick={handleClick}
      aria-label="Transparent ad"
    >
      <span className={styles.media}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="420px"
          className={styles.mediaImg}
          priority
        />
      </span>
    </a>
  );
}
