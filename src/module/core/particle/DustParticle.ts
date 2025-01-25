import * as THREE from 'three'

import BaseParticle from "./BaseParticle"
import CVector3 from "../../../type/CVector3"
import PColor from '../../../type/PColor'
import PStatus from '../../../type/PType'
import TYPE from '../../../definition/type'

const petiteBurstTime = 1

export default class DustParticle extends BaseParticle {
    private object3D: THREE.Object3D
    private currentAbsolutePointArr: CVector3[]

    constructor(
        currentAbsolutePointArr: CVector3[],
        pStatus: PStatus,
        pColor: PColor,
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

        // Time.
        let time = 1.5
        if (
            pStatus.instance === TYPE.PARTICLE.EXPLOSION && pStatus.explosion === TYPE.EXPLOSION.ROUTINE.PETITE_BURST
        ) {
            time = petiteBurstTime
        }

        super({ x: 0, y: 0, z: 0 }, pStatus, pColor, geometry, material, instancedMesh, time)

        this.object3D = object3D
        this.currentAbsolutePointArr = currentAbsolutePointArr

        for (let i = 0; i < this.currentAbsolutePointArr.length; i++) {
            this.object3D.position.x = this.currentAbsolutePointArr[i].x
            this.object3D.position.y = this.currentAbsolutePointArr[i].y
            this.object3D.position.z = this.currentAbsolutePointArr[i].z

            this.object3D.updateMatrix()
            if (super.getMesh() instanceof THREE.InstancedMesh) super.setMatrixAt(i, this.object3D.matrix)

            // [TODO]: #1
            // The base material color blends with the instance color set by setColorAt.
            // To avoid this, the material color is now set to white (#ffffff).
            // However, this means the color for all instances must be explicitly set, not just specific ones.
            if (super.getMesh() instanceof THREE.InstancedMesh) {
                if (i % 2 === 0) {
                    super.setColorAt(i, super.getPColor().main)
                } else {
                    super.setColorAt(i, super.getPColor().sub)
                }
            }
        }

        super.needsUpdateInstanceMatrix()
        super.needsUpdateInstanceColor()
    }

    public static create(
        currentAbsolutePointArr: CVector3[],
        pStatus: PStatus,
        pColor: PColor = { main: 'white', sub: 'white' },
    ): DustParticle {
        return new DustParticle(currentAbsolutePointArr, pStatus, pColor)
    }

    public recycle(
        currentAbsolutePointArr: CVector3[],
        pStatus: PStatus,
        pColor: PColor
    ): void {
        this.currentAbsolutePointArr = currentAbsolutePointArr
        super.setPStatus(pStatus)
        super.setPColor(pColor)
        super.setMesh(new THREE.InstancedMesh(super.getGeometry(), super.getMaterial(), currentAbsolutePointArr.length))
        this._setTime(pStatus)
        super.setTotalFrames(super.getTime())
        super.setRemainingFrames(super.getTotalFrames())
        super.setElapsedFrames(0)

        for (let i = 0; i < this.currentAbsolutePointArr.length; i++) {
            this.object3D.position.x = this.currentAbsolutePointArr[i].x
            this.object3D.position.y = this.currentAbsolutePointArr[i].y
            this.object3D.position.z = this.currentAbsolutePointArr[i].z

            this.object3D.updateMatrix()
            if (super.getMesh() instanceof THREE.InstancedMesh) super.setMatrixAt(i, this.object3D.matrix)

            // [TODO]: #1
            // The base material color blends with the instance color set by setColorAt.
            // To avoid this, the material color is now set to white (#ffffff).
            // However, this means the color for all instances must be explicitly set, not just specific ones.
            if (super.getMesh() instanceof THREE.InstancedMesh) {
                if (i % 2 === 0) {
                    super.setColorAt(i, super.getPColor().main)
                } else {
                    super.setColorAt(i, super.getPColor().sub)
                }
            }
        }

        super.needsUpdateInstanceMatrix()
        super.needsUpdateInstanceColor()
    }

    private _setTime(pStatus: PStatus) {
        if (
            pStatus.explosion === TYPE.EXPLOSION.ROUTINE.PETITE_BURST
        ) {
            super.setTime(petiteBurstTime)
        }
    }
}