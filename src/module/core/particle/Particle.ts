import Coordinates from "../../../type/Coordinates"

export default interface Particle {
    update(): void
    // destroy(): void
    getCurrentAbsolutePoint(): Coordinates
    getEndRelativePoint(): Coordinates
    getExplosionType(): string
    getRemainingFrames(): number
    getElapsedRate(): number
    getColor(): string
    getDustRequestStatus(): boolean
}