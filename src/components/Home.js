import { ref } from 'vue'

export const tasks = ref([])
export const newTitle = ref('')
export const newDate = ref('')
export const newDescription = ref('')
export const newPriority = ref('low') // Default priority
export const newStatus = ref('to-do') // Default status
export const editingIndex = ref(null)
export const selectedTasks = ref([])
export const showSnackbar = ref(false)
export const snackbarMsg = ref('')

export function addTask() {
  if (newTitle.value.trim() && newDate.value.trim() && newDescription.value.trim()) {
    if (editingIndex.value === null) {
      tasks.value.push({
        title: newTitle.value,
        text: newDate.value,
        description: newDescription.value,
        priority: newPriority.value,
        status: newStatus.value,
        done: false
      })
    } else {
      const task = tasks.value[editingIndex.value]
      task.title = newTitle.value
      task.text = newDate.value
      task.description = newDescription.value
      task.priority = newPriority.value
      task.status = newStatus.value
      editingIndex.value = null
    }
    newTitle.value = ''
    newDate.value = ''
    newDescription.value = ''
    newPriority.value = 'low'
    newStatus.value = 'to-do'
  }
}

export function deleteTask(index) {
  const taskToDelete = tasks.value[index];
  const originalIndex = tasks.value.findIndex(task => task === taskToDelete);

  tasks.value.splice(originalIndex, 1);

  if (editingIndex.value === originalIndex) {
    editingIndex.value = null;
    newTitle.value = '';
    newDate.value = '';
    newDescription.value = '';
    newPriority.value = 'low';
    newStatus.value = 'to-do';
  }

  const selIdx = selectedTasks.value.indexOf(originalIndex);
  if (selIdx !== -1) selectedTasks.value.splice(selIdx, 1);
  selectedTasks.value = selectedTasks.value.map(i => i > originalIndex ? i - 1 : i);
}

export function editTask(index) {
  const task = tasks.value[index]
  newTitle.value = task.title
  newDate.value = task.text
  newDescription.value = task.description
  newPriority.value = task.priority
  newStatus.value = task.status
  editingIndex.value = index
}