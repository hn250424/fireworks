import Particle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"
import ParticleSize from "../../../type/ParticleSize"

export default class TraceParticle extends Particle {
    constructor(
        currentAbsolutePoint: Coordinates,
        color: string
    ) {
        const endRelativePoint: Coordinates = { x: 0, y: 0, z: 0 }
        const time: number = 0.5
        const size: ParticleSize = { width: 0.03, height: 0.03, depth: 0.03 }
        super(currentAbsolutePoint, endRelativePoint, color, time, size)
    }

    public update(): void {
        this.position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)
        super.update()
    }
}