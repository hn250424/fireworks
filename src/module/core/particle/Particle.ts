import * as THREE from 'three'
import Coordinates from "../../../type/Coordinates"

export default interface Particle {
    update(): void
    destroy(): void
    getCurrentAbsolutePoint(): Coordinates
    getEndRelativePoint(): Coordinates
    getRemainingFrames(): number
    getColor(): string
}