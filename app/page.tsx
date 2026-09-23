"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ConnectedAccount } from "@/types";
import { fetchAccounts, createAccount } from "@/lib/accounts";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import DashboardShell from "@/components/dashboard/DashboardShell";
import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PlatformsSection from "@/components/landing/PlatformsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

type AppState = "loading" | "landing" | "onboarding" | "dashboard";

function LandingPage() {
  return (
    // suppressHydrationWarning silences the browser-extension bis_skin_checked attribute
    // injection that causes false hydration warnings — no real content mismatch exists.
    <div suppressHydrationWarning style={{ background: "var(--landing-bg)", color: "var(--foreground)" }}>
      <LandingNav />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PlatformsSection />
      <TestimonialsSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [state, setState] = useState<AppState>("loading");
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { setState("landing"); return; }
    fetchAccounts()
      .then((accs) => {
        setAccounts(accs);
        setState(accs.length === 0 ? "onboarding" : "dashboard");
      })
      .catch(() => setState("onboarding"));
  }, [isLoaded, isSignedIn]);

  const handleOnboardingComplete = async (newAccounts: ConnectedAccount[]) => {
    await Promise.all(newAccounts.map((a) => createAccount(a)));
    setAccounts(newAccounts);
    setState("dashboard");
  };

  if (state === "loading") {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (state === "landing") return <LandingPage />;

  if (state === "onboarding") {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <DashboardShell accounts={accounts}>
      <p className="text-muted-foreground text-sm">Loading dashboard…</p>
    </DashboardShell>
  );
}
