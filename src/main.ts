import './style.scss'

import './ui/cartesianAxes'

// import * as THREE from 'three'

import scene from './modules/core/scene'
import palyer from './modules/feature/player'
import ambientLight from './modules/feature/ambientLight'
import orbitControls from './modules/feature/orbitControls'

import LaunchingParticle from './modules/core/particle/LaunchingParticle'
import Coordinates from './types/Coordinates'
import player from './modules/feature/player'

main()

async function main() {
    scene.add(ambientLight)     // 조명.
    orbitControls.update()      // 뷰.
    palyer.animate()            // 애니메이션 시작.

    // particle.
    const currentPoint: Coordinates = { x: 2, y: 0, z: 5 }
    const endPoint: Coordinates = { x: -2, y: 7, z: -5 }
    player.ignite(currentPoint, endPoint, 500)
}
