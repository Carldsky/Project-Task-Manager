<script setup>
import { tasks, newTitle, newDate, newDescription, newPriority, newStatus, editingIndex, selectedTasks, addTask, deleteTask, editTask } from './Home.js'
import { computed } from 'vue'

// Computed property to sort tasks by priority
const sortedTasks = computed(() => {
  const priorityOrder = { low: 1, medium: 2, high: 3 }
  return [...tasks.value].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
})
</script>

<template>
  <h1 class="TITLE">Task Manager</h1>
  <div class="container-new">   
    <div class="add-task-new">
      <input v-model="newTitle" placeholder="Task Title" class="input-title" />
      <textarea v-model="newDescription" placeholder="Task Description" class="input-description"></textarea>
      <div class="bottom">
        <div class="bottom-container">
          <label for="date">Due Date:</label>
          <input type="date" v-model="newDate" class="input-date" />
        </div>
        <div class="bottom-container">
          <label for="priority">Priority:</label>
          <select v-model="newPriority" class="input-priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="bottom-container">
          <label for="status">Status:</label>
          <select v-model="newStatus" class="input-status">
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button class="add-btn" @click="addTask">
          {{ editingIndex === null ? 'Add' : 'Save' }}
        </button>
        <button class="can-btn" v-if="editingIndex !== null" @click="() => { editingIndex = null; newTitle = ''; newDate = ''; newDescription = ''; newPriority = 'low'; newStatus = 'to-do'; }" style="margin-left:8px;">
          Cancel
        </button>
      </div>
    </div>
  </div>
  <div class="container-new-bottom">
    <div v-if="sortedTasks.length" class="task-list">
      <div v-for="(task, idx) in sortedTasks"
        :key="idx"
        class="task-item"
        :style="{ borderBottom: idx !== sortedTasks.length - 1 ? '1px solid Blue' : 'none' }">
        <div class="task-info">

          <div class="task-container">
            <span class="task-title">{{ task.title }}</span>
            <span class="task-date">{{ task.text }}</span>
            <span class="task-description">{{ task.description }}</span>
            <span class="task-priority">Priority: {{ task.priority }}</span>
            <span class="task-status">Status: {{ task.status }}</span>
          </div>
        </div>       
        <div class="task-actions">

          <button class="edit" @click="editTask(tasks.findIndex(t => t === task))">Edit</button><br>
          <button class="delete" @click="deleteTask(tasks.findIndex(t => t === task))">Delete</button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>No tasks yet. Add your first task!</p>
    </div>
  </div>
  <div v-if="showSnackbar" class="snackbar">{{ snackbarMsg }}</div>
</template>
<style>

.TITLE {
  text-align: center;
  color: White;
  margin-top: 20px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}

.container-new {
  max-width: 90%;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 32px 24px 24px 24px;
}
.empty-state {
  max-width: 90%;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 32px 24px 24px 24px;
}
.container-new-bottom {
  max-width: 90%;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 0px 24px 0 24px;
}
.add-task-new {
  padding: 5px 0 0 0;
  border-radius: 8px;
}
.input-title{
  width: 98.5%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #3182ce;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.2s;
}

.input-description {
  width: 98.5%;
  height: 80px;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #3182ce;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.2s;
}


.input-description:focus, .input-title:focus {
  border: 1.5px solid #3182ce;
  outline: none;
}

.input-priority, .input-status {
  width: 70%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #3182ce;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.2s;
}

.input-date {
  width: 70%;
  align-items: center;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #3182ce;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.2s;
}
.input-title:focus, .input-date:focus {
  border: 1.5px solid #3182ce;
  outline: none;
}
.bottom {
  display: flex;
  gap: px;
  align-items: center;
  justify-content: space-around;
}
.add-btn {
  margin-top: -15px;
  background: linear-gradient(90deg, #3182ce 0%, #63b3ed 100%);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(49,130,206,0.08);
}
.add-btn:hover {
  background: linear-gradient(90deg, #2563eb 0%, #4299e1 100%);
}
.can-btn {
  margin-top: -15px;
  color: black;
  border: 1px solid red;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(49,130,206,0.08);
}
.can-btn:hover {
  background: red;
  color: white;
}
.task-list {
  margin-top: 24px;
}
.task-item {
  background: #f1f5f9;
  padding: 14px 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}
.task-title {
  font-weight: 600;
  color: #2d3748;
  font-size: 16px;
  margin: 10px 0 10px 0;
}
.task-date {
  color: #718096;
  font-size: 14px;
}
.task-container {

  display: flex;
  margin-left: 20px;
  flex-direction: column;
  align-items: start;
  flex: 1;
  width: 100%;
}
.task-info {
  margin-left: -10px;
  align-items: center;
  display: flex;
  width: 100%;
}

.task-description {
  color: #4a5568;
  font-size: 14px;
  margin-top: 4px;
}

.task-priority, .task-status {
  color: #2d3748;
  font-size: 14px;
  margin-top: 4px;
}

.empty-state {
  text-align: center;
  color: #a0aec0;
  margin-top: 32px;
  font-size: 15px;
}
.task-actions {
  display: flex;
  margin-right: -19px;
  flex-direction: column;
  align-items: center;
}
.edit{
  color: black;
  border:1px solid green;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(49,130,206,0.08);
}
.edit:hover {
  background: green;
  color: white;
}
.delete {

  color: black;
  border:1px solid red;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(49,130,206,0.08);
}
.delete:hover {
  background: red;
  color: white;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
  color: #333;
}

.bottom-container {
  width: 20%;
  display: block;
  padding : 12px;
  flex-direction: column;
  margin-bottom: 1rem;
}
</style>