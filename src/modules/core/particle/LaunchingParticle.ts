import COLOR from "../../../definition/color"
import BaseParticle from "./BaseParticle"
import Coordinates from "../../../types/Coordinates"

export default class LaunchingParticle extends BaseParticle {
    endRelativeYPointStore: number[] = []
    deltaArr: number[]

    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
    ) {
        const color: string = COLOR[ Math.floor(Math.random() * COLOR.length) ]
        const time: number = 5
        super(currentAbsolutePoint, endRelativePoint, color, time)

        this.endRelativeYPointStore = new Array(this.totalFrames)
        this.deltaArr = new Array(this.totalFrames)
        let copyedEndRelativePointY = this.endRelativePoint.y
        const gravity = 0.05
        for (let i = 0; i < this.totalFrames; i++) {
            this.endRelativeYPointStore[i] = copyedEndRelativePointY
            this.deltaArr[i] = copyedEndRelativePointY / this.totalFrames
            copyedEndRelativePointY -= gravity
        }
    }

    update(): void {
        this.currentAbsolutePoint.y += this.deltaArr[this.elapsedFrames]
        this.endRelativePoint.y = this.endRelativeYPointStore[this.elapsedFrames]

        this.position.set(this.currentAbsolutePoint.x, this.currentAbsolutePoint.y, this.currentAbsolutePoint.z)
        super.rotateTowardsEndPoint()

        super.update()
    }
}