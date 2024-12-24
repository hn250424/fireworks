import BaseParticle from "./BaseParticle"
import Coordinates from "../../../types/Coordinates"

export default class ExplosionParticle extends BaseParticle {
    endRelativeYPointStorage: number[] = []   // Updating the y-endPoint to affect the particle's rotation.
    pointStorage: Coordinates[]

    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        color: string
    ) {
        const time: number = 5
        super(currentAbsolutePoint, endRelativePoint, color, time)

        this.endRelativeYPointStorage = new Array(this.totalFrames)
        this.pointStorage = new Array(this.totalFrames).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const copyedStartAbsolutePoint_y = this.currentAbsolutePoint.y
        let copyedEndRelativePoint_y = this.endRelativePoint.y
        const gravity = 0.03
        for (let i = 0; i < this.totalFrames; i++) {
            const easeOutFactor = super.getEaseOutFactor(i)
            
            this.pointStorage[i].x = this.currentAbsolutePoint.x + (this.endRelativePoint.x * easeOutFactor) 

            this.endRelativeYPointStorage[i] = copyedEndRelativePoint_y
            this.pointStorage[i].y = copyedStartAbsolutePoint_y + copyedEndRelativePoint_y * easeOutFactor
            copyedEndRelativePoint_y -= gravity

            this.pointStorage[i].z = this.currentAbsolutePoint.z + (this.endRelativePoint.z * easeOutFactor) 
        }
    }

    update(): void {
        this.currentAbsolutePoint.x = this.pointStorage[this.elapsedFrames].x
        this.currentAbsolutePoint.y = this.pointStorage[this.elapsedFrames].y
        this.currentAbsolutePoint.z = this.pointStorage[this.elapsedFrames].z
        this.endRelativePoint.y = this.endRelativeYPointStorage[this.elapsedFrames]

        this.position.set(this.currentAbsolutePoint.x, this.currentAbsolutePoint.y, this.currentAbsolutePoint.z)
        super.rotateTowardsEndPoint()

        super.update()
    }
}