import * as THREE from 'three'

import Coordinates from "../../../type/Coordinates"
import ChildDustInfo from '../../../type/ChildDustInfo'

import BaseParticle from "./BaseParticle"

export default class ExplosionParticle extends BaseParticle {
    private object3D: THREE.Object3D
    private endRelativePointArr: Coordinates[]

    private constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePointArr: Coordinates[],
        explosionType: string,
        color: string
    ) {
        const size = 0.1
        const time = 5

        const geometry = new THREE.BoxGeometry(size, size, size)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })

        const instancedMesh = new THREE.InstancedMesh(geometry, material, endRelativePointArr.length)
        const object3D = new THREE.Object3D()

        const childDustInfo: ChildDustInfo = {
            use: true,
            unit: 20,
            request: false
        }

        super(geometry, material, instancedMesh, currentAbsolutePoint, explosionType, color, time, childDustInfo)

        this.mesh = instancedMesh
        this.object3D = object3D
        this.endRelativePointArr = endRelativePointArr

        for (let i = 0; i < endRelativePointArr.length; i++) {
            this.object3D.position.set(currentAbsolutePoint.x, currentAbsolutePoint.y, currentAbsolutePoint.z)
            this.object3D.updateMatrix()
            if (this.mesh instanceof THREE.InstancedMesh) this.mesh.setMatrixAt(i, this.object3D.matrix)
        }
    }

    public static create(
        currentAbsolutePoint: Coordinates,
        endRelativePointArr: Coordinates[],
        explosionType: string,
        color: string
    ): ExplosionParticle {
        console.log('create', endRelativePointArr)
        return new ExplosionParticle(currentAbsolutePoint, endRelativePointArr, explosionType, color)
    }

    public recycle(
        currentAbsolutePoint: Coordinates,
        endRelativePointArr: Coordinates[],
        explosionType: string,
        color: string
    ): void {
        console.log('recycle', endRelativePointArr)
        this.mesh = new THREE.InstancedMesh(this.geometry, this.material, endRelativePointArr.length)

        this.setCurrentAbsolutePoint(currentAbsolutePoint)
        this.endRelativePointArr = endRelativePointArr
        super.setExplosionType(explosionType)
        super.setColor(color)
        for (let i = 0; i < endRelativePointArr.length; i++) {
            this.object3D.position.set(currentAbsolutePoint.x, currentAbsolutePoint.y, currentAbsolutePoint.z)
            this.object3D.updateMatrix()
            if (this.mesh instanceof THREE.InstancedMesh) this.mesh.setMatrixAt(i, this.object3D.matrix)
        }
        if (this.mesh instanceof THREE.InstancedMesh) this.mesh.instanceMatrix.needsUpdate = true
    }

    public update(): void {
        for (let i = 0; i < this.endRelativePointArr.length; i++) {
            const easeOutFactor = this.getEaseOutFactor(this.getElapsedFrames())

            this.object3D.position.x = this.getCurrentAbsolutePoint().x + (this.endRelativePointArr[i].x * easeOutFactor)
            
            const gravity = 0.03
            this.object3D.position.y = this.getCurrentAbsolutePoint().y + (this.endRelativePointArr[i].y * easeOutFactor)
            this.endRelativePointArr[i].y -= gravity

            this.object3D.position.z = this.getCurrentAbsolutePoint().z + (this.endRelativePointArr[i].z * easeOutFactor)

            super.rotateTowardsEndPoint(
                this.getCurrentAbsolutePoint(), 
                { x: this.object3D.position.x, y: this.object3D.position.y, z: this.object3D.position.z },
                this.object3D
            )
            
            this.object3D.updateMatrix()
            if (this.mesh instanceof THREE.InstancedMesh) this.mesh.setMatrixAt(i, this.object3D.matrix)
        }
        if (this.mesh instanceof THREE.InstancedMesh) this.mesh.instanceMatrix.needsUpdate = true

        super.update()
    }
}