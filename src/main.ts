import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app element')

const canvas = document.createElement('canvas')
canvas.className = 'webgl'
app.appendChild(canvas)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0b1020)

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
camera.position.set(2.5, 1.5, 3.5)

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
})

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.35 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.lookAt(cube.position)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.copy(cube.position)
controls.update()

const ambient = new THREE.AmbientLight(0xffffff, 0.35)
scene.add(ambient)

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
keyLight.position.set(3, 4, 2)
scene.add(keyLight)

function resize() {
  // Use viewport size to ensure it always matches the window.
  const width = window.innerWidth
  const height = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setPixelRatio(dpr)
  renderer.setSize(width, height, false)
}

resize()
window.addEventListener('resize', resize, { passive: true })
new ResizeObserver(resize).observe(app)

renderer.setAnimationLoop((t) => {
  const time = t * 0.001
  cube.rotation.x = time * 0.6
  cube.rotation.y = time * 0.8
  controls.update()
  renderer.render(scene, camera)
})
