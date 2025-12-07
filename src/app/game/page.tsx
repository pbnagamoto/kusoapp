"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { GameShell } from "@/components/game/GameShell";
import { VideoPlayerShell } from "@/components/game/VideoPlayerShell";

import { NormalAd } from "@/components/game/NormalAd";
import { FakeXDecorAd } from "@/components/game/FakeXDecorAd";
import { TransparentAd } from "@/components/game/TransparentAd";
import { MisleadingChoiceAd } from "@/components/game/MisleadingChoiceAd";
import { CountdownAd } from "@/components/game/CountdownAd";
import { EscapingButtonAd } from "@/components/game/EscapingButtonAd";

const INITIAL_ADS = 7;

const FIRST_AD_URL = "https://pf.bunka.go.jp/chosaku/tanoshiku/";
const SECOND_AD_URL = "https://www.bunka.go.jp/seisaku/chosakuken/seidokaisetsu/";
const THIRD_AD_URL = "https://www.cric.or.jp/";
const FOURTH_AD_URL = "https://academy.jasrac.or.jp/";
const FIFTH_AD_URL = "https://www.gov-online.go.jp/tokusyu/copyright/";
const SIXTH_AD_URL = "https://www.ipa.go.jp/security/anshin/measures/fakealert.html";
const SEVENTH_AD_URL = "/ad/fullscreen-2";

export default function GamePage() {
  const router = useRouter();

  const [remaining, setRemaining] = useState(INITIAL_ADS);
  const [adStep, setAdStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = useCallback(() => {
    setRemaining((v) => Math.max(0, v - 1));
    setAdStep((s) => s + 1);
  }, []);

  const handlePlay = useCallback(() => {
    if (remaining > 0) return;
    if (isLoading) return;

    setIsLoading(true);

    window.setTimeout(() => {
      router.push("/thanks");
    }, 10000);
  }, [remaining, isLoading, router]);

  const adNode = useMemo(() => {
    if (remaining <= 0) return undefined;

    if (adStep === 0) {
      return (
        <NormalAd
          onClose={handleClose}
          imageSrc="/ads/normal.png"
          href={FIRST_AD_URL}
        />
      );
    }

    if (adStep === 1) {
      return (
        <FakeXDecorAd
          onClose={handleClose}
          imageSrc="/ads/fakex.png"
          href={SECOND_AD_URL}
        />
      );
    }

    if (adStep === 2) {
      return (
        <TransparentAd
          onClose={handleClose}
          imageSrc="/ads/transparent.png"
          href={THIRD_AD_URL}
        />
      );
    }

    if (adStep === 3) {
      return (
        <MisleadingChoiceAd
          onSkip={handleClose}
          href={FOURTH_AD_URL}
        />
      );
    }

    if (adStep === 4) {
      return (
        <CountdownAd
          onClose={handleClose}
          seconds={20}
          href={FIFTH_AD_URL}
        />
      );
    }

    if (adStep === 5) {
      return (
        <EscapingButtonAd
          onClose={handleClose}
          imageSrc="/ads/escape.png"
          href={SIXTH_AD_URL}
          maxEscapes={20}
        />
      );
    }

    if (adStep === 6) {
      return (
        <TransparentAd
          onClose={handleClose}
          imageSrc="/ads/transparent.png"
          href={SEVENTH_AD_URL}
          openInNewTab
        />
      );
    }

    return undefined;
  }, [remaining, adStep, handleClose]);

  return (
    <GameShell>
      <VideoPlayerShell
        remainingAds={remaining}
        ad={adNode}
        canPlay={remaining <= 0}
        onPlay={handlePlay}
        isLoading={isLoading}
      />
    </GameShell>
  );
}
