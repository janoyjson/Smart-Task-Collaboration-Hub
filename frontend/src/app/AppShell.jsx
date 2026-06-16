import { ROUTES } from './routes'

export function AppShell({ children, onNavigate }) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="brand">
          <span className="brand-mark">ST</span>
          <div>
            <strong>Smart Task</strong>
            <span>Collaboration Hub</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button type="button" className="nav-item active">
            Dashboard
          </button>
          <button type="button" className="nav-item">
            Projects
          </button>
          <button type="button" className="nav-item">
            Reports
          </button>
        </nav>

        <button
          type="button"
          className="secondary-button full-width"
          onClick={() => onNavigate(ROUTES.login)}
        >
          Sign out
        </button>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  )
}
