import POINT from "../definition/point"
import FIREWORK_TYPES from "../definition/fireworkTypes"

import Particle from "../interface/Particle"
import particles from "../state/particles"

import scene from "../module/core/scene"
import camera from "../module/core/camera"
import renderer from "../module/core/renderer"
import orbitControls from "../module/feature/orbitControls"

import ParticleFactory from "../module/core/particle/ParticleFactory"
import BaseParticle from "../module/core/particle/BaseParticle"
import LaunchingParticle from "../module/core/particle/LaunchingParticle"
import ExplosionParticle from "../module/core/particle/ExplosionParticle"

function registerAnimationHandler() {
    animate()
}

function animate() {
    particleseUpdate()
    requestAnimationFrame(animate)
    orbitControls.update()
    renderer.render(scene, camera)
}

function particleseUpdate() {
    particles.processEachParticle((particle: Particle) => { 
        particle.update() 

        if (particle instanceof ExplosionParticle) {
            if (particle.getRemainingFrames() % 6 === 0) {
                ParticleFactory.createTraceParticle({...particle.getCurrentAbsolutePoint()}, particle.getColor())
            }
        }
        
        // If this.remainingFrames is zero, this.currentAbsolutePoint.y is infinity.
        if (particle.getRemainingFrames() == 1) {
            particle.destroy()

            particles.remove(particle)
            scene.remove(particle as BaseParticle)
            
            if (particle instanceof LaunchingParticle) {
                switch (particle.getExplosionType()) {
                    case FIREWORK_TYPES.BURST:
                        POINT.EXPLOSION_OFFSET.BURST.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case FIREWORK_TYPES.BOMB:
                        POINT.EXPLOSION_OFFSET.BOMB.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case FIREWORK_TYPES.ERUPT:
                        POINT.EXPLOSION_OFFSET.ERUPT.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case FIREWORK_TYPES.BLOOM:
                        POINT.EXPLOSION_OFFSET.BLOOM.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case FIREWORK_TYPES.TWINKLE:
                        POINT.EXPLOSION_OFFSET.TWINKLE.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case FIREWORK_TYPES.SPARKLE:
                        POINT.EXPLOSION_OFFSET.SPARKLE.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case FIREWORK_TYPES.CHAIN_BURST:
                        POINT.EXPLOSION_OFFSET.CHAIN_BURST.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                }
            }
        }
    })
}

export default registerAnimationHandler