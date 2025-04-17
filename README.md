# 🌱 Garden Imagination

This is a full-stack application built using the **MEAN stack** (MongoDB, Express.js, Angular, Node.js), organized as a monorepo with separate frontend and backend folders.

---

## 📁 Project Structure

```
Garden-Imagination/
│
├── Garden-Imagination-Frontend/     → Angular 16 app
└── Garden-Imagination-Backend/      → Express.js API with TypeScript
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v16 or later)
- MongoDB
- Angular CLI (`npm install -g @angular/cli`)
- TypeScript (`npm install -g typescript`)

---

## 💽 Frontend

**Location**: `Garden-Imagination-Frontend/`\
**Framework**: Angular 16

### 🔨 Development server

```bash
cd Garden-Imagination-Frontend
npm install
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload when source files change.

### 🛠 Useful Angular CLI commands

- Generate component: `ng generate component component-name`
- Generate other elements: `ng generate directive|pipe|service|class|guard|interface|enum|module`

### 🏗️ Build

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.

### ✅ Running Tests

- **Unit Tests**: `ng test` (uses [Karma](https://karma-runner.github.io))
- **End-to-End Tests**: `ng e2e` (requires a configured E2E framework)

---

## 🔙 Backend

**Location**: `Garden-Imagination-Backend/`\
**Framework**: Express.js with TypeScript

### ▶️ Start Backend Server

```bash
cd Garden-Imagination-Backend
npm install
tsc       # Compiles TypeScript to JavaScript
npm run serve
```

The server runs on `http://localhost:4000/` (or your configured port).

### 🏗️ Scripts

- `tsc` — Compile TypeScript code
- `npm run serve` — Start compiled backend server

### 📦 Output

Compiled files are stored in the `dist/` directory.

---

## 📚 Technologies Used

### Frontend
- Angular 16
- TypeScript
- Bootstrap
- Leaflet (map rendering)
- Google reCAPTCHA v2/v3 (bot protection)
- AG Charts Angular
- CryptoJS (hashing)

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- Multer (file upload handling)

### Dev Tools
- Angular CLI
- TypeScript Compiler
- Nodemon (optional)


---

## 📝 Notes

- This monorepo simplifies deployment, version control, and CI/CD.
- Environment-specific variables should be stored in `.env` files in both frontend and backend (ignored via `.gitignore`).
- Empty Express.js and Angular projects should be created first and then copying these files inside.

---

## 📬 Contact

For questions, ideas, or contributions — feel free to reach out!

