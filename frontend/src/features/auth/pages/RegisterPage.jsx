import { ROUTES } from '../../../app/routes'

export function RegisterPage({ onNavigate }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onNavigate(ROUTES.dashboard)
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="register-title">
        <div className="auth-copy">
          <span className="eyebrow">Team onboarding</span>
          <h1 id="register-title">Create your account</h1>
          <p>
            Start with a clean workspace for projects, assignees, deadlines, and
            task status tracking.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input type="text" placeholder="Nguyen Van A" required />
          </label>

          <label>
            Email
            <input type="email" placeholder="member@fcj.com" required />
          </label>

          <label>
            Role
            <select defaultValue="member">
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label>
            Password
            <input type="password" placeholder="Create password" required />
          </label>

          <button type="submit" className="primary-button">
            Register
          </button>

          <p className="form-switch">
            Already have an account?
            <button type="button" onClick={() => onNavigate(ROUTES.login)}>
              Back to login
            </button>
          </p>
        </form>
      </section>
    </main>
  )
}
