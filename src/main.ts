import './style.scss'

import './ui/cartesianAxes'

// import * as THREE from 'three'

import Coordinates from './type/Coordinates'
import scene from './module/core/scene'
import ambientLight from './module/core/ambientLight'

import fireworksManager from './module/feature/fireworksManager'
import registerAnimationHandler from './handler/animationHandler'

main()

async function main() {
    scene.add(ambientLight)     // 조명.
    registerAnimationHandler()  // 애니메이션.

    // particle.
    const currentPoint: Coordinates = { x: 2, y: 0, z: 5 }
    const endPoint: Coordinates = { x: 0, y: 7, z: 0 }
    fireworksManager.launch(currentPoint, endPoint)

    // const currentPoint2: Coordinates = { x: 5, y: 0, z: 2 }
    // const endPoint2: Coordinates = { x: 0, y: 7, z: 0 }
    // fireworksManager.launch(currentPoint, endPoint)

    // const currentPoint3: Coordinates = { x: 0, y: 0, z: 5 }
    // const endPoint3: Coordinates = { x: 0, y: 7, z: 0 }
    // fireworksManager.launch(currentPoint, endPoint)

    // const currentPoint4: Coordinates = { x: 5, y: 0, z: 0 }
    // const endPoint4: Coordinates = { x: 0, y: 7, z: 0 }
    // fireworksManager.launch(currentPoint, endPoint)
}
