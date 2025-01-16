import scene from "../scene"
import Coordinates from "../../../type/Coordinates"
import Particle from "./Particle"
import particlePoolManager from "./particlePoolManager"
import LaunchingParticle from "./LaunchingParticle"
import ExplosionParticle from "./ExplosionParticle"
import DustParticle from "./DustParticle"
import POINT from "../../../definition/point"

class ParticleFactory {
    static provideLaunchingParticle(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, explosionType: string) {
        let particle = particlePoolManager.shiftLaunchingParticle()
        
        if (particle) particle.recycle(currentAbsolutePoint, endRelativePoint, explosionType)
        else particle = LaunchingParticle.create(currentAbsolutePoint, endRelativePoint, explosionType)
    
        this.addSceneAndParticles(particle)
    }

    static provideExplosionParticle(currentAbsolutePoint: Coordinates, endRelativePointArr: Coordinates[], explosionType: string, color: string) {
        let particle = particlePoolManager.shiftExplosionParticle()
        
        console.log('provideExplosionParticle', endRelativePointArr)
        if (particle) particle.recycle(currentAbsolutePoint, endRelativePointArr, explosionType, color)
            else particle = ExplosionParticle.create(currentAbsolutePoint, endRelativePointArr, explosionType, color)
        console.log('provideExplosionParticle2222', endRelativePointArr)

        this.addSceneAndParticles(particle)
    }

    static provideDustParticle(currentAbsolutePoint: Coordinates, explosionType: string, color: string) {
        let particle = particlePoolManager.shiftDustParticle()

        if (particle) particle.recycle(currentAbsolutePoint, explosionType, color)
        else particle = DustParticle.create(currentAbsolutePoint, explosionType, color)

        this.addSceneAndParticles(particle)
    }

    static addSceneAndParticles(particle: Particle) {
        particlePoolManager.addActivatePool(particle)
        scene.add(particle.getMesh())
    }

    static retrieveParticle(particle: Particle) {
        particlePoolManager.moveWaitingPool(particle)
        scene.remove(particle.getMesh())
    }
}

export default ParticleFactory