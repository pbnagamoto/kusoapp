import "./globals.css";
import {
  Inter,
  Oswald,
  Anton,
  Bebas_Neue,
  Teko,
  Orbitron,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const teko = Teko({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-teko",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={[
          inter.variable,
          oswald.variable,
          anton.variable,
          bebas.variable,
          teko.variable,
          orbitron.variable,
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
