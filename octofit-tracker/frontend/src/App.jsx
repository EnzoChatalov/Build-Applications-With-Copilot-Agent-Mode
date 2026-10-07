import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { path: '/users', label: 'Members', icon: 'bi-people' },
  { path: '/teams', label: 'Teams', icon: 'bi-flag' },
  { path: '/activities', label: 'Activities', icon: 'bi-activity' },
  { path: '/leaderboard', label: 'Leaderboard', icon: 'bi-trophy' },
  { path: '/workouts', label: 'Workouts', icon: 'bi-lightning-charge' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header-inner">
          <NavLink className="brand" to="/users" aria-label="OctoFit Tracker home">
            <img src="/octofitapp-small.png" alt="" className="brand-logo" />
            <span>
              <strong>OctoFit</strong>
              <small>FITNESS TRACKER</small>
            </span>
          </NavLink>
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map(({ path, label, icon }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                key={path}
                to={path}
              >
                <i className={`bi ${icon}`} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
          <span className="header-status">
            <span className="status-dot" />
            Activity hub
          </span>
        </div>
      </header>

      <main className="container app-main">
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="container d-flex justify-content-between align-items-center">
          <span>Small steps. Stronger together.</span>
          <span>OctoFit Tracker</span>
        </div>
      </footer>
    </div>
  )
}

export default App
