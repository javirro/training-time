# PWA Setup Instructions

## ✅ What's Been Configured

Your app is now configured as a **Progressive Web App (PWA)** with **mobile-first** design:

### 1. PWA Features
- ✅ Service Worker auto-registration (via vite-plugin-pwa)
- ✅ Offline support with Workbox
- ✅ App manifest for installability
- ✅ Meta tags for iOS/Android
- ✅ Auto-update on new versions
- ✅ Cache-first strategy for assets

### 2. Mobile-First Design
- ✅ Responsive viewport settings
- ✅ Touch-optimized tap targets (min 44x44px)
- ✅ Responsive typography with `clamp()`
- ✅ Dynamic viewport height (`dvh`)
- ✅ Prevented pull-to-refresh
- ✅ Tailwind responsive classes (`sm:`, `md:`)
- ✅ iOS-specific meta tags

## 📱 Icon Requirements

You need to create PWA icons. Place these in the `/public` folder:

1. **pwa-192x192.png** (192x192px)
2. **pwa-512x512.png** (512x512px)
3. **apple-touch-icon.png** (180x180px)
4. **favicon.ico** (optional)

### Quick Icon Generation

**Option 1: Online Tools**
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- [Favicon.io](https://favicon.io/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

**Option 2: Using a logo image**
```bash
# Install sharp-cli
pnpm add -D sharp-cli

# Generate icons (after you have a logo.png)
npx sharp-cli --input logo.png --output public/pwa-192x192.png resize 192 192
npx sharp-cli --input logo.png --output public/pwa-512x512.png resize 512 512
npx sharp-cli --input logo.png --output public/apple-touch-icon.png resize 180 180
```

## 🧪 Testing Your PWA

### Development
```bash
pnpm dev
```
PWA features are enabled in dev mode!

### Production Build
```bash
pnpm build
pnpm preview
```

### Testing Installation

1. **Chrome DevTools**
   - Open DevTools (F12)
   - Go to "Application" tab
   - Check "Manifest" and "Service Workers"
   - Click "Update on reload" for testing

2. **Mobile Testing**
   - Use Chrome on Android or Safari on iOS
   - Visit your app
   - Look for "Add to Home Screen" prompt
   - Install and test offline functionality

3. **Lighthouse Audit**
   - Open DevTools > Lighthouse
   - Run PWA audit
   - Aim for score > 90

## 📦 What Gets Cached

- All JS, CSS, HTML files
- Images (png, svg, ico)
- Fonts (woff, woff2)
- Google Fonts (if used)

## 🔧 Customization

### Update Theme Color
Edit `vite.config.ts` and `index.html`:
```typescript
theme_color: '#242424'  // Change this
```

### Update App Name
Edit `vite.config.ts`:
```typescript
manifest: {
  name: 'Your App Name',
  short_name: 'Short Name'
}
```

### Offline Page
Create `/public/offline.html` for custom offline experience.

## 📱 Mobile-First Breakpoints

Using Tailwind's default breakpoints:
- `sm:` — 640px and up
- `md:` — 768px and up
- `lg:` — 1024px and up
- `xl:` — 1280px and up

## 🚀 Deployment

Your PWA works on any static host:
- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps
- Cloudflare Pages

**Important:** PWAs require HTTPS in production!

## ✅ Checklist

- [ ] Create PWA icons (192x192, 512x512, 180x180)
- [ ] Test installation on mobile device
- [ ] Test offline functionality
- [ ] Run Lighthouse PWA audit
- [ ] Configure push notifications (optional)
- [ ] Test on iOS Safari and Chrome Android
- [ ] Deploy with HTTPS

## 📚 Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [Mobile Web Best Practices](https://web.dev/mobile/)
