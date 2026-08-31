# 🌆 Cyberpunk Portfolio

> **SYSTEM STATUS:** `STABLE // ONLINE`  
> An ultra-immersive, high-performance personal developer portfolio website inspired by futuristic Cyberpunk aesthetics, HUD interfaces, neon optics, and 3D graphics.

---

## 🌟 Highlights & Features

- **🎮 Cyberpunk Aesthetic & Dual Themes**: Futuristic neon dark mode with glassmorphism, glitch text effects, scanner laser lines, and a sleek light mode with instant theme toggling.
- **⚡ 3D Graphics & Interactive Canvas**: Dynamic 3D background elements powered by Three.js, `@react-three/fiber`, and `@react-three/drei`.
- **🚀 Smooth Motion & Micro-Animations**: Buttery smooth UI transitions, 3D card tilt physics, and parallax scroll effects powered by Framer Motion and GSAP.
- **📁 Interactive Project Decrypt Archives**: Interactive 3D tilt project cards featuring detailed project modals, tech badges, capabilities log, GitHub source links, and live demos.
- **🎯 Custom Target Cursor**: Futuristic neon cursor with dynamic magnetic hover effects and state-based trailing optics.
- **🔊 Cyberpunk Audio Engine**: Toggleable audio context providing ambient cyber sounds and feedback.
- **📬 Web3Forms Contact Terminal**: Functional contact form powered by Web3Forms for direct message delivery to email without backend code.
- **📱 Fully Responsive Layout**: Built with Tailwind CSS v4, optimized for desktop displays down to mobile viewports.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Core Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Glassmorphism |
| **3D & Canvas** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/) |
| **Form Integration** | [Web3Forms API](https://web3forms.com/) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Orbitron, Rajdhani, Fira Code |

---

## ⚙️ Environment Variables

The project uses [Web3Forms](https://web3forms.com/) to process contact form submissions without requiring a custom backend server.

1. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

2. Add your Web3Forms access key:
   ```env
   # Web3Forms Access Key for Contact Form Submission
   VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
   ```


---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0 or higher) installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shreyas142004/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Set up your Web3Forms access key in the `.env` file:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=27324548-04fc-4366-9e94-405ce17207f1
   ```

4. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your web browser.

---

## 🏗️ Production Build

To build the project for production distribution:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The optimized static assets will be output to the `dist/` folder, ready for deployment on platforms such as Vercel, Netlify, or GitHub Pages.

---

## 📂 Project Architecture

```
cyberpunk-portfolio/
├── public/                 # Static assets (images, icons, resume PDF)
├── src/
│   ├── assets/            # Project graphic assets & media
│   ├── components/        # React UI components
│   │   ├── About.jsx          # Bio & HUD experience terminal
│   │   ├── Academics.jsx      # Educational records & grades
│   │   ├── AudioContext.jsx   # Ambient cyber audio manager
│   │   ├── Background.jsx     # 3D canvas background & lights
│   │   ├── Certificates.jsx   # Credentials & interactive preview
│   │   ├── Contact.jsx        # Web3Forms contact submission form
│   │   ├── CustomCursor.jsx   # Interactive target tracker cursor
│   │   ├── Hero.jsx           # Main title banner & interactive 3D hero
│   │   ├── Layout.jsx         # Global page wrapper & grid overlay
│   │   ├── Navbar.jsx         # Cyber HUD header & theme toggle
│   │   ├── Projects.jsx       # 3D tilted project archives & modal
│   │   ├── Skills.jsx         # Technical proficiency matrix
│   │   └── ThemeContext.jsx   # Dark/Light cyberpunk theme switcher
│   ├── App.jsx            # Main app shell & routing
│   ├── index.css          # Cyberpunk design system & keyframe animations
│   └── main.jsx           # App entry point
├── .env                   # Environment variable secrets (ignored by Git)
├── .gitignore             # Git ignore configurations
├── package.json           # Dependencies & build scripts
├── README.md              # Project documentation
└── vite.config.js         # Vite configuration file
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p center align="center">
  Crafted with ⚡ and 🌆 Cyberpunk Passion by <strong>Shreyas R A</strong>
</p>
