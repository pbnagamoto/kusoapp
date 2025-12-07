"use client";

import { FormEvent, useMemo, useRef, useState, useEffect } from "react";
import styles from "@/styles/game/HeaderLogin.module.css";

type Stage = "form" | "blocked";

const BLOCK_LINES = ["ログインなんか", "できるわけないだろ"];

export function HeaderLogin() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasAnyInput = useMemo(
    () => email.trim().length > 0 || password.trim().length > 0,
    [email, password]
  );

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((v) => !v);
    if (!open) {
      setStage("form");
      setEmail("");
      setPassword("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hasAnyInput) return;
    setStage("blocked");
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.button}
        onClick={handleToggle}
      >
        Sign in
      </button>

      {open && (
        <div className={styles.popover}>
          {stage === "form" ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formTitle}>Sign in</div>

              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className={styles.submit}
                disabled={!hasAnyInput}
              >
                Continue
              </button>
            </form>
          ) : (
            <div className={styles.blocked}>
              {BLOCK_LINES.map((line, i) => (
                <div key={i} className={styles.blockedLine}>
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
