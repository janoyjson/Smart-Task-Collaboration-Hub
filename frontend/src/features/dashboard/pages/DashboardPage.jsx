import { mockTasks } from '../../../shared/mockData/tasks'
import { StatCard } from '../components/StatCard'
import { TaskTable } from '../components/TaskTable'

export function DashboardPage() {
  const totalTasks = mockTasks.length
  const doneTasks = mockTasks.filter((task) => task.status === 'Done').length
  const activeTasks = mockTasks.filter((task) => task.status !== 'Done').length
  const reviewTasks = mockTasks.filter((task) => task.status === 'Review').length

  return (
    <>
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Task overview</h1>
          <p>
            Mock project data for the first frontend milestone. API integration
            can replace this data source later.
          </p>
        </div>
        <button type="button" className="secondary-button">
          Upgrade plan
        </button>
      </header>

      <section className="stats-grid" aria-label="Task statistics">
        <StatCard label="Total tasks" value={totalTasks} tone="neutral" />
        <StatCard label="Active" value={activeTasks} tone="blue" />
        <StatCard label="In review" value={reviewTasks} tone="amber" />
        <StatCard label="Done" value={doneTasks} tone="green" />
      </section>

      <TaskTable tasks={mockTasks} />
    </>
  )
}
