
import scene from "../core/scene"
import camera from "../core/camera"
import { renderer } from "../core/renderer"

import particles from "../entity/particles"
import Particle from "../entity/Particle"

const animationManager = {
    animate () {
        particles.forEach((element: Particle) => { element.update() })
        renderer.render(scene, camera)
        requestAnimationFrame(animationManager.animate)
    }
}

export default animationManager