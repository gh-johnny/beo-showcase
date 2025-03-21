import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/sidebar";
import OccurrencesProvider from "@/context/OccurrencesContext";
import { MOCK_OCCURRENCES_RESPONSE } from "@/mocks/occurrences";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Beó dashboard",
  description: "Beó - Monitore em tempo real os problemas da comunidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[#f2f2f2] text-gray-primary ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OccurrencesProvider initialOccurrences={MOCK_OCCURRENCES_RESPONSE}>
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full flex flex-col justify-between">
              <div className="px-4 pb-14">
                {children}
              </div>
            </div>
            <Footer />
          </SidebarProvider>
        </OccurrencesProvider>
      </body>
    </html>
  );
}
