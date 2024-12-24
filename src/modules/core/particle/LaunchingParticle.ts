import COLOR from "../../../definition/color"
import BaseParticle from "./BaseParticle"
import Coordinates from "../../../types/Coordinates"

export default class LaunchingParticle extends BaseParticle {
    pointStorage: Coordinates[]

    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
    ) {
        const color: string = COLOR[ Math.floor(Math.random() * COLOR.length) ]
        const time: number = 5
        super(currentAbsolutePoint, endRelativePoint, color, time)

        this.pointStorage = new Array(this.totalFrames).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.endRelativePoint.x / this.totalFrames
        const delta_z = this.endRelativePoint.z / this.totalFrames
        let copyedCurrentAbsolutePoint_x = this.currentAbsolutePoint.x
        let copyedCurrentAbsolutePoint_z = this.currentAbsolutePoint.z
        for (let i = 0; i < this.totalFrames; i++) {
            const easeOutFactor = super.getEaseOutFactor(i)

            this.pointStorage[i].x = copyedCurrentAbsolutePoint_x
            copyedCurrentAbsolutePoint_x += delta_x

            this.pointStorage[i].y = this.endRelativePoint.y * easeOutFactor
            
            this.pointStorage[i].z = copyedCurrentAbsolutePoint_z
            copyedCurrentAbsolutePoint_z += delta_z
        }
    }

    update(): void {
        this.currentAbsolutePoint.x = this.pointStorage[this.elapsedFrames].x
        this.currentAbsolutePoint.y = this.pointStorage[this.elapsedFrames].y
        this.currentAbsolutePoint.z = this.pointStorage[this.elapsedFrames].z
        this.position.set(this.currentAbsolutePoint.x, this.currentAbsolutePoint.y, this.currentAbsolutePoint.z)

        super.update()
    }
}