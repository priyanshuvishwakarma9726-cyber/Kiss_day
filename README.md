# Kiss Day Special Website 💋

This is a romantic, single-page web application built for Kiss Day. It features a responsive design, interactive animations, and a backend to store memories and secret messages. 

## Features

- **Hero Section:** Animated typing text and floating hearts.
- **Love Letter:** Scroll-based revealing love letter.
- **Memory Gallery:** Upload photos and captions (stored in TiDB).
- **Virtual Kiss:** Interactive button with heart explosion animation.
- **Secret Message:** Password-protected hidden message.
- **Promise Section:** A heartfelt promise.
- **Background Music:** Toggleable romantic music.

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes (Node.js)
- **Database:** TiDB (MySQL Compatible)
- **Styling:** Tailwind CSS + Custom Animations

## Setup Instructions

### 1. Prerequisites

- Node.js installed (v18 or higher recommended)
- A **TiDB Cloud** account (Free Serverless Tier is perfect)

### 2. Database Setup

1. Log in to your TiDB Cloud console.
2. Create a generic free cluster.
3. Once created, get your connection details (Host, User, Password, Port).
4. Go to the `SQL Editor` in TiDB Cloud or use a MySQL client to run the `schema.sql` provided in this repo.
   - This creates the `memories` and `secret_messages` tables.

### 3. Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and fill in your TiDB credentials.

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the magic! 

## Deployment (Vercel)

1. Push this code to GitHub.
2. Go to Vercel and import the project.
3. In the Vercel dashboard, go to **Settings > Environment Variables**.
4. Add all the key-value pairs from your `.env.local` (TIDB_HOST, etc.).
5. Deploy!

## Customization

- **Music:** Replace the audio URL in `src/components/MusicPlayer.tsx` with your own hosted MP3 link.
- **Secret Password:** The default password is `mylove`. You can change this by updating the row in the `secret_messages` table via SQL.
  ```sql
  UPDATE secret_messages SET password = 'newpassword', message = 'New message' WHERE id = 1;
  ```

Happy Kiss Day! ❤️
