import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.x = 30
camera.position.y = 10
camera.position.z = 30

export default camera