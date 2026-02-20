const API_DELAY = 1000;
const FAILURE_RATE = 0;

let tasks = [
  { id: 'task-1', columnId: 'todo', title: 'Plan project sprint', description: 'Outline epics and user stories.', position: 0 },
  { id: 'task-2', columnId: 'inprogress', title: 'Develop authentication module', description: 'Implement JWT-based authentication.', position: 0 }
];
let columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

const simulateApiCall = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error('Network error or API failure.'));
      } else {
        resolve(data);
      }
    }, API_DELAY);
  });
};

export const fetchTasks = () => simulateApiCall(tasks);
export const fetchColumns = () => simulateApiCall(columns);
export const addTaskApi = (task) => {
  const columnTasks = tasks.filter(t => t.columnId === task.columnId);
  task.position = columnTasks.length;
  return simulateApiCall(task).then(res => { tasks.push(res); return res; });
};
export const updateTaskApi = (updatedTask) => simulateApiCall(updatedTask).then(res => {
  tasks = tasks.map(t => t.id === res.id ? res : t);
  return res;
});
export const deleteTaskApi = (taskId) => simulateApiCall({ id: taskId }).then(() => {
  tasks = tasks.filter(t => t.id !== taskId);
  return { success: true };
});
export const moveTaskApi = (taskId, newColumnId, newPosition) => simulateApiCall({ taskId, newColumnId, newPosition }).then(() => {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    const [movedTask] = tasks.splice(taskIndex, 1);
    movedTask.columnId = newColumnId;
    movedTask.position = newPosition;
    tasks.splice(newPosition, 0, movedTask);
  }
  return { success: true };
});