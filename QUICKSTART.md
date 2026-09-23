# 🚀 Quick Start Guide

Get Naly up and running in under 2 minutes!

## Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to **http://localhost:3000**

That's it! 🎉

## What You'll See

### Demo Mode (Default)
The app starts with **3 pre-connected demo accounts**:
- 📸 Instagram account
- 🎵 TikTok account
- 👥 Facebook page

All with **realistic mock data** so you can explore features immediately.

## Key Features to Try

### 1. Dashboard View
- ✅ See metrics cards with views, likes, followers, engagement
- ✅ Interactive charts showing performance over time
- ✅ Account breakdown with individual statistics

### 2. Filter & Customize
- 📅 Change date ranges (7, 30, 90 days, or custom)
- 🎯 Toggle which metrics to display
- ✔️ Select/deselect accounts to compare

### 3. Export PDF Report
- 📄 Click "Export PDF" button
- 🎛️ Customize what to include:
  - Select date range
  - Choose metrics
  - Pick accounts
- 💾 Download professional PDF report

### 4. Add More Accounts
- ➕ Click "Add Account" button
- 🔗 Select platform (Instagram/TikTok/Facebook)
- ⌨️ Enter username
- ✨ New account appears in dashboard

## File Structure

```
naly/
├── app/                    # Next.js pages
├── components/            # React components
│   ├── dashboard/        # Dashboard components
│   ├── onboarding/       # Account connection flow
│   └── ui/               # Reusable UI elements
├── lib/                   # Utilities & API logic
└── types/                # TypeScript definitions
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Next Steps

### For Development
- ✏️ Edit `components/` to customize UI
- 🎨 Modify `app/globals.css` for styling
- 🔧 Check `lib/mockData.ts` to adjust demo data

### For Production
See **SETUP.md** for:
- Real API integration (Instagram, TikTok, Facebook)
- Database setup
- User authentication
- Deployment guides

## Common Issues

### Port Already in Use
If port 3000 is busy, Next.js will use 3001:
```
- Local: http://localhost:3001
```

### Build Errors
Clear cache and reinstall:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Styling Not Loading
Make sure Tailwind CSS is configured:
```bash
# Should already be done, but if issues persist:
npm install -D tailwindcss postcss autoprefixer
```

## Need Help?

- 📖 Check **README.md** for full documentation
- ⚙️ See **SETUP.md** for advanced configuration
- 🐛 Look at code comments for implementation details

## Demo vs Production

| Feature | Demo Mode | Production |
|---------|-----------|------------|
| Accounts | Mock data | Real social media accounts |
| Metrics | Generated | Fetched from APIs |
| Storage | localStorage | Database |
| Auth | None | Required |

---

**Enjoy exploring Naly! 🎉**

For questions or issues, check the documentation files or review the code comments.
