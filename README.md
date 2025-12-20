# Question Paper Generation Web App

A frontend-only Question Paper Generator built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Supabase:**
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Get these from: https://app.supabase.com → Your Project → Settings → API

3. **Setup Database Schema:**
   - Open your Supabase project dashboard
   - Go to SQL Editor
   - Copy and run the SQL from `SUPABASE_SCHEMA.sql` file
   - This will create the `questions` table with proper indexes and RLS policies

4. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📁 Project Structure

```
/app
  /page.jsx              - Landing page
  /dashboard              - Main dashboard
  /generate               - Question paper generation
  /questions              - Question bank management
    /add                  - Add new questions
/lib
  supabase.js             - Supabase client configuration
/components
  - QuestionPaperTemplate.jsx
  - Section.jsx
  - QuestionItem.jsx
```

## ✨ Features

- **Add Questions**: Store questions with marks, subject, unit, and difficulty
- **View Questions**: Browse and filter questions by subject and marks
- **Generate Papers**: Create randomized question papers based on marks
- **Subject Filtering**: Generate papers for specific subjects
- **PDF Download**: Download generated papers as PDF files
- **No Authentication**: Open access - no sign-in required

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router)
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS
- **PDF Generation:** html2pdf.js

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
