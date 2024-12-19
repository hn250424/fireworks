import Coordinates from "../../types/Coordinates";

export default interface IParticle {
    currentPoint: Coordinates
    endPoint: Coordinates

    targetTime: number

    color: string

    update(): void
}