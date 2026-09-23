import { SignUp } from "@clerk/nextjs";
import { TrendingUp, BarChart3, FileDown, Users } from "lucide-react";
import Image from "next/image";

const features = [
  { icon: BarChart3,  label: "Multi-platform analytics",     desc: "Instagram, TikTok, YouTube, Facebook & LinkedIn in one view" },
  { icon: TrendingUp, label: "Track growth over time",        desc: "Views, likes, followers and engagement — daily or monthly" },
  { icon: Users,      label: "Compare across channels",       desc: "See which platform performs best at a glance" },
  { icon: FileDown,   label: "Export PDF reports",            desc: "Share branded analytics reports with clients or your team" },
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-border">
        <div>
          <div className="mb-16">
            <Image
              src="/logo/logo-white.png"
              alt="Naly"
              width={96}
              height={32}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          <h1 className="text-4xl font-normal leading-tight mb-4">
            All your social analytics<br />
            <span className="text-primary">in one place</span>
          </h1>
          <p className="text-muted-foreground text-base mb-12 max-w-sm">
            Connect your channels once. Track performance, spot trends, and export reports — without switching tabs.
          </p>

          <ul className="space-y-6">
            {features.map(({ icon: Icon, label, desc }) => (
              <li key={label} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2025 Naly. All rights reserved.
        </p>
      </div>

      {/* Right — sign-up form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Image
              src="/logo/logo-white.png"
              alt="Naly"
              width={96}
              height={32}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          <div className="mb-7">
            <h2 className="text-2xl font-normal">Create your account</h2>
            <p className="text-sm text-muted-foreground mt-1">Start tracking your social channels for free</p>
          </div>

          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent border-0 shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "border border-border bg-secondary hover:bg-hover text-foreground text-sm rounded font-normal",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground text-xs",
                formFieldInput:
                  "bg-secondary border border-border text-foreground text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary",
                formFieldLabel: "text-foreground text-sm font-medium",
                formButtonPrimary:
                  "bg-primary hover:bg-primary/90 text-primary-foreground text-sm rounded font-medium",
                footerActionLink: "text-primary hover:underline",
                footerActionText: "text-muted-foreground text-sm",
                identityPreviewText: "text-foreground",
                identityPreviewEditButton: "text-primary",
                alertText: "text-foreground text-sm",
                formResendCodeLink: "text-primary hover:underline",
              },
              variables: {
                colorBackground: "#0f0f0f",
                colorPrimary: "#3ea6ff",
                colorDanger: "#ff6b6b",
                borderRadius: "0.375rem",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
