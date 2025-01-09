import POINT from "../definition/point"
import TYPE from "../definition/type"

import Particle from "../module/core/particle/Particle"
import particlePoolManager from "../module/core/particle/particlePoolManager"

import scene from "../module/core/scene"
import camera from "../module/core/camera"
import renderer from "../module/core/renderer"
import orbitControls from "../module/feature/orbitControls"

import ParticleFactory from "../module/core/particle/ParticleFactory"
import BaseParticle from "../module/core/particle/BaseParticle"
import LaunchingParticle from "../module/core/particle/LaunchingParticle"
import ExplosionParticle from "../module/core/particle/ExplosionParticle"
import utils from "../module/utils"

function registerAnimationHandler() {
    animate()
}

function animate() {
    particlesUpdate()
    requestAnimationFrame(animate)
    orbitControls.update()
    renderer.render(scene, camera)
}

function particlesUpdate() {
    particlePoolManager.processEachParticle(async (particle: Particle) => {
        if (particle instanceof ExplosionParticle) scene.remove(particle.getTrail())
        particle.update() 
        if (particle instanceof ExplosionParticle) scene.add(particle.getTrail())

        // If this.remainingFrames is zero, this.currentAbsolutePoint.y is infinity.
        if (particle.getRemainingFrames() == 1) {
            //
            // particlePoolManager.destroy()

            particlePoolManager.remove(particle)
            if (particle instanceof ExplosionParticle) scene.remove(particle.getTrail())
            scene.remove(particle as BaseParticle)

            if (particle instanceof LaunchingParticle) {
                switch (particle.getExplosionType()) {
                    case TYPE.EXPLOSION.STRIKE.BURST:
                        POINT.EXPLOSION_OFFSET.BURST.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, {...endPoint}, particle.getExplosionType(), particle.getColor()) 
                        })
                        break
                    // case TYPE.EXPLOSION.STRIKE.ERUPT:
                    //     POINT.EXPLOSION_OFFSET.ERUPT.forEach(endPoint => { 
                    //         ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, {...endPoint}, particle.getExplosionType(), particle.getColor()) 
                    //     })
                    //     break
                    // case TYPE.EXPLOSION.STRIKE.BLOOM:
                    //     POINT.EXPLOSION_OFFSET.BLOOM.forEach(endPoint => { 
                    //         ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, {...endPoint}, particle.getExplosionType(), particle.getColor()) 
                    //     })
                    //     break
                    case TYPE.EXPLOSION.CHAIN.CHAIN_BURST:
                        const currentAbsolutePoint = {...particle.getCurrentAbsolutePoint()}
                        for (const explosionRelativePoint of POINT.EXPLOSION_OFFSET.CHAIN_BURST.CHAIN_ORIGIN) {
                            const _copyedCurrentAbsolutePoint = {...currentAbsolutePoint}
                            _copyedCurrentAbsolutePoint.x += explosionRelativePoint.x
                            _copyedCurrentAbsolutePoint.y += explosionRelativePoint.y
                            _copyedCurrentAbsolutePoint.z += explosionRelativePoint.z
                            
                            POINT.EXPLOSION_OFFSET.CHAIN_BURST.CHAIN_OFFSET.forEach(endPoint => {
                                ParticleFactory.createExplosionParticle(_copyedCurrentAbsolutePoint, {...endPoint}, particle.getExplosionType(), particle.getColor())
                            })

                            await utils.sleep(200)
                        }
                        break
                }
            }
        }
    })
}

export default registerAnimationHandler