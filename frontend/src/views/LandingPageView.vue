<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
    <!-- Top Navigation -->
    <header class="w-full bg-white shadow">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-700">🌋 GeoSentinel3D</h1>
        <div class="space-x-4">
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            @click="showModal = true"
          >
            Login
          </button>
          <button
            class="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
            @click="showModal = true"
          >
            Register
          </button>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <main class="flex-grow flex flex-col items-center justify-center text-center px-6">
      <h2 class="text-4xl md:text-5xl font-extrabold mb-4">
        Real-time Seismic & Volcanic Monitoring
      </h2>
      <p class="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
        GeoSentinel3D is your collaborative platform for monitoring seismic and deformation activity across high-risk volcanic regions — designed for scientists, institutions, and civil defense.
      </p>
      <div>
        <button
          class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          @click="showModal = true"
        >
          Get Started
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white shadow py-4 mt-10 text-center text-sm text-gray-500">
      © 2025 GeoSentinel3D. All rights reserved.
    </footer>

    <!-- Modal Placeholder -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          @click="showModal = false"
        >
          ✕
        </button>
        <h2 class="text-2xl font-bold text-center mb-4">Login or Register</h2>
        <p class="text-center text-gray-600">Coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>
