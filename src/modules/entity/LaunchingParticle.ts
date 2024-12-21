import COLOR from "../../definition/color"
import Particle from "./Particle"
import Coordinates from "../../types/Coordinates"
import ParticleSize from "../../types/ParticleSize"
import ExplosionParticle from "./ExplosionParticle"

export default class LaunchingParticle extends Particle {
    color: string

    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
    ) {
        const size: ParticleSize = {
            width: 0.1,
            height: 1,
            depth: 0.1
        }
        const color = COLOR[ Math.floor(Math.random() * COLOR.length) ]
        super(currentAbsolutePoint, endRelativePoint, size, color)

        this.color = color
    }

    protected preDestroyTask(): void {
        this.burst(this.currentAbsolutePoint)
    }
    
    private burst(currentPoint: Coordinates) {
        const relativeEndPointArray = [
            { x: 3, y: 0, z: 0  },
            { x: 0, y: 0, z: 3  },
        ]

        relativeEndPointArray.forEach(endPoint => { new ExplosionParticle({...currentPoint}, endPoint, this.color) })
    }
}