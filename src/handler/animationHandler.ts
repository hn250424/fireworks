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
import LaunchingParticle from "../module/core/particle/LaunchingParticle"
import { sleep } from "../module/utils"

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
        particle.update() 

        if ( particle.getDustCreationFlag() ) {
            // Unlike 'ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(),' CVector3[] requires a deep copy.
            ParticleFactory.provideDustParticle(JSON.parse(JSON.stringify(particle.getDustVector3())), particle.getExplosionType(), particle.getInstanceName(), particle.getPColor())
            particle.setDustCreationFlag(false)
        }

        // If this.remainingFrames is zero, this.currentAbsolutePoint.y is infinity.
        if (particle.getRemainingFrames() === 1) {
            ParticleFactory.retrieveParticle(particle)

            if (particle instanceof LaunchingParticle) {
                switch (particle.getExplosionType()) {
                    case TYPE.EXPLOSION.ROUTINE.BURST:
                        playExplosionSound()
                        ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(), JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.BURST)), particle.getExplosionType(), particle.getPColor()) 
                        break
                    case TYPE.EXPLOSION.SPECIAL.PETITE_BURST:
                        playSpecialExplosionSound()
                        ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(), JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.PETITE_BURST)), particle.getExplosionType(), particle.getPColor()) 
                        break
                    case TYPE.EXPLOSION.SPECIAL.BLOOM:
                        playSpecialExplosionSound()
                        ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(), JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.BLOOM)), particle.getExplosionType(), particle.getPColor()) 
                        break
                    case TYPE.EXPLOSION.HIGHLIGHTS.HUGE_BURST:
                        playBigExplosionSound()
                        ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(), JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.HUGE_BURST)), particle.getExplosionType(), particle.getPColor()) 
                        break
                    case TYPE.EXPLOSION.HIGHLIGHTS.CHAIN_BURST:
                        for (const explosionRelativePoint of POINT.EXPLOSION_OFFSET.CHAIN_BURST.ORIGIN) {
                            const _copyedCurrentAbsolutePoint = {...particle.getCurrentAbsolutePoint()}
                            _copyedCurrentAbsolutePoint.x += explosionRelativePoint.x
                            _copyedCurrentAbsolutePoint.y += explosionRelativePoint.y
                            _copyedCurrentAbsolutePoint.z += explosionRelativePoint.z

                            playExplosionSound()
                            ParticleFactory.provideExplosionParticle(_copyedCurrentAbsolutePoint, JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.CHAIN_BURST.OFFSET)), particle.getExplosionType(), particle.getPColor()) 

                            await sleep(200)
                        }
                        break
                    case TYPE.EXPLOSION.HIGHLIGHTS.FESTIVAL_ERUPT:
                        for (const explosionRelativePoint of POINT.EXPLOSION_OFFSET.CHAIN_ERUPT.ORIGIN) {
                            const _copyedCurrentAbsolutePoint = {...particle.getCurrentAbsolutePoint()}
                            _copyedCurrentAbsolutePoint.x += explosionRelativePoint.x
                            _copyedCurrentAbsolutePoint.y += explosionRelativePoint.y
                            _copyedCurrentAbsolutePoint.z += explosionRelativePoint.z

                            playExplosionSound()
                            ParticleFactory.provideExplosionParticle(_copyedCurrentAbsolutePoint, JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.CHAIN_ERUPT.OFFSET)), particle.getExplosionType(), particle.getPColor()) 
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

function playBigExplosionSound() {
    if (stateManager.getVolumeState()) { 
        new Audio(ASSETS.SOUNDS.BIG_EXPLOSION).play() 
    }
}

function playSpecialExplosionSound() {
    if (stateManager.getVolumeState()) { 
        new Audio(ASSETS.SOUNDS.SPECIAL_EXPLOSION).play() 
    }
}

export default registerAnimationHandler