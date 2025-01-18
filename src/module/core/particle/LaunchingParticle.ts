import * as THREE from 'three'

import COLOR from "../../../definition/color"
import BaseParticle from "./BaseParticle"
import CVector3 from "../../../type/CVector3"

export default class LaunchingParticle extends BaseParticle {
    private pointStorage: CVector3[]
    private endRelativePoint: CVector3

    private constructor(
        currentAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        explosionType: string
    ) {
        const color: string = COLOR.FIREWORKS[ Math.floor(Math.random() * COLOR.FIREWORKS.length) ]
        const time: number = 5
        const radiusTop = 0.05
        const radiusBottom = 0
        const height = 0.7
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        const mesh = new THREE.Mesh(geometry, material)
        const dustCreationInterval = 15
        super(geometry, material, mesh, currentAbsolutePoint, explosionType, color, time, dustCreationInterval)

        this.endRelativePoint = endRelativePoint
        
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.endRelativePoint.x / this.getTotalFrames()
        const delta_z = this.endRelativePoint.z / this.getTotalFrames()
        let copyedCurrentAbsolutePoint_x = this.getCurrentAbsolutePoint().x
        let copyedCurrentAbsolutePoint_z = this.getCurrentAbsolutePoint().z
        for (let i = 0; i < this.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)

            this.pointStorage[i].x = copyedCurrentAbsolutePoint_x
            copyedCurrentAbsolutePoint_x += delta_x

            this.pointStorage[i].y = this.endRelativePoint.y * easeOutFactor
            
            this.pointStorage[i].z = copyedCurrentAbsolutePoint_z
            copyedCurrentAbsolutePoint_z += delta_z
        }
    }

    public static create(
        currentAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        explosionType: string
    ): LaunchingParticle {
        return new LaunchingParticle(currentAbsolutePoint, endRelativePoint, explosionType)
    }

    public recycle(
        currentAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        explosionType: string
    ): void {
        super.setCurrentAbsolutePoint(currentAbsolutePoint)
        this.endRelativePoint = endRelativePoint
        super.setExplosionType(explosionType)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        const color: string = COLOR.FIREWORKS[ Math.floor(Math.random() * COLOR.FIREWORKS.length) ]
        super.setColor(color)
        
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.endRelativePoint.x / this.getTotalFrames()
        const delta_z = this.endRelativePoint.z / this.getTotalFrames()
        let copyedCurrentAbsolutePoint_x = this.getCurrentAbsolutePoint().x
        let copyedCurrentAbsolutePoint_z = this.getCurrentAbsolutePoint().z
        for (let i = 0; i < this.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)

            this.pointStorage[i].x = copyedCurrentAbsolutePoint_x
            copyedCurrentAbsolutePoint_x += delta_x

            this.pointStorage[i].y = this.endRelativePoint.y * easeOutFactor
            
            this.pointStorage[i].z = copyedCurrentAbsolutePoint_z
            copyedCurrentAbsolutePoint_z += delta_z
        }
    }

    public update(): void {
        this.getCurrentAbsolutePoint().x = this.pointStorage[this.getElapsedFrames()].x
        this.getCurrentAbsolutePoint().y = this.pointStorage[this.getElapsedFrames()].y
        this.getCurrentAbsolutePoint().z = this.pointStorage[this.getElapsedFrames()].z
        this.getMesh().position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)

        // super.rotateTowardsEndPoint(this.currentAbsolutePoint, this.endRelativePoint)
        super.update()
    }
}