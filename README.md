# NT Store - Next.js 15 Application

A modern food ordering and restaurant management system built with Next.js 15, TypeScript, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **Next.js 15 App Router** - Modern routing with server and client components
- **TypeScript** - Full type safety throughout the application
- **Redux Toolkit** - Efficient state management with async thunks
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Protected Routes** - Role-based access control for admin pages
- **Responsive Design** - Mobile-first responsive layout
- **Image Optimization** - Automatic image optimization with Next.js Image

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API server running on port 8888 (or configure in .env.local)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd nt_store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your API endpoints:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8888/v1
   NEXT_PUBLIC_SERVER_URL=http://localhost:8888/v1
   ```

4. **Copy assets** (if migrating from old structure)
   ```bash
   mkdir -p src/assets/images
   # Copy your images to src/assets/images/
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── restaurant/        # Restaurant pages
│   ├── admin/             # Admin dashboard (protected)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layouts/           # Layout components
│   ├── home/              # Home page components
│   ├── shop/              # Shop components
│   ├── auth/              # Authentication components
│   ├── buttons/           # Button components
│   └── ...
├── lib/                   # Redux store & utilities
│   ├── store.ts           # Redux store configuration
│   ├── hooks.ts           # Typed Redux hooks
│   └── features/          # Redux slices
│       ├── auth/          # Auth state management
│       └── product/       # Product state management
├── hooks/                 # Custom React hooks
└── assets/                # Static assets (images, etc.)
```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8888/v1
NEXT_PUBLIC_SERVER_URL=http://localhost:8888/v1
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run prettier` - Check code formatting
- `npm run prettier:fix` - Fix code formatting

## 🛣️ Routes

### Public Routes
- `/` - Home page with product showcase
- `/restaurant` - Browse all products/restaurants
- `/restaurant/[id]` - Product detail page
- `/login` - User login

### Protected Routes (Admin)
- `/admin` - Admin dashboard
- `/admin/product` - Product management

## 🔐 Authentication

The application uses localStorage for authentication:
- Token stored in `localStorage.token`
- Role stored in `localStorage.role`
- Protected routes check authentication status
- Admin routes require role !== '1'

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Custom Theme** - Configured in `tailwind.config.cjs`
- **Responsive Design** - Mobile-first approach
- **Custom Colors**:
  - `primary` - Main brand color (#F54748)
  - `primary1` - Secondary background
  - `textPrimary` - Primary text color
  - `textSecondary` - Secondary text color
  - `textGray` - Gray text color

## 🧪 Type Safety

The project uses TypeScript with strict mode enabled:
- Type-safe Redux with `RootState` and `AppDispatch`
- Typed hooks (`useAppDispatch`, `useAppSelector`)
- Interface definitions for all components
- Strict null checks and type checking

## 🔄 State Management

Redux Toolkit is used for state management:

### Auth State
- Login/logout functionality
- Profile management
- Token handling

### Product State
- Product listing
- Product details
- Recommended products

## 📱 Responsive Design

The application is fully responsive:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

```bash
npx vercel
```

### Deploy to Other Platforms

Build the application and deploy the `.next` folder along with:
- `package.json`
- `next.config.js`
- `public/` directory (if exists)

## 📝 Migration Notes

This project was migrated from Vite + React Router to Next.js 15. See `MIGRATION_GUIDE.md` for detailed migration information.

## 🐛 Known Issues

1. Image assets need to be placed in `src/assets/images/`
2. Admin dashboard pages are placeholders and need full implementation
3. Mobile navigation menu needs implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is private and proprietary.

## 👤 Author

nthung3@tma.com.vn

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Redux Toolkit for simplified state management
- Tailwind CSS for utility-first styling
- Headless UI for accessible components
