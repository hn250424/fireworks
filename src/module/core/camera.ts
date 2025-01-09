import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(230, -50, 230)

export default camera