import POINT from "../definition/POINT"
import EXPLOSION_TYPES from "../definition/EXPLOSION_TYPES"

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
import { sleep } from "../module/utils"

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
    particles.processEachParticle(async (particle: Particle) => { 
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
                    case EXPLOSION_TYPES.BURST:
                        POINT.EXPLOSION_OFFSET.BURST.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case EXPLOSION_TYPES.ERUPT:
                        POINT.EXPLOSION_OFFSET.ERUPT.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case EXPLOSION_TYPES.BLOOM:
                        POINT.EXPLOSION_OFFSET.BLOOM.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, endPoint, particle.getColor()) 
                        })
                        break
                    case EXPLOSION_TYPES.CHAIN_BURST:
                        const currentAbsolutePoint = {...particle.getCurrentAbsolutePoint()}
                        for (const explosionRelativePoint of POINT.EXPLOSION_OFFSET.CHAIN_BURST.ORIGIN) {
                            const _copyedCurrentAbsolutePoint = {...currentAbsolutePoint}
                            _copyedCurrentAbsolutePoint.x += explosionRelativePoint.x
                            _copyedCurrentAbsolutePoint.y += explosionRelativePoint.y
                            _copyedCurrentAbsolutePoint.z += explosionRelativePoint.z
                            
                            POINT.EXPLOSION_OFFSET.CHAIN_BURST.EXPLOSION.forEach(endPoint => {
                                ParticleFactory.createExplosionParticle(_copyedCurrentAbsolutePoint, {...endPoint}, particle.getColor())
                            })

                            await sleep(200)
                        }
                        break
                }
            }
        }
    })
}

export default registerAnimationHandler