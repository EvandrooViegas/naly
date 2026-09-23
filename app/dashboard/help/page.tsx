export default function HelpPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-normal mb-1">Help & documentation</h1>
      <p className="text-sm text-muted-foreground mb-8">Everything you need to get the most out of Naly</p>

      <div className="space-y-4">
        {[
          { title: "Getting started",       desc: "Connect your first social channel and view your analytics dashboard." },
          { title: "Connecting platforms",  desc: "Naly supports Instagram, TikTok, YouTube, Facebook and LinkedIn. Add API keys in Settings for live data." },
          { title: "Exporting reports",     desc: "Click 'Export report' on the dashboard to generate a PDF with custom date ranges and metric selections." },
          { title: "API key setup",         desc: "Add platform credentials to .env.local. See Settings → API keys for the exact variable names." },
          { title: "Data refresh",          desc: "Metrics are fetched fresh on each page load and cached for 6 hours in your Neon database." },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-card border border-border rounded-lg px-5 py-4">
            <h3 className="text-sm font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
