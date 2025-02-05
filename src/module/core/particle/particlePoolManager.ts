import TYPE from "../../../definition/type"
import Particle from "./Particle"
import LaunchingParticle from "./LaunchingParticle"
import ExplosionParticle from "./ExplosionParticle"
import DustParticle from "./DustParticle"

const activateParticlesPool: Particle[] = []
const deactivateLaunchingParticlesPool: LaunchingParticle[] = []
const deactivateExplosionParticlesPool: ExplosionParticle[] = []
const deactivateDustParticlesPool: DustParticle[] = []

const expectedLaunchingParticleCount = 11
const expectedExplosionParticleCount = 77
const expectedDustParticleCount = 405

const particlePoolManager = {
    // Test to determine how many particles are needed.
    countPool() {
        console.log(
            'deactivateLaunchingParticlesPool: ', deactivateLaunchingParticlesPool.length, 
            'deactivateExplosionParticlesPool: ', deactivateExplosionParticlesPool.length, 
            'deactivateDustParticlesPool: ', deactivateDustParticlesPool.length
        )
    },

    init() {
        for (let i = 0; i < expectedLaunchingParticleCount; i++) {
            const _beginAbsolutePoint = {x: 0, y: 0, z: 0}
            const _endRelativePoint = {x: 0, y: 0, z: 0}
            deactivateLaunchingParticlesPool.push( LaunchingParticle.create(_beginAbsolutePoint, _endRelativePoint, TYPE.EXPLOSION.ROUTINE.BURST) )
        }

        for (let i = 0; i < expectedExplosionParticleCount; i++) {
            const _beginAbsolutePoint = {x: 0, y: 0, z: 0}
            const _endRelativePoint = [{x: 0, y: 0, z: 0}]
            deactivateExplosionParticlesPool.push( ExplosionParticle.create(_beginAbsolutePoint, _endRelativePoint, TYPE.EXPLOSION.ROUTINE.BURST) )
        }

        for (let i = 0; i < expectedDustParticleCount; i++) {
            const _currentAbsolutePoint = [{x: 0, y: 0, z: 0}]
            deactivateDustParticlesPool.push( DustParticle.create(_currentAbsolutePoint, TYPE.EXPLOSION.ROUTINE.BURST, TYPE.INSTANCE.DUST) )
        }
    },

    addActivateParticlesPool(particle: Particle): void { activateParticlesPool.push(particle) },

    shiftLaunchingParticle() { return deactivateLaunchingParticlesPool.length > 0 ? deactivateLaunchingParticlesPool.shift() : null },
    shiftExplosionParticle() { return deactivateExplosionParticlesPool.length > 0 ? deactivateExplosionParticlesPool.shift() : null },
    shiftDustParticle() { return deactivateDustParticlesPool.length > 0 ? deactivateDustParticlesPool.shift() : null },

    moveToDeactivateParticlesPool(particle: Particle): void {
        const idx = activateParticlesPool.indexOf(particle)
        if (idx > -1) activateParticlesPool.splice(idx, 1)
        
        if (particle.getInstanceName() === TYPE.INSTANCE.EXPLOSION) deactivateExplosionParticlesPool.push(particle as ExplosionParticle)
        else if (particle.getInstanceName() === TYPE.INSTANCE.LAUNCHING) deactivateLaunchingParticlesPool.push(particle as LaunchingParticle)
        else if (particle.getInstanceName() === TYPE.INSTANCE.DUST) deactivateDustParticlesPool.push(particle as DustParticle)            
    },

    /**
     * Iterate over each particle and execute the provided callback.
     * @param callback - A function to process each particle. The particle is provided automatically.
     */
    processEachParticle(callback: (particle: Particle) => void): void {
        activateParticlesPool.forEach(callback)
    },

    isActivateParticlesPoolEmpty(): Promise<void> {
        return new Promise((resolve) => {
            const check = () => {
                if (activateParticlesPool.length === 0) resolve()
                else setTimeout(check, 500)
            }

            check()
        })
    },
}

export default particlePoolManager
