import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { Navbar } from "@/components/ui/Navbar";

const mainFont = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rick y Morty App",
  description: "Explora el multiverso de Rick y Morty realizado por Laura Ducuara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={mainFont.variable}>
      <body 
        className="min-h-screen antialiased"
        style={{ backgroundColor: "#4ccac4" }}  
      >
        <QueryProvider>
          
     <Navbar/>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}