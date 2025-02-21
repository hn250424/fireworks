import * as THREE from 'three'

import COLOR from "../../../definition/color"
import BaseParticle from "./BaseParticle"
import CVector3 from "../../../type/CVector3"
import { shuffle } from '../../utils'
import PColor from '../../../type/PColor'
import TYPE from '../../../definition/type'

const preDustCreationInterval = 10
// const postDustCreationInterval = 0

const headColor = 0xffffff
const headRadius = 0.06
const headOffset = 0.3
const tailRadiusTop = 0.05
const tailRadiusBottom = 0
const tailHeight = 0.7

const time = 4

export default class LaunchingParticle extends BaseParticle {
    private pointStorage: CVector3[]
    private endRelativePoint: CVector3

    private constructor(
        beginAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        explosionType: string
    ) {
        shuffle(COLOR.FIREWORKS)
        const pColor: PColor = {
            main: COLOR.FIREWORKS[0],
            sub: COLOR.FIREWORKS[1]
        }
        const headGeometry = new THREE.SphereGeometry(headRadius, 32, 32)
        const headMaterial = new THREE.MeshStandardMaterial({ color: headColor, transparent: true })
        const headMesh = new THREE.Mesh(headGeometry, headMaterial)
        headMesh.position.y = headOffset
        headMesh.name = 'head'

        const tailGeometry = new THREE.CylinderGeometry(tailRadiusTop, tailRadiusBottom, tailHeight)
        const tailMaterial = new THREE.MeshStandardMaterial({ color: pColor.main, transparent: true })
        const tailMesh = new THREE.Mesh(tailGeometry, tailMaterial)
        tailMesh.name = 'tail'

        const meshGroup = new THREE.Group()
        meshGroup.add(headMesh)
        meshGroup.add(tailMesh)
        
        super(TYPE.INSTANCE.LAUNCHING, beginAbsolutePoint, explosionType, pColor, meshGroup, time, preDustCreationInterval)

        this.endRelativePoint = endRelativePoint
        
        const totalFrames = super.getTotalFrames()
        this.pointStorage = new Array(totalFrames).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.endRelativePoint.x / totalFrames
        const delta_z = this.endRelativePoint.z / totalFrames
        const currentPoint = {...super.getBeginAbsolutePoint()}
        for (let i = 0; i < totalFrames; i++) {
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
        explosionType: string
    ): LaunchingParticle {
        return new LaunchingParticle(beginAbsolutePoint, endRelativePoint, explosionType)
    }

    public recycle(
        beginAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        explosionType: string
    ): void {
        super.setBeginAbsolutePoint(beginAbsolutePoint)
        this.endRelativePoint = endRelativePoint
        super.setExplosionType(explosionType)
        shuffle(COLOR.FIREWORKS)
        const pColor: PColor = {
            main: COLOR.FIREWORKS[0],
            sub: COLOR.FIREWORKS[1]
        }
        this._setPColor(pColor)
        const totalFrames = super.getTotalFrames()
        super.setRemainingFrames(totalFrames)
        super.setElapsedFrames(0)
        super.setDustCreationInterval(preDustCreationInterval)
        
        this.pointStorage = new Array(totalFrames).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const delta_x = this.endRelativePoint.x / totalFrames
        const delta_z = this.endRelativePoint.z / totalFrames
        const currentPoint = {...super.getBeginAbsolutePoint()}
        for (let i = 0; i < totalFrames; i++) {
            const easeOutFactor = super.getEaseOutFactor(i)

            this.pointStorage[i].x = currentPoint.x
            currentPoint.x += delta_x

            this.pointStorage[i].y = this.endRelativePoint.y * easeOutFactor
            
            this.pointStorage[i].z = currentPoint.z
            currentPoint.z += delta_z
        }
    }

    public update(): void {
        const elapsedFrames = super.getElapsedFrames()
        const _x = this.pointStorage[elapsedFrames].x
        const _y = this.pointStorage[elapsedFrames].y
        const _z = this.pointStorage[elapsedFrames].z
        super.getMesh().position.set(_x, _y, _z)

        // super.rotateTowardsEndPoint(this.currentAbsolutePoint, this.endRelativePoint)
        super.update()
    }

    public getCurrentAbsolutePoint(): Readonly<CVector3> {
        const mesh = super.getMesh() as THREE.Object3D
        const position = mesh.position
        return { x: position.x, y: position.y, z: position.z }
    }

    private _setPColor(pColor: PColor) {
        const meshGroup = super.getMesh() as THREE.Object3D
        const head = meshGroup.getObjectByName('head')
        const tail = meshGroup.getObjectByName('tail')
        if (head instanceof THREE.Mesh) head.material.color.set(headColor)
        if (tail instanceof THREE.Mesh) tail.material.color.set(pColor.main)
        super.setPColor(pColor)
    }
}