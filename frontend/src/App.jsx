import { useEffect, useState } from 'react'
import { AppShell } from './app/AppShell'
import { ROUTES } from './app/routes'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { DashboardPage } from './features/dashboard/pages/DashboardPage'

function getInitialRoute() {
  const path = window.location.pathname
  return Object.values(ROUTES).includes(path) ? path : ROUTES.login
}

function App() {
  const [route, setRoute] = useState(getInitialRoute)

  const navigate = (nextRoute) => {
    window.history.pushState({}, '', nextRoute)
    setRoute(nextRoute)
  }

  useEffect(() => {
    const handlePopState = () => setRoute(getInitialRoute())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (route === ROUTES.register) {
    return <RegisterPage onNavigate={navigate} />
  }

  if (route === ROUTES.dashboard) {
    return (
      <AppShell onNavigate={navigate}>
        <DashboardPage />
      </AppShell>
    )
  }

  return <LoginPage onNavigate={navigate} />
}

export default App
