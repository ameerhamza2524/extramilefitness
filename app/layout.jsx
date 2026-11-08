import { Outfit, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const sans = Outfit({ subsets: ["latin"], variable: "--sans", weight: ["300", "400", "500", "600", "700"] });
const script = Mrs_Saint_Delafield({ subsets: ["latin"], variable: "--script", weight: "400" });

export const metadata = {
  title: "Extra Mile Fitness | Get in the best shape of your life, without it taking over your life",
  description: "1:1 concierge coaching for busy professionals who run teams, travel and don't have time to figure it out.",
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
