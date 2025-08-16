<template>
  <div class="task" :class="{completed: task.completed}">
    <span @click="$emit('toggle-complete', task.id)">{{ task.text }}</span>
    <button @click="$emit('delete-task', task.id)">Delete</button>
  </div>
</template>

<script>
export default {
  props: ['task']
}
</script>

<style>
.task { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-radius: 8px; background: #f9f9f9; transition: all 0.2s; cursor: grab; }
.task.completed span { text-decoration: line-through; color: #999; }
.task:hover { background: #e6f0ff; }
.task button { border: none; background: #ff6b6b; color: white; padding: 6px 10px; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
.task button:hover { background: #e04e4e; }
</style>
