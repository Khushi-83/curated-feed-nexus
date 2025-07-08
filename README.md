# 🌐 Curated Feed Nexus

A personalized, dynamic dashboard built with **React**, **Next.js**, and **TypeScript** to fetch and display real-time content from multiple sources—news, movies/music, and social posts—based on user preferences.

![Curated Feed Banner](https://your-banner-image-url) <!-- Optional: Insert banner image if available -->

---

## 🚀 Project Overview

**Curated Feed Nexus** is an all-in-one content aggregator platform offering:
- 📰 Latest news tailored to your interests
- 🎬 Movie/music recommendations
- 📸 Social posts via mock APIs

It features **drag-and-drop reordering**, **dark mode**, **debounced search**, and a modern, responsive layout.

---

## ✨ Features

### 🎛 User Preferences
- Choose categories like **technology**, **sports**, or **finance**
- Preferences saved using **Redux + localStorage**

### 🔗 Unified Feed
- **News:** via NewsAPI
- **Recommendations:** via TMDB/Spotify API
- **Social Posts:** via mock API (e.g., Twitter/Instagram)

### 🧩 UI Highlights
- Infinite scrolling / pagination
- Drag-and-drop using **React DnD** or **Framer Motion**
- Responsive cards with media, headlines, and CTAs

### 🔍 Search & Filter
- Global search with **debounced input**
- Real-time filtering across all categories

### 🌗 Dark Mode + Animations
- Toggle light/dark using **Tailwind + CSS vars**
- Smooth transitions with **Framer Motion**

### ❤️ Favorites Section
- Mark any content as a favorite
- Access them via dedicated sidebar section

---

## 🏗️ Tech Stack

| Category         | Tools/Tech Used                                     |
|------------------|------------------------------------------------------|
| Frontend         | React, Next.js, TypeScript                           |
| State Management | Redux Toolkit, RTK Query, Redux Persist              |
| Styling          | Tailwind CSS, CSS Variables                          |
| Animation        | Framer Motion                                        |
| APIs             | NewsAPI, TMDB / Spotify (for recommendations)        |
| Testing          | Jest, React Testing Library, Cypress/Playwright      |

---

## 🗂️ Project Structure

```bash
/src
  /components
    Header.tsx
    Sidebar.tsx
    ContentCard.tsx
    Feed.tsx
    SearchBar.tsx
    ThemeToggle.tsx
  /features
    /preferences
      preferencesSlice.ts
    /content
      contentApi.ts
      contentSlice.ts
  /pages
    _app.tsx
    index.tsx
    settings.tsx
  /styles
    globals.css
    tailwind.config.js
  /tests
    /unit
    /integration
    /e2e
