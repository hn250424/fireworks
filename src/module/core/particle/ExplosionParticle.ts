import * as THREE from 'three'

import Particle from './Particle'
import BaseParticle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"
import TYPE from '../../../definition/type'
import ChildDustInfo from '../../../type/ChildDustInfo'
import POINT from '../../../definition/point'
import scene from '../scene'
import ParticleFactory from './ParticleFactory'

export default class ExplosionParticle {
    public instancedMesh: THREE.InstancedMesh
    private object3D: THREE.Object3D

    private currentAbsolutePoint: Coordinates

    private totalFrames: number
    private remainingFrames: number
    private elapsedFrames: number

    public constructor(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ) {
        const time = 5
        this.totalFrames = time * 60
        this.remainingFrames = this.totalFrames
        this.elapsedFrames = 0

        this.currentAbsolutePoint = currentAbsolutePoint

        // todo: 박스로 돌아가기.
        const radius = 0.05
        const segment = 8
        const geometry = new THREE.SphereGeometry(radius, segment, segment)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })

        this.instancedMesh = new THREE.InstancedMesh(geometry, material, POINT.EXPLOSION_OFFSET.BLOOM.length)
        this.object3D = new THREE.Object3D()
        
        for (let i = 0; i < TYPE.EXPLOSION.ROUTINE.BLOOM.length; i++) {
            this.object3D.position.set(currentAbsolutePoint.x, currentAbsolutePoint.y, currentAbsolutePoint.z)
            this.object3D.updateMatrix()
            this.instancedMesh.setMatrixAt(i, this.object3D.matrix)
        }
    }

    public static create(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ): ExplosionParticle {
        return new ExplosionParticle(currentAbsolutePoint, explosionType, color)
    }

    public recycle(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ): void {
        
    }

    public update(): void {
        this.elapsedFrames++
        this.remainingFrames--

        for (let i = 0; i < POINT.EXPLOSION_OFFSET.BLOOM.length; i++) {
            const easeOutFactor = this.getEaseOutFactor(this.elapsedFrames)

            this.object3D.position.x = this.currentAbsolutePoint.x + (POINT.EXPLOSION_OFFSET.BLOOM[i].x * easeOutFactor)
            
            const gravity = 0.03
            this.object3D.position.y = this.currentAbsolutePoint.y + (POINT.EXPLOSION_OFFSET.BLOOM[i].y * easeOutFactor)
            POINT.EXPLOSION_OFFSET.BLOOM[i].y -= gravity

            this.object3D.position.z = this.currentAbsolutePoint.z + (POINT.EXPLOSION_OFFSET.BLOOM[i].z * easeOutFactor)
            
            this.object3D.updateMatrix()
            this.instancedMesh.setMatrixAt(i, this.object3D.matrix)

            if (this.remainingFrames % 5 === 0) {
                ParticleFactory.createDustParticle({...{x: this.object3D.position.x, y: this.object3D.position.y, z: this.object3D.position.z}}, this.getExplosionType(), 'yellow')
            }
        }

        this.instancedMesh.instanceMatrix.needsUpdate = true
    }

    public getElapsedRate(elapsedFrames: number = this.elapsedFrames) {
        return elapsedFrames / this.totalFrames
    }

    protected getEaseOutFactor(elapsedFrames: number) {
        const elapsedRate = this.getElapsedRate(elapsedFrames)
        const easeOutFactor = 1 - (1 - elapsedRate) ** 4
        // const easeInFactor = elapsedRate ** 4
        return easeOutFactor
    }

    public getRemainingFrames(): number {
        return this.remainingFrames
    }

    getCurrentAbsolutePoint(): Coordinates {
        return {x:1,y:1,z:1}
    }
    getEndRelativePoint(): Coordinates {
        return {x:1,y:1,z:1}
    }
    getExplosionType(): string {
        return 'a'
    }
    getColor(): string {
        return 'a'
    }
    getDustRequestStatus(): boolean {
        return false
    }
}

class DustParticle extends BaseParticle {
    constructor(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ) {
        const endRelativePoint: Coordinates = { x: 0, y: 0, z: 0 }
        let time: number = 0.5
        if (explosionType === TYPE.EXPLOSION.ROUTINE.BURST) time = 0.2
        else if (explosionType === (TYPE.EXPLOSION.ROUTINE.ERUPT || TYPE.EXPLOSION.ROUTINE.BLOOM)) time = 3
        const width = 0.03
        const height = 0.03
        const depth = 0.03
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        super(currentAbsolutePoint, endRelativePoint, explosionType, color, time, geometry, material)
    }

    public static create(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ): DustParticle {
        return new DustParticle(currentAbsolutePoint, explosionType, color)
    }

    public recycle(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ): void {
        super.setCurrentAbsolutePoint(currentAbsolutePoint)
        super.setExplosionType(explosionType)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        super.setColor(color)
    }

    public update(): void {
        this.position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)
        super.update()
    }
}