# Setup Guide for Naly

This guide will help you set up and customize the Naly social media analytics application.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Demo Mode

By default, the application runs in **demo mode** with:
- Mock social media accounts pre-loaded
- Randomly generated analytics data
- No real API calls

This allows you to explore all features without connecting real accounts.

## Production Setup

### Social Media API Integration

To use real data from social media platforms, you need to:

#### Instagram API Setup

1. **Create a Facebook App**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app
   - Add Instagram Graph API product

2. **Get Access Tokens**
   - Generate user access tokens
   - Exchange for long-lived tokens

3. **Update Code**
   ```typescript
   // lib/api/instagram.ts
   const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
   const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
   ```

4. **Environment Variables**
   Create `.env.local`:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_token_here
   INSTAGRAM_USER_ID=your_user_id_here
   ```

#### TikTok API Setup

1. **Register on TikTok for Developers**
   - Visit [TikTok Developers](https://developers.tiktok.com/)
   - Create an app
   - Request API access

2. **Implement OAuth Flow**
   ```typescript
   // lib/api/tiktok.ts
   const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
   const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
   ```

#### Facebook API Setup

1. **Use Facebook Graph API**
   - Same app as Instagram
   - Request Page Public Content Access

2. **Update Environment**
   ```
   FACEBOOK_ACCESS_TOKEN=your_token_here
   FACEBOOK_PAGE_ID=your_page_id_here
   ```

### Database Setup

Replace localStorage with a real database:

1. **Choose a Database**
   - PostgreSQL (recommended)
   - MongoDB
   - MySQL

2. **Install Prisma (for PostgreSQL)**
   ```bash
   npm install @prisma/client
   npm install -D prisma
   npx prisma init
   ```

3. **Create Schema**
   ```prisma
   model Account {
     id            String   @id @default(cuid())
     platform      String
     username      String
     displayName   String
     profilePicture String?
     isConnected   Boolean
     connectedAt   DateTime
     userId        String
   }
   ```

4. **Update Storage Functions**
   Replace `lib/storage.ts` with database calls

### Authentication Setup

Add user authentication:

1. **Install NextAuth.js**
   ```bash
   npm install next-auth
   ```

2. **Configure Providers**
   ```typescript
   // app/api/auth/[...nextauth]/route.ts
   import NextAuth from "next-auth"
   import GoogleProvider from "next-auth/providers/google"

   export const authOptions = {
     providers: [
       GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
       }),
     ],
   }
   ```

## Customization

### Theme Colors

Edit `app/globals.css`:

```css
:root {
  --primary: #6366f1;        /* Your brand color */
  --secondary: #f1f5f9;      /* Secondary UI color */
  --background: #f8fafc;     /* Page background */
  --foreground: #0f172a;     /* Text color */
}
```

### Date Ranges

Modify `components/dashboard/DateRangeFilter.tsx`:

```typescript
<option value="14days">Last 14 days</option>
<option value="60days">Last 60 days</option>
<option value="1year">Last year</option>
```

### Chart Customization

Update `components/dashboard/MetricsChart.tsx`:

```typescript
<Line 
  strokeWidth={3}        // Line thickness
  dot={{ r: 4 }}        // Dot size
  stroke="#your-color"   // Line color
/>
```

### Mock Data Configuration

Adjust `lib/mockData.ts` to change demo data:

```typescript
const baseValues = {
  instagram: { 
    views: 10000,      // Adjust base values
    likes: 1000, 
    followers: 50000 
  },
  // ... other platforms
};
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy

### Other Platforms

- **Netlify**: Similar to Vercel
- **AWS Amplify**: For AWS ecosystem
- **Docker**: Use the included Dockerfile

## Environment Variables Reference

```bash
# Social Media APIs
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
FACEBOOK_ACCESS_TOKEN=
FACEBOOK_PAGE_ID=

# Database
DATABASE_URL=

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Optional
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Troubleshooting

### Charts Not Displaying
- Check that recharts is installed: `npm install recharts`
- Verify data format matches MetricsData type

### PDF Export Fails
- Ensure jsPDF is installed: `npm install jspdf jspdf-autotable`
- Check browser console for errors

### Styling Issues
- Clear `.next` cache: `rm -rf .next`
- Restart dev server: `npm run dev`

## Performance Optimization

### Production Build
```bash
npm run build
npm run start
```

### Image Optimization
Use Next.js Image component:
```typescript
import Image from 'next/image'
<Image src={profilePicture} width={40} height={40} alt={username} />
```

### API Caching
Implement SWR or React Query:
```bash
npm install swr
```

## Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Validate user input** - Already implemented in forms
3. **Rate limiting** - Add rate limiting to API routes
4. **HTTPS only** - Enforce in production
5. **CORS configuration** - Configure for your domain

## Support

For issues or questions:
1. Check the documentation
2. Review the code comments
3. Search for similar issues
4. Create a new issue with details

## Next Steps

- [ ] Set up real API integrations
- [ ] Add user authentication
- [ ] Implement database storage
- [ ] Deploy to production
- [ ] Add monitoring and analytics
- [ ] Implement automated testing
