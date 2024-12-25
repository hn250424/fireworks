import * as THREE from 'three'
import scene from '../core/scene'

const cubeSize = 1
const lineWidth = 0.05
const lineLength = 5
const lineStartPoint = 3

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
    new THREE.MeshStandardMaterial({ color: 'white' })
)
const x = new THREE.Mesh(
    new THREE.BoxGeometry(lineLength, lineWidth, lineWidth),
    new THREE.MeshStandardMaterial({ color: 'red' })
)
const y = new THREE.Mesh(
    new THREE.BoxGeometry(lineWidth, lineLength, lineWidth),
    new THREE.MeshStandardMaterial({ color: 'blue' })
)
const z = new THREE.Mesh(
    new THREE.BoxGeometry(lineWidth, lineWidth, lineLength),
    new THREE.MeshStandardMaterial({ color: 'yellow' })
)

x.position.set(lineStartPoint, 0, 0)
y.position.set(0, lineStartPoint, 0)
z.position.set(0, 0, lineStartPoint)

const developmentHelper = {
    showCartesianAxes() {
        scene.add(cube)
        scene.add(x)
        scene.add(y)
        scene.add(z)
    },

    hideCartesianAxes() {
        scene.remove(cube)
        scene.remove(x)
        scene.remove(y)
        scene.remove(z)
    }
}

export default developmentHelper