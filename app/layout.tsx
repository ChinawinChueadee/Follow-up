import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
});

// Material Symbols Outlined เฉพาะไอคอนที่ใช้ในโปรเจกต์ (subset จาก Google Fonts)
// เพิ่มไอคอนใหม่ต้องดาวน์โหลดไฟล์นี้ใหม่ พร้อมระบุรายชื่อไอคอนทั้งหมดใน icon_names
const materialSymbols = localFont({
  src: "./fonts/material-symbols-outlined.woff2",
  variable: "--font-material-symbols",
  weight: "100 700",
  display: "block",
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Follow-up Board",
  description: "ระบบจัดการรายชื่อผู้ติดต่อ สถานะ และวันติดตาม",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${notoSansThai.variable} ${materialSymbols.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
