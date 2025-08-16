<template>
  <div id="app">
    <h1 class="title">✨ Modern Task Manager</h1>

    <div class="add-task">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask" 
        placeholder="Add a new task..." />
      <button @click="addTask">＋</button>
    </div>

    <div class="filters">
      <button :class="{active: filter==='all'}" @click="filter='all'">All</button>
      <button :class="{active: filter==='active'}" @click="filter='active'">Active</button>
      <button :class="{active: filter==='completed'}" @click="filter='completed'">Completed</button>
    </div>

    <draggable 
      v-model="filteredTasks" 
      item-key="id" 
      handle=".drag-handle" 
      tag="transition-group" 
      :move="checkMove" 
      class="task-container">

      <template #item="{element}">
        <div class="task-card" :key="element.id">
          <span class="drag-handle">☰</span>
          <span :class="{completed: element.done}" class="task-text">{{ element.text }}</span>
          <input type="checkbox" v-model="element.done" />
          <button class="delete-btn" @click="deleteTask(element.id)">✖</button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "App",
  components: { draggable },
  data() {
    return {
      newTask: "",
      tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
      filter: "all"
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === "active") return this.tasks.filter(t => !t.done);
      if (this.filter === "completed") return this.tasks.filter(t => t.done);
      return this.tasks;
    }
  },
  methods: {
    addTask() {
      if (!this.newTask.trim()) return;
      this.tasks.push({ id: Date.now(), text: this.newTask, done: false });
      this.newTask = "";
      this.saveTasks();
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.saveTasks();
    },
    checkMove() {
      return true;
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  },
  watch: {
    tasks: {
      handler() {
        this.saveTasks();
      },
      deep: true
    }
  }
};
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea, #764ba2);
  margin: 0;
  padding: 0;
}

#app {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.title {
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-task input {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.add-task button {
  padding: 12px 16px;
  background: #ff6b6b;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.3s;
}
.add-task button:hover {
  background: #ff4b4b;
}

.filters {
  margin-bottom: 20px;
}
.filters button {
  background: rgba(255,255,255,0.2);
  border: none;
  padding: 8px 14px;
  margin: 0 5px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}
.filters button.active {
  background: #ff6b6b;
}
.filters button:hover {
  background: rgba(255,255,255,0.4);
}

.task-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  border-radius: 14px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: transform 0.2s ease, opacity 0.3s ease;
}
.task-card:hover {
  transform: scale(1.02);
}

.task-text {
  flex: 1;
  text-align: left;
  font-size: 1rem;
}
.task-text.completed {
  text-decoration: line-through;
  color: gray;
}

.drag-handle {
  cursor: grab;
  font-size: 1.2rem;
  opacity: 0.6;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #ff6b6b;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s;
}
.delete-btn:hover {
  color: #ff0000;
}

/* Animation for add/remove */
.task-card-enter-active, .task-card-leave-active {
  transition: all 0.3s ease;
}
.task-card-enter-from, .task-card-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>