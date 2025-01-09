import * as THREE from 'three'

import COLOR from "../../../definition/color"
import BaseParticle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"

export default class LaunchingParticle extends BaseParticle {
    private explosionType: string
    private pointStorage: Coordinates[]

    private constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string
    ) {
        const color: string = COLOR.FIREWORKS[ Math.floor(Math.random() * COLOR.FIREWORKS.length) ]
        const time: number = 5
        const radiusTop = 0.05
        const radiusBottom = 0
        const height = 0.7
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        super(currentAbsolutePoint, endRelativePoint, color, time, geometry, material)
        
        this.explosionType = explosionType
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.getEndRelativePoint().x / this.getTotalFrames()
        const delta_z = this.getEndRelativePoint().z / this.getTotalFrames()
        let copyedCurrentAbsolutePoint_x = this.getCurrentAbsolutePoint().x
        let copyedCurrentAbsolutePoint_z = this.getCurrentAbsolutePoint().z
        for (let i = 0; i < this.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)

            this.pointStorage[i].x = copyedCurrentAbsolutePoint_x
            copyedCurrentAbsolutePoint_x += delta_x

            this.pointStorage[i].y = this.getEndRelativePoint().y * easeOutFactor
            
            this.pointStorage[i].z = copyedCurrentAbsolutePoint_z
            copyedCurrentAbsolutePoint_z += delta_z
        }
    }

    public static create(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string
    ): LaunchingParticle {
        return new LaunchingParticle(currentAbsolutePoint, endRelativePoint, explosionType)
    }

    public recycle(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string
    ): void {
        super.setCurrentAbsolutePoint(currentAbsolutePoint)
        super.setEndRelativePoint(endRelativePoint)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        this.explosionType = explosionType
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))

        const delta_x = this.getEndRelativePoint().x / this.getTotalFrames()
        const delta_z = this.getEndRelativePoint().z / this.getTotalFrames()
        let copyedCurrentAbsolutePoint_x = this.getCurrentAbsolutePoint().x
        let copyedCurrentAbsolutePoint_z = this.getCurrentAbsolutePoint().z
        for (let i = 0; i < this.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)

            this.pointStorage[i].x = copyedCurrentAbsolutePoint_x
            copyedCurrentAbsolutePoint_x += delta_x

            this.pointStorage[i].y = this.getEndRelativePoint().y * easeOutFactor
            
            this.pointStorage[i].z = copyedCurrentAbsolutePoint_z
            copyedCurrentAbsolutePoint_z += delta_z
        }
    }

    public update(): void {
        this.getCurrentAbsolutePoint().x = this.pointStorage[this.getElapsedFrames()].x
        this.getCurrentAbsolutePoint().y = this.pointStorage[this.getElapsedFrames()].y
        this.getCurrentAbsolutePoint().z = this.pointStorage[this.getElapsedFrames()].z
        this.position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)

        super.update()
    }

    public getExplosionType(): string {
        return this.explosionType
    }
}