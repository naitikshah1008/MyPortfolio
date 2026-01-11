# Portfolio Frontend

Modern, animated portfolio built with React + Vite, TailwindCSS, and Framer Motion.

## 🚀 Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```bash
VITE_API_URL=http://localhost:5002
```

3. Start development server:

```bash
npm run dev
```

The app will run on `http://localhost:3001`

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Features

- ✨ Modern, glassmorphism UI design
- 🌓 Dark/Light mode toggle
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🔐 Admin panel with authentication
- 📝 Blog with markdown support
- 💼 Project showcase
- 🎯 Skills display
- 📧 Contact form

## 🛠️ Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- Axios
- Zustand (State Management)
- React Router
- React Hot Toast
- React Icons

## 📂 Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
│   ├── admin/       # Admin panel pages
│   └── ...          # Public pages
├── layouts/         # Layout components
├── store/           # State management
├── utils/           # Utilities and API
└── index.css        # Global styles
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme.

### Content

- Update Hero section in `src/components/Hero.jsx`
- Modify social links in `src/components/Navbar.jsx` and `src/components/Footer.jsx`

## 🔐 Admin Access

Default credentials (after seeding backend):

- Email: `admin@portfolio.com`
- Password: `admin123`

Access admin panel at `/admin` after logging in.

## 📝 TODO - Implement These Features

The following pages need full implementation:

- [ ] Project Detail page with image gallery
- [ ] Skills page with categories and filters
- [ ] Blog list page with search and filters
- [ ] Blog post page with markdown rendering
- [ ] Admin CRUD operations for all entities
- [ ] Drag-and-drop reordering in admin
- [ ] Image upload functionality
- [ ] Rich text editor for blog posts
- [ ] Analytics dashboard

## 🌟 Design Features

- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Gradient Text**: Eye-catching gradient effects
- **Neon Glow**: Hover effects with glow
- **Smooth Animations**: Page transitions and interactions
- **Responsive Grid**: Adapts to all screen sizes
