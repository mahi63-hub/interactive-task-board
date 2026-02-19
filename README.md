# Interactive Real-time Task Board

A highly interactive task management board built with React, featuring Optimistic UI updates and Zustand for state management. This project demonstrates advanced client-side state management patterns, drag-and-drop functionality, and robust error handling.

## Features

- **Optimistic UI Updates**: Immediate UI feedback for all user actions with rollback on API failures
- **Drag and Drop**: Move tasks between columns using @dnd-kit
- **Local Persistence**: Tasks persist across browser sessions using localStorage
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Error Handling**: Comprehensive error messages and loading states
- **Accessibility**: Keyboard navigation and ARIA attributes

## Tech Stack

- React 18
- Vite
- Zustand (state management)
- @dnd-kit (drag and drop)
- Tailwind CSS
- UUID

## Setup and Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/mahi63-hub/interactive-task-board.git
   cd interactive-task-board
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Docker

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Open [http://localhost:80](http://localhost:80) in your browser.

## Project Structure

```
src/
├── components/
│   ├── TaskCard.jsx
│   ├── Column.jsx
│   ├── AddTaskForm.jsx
│   ├── EditTaskModal.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── services/
│   └── mockApi.js
├── store/
│   └── taskStore.js
├── hooks/
├── tests/
├── App.jsx
├── main.jsx
└── index.css
```

## State Management

This project uses Zustand for global state management. The store (`taskStore.js`) handles:

- Fetching initial data
- Optimistic updates for add, edit, delete, and move operations
- Error handling and rollback logic
- Local persistence

## Optimistic UI Logic

Optimistic updates work as follows:

1. User performs an action (e.g., add task)
2. UI updates immediately with the new state
3. API call is made in the background
4. On success: optimistic change is confirmed
5. On failure: UI reverts to previous state and shows error message

## Local Persistence

Task data is automatically saved to localStorage whenever the state changes, ensuring no data loss on page refresh.

## API Contracts

The mock API (`mockApi.js`) simulates the following endpoints:

- `fetchTasks()`: Returns array of tasks
- `fetchColumns()`: Returns array of columns
- `addTaskApi(task)`: Adds a new task
- `updateTaskApi(task)`: Updates an existing task
- `deleteTaskApi(taskId)`: Deletes a task
- `moveTaskApi(taskId, newColumnId, newPosition)`: Moves a task to a new column

All operations have a configurable failure rate (20%) and artificial delay (1s) to simulate real network conditions.

## Testing

Unit tests for the Zustand store and integration tests for optimistic updates are included.

Run tests:
```bash
npm run test
```

## Deployment

The application is containerized with Docker and can be deployed using the provided `docker-compose.yml`.

## Screenshots

(Add screenshots here showing mobile, tablet, and desktop views)

## Video Demo

[Link to video demo]

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
