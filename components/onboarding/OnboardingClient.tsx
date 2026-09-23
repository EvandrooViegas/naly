"use client";

import { useRouter } from "next/navigation";
import { ConnectedAccount } from "@/types";
import { createAccount } from "@/lib/accounts";
import OnboardingFlow from "./OnboardingFlow";

export default function OnboardingClient() {
  const router = useRouter();

  const handleComplete = async (accounts: ConnectedAccount[]) => {
    await Promise.all(accounts.map((a) => createAccount(a)));
    router.replace("/dashboard");
  };

  return <OnboardingFlow onComplete={handleComplete} />;
}
