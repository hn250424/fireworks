import * as THREE from 'three'

import Coordinates from '../../../type/Coordinates'
import Particle from './Particle'
import ChildDustInfo from '../../../type/ChildDustInfo'

export default class BaseParticle implements Particle {
    protected mesh: THREE.InstancedMesh | THREE.Mesh
    protected material: THREE.MeshStandardMaterial
    protected currentAbsolutePoint: Coordinates
    protected explosionType: string
    protected totalFrames: number
    protected remainingFrames: number
    protected elapsedFrames: number
    protected color: string
    protected childDustInfo: ChildDustInfo

    protected constructor(
        mesh: THREE.InstancedMesh | THREE.Mesh,
        material: THREE.MeshStandardMaterial,
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string,
        time: number,
        childDustInfo: ChildDustInfo = { use: false, unit: 0, request: false }
    ) {
        this.mesh = mesh
        this.material = material
        this.currentAbsolutePoint = currentAbsolutePoint
        this.explosionType = explosionType
        this.totalFrames = time * 60
        this.remainingFrames = this.totalFrames
        this.elapsedFrames = 0
        this.color = color
        this.childDustInfo = childDustInfo
    }

    public update(): void {
        this.elapsedFrames++
        this.remainingFrames--

        if (this.childDustInfo.use) {
            if (this.elapsedFrames % this.childDustInfo.unit === 0) this.childDustInfo.request = true
            else this.childDustInfo.request = false
        }

        if (this.material instanceof THREE.MeshStandardMaterial) {
            this.material.opacity = this.remainingFrames / this.totalFrames
        }
    }

    // public destroy(): void {
    //     this.geometry.dispose()
    //     if (Array.isArray(this.material)) this.material.forEach(material => material.dispose())
    //     else this.material.dispose()
    // }

    public getCurrentAbsolutePoint(): Coordinates {
        return this.currentAbsolutePoint
    }

    protected setCurrentAbsolutePoint(currentAbsolutePoint: Coordinates): void {
        this.currentAbsolutePoint = currentAbsolutePoint
    }

    protected getTotalFrames(): number {
        return this.totalFrames
    }

    public getRemainingFrames(): number {
        return this.remainingFrames
    }

    protected setRemainingFrames(remainingFrames: number): void {
        this.remainingFrames = remainingFrames
    }

    protected getElapsedFrames(): number {
        return this.elapsedFrames
    }

    // Function for initializing the variable this.pointStorage using the index of for loop as elapsedFrames.
    protected setElapsedFrames(elapsedFrames: number): void {
        this.elapsedFrames = elapsedFrames
    }

    public getExplosionType(): string {
        return this.explosionType
    }

    protected setExplosionType(explosionType: string) {
        this.explosionType = explosionType
    }

    public getColor(): string {
        return this.color
    }

    protected setColor(color: string): void {
        this.color = color
        if (this.material instanceof THREE.MeshStandardMaterial) {
            this.material.color.set(color)
        }
    }

    public getDustRequestStatus(): boolean {
        return this.childDustInfo.request
    }

    protected rotateTowardsEndPoint(currentPoint: Coordinates, endPoint: Coordinates, object3D: THREE.Object3D | null = null): void {
        // Calculate direction vector.
        const currentVec = new THREE.Vector3(currentPoint.x, currentPoint.y, currentPoint.z)
        const endVec = new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)

        const direction = new THREE.Vector3().subVectors(endVec, currentVec).normalize()
        const up = new THREE.Vector3(0, 1, 0) // Default 'up' direction.

        // Calculate rotation quaternion.
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction)

        // Apply rotation.
        if (object3D) object3D.quaternion.copy(quaternion)
        else this.mesh.quaternion.copy(quaternion)
    }

    // Function for initializing the variable this.pointStorage using the index of for loop as elapsedFrames.
    public getElapsedRate(elapsedFrames: number = this.elapsedFrames) {
        return elapsedFrames / this.totalFrames
    }

    // Function for initializing the variable this.pointStorage using the index of for loop as elapsedFrames.
    protected getEaseOutFactor(elapsedFrames: number) {
        const elapsedRate = this.getElapsedRate(elapsedFrames)
        const easeOutFactor = 1 - (1 - elapsedRate) ** 4
        // const easeInFactor = elapsedRate ** 4
        return easeOutFactor
    }

    public getMesh() {
        return this.mesh
    }
}
