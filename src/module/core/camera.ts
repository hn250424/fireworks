import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.set(40, 20, 40)     // 1
// camera.position.set(50, -20, 50)    // 2

export default camera