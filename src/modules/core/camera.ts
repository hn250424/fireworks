import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 15

camera.position.y = 5
camera.rotation.x = -35 * (Math.PI / 180)

camera.position.x = 5
camera.rotation.y = 35 * (Math.PI / 180)

export default camera