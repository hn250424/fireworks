import * as THREE from 'three'

import CVector3 from "../../../type/CVector3"

import BaseParticle from "./BaseParticle"

export default class ExplosionParticle extends BaseParticle {
    private object3D: THREE.Object3D
    private endRelativePointArr: CVector3[]
    private gravity: number

    private constructor(
        currentAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        explosionType: string,
        color: string
    ) {
        const size = 0.1
        const time = 5
        const geometry = new THREE.BoxGeometry(size, size, size)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        const instancedMesh = new THREE.InstancedMesh(geometry, material, endRelativePointArr.length)
        const object3D = new THREE.Object3D()
        const dustCreationInterval = 15
        super(geometry, material, instancedMesh, currentAbsolutePoint, explosionType, color, time, dustCreationInterval)
        
        this.object3D = object3D
        this.endRelativePointArr = endRelativePointArr
        this.gravity = 0.03
    }

    public static create(
        currentAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        explosionType: string,
        color: string
    ): ExplosionParticle {
        return new ExplosionParticle(currentAbsolutePoint, endRelativePointArr, explosionType, color)
    }

    public recycle(
        currentAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        explosionType: string,
        color: string
    ): void {
        super.setMesh( new THREE.InstancedMesh(super.getGeometry(), super.getMaterial(), endRelativePointArr.length) )
        this.setCurrentAbsolutePoint(currentAbsolutePoint)
        this.endRelativePointArr = endRelativePointArr
        super.setExplosionType(explosionType)
        super.setColor(color)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
    }

    public update(): void {
        for (let i = 0; i < this.endRelativePointArr.length; i++) {
            const easeOutFactor = this.getEaseOutFactor(this.getElapsedFrames())

            this.object3D.position.x = this.getCurrentAbsolutePoint().x + (this.endRelativePointArr[i].x * easeOutFactor)
            
            this.object3D.position.y = this.getCurrentAbsolutePoint().y + (this.endRelativePointArr[i].y * easeOutFactor)
            this.endRelativePointArr[i].y -= this.gravity

            this.object3D.position.z = this.getCurrentAbsolutePoint().z + (this.endRelativePointArr[i].z * easeOutFactor)

            super.rotateTowardsEndPoint(
                this.getCurrentAbsolutePoint(), 
                { x: this.object3D.position.x, y: this.object3D.position.y, z: this.object3D.position.z },
                this.object3D
            )
            
            this.object3D.updateMatrix()
            if (this.getMesh() instanceof THREE.InstancedMesh) super.setMatrixAt(i, this.object3D)
        }
        super.needsUpdateInstanceMatrix()

        super.update()
    }
}