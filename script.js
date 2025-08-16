const { createApp, ref, computed, watch } = Vue;

createApp({
  setup() {
    const newTask = ref("");
    const newDate = ref("");
    const newPriority = ref("");
    const tasks = ref(JSON.parse(localStorage.getItem("tasks") || "[]"));
    const filter = ref("all");

    const addTask = () => {
      if (!newTask.value || !newPriority.value) return;
      tasks.value.push({
        id: Date.now(),
        text: newTask.value,
        date: newDate.value || "No date",
        priority: newPriority.value,
        completed: false
      });
      newTask.value = "";
      newDate.value = "";
      newPriority.value = "";
      saveTasks();
    };

    const deleteTask = (id) => {
      tasks.value = tasks.value.filter(t => t.id !== id);
      saveTasks();
    };

    const saveTasks = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks.value));
    };

    const filteredTasks = computed(() => {
      if (filter.value === "active") return tasks.value.filter(t => !t.completed);
      if (filter.value === "completed") return tasks.value.filter(t => t.completed);
      return tasks.value;
    });

    watch(tasks, saveTasks, { deep: true });

    return { newTask, newDate, newPriority, tasks, filter, filteredTasks, addTask, deleteTask, saveTasks };
  }
}).component("draggable", vuedraggable).mount("#app");
