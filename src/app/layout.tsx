import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils/cn";
import { ToastProvider } from "@/components/shared/toast-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(manrope.variable, "font-sans antialiased")}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}