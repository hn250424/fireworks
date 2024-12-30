import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.x = 50
camera.position.y = 20
camera.position.z = 50

export default camera