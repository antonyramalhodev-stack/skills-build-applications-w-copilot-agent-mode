import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './Dashboard.css';

const navigation = [
  { label: 'Activities', path: '/activities', number: '01' },
  { label: 'Leaderboard', path: '/leaderboard', number: '02' },
  { label: 'Teams', path: '/teams', number: '03' },
  { label: 'Users', path: '/users', number: '04' },
  { label: 'Workouts', path: '/workouts', number: '05' },
];

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/activities" aria-label="Octofit Tracker home">
          <img src="/octofitapp-small.png" alt="" />
          <span>octofit<span className="brand-light">tracker</span></span>
        </a>

        <div className="sidebar-caption">YOUR CLUB</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            >
              <span className="nav-number">{item.number}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-mark" aria-hidden="true">O</span>
          <span>OCTOFIT<br /><strong>MOVE TOGETHER</strong></span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="breadcrumb"><span>OCTOFIT</span><i>/</i> TRACKER</div>
          <div className="connection-state"><span /> COMMUNITY BOARD</div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}