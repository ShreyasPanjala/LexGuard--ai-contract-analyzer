# LexGuard AI

> **An AI-powered Contract Clause Risk Tagger** — Instantly identify risky clauses in legal contracts using the power of AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

---

## 🚧 Status

> **Initial Project Setup** — Application logic is not yet implemented.

| Integration | Status |
|---|---|
| Core Frontend (React + Vite) | ✅ Scaffolded |
| Core Backend (Express) | ✅ Scaffolded |
| AI Integration | 🔜 Planned |
| x402 Payment Integration | 🔜 Planned |
| Algorand Blockchain | 🔜 Planned |

---

## ✨ Overview

LexGuard AI analyzes uploaded contract documents (PDF, DOCX) and tags clauses by risk level, empowering legal teams, startups, and individuals to quickly surface potentially problematic language in agreements.

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [React Router DOM](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express](https://expressjs.com/) | Web framework |
| [Multer](https://github.com/expressjs/multer) | File upload handling |
| [pdf-parse](https://www.npmjs.com/package/pdf-parse) | PDF text extraction |
| [mammoth](https://www.npmjs.com/package/mammoth) | DOCX text extraction |
| [CORS](https://www.npmjs.com/package/cors) | Cross-origin resource sharing |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |
| [Nodemon](https://nodemon.io/) | Dev auto-restart |

---

## 📁 Project Structure

```
lexguard-ai/
├── frontend/                   # React + Vite frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, fonts, static media
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layouts/            # Page layout wrappers
│   │   ├── pages/              # Route-level page components
│   │   ├── services/           # Axios API service modules
│   │   ├── styles/             # Global & shared styles
│   │   ├── utils/              # Helper utilities
│   │   ├── App.jsx             # Root application component
│   │   └── main.jsx            # React entry point
│   ├── index.html              # HTML shell
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   └── vite.config.js          # Vite configuration
│
├── backend/                    # Express API backend
│   ├── config/                 # Configuration modules
│   ├── controllers/            # Route handler logic
│   ├── middleware/             # Express middleware
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic services
│   ├── uploads/                # Uploaded contract files (gitignored)
│   ├── utils/                  # Helper utilities
│   └── server.js               # Express server entry point
│
├── docs/                       # Project documentation
├── .editorconfig               # Editor formatting rules
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
└── README.md                   # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) v9 or later

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server will start at **http://localhost:5173**

#### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend API server will start at **http://localhost:5000**

#### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start server with Nodemon (auto-restart) |
| `npm start` | Start server with Node.js |

---

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development

# AI Integration (coming soon)
# AI_API_KEY=your_key_here

# x402 Integration (coming soon)
# X402_API_KEY=your_key_here

# Algorand (coming soon)
# ALGORAND_NODE_URL=your_url_here
```

---

## 📚 Documentation

Additional documentation lives in the [`docs/`](./docs/) directory.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<p align="center">Built with ❤️ for the Hackathon</p>
