# Naly Design System

## Overview
Naly's design is inspired by YouTube Studio's professional analytics interface, featuring a dark theme optimized for data visualization and extended viewing sessions.

## Design Philosophy

### Professional & Clean
- Minimal distractions, maximum information density
- Dark theme reduces eye strain during extended use
- Subtle borders and clear hierarchy
- Professional color palette suitable for business use

### Data-First
- Charts and metrics take center stage
- Clear visual hierarchy guides the eye to important data
- Consistent spacing and alignment
- Readable typography optimized for numbers and data

## Color System

### Base Colors
```css
--background: #0f0f0f    /* Main background */
--foreground: #f1f1f1    /* Primary text */
--card: #212121          /* Card/panel background */
--secondary: #282828     /* Secondary background */
--border: #303030        /* Border color */
--hover: #3a3a3a         /* Hover states */
```

### Semantic Colors
```css
--primary: #3ea6ff       /* Links, CTAs */
--accent: #ff6b6b        /* Alerts, negative */
--success: #00d4aa       /* Positive metrics */
--warning: #ffc107       /* Warnings */
```

### Muted Colors
```css
--muted: #282828         /* Muted background */
--muted-foreground: #aaaaaa  /* Secondary text */
```

## Typography

### Font Family
- Primary: Roboto (400, 500, 700)
- Fallback: System fonts (-apple-system, Segoe UI, etc.)

### Font Sizes
- **H1**: 24px, normal weight
- **H2**: 20px, medium weight
- **H3**: 16px, medium weight
- **Body**: 14px, normal weight
- **Small**: 12px, normal weight
- **Tiny**: 11px, normal weight

### Font Weights
- Normal: 400 (body text)
- Medium: 500 (headings, emphasis)
- Bold: 700 (strong emphasis, rarely used)

## Layout

### Sidebar
- Width: 240px (expanded), 64px (collapsed)
- Fixed position
- Contains navigation and branding
- Collapsible for more screen space

### Top Navigation
- Height: 56px (14 * 4)
- Fixed position
- Contains search, notifications, and user menu
- Transparent background with bottom border

### Main Content
- Left margin: 240px (accounts for sidebar)
- Top padding: 56px (accounts for top nav)
- Padding: 24px
- Max-width: Responsive, no hard limit

### Grid System
- Default gap: 24px
- Card padding: 24px
- Section spacing: 24px
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## Components

### Cards
- Background: var(--card)
- Border: 1px solid var(--border)
- Border radius: 12px
- Padding: 24px
- No shadow (flat design)

### Buttons
- Border radius: 6px
- Padding: 8px 16px (small), 10px 20px (medium)
- Font size: 14px
- Font weight: 500
- Transition: 200ms ease

#### Button Variants
- **Primary**: Blue background (#3ea6ff)
- **Secondary**: Gray background with border
- **Outline**: Transparent with border
- **Ghost**: Transparent, hover only

### Input Fields
- Background: var(--secondary)
- Border: 1px solid var(--border)
- Border radius: 6px
- Padding: 8px 12px
- Font size: 14px
- Hover: Lighter background
- Focus: Primary border + ring

### Select Dropdowns
- Same styling as inputs
- Custom dropdown arrow (SVG)
- Arrow position: right 8px center

## Charts & Data Visualization

### Chart Colors
- Primary line: #3ea6ff (blue)
- Secondary line: #ff6b6b (red)
- Tertiary line: #00d4aa (green)
- Quaternary line: #ffc107 (orange)

### Chart Style
- Type: Area charts with gradient fill
- Grid: Horizontal only, subtle (#303030)
- Axis: Light gray (#aaaaaa)
- Font size: 11px
- Smooth curves (monotone interpolation)
- No dots on lines (cleaner look)
- Active dot on hover: 4px radius

### Metrics Display
- Large numbers: 32px, normal weight
- Labels: 11px uppercase, muted color
- Growth indicators: Colored text with icon
- Comparison text: 14px, muted

## Icons

### Icon Library
- Lucide React
- Size: 20px (standard), 16px (small), 24px (large)
- Stroke width: 2px
- Always use semantic names

### Common Icons
- Camera: Instagram
- Music: TikTok
- Share2: Facebook
- TrendingUp: Growth/Analytics
- Eye: Views
- Heart: Likes
- Users: Followers/Subscribers

## Spacing Scale

### Base Unit: 4px

```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
```

### Common Patterns
- Gap between cards: 24px
- Padding inside cards: 24px
- Margin between sections: 24px
- Button padding: 8px 16px
- Input padding: 8px 12px

## Border Radius

```css
--radius-sm: 6px      /* Buttons, inputs */
--radius-md: 8px      /* Small cards */
--radius-lg: 12px     /* Large cards */
--radius-xl: 16px     /* Modals */
--radius-full: 9999px /* Pills, avatars */
```

## Animations

### Transitions
- Duration: 200ms
- Easing: ease (default), ease-in-out (complex)
- Properties: color, background, border, transform

### Hover States
- Background: Lighten by one level
- Border: Change to primary color
- Transform: translateY(-2px) for cards (optional)
- Cursor: pointer

### Loading States
- Spinner: Rotating border
- Skeleton: Pulse animation
- Duration: 1500ms

## Accessibility

### Focus States
- Outline: 1px solid var(--primary)
- Ring: 2px var(--primary) with offset
- Always visible for keyboard navigation

### Color Contrast
- Foreground on background: 14.9:1 (AAA)
- Muted text on background: 7.5:1 (AA)
- All text meets WCAG AA standards

### Interactive Elements
- Min touch target: 44x44px
- Clear hover states
- Semantic HTML
- ARIA labels where needed

## Responsive Design

### Mobile (< 640px)
- Sidebar: Hidden or overlay
- Single column layouts
- Larger touch targets
- Simplified navigation

### Tablet (640px - 1024px)
- Sidebar: Collapsible
- Two column layouts where appropriate
- Touch-optimized interactions

### Desktop (> 1024px)
- Full sidebar visible
- Multi-column layouts
- Dense information display
- Hover interactions enabled

## Best Practices

### Do's
- ✅ Use semantic HTML elements
- ✅ Maintain consistent spacing
- ✅ Use color variables, never hardcode
- ✅ Keep text readable (14px minimum)
- ✅ Test in dark mode only
- ✅ Optimize for data readability

### Don'ts
- ❌ Don't use bright backgrounds
- ❌ Don't use complex gradients
- ❌ Don't add unnecessary shadows
- ❌ Don't use too many colors
- ❌ Don't create light mode variants
- ❌ Don't sacrifice contrast for aesthetics

## Component Examples

### Metric Card
```tsx
<div className="bg-card border border-border rounded-lg p-6">
  <div className="text-xs uppercase text-muted-foreground mb-2">
    Total Views
  </div>
  <div className="text-3xl font-normal mb-1">
    82,451
  </div>
  <div className="text-sm text-success flex items-center gap-1">
    <TrendingUp className="w-4 h-4" />
    +12.5%
  </div>
</div>
```

### Navigation Item
```tsx
<button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-hover hover:text-foreground transition-colors">
  <BarChart3 className="w-5 h-5" />
  <span className="text-sm">Analytics</span>
</button>
```

### Primary Button
```tsx
<button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
  Export Report
</button>
```

## Design Tokens Summary

This design system creates a professional, data-focused analytics dashboard that:
- Reduces eye strain with dark backgrounds
- Emphasizes content over chrome
- Maintains high information density
- Feels polished and production-ready
- Mirrors familiar tools (YouTube Studio, etc.)
- Scales from mobile to desktop seamlessly
