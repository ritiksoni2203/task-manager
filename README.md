Project task-manager
This is a simple Project Dashboard that lists tasks for a specific project. It allows users to create, view, filter, and delete tasks. The tasks are stored in a MongoDB database, and the frontend is built using Next.js with Tailwind CSS for styling.

Features
Task Creation: Users can create new tasks with details such as title, description, assignee, priority, due date, and status.
Task Filtering: Users can filter tasks based on their status (To Do, In Progress, Completed).
Pagination: Supports infinite scrolling to load tasks in chunks for better performance.
Delete Task: Tasks can be deleted via the UI, with changes reflected in real time.
Real-time Updates: Changes are made without needing to reload the page.
Assumptions
Each task must have a title, status, priority, due date, and assignee.
Data persistence is handled using MongoDB.
Additional Features Implemented
Delete Task Functionality: Allows users to delete tasks, with the task list updating in real time.
Getting Started
Follow these instructions to get a copy of the project running on your local machine.

Prerequisites
Ensure you have the following installed on your machine:

Node.js: v16.x or later
MongoDB: You can either install MongoDB locally or use a cloud service like MongoDB Atlas.
Installation
Clone the repository:

git clone https://github.com/ritiksoni2203/task-manager.git
Navigate to the project directory:

cd project-dashboard
Install the dependencies:

npm install
Set up environment variables:

Create a .env.local file in the root directory and add the following:

Running the Project
Run the development server:

npm run dev
Open your browser and navigate to http://localhost:3000. The Project Dashboard should be running.

API Routes
GET /api/tasks: Fetches all tasks.
POST /api/tasks: Creates a new task.
DELETE /api/tasks/[id]: Deletes a task.
MongoDB Setup
Make sure you have a MongoDB instance running.

Project Structure
pages/: Contains the Next.js pages.
components/: Contains React components used throughout the app (e.g., TaskList, TaskFilter).
api/: Contains the API route handlers for creating, fetching, and deleting tasks.
lib/: Contains utility functions and types used in the project.
