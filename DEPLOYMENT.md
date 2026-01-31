# 🚀 OSTO(ME) Deployment Guide

## Quick Start Deployment to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it `ostome-app`
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Upload Your Code

```bash
cd ostome-app
git init
git add .
git commit -m "Initial commit - OSTO(ME) mood tracking app"
git branch -M main
git remote add origin https://github.com/visuxlize/ostome-app.git
git push -u origin main
```

### Step 3: Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   Add this line to the "scripts" section:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Click "Pages" in sidebar
   - Under "Source", select `gh-pages` branch
   - Click Save

5. **Access your app**
   Your app will be live at: `https://visuxlize.github.io/ostome-app/`

---

## Alternative: Deploy to Vercel (Easier!)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Login with GitHub
   - Confirm project settings
   - Your app will be live instantly!

---

## Alternative: Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Go to [Netlify](https://netlify.com)**

3. **Drag and drop** the `dist` folder

4. **Done!** Your app is live

---

## Testing Locally First

Before deploying, always test locally:

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Update Your Resume

Once deployed, update your resume with the live link:

**Before:**
```
OSTO(ME) - Patient Mood Tracking App (Mobile Application Concept | Flutter)
```

**After:**
```
OSTO(ME) - Patient Mood Tracking App (Live Demo: https://visuxlize.github.io/ostome-app/)
• Built with React, deployed to GitHub Pages
```

---

## Troubleshooting

### Issue: Blank page after deployment
**Solution:** Check that `base` in `vite.config.js` matches your repo name:
```javascript
base: '/ostome-app/'
```

### Issue: 404 errors
**Solution:** Make sure GitHub Pages is enabled and using `gh-pages` branch

### Issue: Build fails
**Solution:** Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
npm run build
```

---

## Next Steps

1. ✅ Deploy to GitHub Pages
2. ✅ Add live link to your resume
3. ✅ Add screenshots to README
4. ✅ Share on LinkedIn
5. ✅ Now build Therapick app!

---

Good luck with your deployment! 🎉
