import scene from "../scene"
import Coordinates from "../../../type/Coordinates"
import Particle from "./Particle"
import particles from "../../../state/particles"
import BaseParticle from "./BaseParticle"
import LaunchingParticle from "./LaunchingParticle"
import ExplosionParticle from "./ExplosionParticle"
import TraceParticle from "./TraceParticle"

class ParticleFactory {
    static createLaunchingParticle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, explosionType: string) {
        const particle = LaunchingParticle.create(currentAbsolutePoint, endRelativePoint, explosionType)
        this.addSceneAndParticles(particle)
    }

    static createExplosionParticle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, explosionType: string, color: string) {
        const particle = ExplosionParticle.create(currentAbsolutePoint, endRelativePoint, explosionType, color)
        this.addSceneAndParticles(particle)
    }

    static createTraceParticle(currentAbsolutePoint: Coordinates, color: string) {
        const particle = TraceParticle.create(currentAbsolutePoint, color)
        this.addSceneAndParticles(particle)
    }

    static addSceneAndParticles(particle: Particle) {
        particles.add(particle)
        scene.add(particle as BaseParticle)
    }
}

export default ParticleFactory