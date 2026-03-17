# Bookmark Manager App

## Overview

A full-stack bookmark manager built with Next.js, Supabase, and Tailwind CSS. Users can create, edit, archive, pin, search, filter, and organize bookmarks through a responsive interface with light and dark themes.

---

## Features

- User authentication with Supabase
- Create, edit, archive, unarchive, and delete bookmarks
- Pin important bookmarks
- Search bookmarks by title
- Filter bookmarks by tags
- Sort by:
  - Recently added
  - Recently visited
  - Most visited
- Responsive dashboard layout
- Light and dark theme support

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (Auth + Database)
- React Hook Form
- Zod
- Sonner (toasts)

---

## Screenshots

### Dashboard
<!-- Add screenshot here -->

### Archived View
<!-- Add screenshot here -->

### Add Bookmark Modal
<!-- Add screenshot here -->

### Dark Mode
<!-- Add screenshot here -->

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/bookmark-manager.git
cd bookmark-manager

### 2. Install dependencies

npm install

### 3. Add environment variables

Create a `.env.local` file in the root:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000

SEED_USER_EMAIL=
SEED_USER_PASSWORD=

### 4. Run the development server

npm run dev

App will run on:

http://localhost:3000

---

## Seeding Data (Optional)

To populate the database with starter bookmarks:

node scripts/seed-bookmarks.mjs

---

## Environment Variables

NEXT_PUBLIC_SUPABASE_URL – Supabase project URL  
NEXT_PUBLIC_SUPABASE_ANON_KEY – Supabase public anon key  
NEXT_PUBLIC_SITE_URL – App base URL  
SEED_USER_EMAIL – Test user email  
SEED_USER_PASSWORD – Test user password  

---

## Notes

This project started as a Frontend Mentor challenge and was expanded into a full-stack application.

Key decisions:

- URL query params for filtering and sorting
- Supabase for auth and data
- Nested dashboard routes
- Dynamic sidebar counts
- Theme switching with Tailwind

---

## Future Improvements

- Persist theme preference
- Improve accessibility
- Optimize filtering queries
- Bulk bookmark actions
- Metadata previews

---

## Deployment

Deploy with Vercel.

Required env:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

---

## Author

Bryan Lordeus
