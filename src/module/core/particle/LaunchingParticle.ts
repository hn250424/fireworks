import * as THREE from 'three'

import COLOR from "../../../definition/color"
import BaseParticle from "./BaseParticle"
import CVector3 from "../../../type/CVector3"
import { shuffle } from '../../utils'
import PColor from '../../../type/PColor'
import PStatus from '../../../type/PType'

const preDustCreationInterval: number = 10
const postDustCreationInterval: number = 0

export default class LaunchingParticle extends BaseParticle {
    private pointStorage: CVector3[]
    private endRelativePoint: CVector3

    private constructor(
        beginAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        pStatus: PStatus
    ) {
        const radiusTop = 0.05
        const radiusBottom = 0
        const height = 0.7
        shuffle(COLOR.FIREWORKS)
        const pColor: PColor = {
            main: COLOR.FIREWORKS[0],
            sub: COLOR.FIREWORKS[1]
        }
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height)
        const material = new THREE.MeshStandardMaterial({ color: pColor.main, transparent: true })
        const mesh = new THREE.Mesh(geometry, material)
        const time = 5
        super(beginAbsolutePoint, pStatus, pColor, geometry, material, mesh, time, preDustCreationInterval)

        this.endRelativePoint = endRelativePoint
        
        this.pointStorage = new Array(super.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.endRelativePoint.x / super.getTotalFrames()
        const delta_z = this.endRelativePoint.z / super.getTotalFrames()
        const currentPoint = {...super.getBeginAbsolutePoint()}
        for (let i = 0; i < super.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)

            this.pointStorage[i].x = currentPoint.x
            currentPoint.x += delta_x

            this.pointStorage[i].y = this.endRelativePoint.y * easeOutFactor
            
            this.pointStorage[i].z = currentPoint.z
            currentPoint.z += delta_z
        }
    }

    public static create(
        beginAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        pStatus: PStatus
    ): LaunchingParticle {
        return new LaunchingParticle(beginAbsolutePoint, endRelativePoint, pStatus)
    }

    public recycle(
        beginAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        pStatus: PStatus
    ): void {
        super.setBeginAbsolutePoint(beginAbsolutePoint)
        this.endRelativePoint = endRelativePoint
        super.setPStatus(pStatus)
        shuffle(COLOR.FIREWORKS)
        const pColor: PColor = {
            main: COLOR.FIREWORKS[0],
            sub: COLOR.FIREWORKS[1]
        }
        super.setPColor(pColor)
        super.setRemainingFrames(super.getTotalFrames())
        super.setElapsedFrames(0)
        super.setDustCreationInterval(preDustCreationInterval)
        
        this.pointStorage = new Array(super.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.endRelativePoint.x / super.getTotalFrames()
        const delta_z = this.endRelativePoint.z / super.getTotalFrames()
        const currentPoint = {...super.getBeginAbsolutePoint()}
        for (let i = 0; i < super.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)

            this.pointStorage[i].x = currentPoint.x
            currentPoint.x += delta_x

            this.pointStorage[i].y = this.endRelativePoint.y * easeOutFactor
            
            this.pointStorage[i].z = currentPoint.z
            currentPoint.z += delta_z
        }
    }

    public update(): void {
        const totalFrames = super.getTotalFrames()
        const elapsedFrames = super.getElapsedFrames()
        const _x = this.pointStorage[elapsedFrames].x
        const _y = this.pointStorage[elapsedFrames].y
        const _z = this.pointStorage[elapsedFrames].z
        super.getMesh().position.set(_x, _y, _z)

        const elapsedRate = elapsedFrames / totalFrames
        if (elapsedRate > 0.6) {
            super.setDustCreationInterval(postDustCreationInterval)
        } 

        // super.rotateTowardsEndPoint(this.currentAbsolutePoint, this.endRelativePoint)
        super.update()
    }
}