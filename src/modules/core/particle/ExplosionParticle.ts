import BaseParticle from "./BaseParticle"
import Coordinates from "../../../types/Coordinates"

export default class ExplosionParticle extends BaseParticle {
    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        color: string
    ) {
        const time: number = 2
        super(currentAbsolutePoint, endRelativePoint, color, time)
    }
}