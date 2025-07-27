import * as THREE from 'three'

import COLOR from "../definition/color"
import TYPE from '../definition/type'
import CVector3 from "../type/CVector3"
import PColor from '../type/PColor'
import BaseParticle from "./BaseParticle"

const dustCreationDistanceThreshold = 0.6

const headColor = 0xffffff
const headRadius = 0.06
const headOffset = 0.3
const tailRadiusTop = 0.05
const tailRadiusBottom = 0
const tailHeight = 0.7

const time = 4

export default class LaunchingParticle extends BaseParticle {
    private endRelativePoint: CVector3

    private constructor(
        beginAbsolutePoint: CVector3,
        endRelativePoint: CVector3,
        explosionType: string
    ) {
        const pColor: PColor = {
            main: COLOR.FIREWORKS[Math.floor(Math.random() * 5)],
            sub: COLOR.FIREWORKS[Math.floor(Math.random() * 5)]
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

        super(TYPE.INSTANCE.LAUNCHING, beginAbsolutePoint, explosionType, pColor, meshGroup, time, dustCreationDistanceThreshold)

        this.endRelativePoint = endRelativePoint
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
        const pColor: PColor = {
            main: COLOR.FIREWORKS[Math.floor(Math.random() * 5)],
            sub: COLOR.FIREWORKS[Math.floor(Math.random() * 5)]
        }
        this._setPColor(pColor)
        const totalTime = super.getTotalTime()
        super.setRemainingTime(totalTime)
        super.setElapsedTime(0)
    }

    public update(deltaTime: number): void {
        const elapsed = super.getElapsedTime()
        const easeOut = this.getEaseOutFactor(elapsed)

        const t = Math.min(elapsed / super.getTotalTime(), 1)

        const begin = super.getBeginAbsolutePoint()
        const end = this.endRelativePoint

        const pos = {
            x: begin.x + end.x * t,
            y: end.y * easeOut,
            z: begin.z + end.z * t,
        }

        super.getMesh().position.set(pos.x, pos.y, pos.z)

        super.update(deltaTime)
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

    // protected getTrackingPosition(): THREE.Vector3 {
    //     return (super.getMesh() as THREE.Object3D).position
    // }
}