# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
OSTO(ME) is a child-friendly mood tracking web application built with React. It helps children track their feelings, symptoms, and appointments for doctor visits. All data is stored locally in the browser using LocalStorage - no backend or API.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts Vite dev server at http://localhost:5173

### Build for Production
```bash
npm run build
```
Outputs production-ready files to `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deploy to GitHub Pages
```bash
npm run deploy
```
Note: Requires `gh-pages` to be installed as a dev dependency.

## Architecture

### Single-Component Design
This app uses a monolithic architecture - **all application logic lives in `src/App.jsx`**. There are no separate component files. The entire app is structured as:
- `src/main.jsx` - React entry point, mounts App component
- `src/App.jsx` - All state management, UI logic, and feature implementation
- `src/index.css` - All application styles

### State Management
The app uses React's `useState` for all state management. No external state libraries (Redux, Zustand, etc.). Key state variables in App.jsx:
- `activeTab` - Controls which view is displayed (mood/history/appointments/reminders)
- `selectedMood` - Currently selected mood emoji
- `moodEntries` - Array of all mood entries
- `appointments` - Array of doctor appointments  
- `reminders` - Array of reminders
- Form state for appointments and reminders

### Data Persistence
All data is stored in browser's LocalStorage with these keys:
- `ostome-moods` - Mood entry history
- `ostome-appointments` - Doctor appointments
- `ostome-reminders` - Reminder items

Data is loaded on mount via `useEffect` and saved on each create/delete action.

### Vite Configuration
The `vite.config.js` has `base: '/ostome-app/'` configured for GitHub Pages deployment. When adding new build configurations or plugins, maintain this base path setting.

## Design Principles
- **Child-Friendly First**: Use large touch targets, emoji-based UI, simple language, bright colors
- **Purple Gradient Theme**: Primary colors are `#667eea` to `#764ba2`
- **No External Dependencies**: App is self-contained, no API calls or tracking
- **Mobile-First**: Responsive design with breakpoint at 480px where mood grid changes from 3 to 2 columns

## Adding New Features

### Adding a New Mood
Edit the `moods` array at the top of `src/App.jsx`:
```javascript
{ emoji: '😁', label: 'Joyful', color: '#ffeb3b' }
```

### Adding a New Tab
1. Add new state variable for the tab's data
2. Add button to `.nav-tabs` section with appropriate icon from `lucide-react`
3. Add conditional rendering block in `.content` div
4. Implement localStorage save/load in `useEffect` and action functions

### Adding a New Reminder Type
Add option to the reminder type select in the Reminders tab section of App.jsx (around line 362-369).

## Code Patterns
- All ID generation uses `Date.now()` for simplicity
- Array operations use immutable patterns (filter, map, spread operator)
- Form resets happen after successful saves
- User feedback uses browser `alert()` - simple and child-appropriate
- Empty states use Lucide React icons with friendly messaging
