# SkillPulse 🚀

A modern SaaS platform for developers to manage and showcase their skills and projects.

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Clerk** - Authentication and user management
- **Convex** - Backend and database
- **TanStack Form** - Powerful form management
- **Zod** - Schema validation
- **Recharts** - Data visualization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd skill-pulse
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
skill-pulse/
├── app/
│   ├── (auth)/          # Authentication routes
│   ├── dashboard/       # Dashboard page
│   ├── skills/          # Skills management
│   ├── projects/        # Projects management
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # shadcn/ui components
│   └── navbar.tsx       # Navigation bar
└── lib/
    └── utils.ts         # Utility functions
```

## ✨ Features

- 🔐 **Secure Authentication** - Powered by Clerk
- 📚 **Skill Management** - Track skills with levels and tags
- 🚀 **Project Portfolio** - Showcase your work
- 📊 **Visual Dashboard** - Charts and analytics
- 🎨 **Modern UI** - Responsive design with dark mode
- ⚡ **Real-time Sync** - Convex backend

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
