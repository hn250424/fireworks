import './style.scss'

import './ui/cartesianAxes'
import './ui/launchPoint'

import scene from './module/core/scene'
import ambientLight from './module/core/ambientLight'

import registerAnimationHandler from './handler/animationHandler'
import registerPlayHandler from './handler/playHandler'

main()

async function main() {
    scene.add(ambientLight)     // 조명.

    registerAnimationHandler()  // 애니메이션 처리.
    registerPlayHandler()       // 플레이 로직.
}