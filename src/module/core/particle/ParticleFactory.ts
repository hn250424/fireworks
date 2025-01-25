import scene from "../scene"
import CVector3 from "../../../type/CVector3"
import Particle from "./Particle"
import particlePoolManager from "./particlePoolManager"
import LaunchingParticle from "./LaunchingParticle"
import ExplosionParticle from "./ExplosionParticle"
import DustParticle from "./DustParticle"
import Color from "../../../type/PColor"
import PStatus from "../../../type/PType"

class ParticleFactory {
    static provideLaunchingParticle(currentAbsolutePoint: CVector3, endRelativePoint: CVector3, pStatus: PStatus) {
        let particle = particlePoolManager.shiftLaunchingParticle()
        
        if (particle) particle.recycle(currentAbsolutePoint, endRelativePoint, pStatus)
        else particle = LaunchingParticle.create(currentAbsolutePoint, endRelativePoint, pStatus)
    
        this.addSceneAndActivatePool(particle)
    }

    static provideExplosionParticle(currentAbsolutePoint: CVector3, endRelativePointArr: CVector3[], pStatus: PStatus, color: Color) {
        let particle = particlePoolManager.shiftExplosionParticle()

        if (particle) particle.recycle(currentAbsolutePoint, endRelativePointArr, pStatus, color)
        else particle = ExplosionParticle.create(currentAbsolutePoint, endRelativePointArr, pStatus, color)

        this.addSceneAndActivatePool(particle)
    }

    static provideDustParticle(currentAbsolutePointArr: CVector3[], pStatus: PStatus, color: Color) {
        let particle = particlePoolManager.shiftDustParticle()

        if (particle) particle.recycle(currentAbsolutePointArr, pStatus, color)
        else particle = DustParticle.create(currentAbsolutePointArr, pStatus, color)

        this.addSceneAndActivatePool(particle)
    }

    static addSceneAndActivatePool(particle: Particle) {
        particlePoolManager.addActivatePool(particle)
        scene.add(particle.getMesh())
    }

    static retrieveParticle(particle: Particle) {
        particlePoolManager.moveToWaitingPool(particle)
        scene.remove(particle.getMesh())
    }
}

export default ParticleFactory