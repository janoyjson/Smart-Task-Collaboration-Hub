import { ROUTES } from '../../../app/routes'

export function LoginPage({ onNavigate }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onNavigate(ROUTES.dashboard)
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-copy">
          <span className="eyebrow">Project workspace</span>
          <h1 id="login-title">Welcome back</h1>
          <p>
            Manage project tasks, review deadlines, and keep team progress clear
            from one focused dashboard.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" placeholder="admin@fcj.com" required />
          </label>

          <label>
            Password
            <input type="password" placeholder="Enter password" required />
          </label>

          <button type="submit" className="primary-button">
            Login
          </button>

          <p className="form-switch">
            New to Smart Task?
            <button type="button" onClick={() => onNavigate(ROUTES.register)}>
              Create account
            </button>
          </p>
        </form>
      </section>
    </main>
  )
}
