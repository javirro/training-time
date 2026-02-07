# TRAINING TIMER

A mobile-first Progressive Web App (PWA) for tracking different training methods at the gym.

## 📱 Features

- **Mobile-First Design** - Optimized for mobile devices with responsive layouts
- **PWA Support** - Install on your device and use offline
- **Training Methods:**
  - **EMOM**: Every minute on a minute
  - **AMRAP**: As many reps as possible in a time cap
  - **TABATA**: Work-rest interval with configurable rounds and activity/rest time
  - **TIMEKEEPER**: Track time needed to complete an activity

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server (with PWA enabled)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📱 PWA Setup

### Generate Icons

1. Open `public/icon-generator.html` in your browser
2. Download the generated icons or upload your logo
3. Icons will be saved to the `/public` folder automatically

Or see [PWA_SETUP.md](./PWA_SETUP.md) for detailed instructions.

### Testing PWA Features

1. Run `pnpm dev` or `pnpm preview`
2. Open Chrome DevTools → Application tab
3. Check Manifest and Service Workers
4. Test "Add to Home Screen" on mobile

## 🎨 Mobile-First Design

- Touch-optimized tap targets (minimum 44x44px)
- Responsive typography with fluid scaling
- Dynamic viewport height support
- Prevented pull-to-refresh on mobile
- Tailwind responsive breakpoints

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- PWA (vite-plugin-pwa)
