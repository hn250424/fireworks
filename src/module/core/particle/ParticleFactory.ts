import scene from "../scene"
import Coordinates from "../../../type/Coordinates"
import Particle from "../../../interface/Particle"
import particles from "../../../state/particles"
import BaseParticle from "./BaseParticle"
import LaunchingParticle from "./LaunchingParticle"
import ExplosionParticle from "./ExplosionParticle"
import TraceParticle from "./TraceParticle"

class ParticleFactory {
    static createLaunchingParticle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates) {
        const particle = new LaunchingParticle(currentAbsolutePoint, endRelativePoint)
        this.addSceneAndParticles(particle)
    }

    static createExplosionParticle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, color: string) {
        const particle = new ExplosionParticle(currentAbsolutePoint, endRelativePoint, color)
        this.addSceneAndParticles(particle)
    }

    static createTraceParticle(currentAbsolutePoint: Coordinates, color: string) {
        const particle = new TraceParticle(currentAbsolutePoint, color)
        this.addSceneAndParticles(particle)
    }

    static addSceneAndParticles(particle: Particle) {
        particles.push(particle)
        scene.add(particle as BaseParticle)
    }
}

export default ParticleFactory