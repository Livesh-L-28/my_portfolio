# Livesh L. — AI Engineering & Systems Portfolio

> **Production-grade personal portfolio for Livesh L., AI Developer specializing in LLM applications, RAG architectures, AI security, reliability engineering, and Python/FastAPI systems.**

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Fully statically generated for near-instant load times, zero third-party tracking, and 100% reproducible deployment.

---

## ⚡ Key Highlights & Verified Metrics

- **NexaRAG**: 321 passing automated tests · ~24.5 ms average retrieval latency · 7-tier context fusion · dynamic 6,000-token budget ceiling.
- **LLMFirewall Core**: 608+ security tests · published on PyPI (`llmfirewall-core`) · sub-millisecond in-process overhead (~0.02ms).
- **AI Reliability Engine**: 362 passing tests · published on PyPI (`aireliability`) · developer CLI (`airel`).
- **AEGIS Framework**: Published on PyPI (`aegis-resilience`) · multimodal telemetry correlation (Prometheus, Loki, OpenTelemetry) · fail-closed safety governor.
- **Academic Credentials**: B.Tech in Artificial Intelligence & Data Science, Prathyusha Engineering College, CGPA **8.53 / 10** (Expected 2027), no active backlogs.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with React Server Components & Turbopack
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom dark AI studio design system
- **Motion & Interactions**: [Framer Motion](https://www.framer.com/motion/) & Lucide React
- **Visual Aesthetic**:
  - Main background: near-black `#080A12`
  - Secondary background: deep navy `#0D1220`
  - Primary accent: electric violet `#8B5CF6`
  - Secondary accent: cyan `#22D3EE`
  - Main text: soft white `#F5F7FF`
  - Supporting text: muted slate `#9CA3AF`
- **SEO & Accessibility**: Dynamic `sitemap.xml`, `robots.txt`, OpenGraph metadata, semantic HTML, and ARIA landmarks.

---

## 📂 Project Structure

```text
my_portfolio/
├── app/
│   ├── layout.tsx              # Root layout with Geist typography & SEO metadata
│   ├── page.tsx                # Portfolio home page assembling all key sections
│   ├── globals.css             # Design tokens, technical grid patterns, custom scrollbars
│   ├── not-found.tsx           # Terminal-styled 404 handler
│   ├── sitemap.ts              # Programmatic SEO XML sitemap generator
│   ├── robots.ts               # Programmatic robots.txt configuration
│   ├── projects/
│   │   ├── page.tsx            # Full project directory with search and category filters
│   │   └── [slug]/page.tsx     # Deep-dive interactive case study template
│   ├── experience/page.tsx     # Industry experience timeline
│   ├── skills/page.tsx         # 6-domain capability matrix
│   ├── about/page.tsx          # Professional background & credentials
│   └── contact/page.tsx        # Direct contact & collaboration hub
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Responsive sticky navigation bar & mobile drawer
│   │   └── Footer.tsx          # Studio footer with verified profile links
│   ├── ui/
│   │   ├── Badge.tsx           # Technical badge component
│   │   ├── Button.tsx          # Accessible button variants
│   │   ├── CodeBlock.tsx       # Copyable terminal/pip command snippet
│   │   ├── Icons.tsx           # Vector SVG icons for GitHub & LinkedIn
│   │   └── InteractiveGraph.tsx# Interactive AI Systems Architecture Topology
│   ├── projects/
│   │   ├── ProjectCard.tsx     # Rich project card with verified action links
│   │   ├── ProjectGrid.tsx     # Filterable, searchable, and sortable project grid
│   │   ├── ProjectFilters.tsx  # Category tabs and instant search bar
│   │   ├── ProjectArchitecture.tsx # Interactive pipeline stage inspector
│   │   └── VideoModal.tsx      # Native in-portfolio video demonstration player
│   └── home/
│       ├── Hero.tsx            # First-screen hero with headline, proof points & graph
│       ├── AboutPreview.tsx    # "Engineering AI Beyond the Prototype"
│       ├── FeaturedProjects.tsx# Core systems spotlight
│       ├── OpenSourceImpact.tsx# PyPI distributions with copyable pip commands
│       ├── CapabilityMap.tsx   # 6-domain engineering capability matrix
│       ├── ExperienceTimeline.tsx # Chargebee, XARC, Femtosoft, Cognifyz timelines
│       ├── EducationSection.tsx# Prathyusha Engineering College & certifications
│       └── ContactSection.tsx  # Direct collaboration hub & email actions
├── data/
│   ├── projects.ts             # Typed central project registry (10 projects)
│   ├── experience.ts           # Industry internship history
│   ├── skills.ts               # Structured engineering competencies
│   └── certifications.ts       # Verified academic certifications
├── lib/
│   ├── links.ts                # Verified links, URL validation & video embed logic
│   └── types.ts                # TypeScript interfaces and domain models
└── public/
    ├── resume/
    │   └── Livesh_L_Resume.pdf # Verified downloadable resume PDF
    ├── videos/                 # Verified project demonstration recordings
    │   ├── nexa_rag_demo.mov   # NexaRAG walkthrough
    │   ├── medical_llm_demo.mov# MedicalTransformerLM walkthrough
    │   └── leviathan_demo.mp4  # Leviathan audit platform walkthrough
    └── images/                 # Project UI screenshots
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher

### Installation
```bash
# 1. Clone repository or navigate to directory
cd /Users/livesh/my_portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Test
```bash
# Run TypeScript compilation and generate static pages
npm run build

# Start local production server
npm run start
```

---

## 📦 Verified Published PyPI Packages

Install Livesh's open-source packages directly from PyPI:

```bash
# In-process defense framework for LLMs and agents
pip install llmfirewall-core

# Deterministic testing and regression framework
pip install aireliability

# Autonomous reliability engineering & remediation
pip install aegis-resilience
```

---

## 🎥 Adding or Updating Demonstration Videos

Project video paths and embeds are configured in `data/projects.ts` under the `links.demoVideoUrl` attribute.

1. **Local Video Files**: Place `.mp4`, `.webm`, or `.mov` files into the `public/videos/` directory and set:
   ```typescript
   demoVideoUrl: "/videos/your_project_demo.mp4",
   demoVideoType: "local",
   ```
2. **YouTube / Vimeo**: Supply the public watch link directly (e.g. `https://youtube.com/watch?v=...`). The `VideoModal` automatically transforms it into a privacy-enhanced, responsive embed.
3. **Hide Demo Button**: If no video exists for a project, leave `demoVideoUrl` as `undefined`. The portfolio automatically hides the demo button without broken links or placeholders.

---

## 📄 Updating the Resume PDF

To update the resume:
1. Replace `public/resume/Livesh_L_Resume.pdf` with the updated PDF.
2. The Navbar, Hero, About, and Contact sections automatically reference this path (`/resume/Livesh_L_Resume.pdf`).

---

## 🌐 Deploying to Vercel

The portfolio is architected for zero-configuration deployment to [Vercel](https://vercel.com/):

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete production portfolio for Livesh L."
   git push origin main
   ```
2. Import the project in Vercel:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Click **Deploy**. Vercel will statically generate all 22 pages and host them on their global edge network.

---

## 👤 Author & Contact

- **Developer**: Livesh L.
- **Email**: [liveshjaidj@gmail.com](mailto:liveshjaidj@gmail.com)
- **LinkedIn**: [linkedin.com/in/livesh-l-aa9821322](https://linkedin.com/in/livesh-l-aa9821322)
- **GitHub**: [github.com/Livesh-L-28](https://github.com/Livesh-L-28)
- **Education**: B.Tech AI & Data Science, Prathyusha Engineering College (CGPA: 8.53/10)
