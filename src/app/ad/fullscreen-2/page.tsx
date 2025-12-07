"use client";

import { useCallback, useRef, useState } from "react";
import styles from "./FullscreenTrap.module.css";
import Link from "next/link";

export default function Fullscreen2Page() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [failed, setFailed] = useState(false);

  const enter = useCallback(async () => {
    const el = rootRef.current ?? document.documentElement;

    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      }
      setEntered(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, []);

  return (
    <main
      ref={rootRef}
      className={styles.root}
    >
      <div className={styles.panel}>
        <h1 className={styles.headline}>
          いきなり全画面モードになるサポート詐欺の
          <br />
          真似をして脅かしたかったんですけど
          <br />
          技術不足で諦めました^^
        </h1>

        <p className={styles.copy}>
          間に1枚画面を挟まないと遷移後即全画面ってできなそうですけど
          <br />
          ガチの詐欺サイトはどうやって実装してるんでしょうね？
          <br />
          <br />
          なんも起きないのでこのタブは閉じちゃってください～
        </p>

        <div className={styles.hintBox}>
          <div className={styles.hintTitle}>ちなみに全画面モードで詰んだら</div>
          <div className={styles.hintText}>
            <span className={styles.key}>Esc</span> を押すと解除できます
            <br />
          </div>
        </div>

      </div>
    </main>
  );
}
