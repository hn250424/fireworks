import scene from "../scene"
import Coordinates from "../../../type/Coordinates"
import Particle from "./Particle"
import particlePoolManager from "./particlePoolManager"
import BaseParticle from "./BaseParticle"
import LaunchingParticle from "./LaunchingParticle"
import ExplosionParticle from "./ExplosionParticle"
import DustParticle from "./DustParticle"

class ParticleFactory {
    static createLaunchingParticle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, explosionType: string) {
        let particle = particlePoolManager.lendLaunchingParticle()

        if (particle) particle.recycle(currentAbsolutePoint, endRelativePoint, explosionType)
        else particle = LaunchingParticle.create(currentAbsolutePoint, endRelativePoint, explosionType) 
        
        this.addSceneAndParticles(particle)
    }

    static createExplosionParticle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, explosionType: string, color: string) {
        let particle = particlePoolManager.lendExplosionParticle()

        if (particle) particle.recycle(currentAbsolutePoint, endRelativePoint, explosionType, color)
        else particle = ExplosionParticle.create(currentAbsolutePoint, endRelativePoint, explosionType, color)

        this.addSceneAndParticles(particle)
    }

    static createDustParticle(currentAbsolutePoint: Coordinates, color: string) {
        let particle = particlePoolManager.lendDustParticle()

        if (particle) particle.recycle(currentAbsolutePoint, color)
        else particle = DustParticle.create(currentAbsolutePoint, color)

        this.addSceneAndParticles(particle)
    }

    static addSceneAndParticles(particle: Particle) {
        particlePoolManager.add(particle)
        scene.add(particle as BaseParticle)
    }
}

export default ParticleFactory