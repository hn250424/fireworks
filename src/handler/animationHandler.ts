import Particle from "../interface/Particle"
import particles from "../state/particles"

import scene from "../module/core/scene"
import camera from "../module/core/camera"
import { renderer } from "../module/core/renderer"
import orbitControls from "../module/feature/orbitControls"

import ParticleFactory from "../module/core/particle/ParticleFactory"
import BaseParticle from "../module/core/particle/BaseParticle"
import LaunchingParticle from "../module/core/particle/LaunchingParticle"

import fireworksManager from "../module/feature/fireworksManager"

function registerAnimationHandler() {
    animate()
}

function animate() {
    particles.forEach((particle: Particle) => { 
        particle.update() 

        if (particle instanceof LaunchingParticle) {
            if (particle.getRemainingFrames() % 6 === 0) {
                ParticleFactory.createTraceParticle({...particle.getCurrentAbsolutePoint()}, particle.getColor())
            }
        }
        
        // If this.remainingFrames is zero, this.currentAbsolutePoint.y is infinity.
        if (particle.getRemainingFrames() == 1) {
            particle.destroy()

            const idx = particles.indexOf(particle)
            if (idx > -1) particles.splice(idx, 1)
                
            scene.remove(particle as BaseParticle)
            
            if (particle instanceof LaunchingParticle) {
                fireworksManager.burst(particle.getCurrentAbsolutePoint(), particle.getColor())
            }
        }
    })

    requestAnimationFrame(animate)
    orbitControls.update()
    renderer.render(scene, camera)
}

export default registerAnimationHandler