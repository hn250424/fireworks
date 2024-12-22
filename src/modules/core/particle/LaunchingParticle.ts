import COLOR from "../../../definition/color"
import BaseParticle from "./BaseParticle"
import Coordinates from "../../../types/Coordinates"

export default class LaunchingParticle extends BaseParticle {
    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
    ) {
        const color = COLOR[ Math.floor(Math.random() * COLOR.length) ]
        const time = 2
        super(currentAbsolutePoint, endRelativePoint, color, time)
    }
}