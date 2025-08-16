<template>
  <div>
    <h1>Task Manager</h1>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Add new task" />
    <button @click="addTask">Add</button>

    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" v-model="task.completed" @change="saveTasks" />
        <span :class="{ completed: task.completed }">{{ task.text }}</span>
        <button @click="deleteTask(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: []
    };
  },
  mounted() {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.push({ text: this.newTask, completed: false });
        this.newTask = "";
        this.saveTasks();
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
