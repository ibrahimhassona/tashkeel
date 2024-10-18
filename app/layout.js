import { Cairo } from "next/font/google";
import "./globals.css";

// ---- Google Fonts ------
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"] });

export const metadata = {
  title:"ضَرَبَ الخَوارزميَّات",
  description: "تَمَّ انْشَاءُهُ لِاعْتِرَاضِنَا عَلَى حَذْفِ الْمَنْشُورَاتِ الَّتِى تُعَبِّرَ عَنْ بَعْضِ الْفِئَاتِ الْمَظْلُومِهِ وَالْمُضْطَهَضِينَ مِنْ فِيسْبُوك",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png?v=4']
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir='rtl'>
      <body
        className={`${cairo.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
