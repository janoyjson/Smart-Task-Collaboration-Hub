
CREATE TABLE users (
	user_ID SERIAL PRIMARY KEY,
	email VARCHAR(225) UNIQUE NOT NULL,
	password_hash VARCHAR(225) NOT NULL,
	full_name VARCHAR(100) NOT NULL,
	user_role VARCHAR(50)  NOT NULL DEFAULT 'MEMBER' CHECK (user_role IN ('ADMIN', 'MEMBER')),
	is_premium BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
	project_ID SERIAL PRIMARY KEY,
	project_name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	created_by INTEGER NOT NULL,
	CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES users(user_ID),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_members (
	project_ID INTEGER NOT NULL,
    user_ID INTEGER NOT NULL,

    CONSTRAINT pk_project_member PRIMARY KEY (project_ID, user_ID),

    CONSTRAINT fk_project_member FOREIGN KEY (project_ID) REFERENCES projects(project_ID) ON DELETE CASCADE,
    CONSTRAINT fk_user_member FOREIGN KEY (user_ID) REFERENCES users(user_ID) ON DELETE CASCADE
);

CREATE TABLE tasks (
	taskID SERIAL PRIMARY KEY,
    project_ID INTEGER NOT NULL,
    CONSTRAINT fk_project_id FOREIGN KEY (project_ID) REFERENCES projects(project_ID) ON DELETE CASCADE,
	title VARCHAR(200) NOT NULL,
	task_description TEXT NOT NULL,
	task_status VARCHAR(50) NOT NULL DEFAULT 'To do' CHECK (task_status IN ('To-do', 'To do', 'In Progress', 'Review', 'Done')),
	assigned_to INTEGER NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (assigned_to) REFERENCES users(user_ID) ON DELETE CASCADE,
	due_date TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

