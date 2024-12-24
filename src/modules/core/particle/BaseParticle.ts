import * as THREE from 'three'

import Coordinates from '../../../types/Coordinates'
import ParticleSize from '../../../types/ParticleSize'
import Particle from './Particle'

export default class BaseParticle extends THREE.Mesh implements Particle {
    currentAbsolutePoint: Coordinates
    endRelativePoint: Coordinates
    totalFrames: number
    remainingFrames: number
    elapsedFrames: number
    color: string

    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        color: string,
        time: number,
        size: ParticleSize = { width: 0.1, height: 0.1, depth: 0.1 }
    ) {
        const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        const material = new THREE.MeshStandardMaterial({ color: color })
        super(geometry, material)

        this.currentAbsolutePoint = currentAbsolutePoint
        this.endRelativePoint = endRelativePoint
        this.totalFrames = time * 60
        this.remainingFrames = this.totalFrames
        this.elapsedFrames = 0
        this.color = color
    }

    update(): void {
        this.elapsedFrames++
        this.remainingFrames--
    }

    destroy(): void {
        this.geometry.dispose()
        if (Array.isArray(this.material)) this.material.forEach(material => material.dispose())
        else this.material.dispose()
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
        const easeOutFactor = 1 - (1 - elapsedRate) ** 2
        // const easeInFactor = elapsedRate ** 2
        return easeOutFactor
    }
}
