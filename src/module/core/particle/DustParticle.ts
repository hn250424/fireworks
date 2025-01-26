import * as THREE from 'three'

import BaseParticle from "./BaseParticle"
import CVector3 from "../../../type/CVector3"
import PColor from '../../../type/PColor'
import TYPE from '../../../definition/type'

const LIFE_TIME = {
    // quickest: 0.5,
    quick: 1,
    moderate: 1.5,
    // slow: 2,
    // slowest: 2.5,
}

const SIZE = 0.03

export default class DustParticle extends BaseParticle {
    private object3D: THREE.Object3D
    private currentAbsolutePointArr: CVector3[]
    private triggerClass: string

    constructor(
        currentAbsolutePointArr: CVector3[],
        explosionType: string,
        triggerClass: string,
        pColor: PColor,
    ) {
        const geometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE)
        // [TODO]: #1
        // The base material color blends with the instance color set by setColorAt.
        // When the material color is white (#ffffff), the intended instance colors display correctly.
        // const material = new THREE.MeshStandardMaterial({ color: color.main, transparent: true })
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true })
        const instancedMesh = new THREE.InstancedMesh(geometry, material, currentAbsolutePointArr.length)
        const object3D = new THREE.Object3D()

        // Time.
        let time
        if (
            triggerClass === TYPE.INSTANCE.EXPLOSION && explosionType === TYPE.EXPLOSION.ROUTINE.PETITE_BURST
        ) {
            time = LIFE_TIME.quick
        } else {
            time = LIFE_TIME.moderate
        }

        super(TYPE.INSTANCE.DUST, { x: 0, y: 0, z: 0 }, explosionType, pColor, geometry, material, instancedMesh, time)

        this.object3D = object3D
        this.currentAbsolutePointArr = currentAbsolutePointArr
        this.triggerClass = triggerClass

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
        explosionType: string,
        triggerClass: string,
        pColor: PColor = { main: 'white', sub: 'white' },
    ): DustParticle {
        return new DustParticle(currentAbsolutePointArr, explosionType, triggerClass, pColor)
    }

    public recycle(
        currentAbsolutePointArr: CVector3[],
        explosionType: string,
        triggerClass: string,
        pColor: PColor,
    ): void {
        this.currentAbsolutePointArr = currentAbsolutePointArr
        super.setExplosionType(explosionType)
        this.triggerClass = triggerClass
        super.setPColor(pColor)
        super.setMesh(new THREE.InstancedMesh(super.getGeometry(), super.getMaterial(), currentAbsolutePointArr.length))
        this._setTime(explosionType)
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

    private _setTime(explosionType: string) {
        if (
            this.triggerClass === TYPE.INSTANCE.EXPLOSION && explosionType === TYPE.EXPLOSION.ROUTINE.PETITE_BURST
        ) {
            super.setTime(LIFE_TIME.quick)
        } else {
            super.setTime(LIFE_TIME.moderate)
        }
    }
}