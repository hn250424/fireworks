import * as THREE from 'three'

import BaseParticle from "./BaseParticle"
import CVector3 from "../../../type/CVector3"

export default class DustParticle extends BaseParticle {
    private object3D: THREE.Object3D
    private currentAbsolutePointArr: CVector3[]

    constructor(
        currentAbsolutePointArr: CVector3[],
        explosionType: string,
        color: string
    ) {
        let time: number = 0.5
        const size = 0.03
        const geometry = new THREE.BoxGeometry(size, size, size)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        const instancedMesh = new THREE.InstancedMesh(geometry, material, currentAbsolutePointArr.length)
        const object3D = new THREE.Object3D()

        super(geometry, material, instancedMesh, { x: 0, y: 0, z: 0 }, explosionType, color, time)

        this.object3D = object3D
        this.currentAbsolutePointArr = currentAbsolutePointArr

        for (let i = 0; i < this.currentAbsolutePointArr.length; i++) {
            this.object3D.position.x = this.currentAbsolutePointArr[i].x
            this.object3D.position.y = this.currentAbsolutePointArr[i].y
            this.object3D.position.z = this.currentAbsolutePointArr[i].z

            this.object3D.updateMatrix()
            if (this.getMesh() instanceof THREE.InstancedMesh) super.setMatrixAt(i, this.object3D)
        }
        super.needsUpdateInstanceMatrix()
    }

    public static create(
        currentAbsolutePointArr: CVector3[],
        explosionType: string,
        color: string
    ): DustParticle {
        return new DustParticle(currentAbsolutePointArr, explosionType, color)
    }

    public recycle(
        currentAbsolutePointArr: CVector3[],
        explosionType: string,
        color: string
    ): void {
        super.setMesh( new THREE.InstancedMesh(super.getGeometry(), super.getMaterial(), currentAbsolutePointArr.length) )
        this.currentAbsolutePointArr = currentAbsolutePointArr
        super.setExplosionType(explosionType)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        super.setColor(color)

        for (let i = 0; i < this.currentAbsolutePointArr.length; i++) {
            this.object3D.position.x = this.currentAbsolutePointArr[i].x
            this.object3D.position.y = this.currentAbsolutePointArr[i].y
            this.object3D.position.z = this.currentAbsolutePointArr[i].z

            this.object3D.updateMatrix()
            if (this.getMesh() instanceof THREE.InstancedMesh) super.setMatrixAt(i, this.object3D)
        }
        super.needsUpdateInstanceMatrix()
    }

    public update(): void {
        super.update()
    }
}