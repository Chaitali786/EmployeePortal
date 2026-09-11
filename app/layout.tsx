import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className="min-h-screen overflow-y-auto bg-slate-950 text-white flex flex-col">
        <AuthProvider>
          <Navbar />
          
          <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pb-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}