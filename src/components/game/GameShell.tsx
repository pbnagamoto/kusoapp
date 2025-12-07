import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/game/GameShell.module.css";
import { VideoPlayerShell } from "./VideoPlayerShell";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderLogin } from "./HeaderLogin";

const NAV_ITEMS = [
  "Trending",
  "New",
  "Top Rated",
  "Categories",
  "Premium",
  "Secret",
];

const RECOMMENDED = [
  {
    title: "How to Waste 5 Minutes",
    sub: "Animal Video",
    thumb: "/reco/reco-1.png",
  },
  {
    title: "Secret",
    sub: "Animal Video",
    thumb: "/reco/reco-2.png",
  },
  {
    title: "Arima-kinen my heart crying",
    sub: "Animal Video",
    thumb: "/reco/reco-3.png",
  },
  {
    title: "We love ads!",
    sub: "Animal Video",
    thumb: "/reco/reco-4.png",
  },
];

type Props = {
  children: ReactNode;
};

export function GameShell({ children }: { children?: React.ReactNode }) {
  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandLogo}>
              <span className={styles.brandTextBadge}>Poron</span>
              <span className={styles.brandTextMain}>Hub</span>
            </span>
          </div>

          <div className={styles.searchWrap}>
            <HeaderSearch />
          </div>

          <div className={styles.headerActions}>
            <span className={styles.badgeVip}>VIP</span>
            <span className={styles.badgeParody}>18+ (Playtime)</span>
            <HeaderLogin />
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLabel}>Browse</div>
          <nav className={styles.nav}>
            {NAV_ITEMS.map((label) => (
              <div key={label} className={styles.navItem}>
                {label}
              </div>
            ))}
          </nav>
        </aside>

        <section className={styles.content}>
          <div className={styles.mobileBrowse}>
            <div className={styles.mobileBrowseLabel}>Browse</div>
            <div className={styles.mobileBrowseList}>
              {NAV_ITEMS.map((label) => (
                <button
                  key={label}
                  type="button"
                  className={styles.mobileBrowseItem}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {children ?? <VideoPlayerShell />}

          <div className={styles.recoGrid}>
            {RECOMMENDED.map((item, i) => (
              <div key={i} className={styles.recoCard}>
                <div className={styles.recoThumb}>
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={styles.recoThumbImg}
                    priority={i < 2}
                  />
                </div>
                <div className={styles.recoMeta}>
                  <div className={styles.recoTitle}>{item.title}</div>
                  <div className={styles.recoSub}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.links}>
          </div>
        </section>
      </div>
    </main>
  );
}
