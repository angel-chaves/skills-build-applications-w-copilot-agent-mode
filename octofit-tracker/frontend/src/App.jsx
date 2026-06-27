import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const apiBaseUrl = window.location.hostname.includes('app.github.dev')
  ? window.location.origin.replace('-5173.', '-8000.')
  : 'http://localhost:8000'

const metrics = [
  { label: 'Tracked workouts', value: '2.4k+' },
  { label: 'Active teams', value: '86' },
  { label: 'Leaderboard refresh', value: 'Live' },
]

const highlights = [
  'React 19 + Vite frontend on port 5173',
  'Express + TypeScript API on port 8000',
  'MongoDB + Mongoose data layer on port 27017',
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />} />
    </Routes>
  )
}

function Shell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark">
          <img src="/octofit-logo.png" alt="OctoFit Tracker logo" />
          <div>
            <span>OctoFit Tracker</span>
            <p>Modern multi-tier fitness platform</p>
          </div>
        </div>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/">Overview</NavLink>
          <a href={`${apiBaseUrl}/api/health`} target="_blank" rel="noreferrer">
            API Health
          </a>
        </nav>
      </header>

      <main className="hero-grid">
        <section className="hero-copy card-panel">
          <span className="eyebrow">React 19 • Vite • Bootstrap</span>
          <h1>Track workouts, teams, and leaderboards in one place.</h1>
          <p className="lead-copy">
            The frontend is ready on port 5173, the Express API is aligned to port
            8000, and the Mongoose data layer is configured for MongoDB on port
            27017.
          </p>

          <div className="hero-actions">
            <a className="btn btn-accent" href={`${apiBaseUrl}/api/health`} target="_blank" rel="noreferrer">
              Check backend
            </a>
            <a className="btn btn-outline-light" href="https://react.dev" target="_blank" rel="noreferrer">
              React 19 docs
            </a>
          </div>
        </section>

        <aside className="status-panel card-panel">
          <h2>Bootstrapped tiers</h2>
          <ul className="highlight-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </main>

      <section className="metrics-row">
        {metrics.map((metric) => (
          <article className="metric-card card-panel" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>
    </div>
  )
}

export default App
