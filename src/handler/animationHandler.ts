import * as THREE from 'three'

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

// Revolve info.
let resolveState = false
const target = new THREE.Vector3(orbitControls.target.x, orbitControls.target.y, orbitControls.target.z)
const revolveSpeed = 0.001
let angle = 0
let radius = 0

function registerAnimationHandler() {
    animate()
}

function animate() {
    revolveCamera()
    particlesUpdate()
    requestAnimationFrame(animate)
    orbitControls.update()
    renderer.render(scene, camera)
}

function revolveCamera() {
    // If the revolve state has changed,
    if (resolveState !== stateManager.getRevolveState()) {
        resolveState = stateManager.getRevolveState()

        // and if the new state is active (true),
        if (resolveState) {
            orbitControls.enabled = false
            angle = Math.atan2(camera.position.z - target.z, camera.position.x - target.x)
            radius = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z).distanceTo(target)
        } else {
            orbitControls.enabled = true
        }
    }

    if (resolveState) {
        angle += revolveSpeed
        camera.position.x = target.x + Math.cos(angle) * radius
        camera.position.z = target.z + Math.sin(angle) * radius
    }
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
                    case TYPE.EXPLOSION.BURST:
                        playExplosionSound()
                        ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(), JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.BURST)), particle.getExplosionType(), particle.getPColor()) 
                        break
                    case TYPE.EXPLOSION.PETITE_BURST:
                        playExplosionSound()
                        ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(), JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.PETITE_BURST)), particle.getExplosionType(), particle.getPColor()) 
                        break
                    case TYPE.EXPLOSION.BLOOM:
                        playSpecialExplosionSound()
                        ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(), JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.BLOOM)), particle.getExplosionType(), particle.getPColor()) 
                        break
                    case TYPE.EXPLOSION.HUGE_BURST:
                        playBigExplosionSound()
                        ParticleFactory.provideExplosionParticle(particle.getCurrentAbsolutePoint(), JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.HUGE_BURST)), particle.getExplosionType(), particle.getPColor()) 
                        break
                    case TYPE.EXPLOSION.CHAIN_BURST:
                        playExplosionSound()

                        for (const explosionRelativePoint of POINT.EXPLOSION_OFFSET.CHAIN_BURST.ORIGIN) {
                            const _copyedCurrentAbsolutePoint = {...particle.getCurrentAbsolutePoint()}
                            _copyedCurrentAbsolutePoint.x += explosionRelativePoint.x
                            _copyedCurrentAbsolutePoint.y += explosionRelativePoint.y
                            _copyedCurrentAbsolutePoint.z += explosionRelativePoint.z
                            
                            ParticleFactory.provideExplosionParticle(_copyedCurrentAbsolutePoint, JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.CHAIN_BURST.OFFSET)), particle.getExplosionType(), particle.getPColor()) 

                            await sleep(200)
                        }
                        break
                    case TYPE.EXPLOSION.FESTIVAL_ERUPT:
                        playExplosionSound()
                        
                        for (const explosionRelativePoint of POINT.EXPLOSION_OFFSET.FESTIVAL_ERUPT.ORIGIN) {
                            const _copyedCurrentAbsolutePoint = {...particle.getCurrentAbsolutePoint()}
                            _copyedCurrentAbsolutePoint.x += explosionRelativePoint.x
                            _copyedCurrentAbsolutePoint.y += explosionRelativePoint.y
                            _copyedCurrentAbsolutePoint.z += explosionRelativePoint.z
                            
                            ParticleFactory.provideExplosionParticle(_copyedCurrentAbsolutePoint, JSON.parse(JSON.stringify(POINT.EXPLOSION_OFFSET.FESTIVAL_ERUPT.OFFSET)), particle.getExplosionType(), particle.getPColor()) 
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