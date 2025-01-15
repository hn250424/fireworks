import * as THREE from 'three'

import Particle from './Particle'
import BaseParticle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"
import TYPE from '../../../definition/type'
import ChildDustInfo from '../../../type/ChildDustInfo'
import POINT from '../../../definition/point'

export default class ExplosionParticle implements Particle {
    public instancedMesh: THREE.InstancedMesh
    private object3D: THREE.Object3D

    private totalFrames: number
    private remainingFrames: number
    private elapsedFrames: number

    private constructor(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ) {
        const time = 5
        this.totalFrames = time * 60
        this.remainingFrames = this.totalFrames
        this.elapsedFrames = 0

        const radius = 0.05
        const segment = 8
        const geometry = new THREE.SphereGeometry(radius, segment, segment)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })

        this.instancedMesh = new THREE.InstancedMesh(geometry, material, POINT.EXPLOSION_OFFSET.BLOOM.length)
        this.object3D = new THREE.Object3D()
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
        for (let i = 0; i < POINT.EXPLOSION_OFFSET.BLOOM.length; i++) {
            // 기존.
            this.instancedMesh.getMatrixAt(i, this.object3D.matrix)
            this.object3D.matrix.decompose(this.object3D.position, this.object3D.quaternion, this.object3D.scale)

            const easeOutFactor = this.getEaseOutFactor(this.elapsedFrames)

            this.object3D.position.x += this.object3D.position.x + POINT.EXPLOSION_OFFSET.BLOOM[i].x * easeOutFactor
            
            const gravity = 0.03
            this.object3D.position.y += this.object3D.position.y + POINT.EXPLOSION_OFFSET.BLOOM[i].y * easeOutFactor - gravity

            this.object3D.position.z += this.object3D.position.z + POINT.EXPLOSION_OFFSET.BLOOM[i].z * easeOutFactor
            
            this.object3D.updateMatrix()
            this.instancedMesh.setMatrixAt(i, this.object3D.matrix)
        }
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