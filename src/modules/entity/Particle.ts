import * as THREE from 'three'

import scene from '../core/scene'
import Coordinates from '../../types/Coordinates'
import DeltaPoint from '../../types/DeltaPoint'
import particles from './particles'
import ParticleSize from '../../types/ParticleSize'

export default class Particle extends THREE.Mesh {
    currentAbsolutePoint: Coordinates
    endRelativePoint: Coordinates

    deltaPoint: DeltaPoint
    totalFrame: number

    constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        size: ParticleSize,
        color: string
    ) {
        const _time = 2

        const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        const material = new THREE.MeshStandardMaterial({ color: color })
        super(geometry, material)

        this.currentAbsolutePoint = currentAbsolutePoint
        this.endRelativePoint = endRelativePoint

        this.totalFrame = _time * 60
        this.deltaPoint = {
            x: this.endRelativePoint.x / this.totalFrame,
            y: this.endRelativePoint.y / this.totalFrame,
            z: this.endRelativePoint.z / this.totalFrame
        }

        scene.add(this)
        particles.push(this)
    }

    update(): void {
        // If this.totalFrame is zero, this.currentAbsolutePoint.y is infinity.
        if (this.totalFrame-- == 1) this.destroy()

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

    protected destroy(): void {
        this.preDestroyTask()

        scene.remove(this)

        const idx = particles.indexOf(this)
        if (idx > -1) particles.splice(idx, 1)

        this.geometry.dispose()
        if (Array.isArray(this.material)) this.material.forEach(material => material.dispose())
        else this.material.dispose()
    }
}
