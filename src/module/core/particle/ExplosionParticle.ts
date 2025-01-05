import BaseParticle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"

export default class ExplosionParticle extends BaseParticle {
    private endRelativeYPointStorage: number[] = []   // Updating the y-endPoint to affect the particle's rotation.
    private explosionType: string
    private pointStorage: Coordinates[]

    private constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string,
        color: string
    ) {
        const time = 5
        super(currentAbsolutePoint, endRelativePoint, color, time)

        this.endRelativeYPointStorage = new Array(this.getTotalFrames())
        this.explosionType = explosionType
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const copyedStartAbsolutePoint_y = this.getCurrentAbsolutePoint().y
        let copyedEndRelativePoint_y = this.getEndRelativePoint().y
        const gravity = 0.03
        for (let i = 0; i < this.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)
            
            this.pointStorage[i].x = this.getCurrentAbsolutePoint().x + (this.getEndRelativePoint().x * easeOutFactor) 

            this.endRelativeYPointStorage[i] = copyedEndRelativePoint_y
            this.pointStorage[i].y = copyedStartAbsolutePoint_y + copyedEndRelativePoint_y * easeOutFactor
            copyedEndRelativePoint_y -= gravity

            this.pointStorage[i].z = this.getCurrentAbsolutePoint().z + (this.getEndRelativePoint().z * easeOutFactor) 
        }
    }

    public static create(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string,
        color: string
    ): ExplosionParticle {
        return new ExplosionParticle(currentAbsolutePoint, endRelativePoint, explosionType, color)
    }

    public recycle(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string,
        color: string
    ): void {
        super.setCurrentAbsolutePoint(currentAbsolutePoint)
        super.setEndRelativePoint(endRelativePoint)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        super.setColor(color)
        
        this.endRelativeYPointStorage = new Array(this.getTotalFrames())
        this.explosionType = explosionType
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const copyedStartAbsolutePoint_y = this.getCurrentAbsolutePoint().y
        let copyedEndRelativePoint_y = this.getEndRelativePoint().y
        const gravity = 0.03
        for (let i = 0; i < this.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)
            
            this.pointStorage[i].x = this.getCurrentAbsolutePoint().x + (this.getEndRelativePoint().x * easeOutFactor)

            this.endRelativeYPointStorage[i] = copyedEndRelativePoint_y
            this.pointStorage[i].y = copyedStartAbsolutePoint_y + copyedEndRelativePoint_y * easeOutFactor
            copyedEndRelativePoint_y -= gravity

            this.pointStorage[i].z = this.getCurrentAbsolutePoint().z + (this.getEndRelativePoint().z * easeOutFactor)
        }
    }

    public update(): void {
        this.getCurrentAbsolutePoint().x = this.pointStorage[this.getElapsedFrames()].x
        this.getCurrentAbsolutePoint().y = this.pointStorage[this.getElapsedFrames()].y
        this.getCurrentAbsolutePoint().z = this.pointStorage[this.getElapsedFrames()].z
        this.getEndRelativePoint().y = this.endRelativeYPointStorage[this.getElapsedFrames()]

        this.position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)
        super.rotateTowardsEndPoint()

        super.update()
    }

    public getExplosionType(): string {
        return this.explosionType
    }
}