import * as THREE from 'three'

import Coordinates from '../../../types/Coordinates'
import DeltaPoint from '../../../types/DeltaPoint'
import ParticleSize from '../../../types/ParticleSize'
import Particle from './Particle'

export default class BaseParticle extends THREE.Mesh implements Particle {
    currentAbsolutePoint: Coordinates
    endRelativePoint: Coordinates
    totalFrames: number
    remainingFrames: number
    color: string

    deltaPoint: DeltaPoint

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
        this.color = color

        this.deltaPoint = {
            x: this.endRelativePoint.x / this.totalFrames,
            y: this.endRelativePoint.y / this.totalFrames,
            z: this.endRelativePoint.z / this.totalFrames
        }
    }

    protected preUpdateTask() {}

    update(): void {
        this.preUpdateTask()

        this.currentAbsolutePoint.x += this.deltaPoint.x
        this.currentAbsolutePoint.y += this.deltaPoint.y
        this.currentAbsolutePoint.z += this.deltaPoint.z

        this.position.set(this.currentAbsolutePoint.x, this.currentAbsolutePoint.y, this.currentAbsolutePoint.z)
        this.rotateTowardsEndPoint()
    }

    private rotateTowardsEndPoint(): void {
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

    protected preDestroyTask() {}

    destroy(): void {
        this.preDestroyTask()

        this.geometry.dispose()
        if (Array.isArray(this.material)) this.material.forEach(material => material.dispose())
        else this.material.dispose()
    }
}
