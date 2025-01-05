import TYPE from "../../../definition/type"
import COLOR from "../../../definition/color"
import Particle from "./Particle"
import LaunchingParticle from "./LaunchingParticle"
import ExplosionParticle from "./ExplosionParticle"
import TraceParticle from "./TraceParticle"

const activatePool: Particle[] = []
const launchingParticlePool: LaunchingParticle[] = []
const exlosionParticlePool: ExplosionParticle[] = []
const traceParticlePool: TraceParticle[] = []

const expectedLaunchingParticleCount = 15
const expectedExplosionParticleCount = 2000
const expectedTraceParticleCount = 6000

const particlePoolManager = {
    init() {
        for (let i = 0; i < expectedLaunchingParticleCount; i++) {
            launchingParticlePool.push( LaunchingParticle.create({x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, TYPE.EXPLOSION.STRIKE.BLOOM) )
        }

        for (let i = 0; i < expectedExplosionParticleCount; i++) {
            exlosionParticlePool.push( ExplosionParticle.create({x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, TYPE.EXPLOSION.STRIKE.BLOOM, COLOR.FIREWORKS[0]) )
        }

        for (let i = 0; i < expectedTraceParticleCount; i++) {
            traceParticlePool.push( TraceParticle.create({x: 0, y: 0, z: 0}, COLOR.FIREWORKS[0]) )
        }
    },

    add(particle: Particle): void { activatePool.push(particle) },

    lendLaunchingParticle() { return launchingParticlePool.shift() },
    lendExplosionParticle() { return exlosionParticlePool.shift() },
    lendTraceParticle() { return traceParticlePool.shift() },

    remove(particle: Particle): void {
        const idx = activatePool.indexOf(particle)
        if (idx > -1) activatePool.splice(idx, 1)
        
        if (particle.constructor.name === ExplosionParticle.name) exlosionParticlePool.push(particle as ExplosionParticle)
        else if (particle.constructor.name === TraceParticle.name) traceParticlePool.push(particle as TraceParticle)
        else if (particle.constructor.name === LaunchingParticle.name) launchingParticlePool.push(particle as LaunchingParticle)
    },

    /**
     * Iterate over each particle and execute the provided callback.
     * @param callback - A function to process each particle. The particle is provided automatically.
     */
    processEachParticle(callback: (particle: Particle) => void): void {
        activatePool.forEach(callback)
    },

    isEmpty(): Promise<void> {
        return new Promise((resolve) => {
            const check = () => {
                if (activatePool.length === 0) resolve()
                else setTimeout(check, 500)
            }

            check()
        })
    }
}

export default particlePoolManager
