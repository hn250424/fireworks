import * as THREE from 'three'

import Coordinates from '../../../type/Coordinates'
import ParticleSize from '../../../type/ParticleSize'
import Particle from '../../../interface/Particle'

export default class BaseParticle extends THREE.Mesh implements Particle {
    private currentAbsolutePoint: Coordinates
    private endRelativePoint: Coordinates
    private totalFrames: number
    private remainingFrames: number
    private elapsedFrames: number
    private color: string

    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        color: string,
        time: number,
        size: ParticleSize = { width: 0.1, height: 0.1, depth: 0.1 }
    ) {
        const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
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

        // Opacity.
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

    public getEndRelativePoint(): Coordinates {
        return this.endRelativePoint
    }

    protected getTotalFrames(): number {
        return this.totalFrames
    }

    public getRemainingFrames(): number {
        return this.remainingFrames
    }

    protected getElapsedFrames(): number {
        return this.elapsedFrames
    }

    public getColor(): string {
        return this.color
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

    protected getElapsedRate(elapsedFrames: number) {
        return elapsedFrames / this.totalFrames
    }

    protected getEaseOutFactor(elapsedFrames: number) {
        const elapsedRate = this.getElapsedRate(elapsedFrames)
        const easeOutFactor = 1 - (1 - elapsedRate) ** 4
        // const easeInFactor = elapsedRate ** 4
        return easeOutFactor
    }
}
