import { Outfit, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const sans = Outfit({ subsets: ["latin"], variable: "--sans", weight: ["300", "400", "500", "600", "700"] });
const script = Mrs_Saint_Delafield({ subsets: ["latin"], variable: "--script", weight: "400" });

export const metadata = {
  title: "Extra Mile Fitness | Your best wasn't back then. It's ahead of you",
  description: "1:1 online coaching for capable men and women who've been in shape before and are ready to go past it.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
