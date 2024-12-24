import Coordinates from "../../../types/Coordinates"

export default interface Particle {
    currentAbsolutePoint: Coordinates,
    endRelativePoint: Coordinates,
    totalFrames: number,
    remainingFrames: number,
    elapsedFrames: number,
    color: string,

    update(): void
    destroy(): void
}