<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-96 p-6">
      <h2 class="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" />
      <input type="password" placeholder="Password" class="w-full mb-3 p-2 border rounded" />
      <div class="flex justify-end space-x-2">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
      </div>
    </div>
  </div>
</template>
