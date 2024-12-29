import * as THREE from 'three'
import COLOR from '../../definition/color'
import POINT from '../../definition/point'
import scene from '../core/scene'

const cartesianAxesElementArray: THREE.Mesh[] = []
const launchPointArray: THREE.Mesh[] = []

function createDevelopmentHelperElements(): void {
    // Cartesian Axes Elements.
    const cubeSize = 1
    const lineWidth = 0.05
    const lineLength = 5
    const lineStartPoint = 3

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
        new THREE.MeshStandardMaterial({ color: COLOR.CATESIAN_AXES.BASE_POINT })
    )
    const x = new THREE.Mesh(
        new THREE.BoxGeometry(lineLength, lineWidth, lineWidth),
        new THREE.MeshStandardMaterial({ color: COLOR.CATESIAN_AXES.X })
    )
    const y = new THREE.Mesh(
        new THREE.BoxGeometry(lineWidth, lineLength, lineWidth),
        new THREE.MeshStandardMaterial({ color: COLOR.CATESIAN_AXES.Y })
    )
    const z = new THREE.Mesh(
        new THREE.BoxGeometry(lineWidth, lineWidth, lineLength),
        new THREE.MeshStandardMaterial({ color: COLOR.CATESIAN_AXES.Z })
    )

    x.position.set(lineStartPoint, 0, 0)
    y.position.set(0, lineStartPoint, 0)
    z.position.set(0, 0, lineStartPoint)

    cartesianAxesElementArray.push(cube, x, y, z)

    // Fireworks Launch Points
    const radius = 0.1
    const segment = 32
    Object.values(POINT.LAUNCHING_BASE).forEach(p => {
        const point = new THREE.Mesh(
            new THREE.SphereGeometry(radius, segment, segment),
            new THREE.MeshStandardMaterial({ color: COLOR.LAUNCH_POINT })
        )
        point.position.set(p.x, p.y, p.z)
        launchPointArray.push(point)
    })

    // POINT.TEST.forEach(p => {
    //     const point = new THREE.Mesh(
    //         new THREE.SphereGeometry(radius, segment, segment),
    //         new THREE.MeshStandardMaterial({ color: 'red' })
    //     )
    //     point.position.set(p.x, p.y, p.z)
    //     launchPointArray.push(point)
    // })
}

// Call the unified create method.
createDevelopmentHelperElements()

const developmentHelper = {
    showCartesianAxes() { cartesianAxesElementArray.forEach(e => scene.add(e)) },
    hideCartesianAxes() { cartesianAxesElementArray.forEach(e => scene.remove(e)) },
    showLaunchPoint() { launchPointArray.forEach(p => scene.add(p)) },
    hideLaunchPoint() { launchPointArray.forEach(p => scene.remove(p)) },
}

export default developmentHelper
