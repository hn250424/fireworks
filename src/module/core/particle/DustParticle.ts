import * as THREE from 'three'

import BaseParticle from "./BaseParticle"
import CVector3 from "../../../type/CVector3"
import PColor from '../../../type/PColor'
import TYPE from '../../../definition/type'

// const time_quickest = 0.5
const time_quick = 1
const time_moderate = 1.5
// const time_slow = 2
// const time_slowest = 2.5

const size = 0.03

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
        const geometry = new THREE.BoxGeometry(size, size, size)
        // [TODO]: #1
        // The base material color blends with the instance color set by setColorAt.
        // When the material color is white (#ffffff), the intended instance colors display correctly.
        // const material = new THREE.MeshStandardMaterial({ color: color.main, transparent: true })
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true })
        const instancedMesh = new THREE.InstancedMesh(geometry, material, currentAbsolutePointArr.length)
        const object3D = new THREE.Object3D()

        // Time.
        let time
        if (triggerClass === TYPE.INSTANCE.EXPLOSION && explosionType === TYPE.EXPLOSION.PETITE_BURST) {
            time = time_quick
        } else {
            time = time_moderate
        }

        super(TYPE.INSTANCE.DUST, { x: 0, y: 0, z: 0 }, explosionType, pColor, instancedMesh, time)

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
                super.setColorAt(i, super.getPColor().main)
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
        const _mesh: THREE.Mesh = super.getMesh() as THREE.InstancedMesh
        // super.setMesh(new THREE.InstancedMesh(super.getGeometry(), super.getMaterial(), currentAbsolutePointArr.length))
        super.setMesh(new THREE.InstancedMesh(_mesh.geometry, _mesh.material, currentAbsolutePointArr.length))
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
                super.setColorAt(i, super.getPColor().main)
            }
        }

        super.needsUpdateInstanceMatrix()
        super.needsUpdateInstanceColor()
    }

    private _setTime(explosionType: string) {
        if (this.triggerClass === TYPE.INSTANCE.EXPLOSION && explosionType === TYPE.EXPLOSION.PETITE_BURST) {
            super.setTime(time_quick)
        } else {
            super.setTime(time_moderate)
        }
    }
}