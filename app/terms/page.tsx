"use client";

import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Naly ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to update these terms at any time, and continued use of the Service constitutes acceptance of any changes.`,
  },
  {
    title: "2. Description of Service",
    content: `Naly is a social media analytics platform that aggregates performance data from connected social media accounts including Instagram, TikTok, YouTube, Facebook, and LinkedIn. The Service provides metrics, reports, and insights based on data retrieved from third-party platform APIs.`,
  },
  {
    title: "3. Account Registration",
    content: `To use the Service, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must be at least 16 years old to use the Service.`,
  },
  {
    title: "4. Connected Accounts & Third-Party Platforms",
    content: `When you connect a social media account, you authorize Naly to access data from that platform on your behalf using OAuth or API tokens. We only request the minimum permissions necessary to retrieve analytics data. You may disconnect any account at any time from your settings. Naly is not affiliated with or endorsed by any third-party platform.`,
  },
  {
    title: "5. Acceptable Use",
    content: `You agree not to misuse the Service. Prohibited activities include: attempting to reverse engineer or extract source code from the Service; using the Service to violate any applicable law or regulation; accessing data belonging to other users; or using automated tools to scrape or overload the Service. Violation of these rules may result in immediate account termination.`,
  },
  {
    title: "6. Intellectual Property",
    content: `All content, design, code, and materials within the Service are the property of Naly and are protected by applicable intellectual property laws. You retain ownership of your own data. By using the Service, you grant Naly a limited license to process your data solely for the purpose of providing the Service.`,
  },
  {
    title: "7. Data & Privacy",
    content: `Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. We take data security seriously and implement reasonable technical measures to protect your information. Please review our Privacy Policy to understand how we collect, use, and protect your data.`,
  },
  {
    title: "8. Disclaimers",
    content: `The Service is provided "as is" without warranties of any kind, express or implied. We do not guarantee the accuracy, completeness, or availability of analytics data, as it depends on third-party platform APIs which may be subject to changes, outages, or rate limits beyond our control.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `To the maximum extent permitted by law, Naly shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability to you for any claims arising from these Terms shall not exceed the amount you paid for the Service in the twelve months preceding the claim.`,
  },
  {
    title: "10. Termination",
    content: `You may terminate your account at any time from the settings page. We may suspend or terminate your account if you violate these Terms. Upon termination, your right to use the Service ceases immediately and we may delete your data in accordance with our Privacy Policy.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms shall be resolved through good-faith negotiation. If a dispute cannot be resolved informally, it shall be submitted to binding arbitration.`,
  },
  {
    title: "12. Contact",
    content: `If you have any questions about these Terms of Service, please contact us at legal@naly.app.`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "var(--landing-bg)", color: "var(--foreground)", minHeight: "100vh" }}>
      <LandingNav />

      <main style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div className="landing-container" style={{ maxWidth: "760px" }}>
          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "1rem" }}>
              Legal
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1rem" }}>
              Terms of Service
            </h1>
            <p style={{ color: "rgba(241,241,241,0.45)", fontSize: "0.875rem" }}>
              Last updated: January 1, 2025
            </p>
          </div>

          <p style={{ color: "rgba(241,241,241,0.6)", fontSize: "0.9375rem", lineHeight: 1.75, marginBottom: "3rem", borderLeft: "2px solid var(--primary)", paddingLeft: "1.25rem" }}>
            Please read these Terms of Service carefully before using Naly. These terms govern your access to and use of our social media analytics platform.
          </p>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {sections.map((section) => (
              <section key={section.title}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.75rem" }}>
                  {section.title}
                </h2>
                <p style={{ color: "rgba(241,241,241,0.55)", fontSize: "0.9375rem", lineHeight: 1.8, margin: 0 }}>
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "3.5rem", paddingTop: "2rem" }}>
            <p style={{ color: "rgba(241,241,241,0.35)", fontSize: "0.875rem" }}>
              For questions about these terms, contact us at{" "}
              <a href="mailto:legal@naly.app" style={{ color: "var(--primary)" }}>legal@naly.app</a>.
            </p>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
