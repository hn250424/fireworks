import * as THREE from 'three'
import INIT from '../../definition/init'

const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(INIT.CAMERA.X, INIT.CAMERA.Y, INIT.CAMERA.Z)

export default camera