import * as THREE from 'three'

import BaseParticle from "./BaseParticle"
import CVector3 from "../../../type/CVector3"
import Color from '../../../type/Color'

export default class DustParticle extends BaseParticle {
    private object3D: THREE.Object3D
    private currentAbsolutePointArr: CVector3[]

    constructor(
        currentAbsolutePointArr: CVector3[],
        explosionType: string,
        color: Color,
    ) {
        const size = 0.03
        const geometry = new THREE.BoxGeometry(size, size, size)
        // [TODO]: #1
        // The base material color blends with the instance color set by setColorAt.
        // When the material color is white (#ffffff), the intended instance colors display correctly.
        // const material = new THREE.MeshStandardMaterial({ color: color.main, transparent: true })
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true })
        const instancedMesh = new THREE.InstancedMesh(geometry, material, currentAbsolutePointArr.length)
        const object3D = new THREE.Object3D()
        const time = 0.5

        super({ x: 0, y: 0, z: 0 }, explosionType, color, geometry, material, instancedMesh, time)

        this.object3D = object3D
        this.currentAbsolutePointArr = currentAbsolutePointArr

        for (let i = 0; i < this.currentAbsolutePointArr.length; i++) {
            this.object3D.position.x = this.currentAbsolutePointArr[i].x
            this.object3D.position.y = this.currentAbsolutePointArr[i].y
            this.object3D.position.z = this.currentAbsolutePointArr[i].z

            this.object3D.updateMatrix()
            if (super.getMesh() instanceof THREE.InstancedMesh) super.setMatrixAt(i, this.object3D.matrix)
        }
        super.needsUpdateInstanceMatrix()
    }

    public static create(
        currentAbsolutePointArr: CVector3[],
        explosionType: string,
        color: Color = { main: 'white', sub: 'white' },
    ): DustParticle {
        return new DustParticle(currentAbsolutePointArr, explosionType, color)
    }

    public recycle(
        currentAbsolutePointArr: CVector3[],
        explosionType: string,
        color: Color
    ): void {
        this.currentAbsolutePointArr = currentAbsolutePointArr
        super.setExplosionType(explosionType)
        super.setColor(color)
        super.setMesh(new THREE.InstancedMesh(super.getGeometry(), super.getMaterial(), currentAbsolutePointArr.length))
        super.setRemainingFrames(super.getTotalFrames())
        super.setElapsedFrames(0)

        for (let i = 0; i < this.currentAbsolutePointArr.length; i++) {
            this.object3D.position.x = this.currentAbsolutePointArr[i].x
            this.object3D.position.y = this.currentAbsolutePointArr[i].y
            this.object3D.position.z = this.currentAbsolutePointArr[i].z

            this.object3D.updateMatrix()
            if (super.getMesh() instanceof THREE.InstancedMesh) super.setMatrixAt(i, this.object3D.matrix)
        }
        super.needsUpdateInstanceMatrix()
    }

    public update(): void {
        // [TODO]: #1
        // The base material color blends with the instance color set by setColorAt.
        // To avoid this, the material color is now set to white (#ffffff).
        // However, this means the color for all instances must be explicitly set, not just specific ones.
        for (let i = 0; i < this.currentAbsolutePointArr.length; i++) {
            if (super.getMesh() instanceof THREE.InstancedMesh) {
                if (i % 2 === 0) {
                    super.setColorAt(i, super.getColor().main)
                } else {
                    super.setColorAt(i, super.getColor().sub)
                }
            }
        }
        super.needsUpdateInstanceColor()

        super.update()
    }
}