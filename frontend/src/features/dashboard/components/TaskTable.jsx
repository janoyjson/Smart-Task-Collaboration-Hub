function getStatusClass(status) {
  return status.toLowerCase().replaceAll(' ', '-')
}

export function TaskTable({ tasks }) {
  return (
    <section className="task-section" aria-labelledby="task-list-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Current sprint</span>
          <h2 id="task-list-title">Task list</h2>
        </div>
        <button type="button" className="primary-button compact">
          New task
        </button>
      </div>

      <div className="task-table-wrap">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Project</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <strong>{task.title}</strong>
                </td>
                <td>{task.project}</td>
                <td>{task.assignee}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td>{task.priority}</td>
                <td>{task.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
