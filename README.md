# Naly - Social Media Analytics Dashboard

A modern, responsive web application for tracking and analyzing social media performance across Instagram, TikTok, and Facebook in one unified dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 📊 Multi-Platform Analytics
- **Instagram** - Track posts, reels, and stories performance
- **TikTok** - Monitor video views, likes, and follower growth
- **Facebook** - Analyze page engagement and reach

### 📈 Comprehensive Metrics
- Total views and likes tracking
- Follower count and growth monitoring
- Engagement rate calculations
- Historical performance data with interactive charts

### 🎯 Powerful Dashboard
- Real-time metrics visualization
- Customizable date ranges (7, 30, 90 days, or custom)
- Multi-account comparison
- Toggle between different metrics (views, likes, followers, engagement)
- Account breakdown with detailed statistics

### 📄 PDF Export
- Generate comprehensive analytics reports
- Customize report contents:
  - Select specific date ranges
  - Choose which metrics to include
  - Pick which accounts to feature
- Professional formatting with summary tables and charts

### 🎨 Modern UI/UX
- Clean, intuitive interface
- Fully responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations and transitions
- Seamless onboarding flow

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone or navigate to the repository:
```bash
cd naly
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
naly/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── accounts/       # Account verification
│   │   └── metrics/        # Metrics fetching
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── dashboard/          # Dashboard components
│   │   ├── Dashboard.tsx
│   │   ├── MetricCard.tsx
│   │   ├── MetricsChart.tsx
│   │   ├── AccountSelector.tsx
│   │   ├── DateRangeFilter.tsx
│   │   ├── MetricsSelector.tsx
│   │   ├── DashboardHeader.tsx
│   │   └── ExportModal.tsx
│   ├── onboarding/         # Onboarding flow
│   │   ├── OnboardingFlow.tsx
│   │   ├── PlatformCard.tsx
│   │   └── ConnectAccountModal.tsx
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── Checkbox.tsx
├── lib/
│   ├── api/                # Social media API integrations
│   │   ├── instagram.ts
│   │   ├── tiktok.ts
│   │   ├── facebook.ts
│   │   └── index.ts
│   ├── mockData.ts         # Mock data generator
│   ├── pdfExport.ts        # PDF generation utility
│   ├── storage.ts          # LocalStorage utilities
│   └── utils.ts            # Helper functions
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🛠️ Technologies Used

- **Framework:** Next.js 16.3 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.0
- **Charts:** Recharts
- **PDF Generation:** jsPDF + jspdf-autotable
- **Icons:** Lucide React
- **Date Handling:** date-fns

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🔌 API Integration (Production)

Currently using mock data for demonstration. For production deployment:

### Instagram
- Use Instagram Graph API for business/creator accounts
- Requires Facebook Developer account and app registration
- Documentation: https://developers.facebook.com/docs/instagram-api

### TikTok
- Use TikTok for Developers API
- Requires app registration and approval
- Documentation: https://developers.tiktok.com

### Facebook
- Use Facebook Graph API
- Requires Facebook app and page access tokens
- Documentation: https://developers.facebook.com/docs/graph-api

See individual API files in `lib/api/` for implementation details.

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🎨 Customization

### Theme Colors
Edit CSS variables in `app/globals.css`:
- `--primary`: Main brand color
- `--background`: Background color
- `--foreground`: Text color
- `--card`: Card background
- `--border`: Border color

### Mock Data
Modify `lib/mockData.ts` to adjust demo data generation.

## 🤝 Contributing

This is a demo project. For production use:
1. Implement real API integrations
2. Add backend authentication
3. Set up database for account persistence
4. Implement proper error handling
5. Add rate limiting and caching

## 📄 License

This project is for demonstration purposes.

## 🙏 Acknowledgments

- Built with Next.js and React
- UI components inspired by modern design systems
- Icons by Lucide
- Charts powered by Recharts
