"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/game/HeaderSearch.module.css";

const LINES = ["検索なんか", "できるわけ", "ないだろ"];

export function HeaderSearch() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const hasText = useMemo(() => value.trim().length > 0, [value]);

  useEffect(() => {
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
  }, []);

  const handleChange = (v: string) => {
    setValue(v);
    setOpen(v.trim().length > 0);
  };

  const handleFocus = () => {
    if (hasText) setOpen(true);
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <input
        className={styles.input}
        placeholder="everything everywhere all at once"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
      />

      {open && hasText && (
        <div className={styles.suggest}>
          {LINES.map((line, i) => (
            <div key={i} className={styles.suggestLine}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
