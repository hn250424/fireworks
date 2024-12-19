// import './style.scss'

import * as THREE from 'three'

import scene from './modules/core/scene'
import animationManager from './modules/feature/animationManager'
import ambientLight from './modules/feature/ambientLight'
import orbitControls from './modules/feature/orbitControls'
import developmentHelper from './modules/feature/developmentManager'

import BaseParticle from './modules/entity/BaseParticle'
import Coordinates from './types/Coordinates'

main()

async function main() {
    // 씬.
    scene.add(ambientLight)

    // 뷰 컨트롤.
    animationManager.animate()
    orbitControls.update()

    // Cartesian Axes for development purpose.
    developmentHelper.createCartesianAxes()

    // particle.
    const currentPoint: Coordinates = { x: 1, y: 3, z: 0 }
    const endPoint: Coordinates = { x: 5, y: 3, z: 0 }
    setTimeout(() => { new BaseParticle(currentPoint, endPoint, 5) }, 500)
}