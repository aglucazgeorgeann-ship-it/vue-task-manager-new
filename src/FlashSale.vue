<template>
  <!-- Main container for the app, using Tailwind for full height and centering -->
  <div class="min-h-screen flex items-center justify-center bg-gray-900 p-4 font-sans antialiased">
    <!-- Card container for the flash sale content -->
    <div class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-pulse-once">
      <!-- Main content section -->
      <div class="flex flex-col items-center p-8 text-center">
        <!-- Title with gradient effect -->
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2 drop-shadow-md">
          Flash Sale⚡ Limited Time Offer!
        </h1>
        <!-- Subtitle -->
        <p class="text-base sm:text-lg text-gray-700 font-semibold mb-6">
          Get an exclusive <span class="font-black text-pink-500">30% OFF</span> your first year!
        </p>

        <!-- Timer display -->
        <div class="bg-gray-800 text-white rounded-full px-6 py-3 mb-8 shadow-inner font-mono text-lg sm:text-2xl font-bold tracking-widest">
          <!-- Vue's conditional rendering with v-if/v-else -->
          <span v-if="timeInSeconds > 0">
            {{ formatTime(timeInSeconds) }}
          </span>
          <span v-else class="text-red-400">
            Expired!
          </span>
        </div>

        <!-- Call to action button with hover effect -->
        <button class="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300">
          Claim My Discount
        </button>
      </div>

      <!-- Social proof section at the bottom -->
      <div class="relative bg-gray-100 px-8 py-4 text-center text-sm sm:text-base text-gray-600 font-medium">
        <!-- A simple "live" indicator -->
        <span class="relative inline-block h-2 w-2 mr-2">
          <span class="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span class="font-bold text-gray-800">{{ visitors }}</span> people are signing up now!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Use Vue's `ref` to create reactive state variables.
// This is the equivalent of Angular's `signal()`.
const timeInSeconds = ref(180);
const visitors = ref(0);
let countdownInterval;
let visitorsInterval;

// The `onMounted` hook runs when the component is added to the DOM.
// This is the equivalent of Angular's `ngOnInit`.
onMounted(() => {
  // Start the countdown timer
  countdownInterval = setInterval(() => {
    if (timeInSeconds.value > 0) {
      timeInSeconds.value--;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);

  // Update the fake visitor count every 5 seconds
  const updateVisitors = () => {
    // Generate a random number between 20 and 60
    visitors.value = Math.floor(Math.random() * 41) + 20;
  };
  updateVisitors();
  visitorsInterval = setInterval(updateVisitors, 5000);
});

// The `onUnmounted` hook runs just before the component is removed from the DOM.
// This is the equivalent of Angular's `ngOnDestroy`.
onUnmounted(() => {
  // Clean up intervals to prevent memory leaks
  clearInterval(countdownInterval);
  clearInterval(visitorsInterval);
});

/**
 * Formats a given number of seconds into MM:SS format.
 * @param {number} time The total time in seconds.
 * @returns {string} A string representing the formatted time.
 */
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800;900&display=swap');

/* Custom animation for a one-time pulse effect on page load */
@keyframes pulse-once {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.animate-pulse-once {
  animation: pulse-once 1.5s ease-in-out;
}
</style>
