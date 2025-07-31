<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Left: Logo -->
      <div class="text-xl font-bold text-gray-900">🌋 VulcanSight</div>

      <!-- Right: Buttons -->
      <div class="flex space-x-4">
        <button
          @click="$emit('open-login')"
          class="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
        >
          Login
        </button>
        <button
          @click="$emit('open-register')"
          class="px-4 py-2 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
        >
          Register
        </button>
      </div>
    </div>
  </header>
</template>
