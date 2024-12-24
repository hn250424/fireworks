import BaseParticle from "./BaseParticle"
import Coordinates from "../../../types/Coordinates"

export default class ExplosionParticle extends BaseParticle {
    endRelativeYPointStore: number[] = []
    deltaArr: Coordinates[]

    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        color: string
    ) {
        const time: number = 5
        super(currentAbsolutePoint, endRelativePoint, color, time)

        this.endRelativeYPointStore = new Array(this.totalFrames)
        this.deltaArr = new Array(this.totalFrames).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.endRelativePoint.x / this.totalFrames
        let copyedEndRelativePointY = this.endRelativePoint.y
        const delta_z = this.endRelativePoint.z / this.totalFrames
        const gravity = 0.05
        for (let i = 0; i < this.totalFrames; i++) {
            this.deltaArr[i].x = delta_x - (delta_x * i / this.totalFrames)

            this.endRelativeYPointStore[i] = copyedEndRelativePointY
            this.deltaArr[i].y = copyedEndRelativePointY / this.totalFrames
            copyedEndRelativePointY -= gravity

            this.deltaArr[i].z = delta_z - (delta_z * i / this.totalFrames)
        }
    }

    update(): void {
        this.currentAbsolutePoint.x += this.deltaArr[this.elapsedFrames].x
        this.currentAbsolutePoint.y += this.deltaArr[this.elapsedFrames].y
        this.currentAbsolutePoint.z += this.deltaArr[this.elapsedFrames].z
        this.endRelativePoint.y = this.endRelativeYPointStore[this.elapsedFrames]

        this.position.set(this.currentAbsolutePoint.x, this.currentAbsolutePoint.y, this.currentAbsolutePoint.z)
        super.rotateTowardsEndPoint()

        super.update()
    }
}