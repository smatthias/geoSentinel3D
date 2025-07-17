<template>
  <div ref="container" style="width: 100%; height: 600px;" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import axios from 'axios'

const container = ref()

onMounted(async () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  // Light for better depth and shading
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(100, 100, 100).normalize()
  scene.add(light)

  // Create a grid plane
  const gridSize = 200
  const grid = new THREE.GridHelper(gridSize, 20, 0x444444, 0x222222)
  scene.add(grid)

  // Fetch deformation data
  let deformation
  try {
    const response = await axios.get('/api/deformation/gps')
    deformation = response.data
  } catch (error) {
    console.error('Failed to load deformation data:', error)
    deformation = []
  }

  // Add arrows for each GPS station
  deformation.forEach((station) => {
    const { coords, uplift, direction } = station
    const [lat, lon] = coords
    const [dx, dy] = direction

    // Adjust coordinates to local 3D space
    const origin = new THREE.Vector3(lon, 0, lat)
    const dir = new THREE.Vector3(dx, uplift, dy)

    const length = dir.length() * 0.5 // scale up for visibility
    const arrowHelper = new THREE.ArrowHelper(dir.normalize(), origin, length, 0x0000ff)
    scene.add(arrowHelper)
  })

  // Reposition camera for horizontal perspective
  camera.position.set(100, 60, 100)
  camera.lookAt(0, 0, 0)

  // Render loop
  const animate = function () {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
})
</script>
