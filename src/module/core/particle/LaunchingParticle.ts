import * as THREE from 'three'

import COLOR from "../../../definition/color"
import BaseParticle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"
import ChildDustInfo from '../../../type/ChildDustInfo'

export default class LaunchingParticle extends BaseParticle {
    private pointStorage: Coordinates[]
    private endRelativePoint: Coordinates

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
        const mesh = new THREE.Mesh(geometry, material)
        const childDustInfo: ChildDustInfo = {
            use: true,
            unit: 10,
            request: false
        }
        super(mesh, material, currentAbsolutePoint, explosionType, color, time, childDustInfo)

        this.endRelativePoint = endRelativePoint

        // After delete extends Mesh in BaseParticle.
        // const geometry = new THREE.SphereGeometry(1, 32, 32)
        // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        // const launchingParticle = new THREE.Mesh(geometry, material)
        // scene.add(launchingParticle)
        
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
        this.endRelativePoint = endRelativePoint
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        super.setExplosionType(explosionType)
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
        this.mesh.position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)

        // super.rotateTowardsEndPoint(this.currentAbsolutePoint, this.endRelativePoint)
        super.update()
    }
}