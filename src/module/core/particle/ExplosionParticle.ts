import * as THREE from 'three'

import CVector3 from "../../../type/CVector3"

import BaseParticle from "./BaseParticle"
import TYPE from '../../../definition/type'
import PColor from '../../../type/PColor'
import PStatus from '../../../type/PType'

const petiteBurstTime = 1.5

export default class ExplosionParticle extends BaseParticle {
    private object3D: THREE.Object3D
    private endRelativePointArr: CVector3[]
    private gravity: number = 0

    private constructor(
        beginAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        pStatus: PStatus,
        pColor: PColor
    ) {
        const size = 0.1
        const geometry = new THREE.BoxGeometry(size, size, size)
        // [TODO]: #1
        // The base material color blends with the instance color set by setColorAt.
        // When the material color is white (#ffffff), the intended instance colors display correctly.
        // const material = new THREE.MeshStandardMaterial({ color: color.main, transparent: true })
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true })
        const instancedMesh = new THREE.InstancedMesh(geometry, material, endRelativePointArr.length)
        const object3D = new THREE.Object3D()

        // Time.
        let time = 5
        if (
            pStatus.explosion === TYPE.EXPLOSION.ROUTINE.PETITE_BURST
        ) {
            time = petiteBurstTime
        }

        // DustCreationInterval.
        let dustCreationInterval = 15
        if (
            pStatus.explosion === TYPE.EXPLOSION.ROUTINE.PETITE_BURST
        ) {
            dustCreationInterval = 25
        } else if (pStatus.explosion === TYPE.EXPLOSION.HIGHLIGHTS.CHAIN_BURST) {
            dustCreationInterval = 0
        }
        super(beginAbsolutePoint, pStatus, pColor, geometry, material, instancedMesh, time, dustCreationInterval)
        
        this.object3D = object3D
        this.endRelativePointArr = endRelativePointArr
        
        this._setGravity(pStatus)
    }

    public static create(
        beginAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        pStatus: PStatus,
        pColor: PColor = { main: 'white', sub: 'white'},
    ): ExplosionParticle {
        return new ExplosionParticle(beginAbsolutePoint, endRelativePointArr, pStatus, pColor)
    }

    public recycle(
        beginAbsolutePoint: CVector3,
        endRelativePointArr: CVector3[],
        pStatus: PStatus,
        pColor: PColor
    ): void {
        super.setBeginAbsolutePoint(beginAbsolutePoint)
        this.endRelativePointArr = endRelativePointArr
        super.setPStatus(pStatus)
        super.setPColor(pColor)
        super.setMesh( new THREE.InstancedMesh(super.getGeometry(), super.getMaterial(), endRelativePointArr.length) )
        
        this._setTime(pStatus)
        super.setTotalFrames(super.getTime())
        super.setRemainingFrames(super.getTotalFrames())
        super.setElapsedFrames(0)
        this._setDustCreationInterval(pStatus)
        this._setGravity(pStatus)
    }

    public update(): void {
        const bp = super.getBeginAbsolutePoint()
        for (let i = 0; i < this.endRelativePointArr.length; i++) {
            // vector.
            const easeOutFactor = super.getEaseOutFactor(super.getElapsedFrames())

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

        super.update()
    }

    private _setTime(pStatus: PStatus) {
        if (
            pStatus.explosion === TYPE.EXPLOSION.ROUTINE.PETITE_BURST
        ) {
            super.setTime(petiteBurstTime)
        } else {
            super.setTime(5)
        }
    }

    private _setDustCreationInterval(pStatus: PStatus) {
        if (
            pStatus.explosion === TYPE.EXPLOSION.ROUTINE.BURST ||
            pStatus.explosion === TYPE.EXPLOSION.SPECIAL.BLOOM ||
            pStatus.explosion === TYPE.EXPLOSION.SPECIAL.ERUPT ||
            pStatus.explosion === TYPE.EXPLOSION.HIGHLIGHTS.HUGE_BURST
        ) {
            super.setDustCreationInterval(15)
        } else if (
            pStatus.explosion === TYPE.EXPLOSION.ROUTINE.PETITE_BURST
        ) {
            super.setDustCreationInterval(25)
        } else if (pStatus.explosion === TYPE.EXPLOSION.HIGHLIGHTS.CHAIN_BURST) {
            super.setDustCreationInterval(0)
        } else {
            super.setDustCreationInterval(15)
        }
    }

    private _setGravity(pStatus: PStatus) {
        if (
            pStatus.explosion === TYPE.EXPLOSION.ROUTINE.BURST ||
            pStatus.explosion === TYPE.EXPLOSION.ROUTINE.PETITE_BURST ||
            pStatus.explosion === TYPE.EXPLOSION.HIGHLIGHTS.HUGE_BURST
        ) {
            this.gravity = 0.01
        } else {
            this.gravity = 0.03
        }
    }
}