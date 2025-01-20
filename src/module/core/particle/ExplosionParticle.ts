import * as THREE from 'three'

import CVector3 from "../../../type/CVector3"

import BaseParticle from "./BaseParticle"
import TYPE from '../../../definition/type'

export default class ExplosionParticle extends BaseParticle {
    private object3D: THREE.Object3D
    private endRelativePointArr: CVector3[]
    private gravity: number

    private constructor(
        beginAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        explosionType: string,
        color: string
    ) {
        const size = 0.1
        const geometry = new THREE.BoxGeometry(size, size, size)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        const instancedMesh = new THREE.InstancedMesh(geometry, material, endRelativePointArr.length)
        const object3D = new THREE.Object3D()
        const time = 5
        let dustCreationInterval = 15
        if (
            explosionType === TYPE.EXPLOSION.HIGHLIGHTS.CHAIN_BURST ||
            explosionType === TYPE.EXPLOSION.HIGHLIGHTS.HUGE_BURST
        ) {
            dustCreationInterval = 5
        }
        super(beginAbsolutePoint, explosionType, color, geometry, material, instancedMesh, time, dustCreationInterval)
        
        this.object3D = object3D
        this.endRelativePointArr = endRelativePointArr
        this.gravity = 0.03
    }

    public static create(
        beginAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        explosionType: string,
        color: string
    ): ExplosionParticle {
        return new ExplosionParticle(beginAbsolutePoint, endRelativePointArr, explosionType, color)
    }

    public recycle(
        beginAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        explosionType: string,
        color: string
    ): void {
        this.setBeginAbsolutePoint(beginAbsolutePoint)
        this.endRelativePointArr = endRelativePointArr
        super.setExplosionType(explosionType)
        super.setColor(color)
        super.setMesh( new THREE.InstancedMesh(super.getGeometry(), super.getMaterial(), endRelativePointArr.length) )
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
    }

    public update(): void {
        const bp = this.getBeginAbsolutePoint()
        for (let i = 0; i < this.endRelativePointArr.length; i++) {
            const easeOutFactor = this.getEaseOutFactor(this.getElapsedFrames())

            this.object3D.position.x = bp.x + (this.endRelativePointArr[i].x * easeOutFactor)
            
            this.object3D.position.y = bp.y + (this.endRelativePointArr[i].y * easeOutFactor)
            this.endRelativePointArr[i].y -= this.gravity

            this.object3D.position.z = bp.z + (this.endRelativePointArr[i].z * easeOutFactor)

            super.rotateTowardsEndPoint(
                bp, 
                { x: this.object3D.position.x, y: this.object3D.position.y, z: this.object3D.position.z },
                this.object3D
            )
            
            this.object3D.updateMatrix()
            if (this.getMesh() instanceof THREE.InstancedMesh) super.setMatrixAt(i, this.object3D.matrix)
        }
        super.needsUpdateInstanceMatrix()

        super.update()
    }
}