import * as THREE from 'three'
import COLOR from '../../definition/color'
import LAUNCH_POINT from '../../definition/launchPoint'
import scene from '../core/scene'

const cartesianAxesElementArray: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[] = []
const launchPointArray: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[] = []

function createCartesianAxes() {
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

    cartesianAxesElementArray.push(cube)
    cartesianAxesElementArray.push(x)
    cartesianAxesElementArray.push(y)
    cartesianAxesElementArray.push(z)
}

function createFireworksPoint() {
    const radius = 0.1
    const segmanet = 32

    return new THREE.Mesh(
        new THREE.SphereGeometry(radius, segmanet, segmanet),
        new THREE.MeshStandardMaterial({ color: COLOR.LAUNCH_POINT })
    )
}

createCartesianAxes()

LAUNCH_POINT.forEach(p => {
    const point = createFireworksPoint()
    point.position.set(p[0], p[1], p[2])
    launchPointArray.push(point)
})

const developmentHelper = {
    showCartesianAxes() {
        cartesianAxesElementArray.forEach(e => {
            scene.add(e)
        })
    },

    hideCartesianAxes() {
        cartesianAxesElementArray.forEach(e => {
            scene.remove(e)
        })
    },

    showLaunchPoint() {
        launchPointArray.forEach(p => {
            scene.add(p)
        })
    },

    hideLaunchPoint() {
        launchPointArray.forEach(p => {
            scene.remove(p)
        })
    }
}

export default developmentHelper