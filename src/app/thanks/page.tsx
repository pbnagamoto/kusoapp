import Link from "next/link";
import styles from "./Thanks.module.css";

export default function ThanksPage() {
  return (
    <main className={styles.root}>
      <section className={styles.panel}>
        <div className={styles.caption}></div>
        <h1 className={styles.headline}>Thanks for playing</h1>
        <p className={styles.copy}>
          拙い実装でしたがここまでお付き合いしていただきありがとうございました。
          <br />
          技術を磨いてもっと面白いことができたらとひたすら思う次第です。
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.buttonGhost}>
            Back to rules
          </Link>
          <Link href="/game" className={styles.buttonPrimary}>
            Play again
          </Link>
        </div>
      </section>
    </main>
  );
}
