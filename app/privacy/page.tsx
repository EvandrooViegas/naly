"use client";

import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly when creating an account (name, email address, profile picture via your authentication provider), information from third-party social media platforms when you connect your accounts (analytics data, follower counts, engagement metrics, post performance), and usage data automatically collected when you use the Service (pages visited, features used, browser type, IP address, and device information).`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve the Service; to fetch and display analytics data from your connected social media accounts; to generate reports and insights; to send you important account-related notifications; to respond to support requests; and to understand how the Service is being used so we can make it better. We do not sell your personal data to third parties.`,
  },
  {
    title: "3. Connected Social Media Accounts",
    content: `When you connect a social media account, we store the OAuth tokens or API credentials necessary to retrieve data on your behalf. We only request read-only permissions for analytics data — we never post, delete, or modify content on your behalf. These tokens are encrypted at rest. You can revoke access at any time by disconnecting the account from your settings or directly from the platform's security settings.`,
  },
  {
    title: "4. Data Storage & Security",
    content: `Your data is stored on secure servers hosted with Neon PostgreSQL (a cloud-hosted PostgreSQL provider). We implement industry-standard security measures including encryption in transit (TLS) and at rest, access controls, and regular security reviews. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your account data for as long as your account is active. Analytics metrics are cached for up to 6 hours to reduce API calls to third-party platforms. If you delete your account, we will delete your personal data and connected account tokens within 30 days, except where we are required to retain it for legal or compliance reasons.`,
  },
  {
    title: "6. Sharing of Information",
    content: `We do not sell, trade, or rent your personal information. We may share data with trusted third-party service providers who assist us in operating the Service (such as authentication providers and database hosts), strictly for that purpose and under confidentiality agreements. We may also disclose information if required by law or to protect the rights and safety of Naly and its users.`,
  },
  {
    title: "7. Third-Party Platforms",
    content: `Naly integrates with third-party platforms including Instagram, TikTok, YouTube, Facebook, and LinkedIn. Your use of those platforms is governed by their respective privacy policies. We only access the data those platforms make available through their official APIs and within the permissions you have granted.`,
  },
  {
    title: "8. Cookies & Tracking",
    content: `We use cookies and similar technologies for authentication (session management via Clerk), remembering your preferences, and understanding how the Service is used. You can control cookie settings through your browser, but disabling certain cookies may affect the functionality of the Service.`,
  },
  {
    title: "9. Your Rights",
    content: `Depending on your location, you may have rights regarding your personal data including: the right to access the data we hold about you; the right to correct inaccurate data; the right to request deletion of your data; the right to export your data in a portable format; and the right to withdraw consent at any time. To exercise any of these rights, contact us at privacy@naly.app.`,
  },
  {
    title: "10. Children's Privacy",
    content: `The Service is not directed at children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.`,
  },
  {
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice within the Service or by sending an email to the address associated with your account. Your continued use of the Service after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: "12. Contact",
    content: `If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at privacy@naly.app.`,
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p style={{ color: "rgba(241,241,241,0.45)", fontSize: "0.875rem" }}>
              Last updated: January 1, 2025
            </p>
          </div>

          <p style={{ color: "rgba(241,241,241,0.6)", fontSize: "0.9375rem", lineHeight: 1.75, marginBottom: "3rem", borderLeft: "2px solid var(--primary)", paddingLeft: "1.25rem" }}>
            Your privacy matters to us. This policy explains what data Naly collects, how we use it, and the choices you have over your information.
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
              For privacy-related inquiries, contact us at{" "}
              <a href="mailto:privacy@naly.app" style={{ color: "var(--primary)" }}>privacy@naly.app</a>.
            </p>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
