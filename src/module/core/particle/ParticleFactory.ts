import scene from "../scene"
import CVector3 from "../../../type/CVector3"
import Particle from "./Particle"
import particlePoolManager from "./particlePoolManager"
import LaunchingParticle from "./LaunchingParticle"
import ExplosionParticle from "./ExplosionParticle"
import DustParticle from "./DustParticle"
import PColor from "../../../type/PColor"

class ParticleFactory {
    static provideLaunchingParticle(currentAbsolutePoint: CVector3, endRelativePoint: CVector3, explosionType: string) {
        let particle = particlePoolManager.shiftLaunchingParticle()
        
        if (particle) particle.recycle(currentAbsolutePoint, endRelativePoint, explosionType)
        else particle = LaunchingParticle.create(currentAbsolutePoint, endRelativePoint, explosionType)
    
        this.addSceneAndActivateParticlesPool(particle)
    }

    static provideExplosionParticle(currentAbsolutePoint: CVector3, endRelativePointArr: CVector3[], explosionType: string, pColor: PColor) {
        let particle = particlePoolManager.shiftExplosionParticle()

        if (particle) particle.recycle(currentAbsolutePoint, endRelativePointArr, explosionType, pColor)
        else particle = ExplosionParticle.create(currentAbsolutePoint, endRelativePointArr, explosionType, pColor)

        this.addSceneAndActivateParticlesPool(particle)
    }

    static provideDustParticle(currentAbsolutePointArr: CVector3[], explosionType: string, triggerClass: string, pColor: PColor) {
        let particle = particlePoolManager.shiftDustParticle()

        if (particle) particle.recycle(currentAbsolutePointArr, explosionType, triggerClass, pColor)
        else particle = DustParticle.create(currentAbsolutePointArr, explosionType, triggerClass, pColor)

        this.addSceneAndActivateParticlesPool(particle)
    }

    static addSceneAndActivateParticlesPool(particle: Particle) {
        particlePoolManager.addActivateParticlesPool(particle)
        scene.add(particle.getMesh())
    }

    static retrieveParticle(particle: Particle) {
        particlePoolManager.moveToDeactivateParticlesPool(particle)
        scene.remove(particle.getMesh())
    }
}

export default ParticleFactory