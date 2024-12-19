import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
renderer.setSize(window.innerWidth, window.innerHeight)

// Container.
const container = document.getElementById('container')
if (!container) throw new Error('Container is not exist !')

const canvas = renderer.domElement
container.appendChild(canvas)

export { renderer, canvas }
