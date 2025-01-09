import * as THREE from 'three'

import Coordinates from '../../../type/Coordinates'
import Particle from './Particle'

export default class BaseParticle extends THREE.Mesh implements Particle {
    private currentAbsolutePoint: Coordinates
    private endRelativePoint: Coordinates
    private totalFrames: number
    private remainingFrames: number
    private elapsedFrames: number
    private color: string

    protected constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        color: string,
        time: number,
        geometry: THREE.BufferGeometry, 
        material: THREE.Material | THREE.Material[],
    ) {
        super(geometry, material)

        this.currentAbsolutePoint = currentAbsolutePoint
        this.endRelativePoint = endRelativePoint
        this.totalFrames = time * 60
        this.remainingFrames = this.totalFrames
        this.elapsedFrames = 0
        this.color = color
    }

    public update(): void {
        this.elapsedFrames++
        this.remainingFrames--

        if (this.material instanceof THREE.MeshStandardMaterial) {
            this.material.opacity = this.remainingFrames / this.totalFrames
        }
    }

    public destroy(): void {
        this.geometry.dispose()
        if (Array.isArray(this.material)) this.material.forEach(material => material.dispose())
        else this.material.dispose()
    }

    public getCurrentAbsolutePoint(): Coordinates {
        return this.currentAbsolutePoint
    }

    protected setCurrentAbsolutePoint(currentAbsolutePoint: Coordinates): void {
        this.currentAbsolutePoint = currentAbsolutePoint
    }

    public getEndRelativePoint(): Coordinates {
        return this.endRelativePoint
    }

    protected setEndRelativePoint(endRelativePoint: Coordinates): void {
        this.endRelativePoint = endRelativePoint
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

    protected setElapsedFrames(elapsedFrames: number): void {
        this.elapsedFrames = elapsedFrames
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

    protected rotateTowardsEndPoint(): void {
        // Calculate direction vector.
        const currentVec = new THREE.Vector3(this.currentAbsolutePoint.x, this.currentAbsolutePoint.y, this.currentAbsolutePoint.z)
        const endVec = new THREE.Vector3(this.endRelativePoint.x, this.endRelativePoint.y, this.endRelativePoint.z)

        const direction = new THREE.Vector3().subVectors(endVec, currentVec).normalize()
        const up = new THREE.Vector3(0, 1, 0) // Default 'up' direction.

        // Calculate rotation quaternion.
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction)

        // Apply rotation.
        this.quaternion.copy(quaternion)
    }

    // Function for initializing the variable this.pointStorage using the index of for loop as elapsedFrames.
    public getElapsedRate(elapsedFrames: number) {
        return elapsedFrames / this.totalFrames
    }

    protected getEaseOutFactor(elapsedFrames: number) {
        const elapsedRate = this.getElapsedRate(elapsedFrames)
        const easeOutFactor = 1 - (1 - elapsedRate) ** 4
        // const easeInFactor = elapsedRate ** 4
        return easeOutFactor
    }
}
