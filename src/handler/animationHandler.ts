import POINT from "../definition/point"
import TYPE from "../definition/type"
import ASSETS from "../definition/assets"

import stateManager from "../module/core/stateManager"
import Particle from "../module/core/particle/Particle"
import particlePoolManager from "../module/core/particle/particlePoolManager"

import scene from "../module/core/scene"
import camera from "../module/core/camera"
import renderer from "../module/core/renderer"
import orbitControls from "../module/feature/orbitControls"

import ParticleFactory from "../module/core/particle/ParticleFactory"
import BaseParticle from "../module/core/particle/BaseParticle"
import LaunchingParticle from "../module/core/particle/LaunchingParticle"
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
        // if (particle instanceof ExplosionParticle) scene.remove(particle.getTrail())
        particle.update() 
        // if (particle instanceof ExplosionParticle) scene.add(particle.getTrail())
        
        if (particle.getDustRequestStatus()) ParticleFactory.createDustParticle({...particle.getCurrentAbsolutePoint()}, particle.getExplosionType(), particle.getColor())

        // If this.remainingFrames is zero, this.currentAbsolutePoint.y is infinity.
        if (particle.getRemainingFrames() == 1) {
            particlePoolManager.remove(particle)
            // if (particle instanceof ExplosionParticle) scene.remove(particle.getTrail())
            scene.remove(particle as BaseParticle)

            if (particle instanceof LaunchingParticle) {
                switch (particle.getExplosionType()) {
                    case TYPE.EXPLOSION.ROUTINE.BURST:
                        playExplosionSound()
                        POINT.EXPLOSION_OFFSET.BURST.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, {...endPoint}, particle.getExplosionType(), particle.getColor()) 
                        })
                        break
                    case TYPE.EXPLOSION.ROUTINE.ERUPT:
                        playExplosionSound()
                        POINT.EXPLOSION_OFFSET.ERUPT.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, {...endPoint}, particle.getExplosionType(), particle.getColor()) 
                        })
                        break
                    case TYPE.EXPLOSION.ROUTINE.BLOOM:
                        playExplosionSound()
                        POINT.EXPLOSION_OFFSET.BLOOM.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, {...endPoint}, particle.getExplosionType(), particle.getColor()) 
                        })
                        break
                    case TYPE.EXPLOSION.FINALE.HUGE_BURST:
                        playExplosionSound()
                        POINT.EXPLOSION_OFFSET.HUGE_BURST.forEach(endPoint => { 
                            ParticleFactory.createExplosionParticle({...particle.getCurrentAbsolutePoint()}, {...endPoint}, particle.getExplosionType(), particle.getColor()) 
                        })
                        break
                    case TYPE.EXPLOSION.FINALE.CHAIN_BURST:
                        const currentAbsolutePoint = {...particle.getCurrentAbsolutePoint()}
                        for (const explosionRelativePoint of POINT.EXPLOSION_OFFSET.CHAIN_BURST.ORIGIN) {
                            const _copyedCurrentAbsolutePoint = {...currentAbsolutePoint}
                            _copyedCurrentAbsolutePoint.x += explosionRelativePoint.x
                            _copyedCurrentAbsolutePoint.y += explosionRelativePoint.y
                            _copyedCurrentAbsolutePoint.z += explosionRelativePoint.z
                            
                            playExplosionSound()
                            POINT.EXPLOSION_OFFSET.CHAIN_BURST.OFFSET.forEach(endPoint => {
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

function playExplosionSound() {
    if (stateManager.getVolumeState()) { 
        new Audio(ASSETS.SOUNDS.EXPLOSION).play() 
    }
}

export default registerAnimationHandler