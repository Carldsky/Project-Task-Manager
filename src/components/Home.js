// FILE: Home.js
import { ref } from 'vue'

export const tasks = ref([])
export const newTitle = ref('')
export const newDate = ref('')
export const editingIndex = ref(null)
export const selectedTasks = ref([])
export const showSnackbar = ref(false)
export const snackbarMsg = ref('')

export function addTask() {
  if (newTitle.value.trim() && newDate.value.trim()) {
    if (editingIndex.value === null) {
      tasks.value.push({ title: newTitle.value, text: newDate.value, done: false })
    } else {
      tasks.value[editingIndex.value].title = newTitle.value
      tasks.value[editingIndex.value].text = newDate.value
      editingIndex.value = null
    }
    newTitle.value = ''
    newDate.value = ''
  }
}

export function deleteTask(index) {
  tasks.value.splice(index, 1)
  if (editingIndex.value === index) {
    editingIndex.value = null
    newTitle.value = ''
    newDate.value = ''
  }
  const selIdx = selectedTasks.value.indexOf(index)
  if (selIdx !== -1) selectedTasks.value.splice(selIdx, 1)
  selectedTasks.value = selectedTasks.value.map(i => i > index ? i - 1 : i)
}

export function editTask(index) {
  const task = tasks.value[index]
  newTitle.value = task.title
  newDate.value = task.text
  editingIndex.value = index
}