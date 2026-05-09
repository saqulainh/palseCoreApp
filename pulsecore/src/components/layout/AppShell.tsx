import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { PageTransition } from "./PageTransition";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

export function AppShell({ children, title, showBack }: AppShellProps) {
  const router = useRouter();
  const { isAuthenticated, fetchUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("pulsecore_access_token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    
    // If we have a token but state says not authenticated (e.g. fresh reload), fetch the user
    if (!isAuthenticated) {
      fetchUser().catch(() => {
        router.push("/auth/login");
      });
    }
  }, [isAuthenticated, fetchUser, router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]">
      {/* Background radial glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(184, 196, 255, 0.08) 0%, transparent 60%)",
        }}
      />
      {/* Top navigation */}
      <TopBar title={title} showBack={showBack} />
      {/* Main content — padded for bottom nav on mobile */}
      <main className="flex-1 pb-[88px] md:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      {/* Mobile bottom navigation */}
      <BottomNav />
    </div>
  );
}
