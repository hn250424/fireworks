import * as THREE from 'three'

import scene from '../core/scene'
import Coordinates from '../../types/Coordinates'
import DeltaPoint from '../../types/DeltaPoint'
import particles from './particles'

export default class Particle extends THREE.Mesh {
    currentPoint: Coordinates
    endPoint: Coordinates

    deltaPoint: DeltaPoint
    totalFrame: number
    gravity: number

    constructor(
        currentPoint: Coordinates,
        endPoint: Coordinates,
    ) {
        const _size = 0.1
        const _time = 2
        const _color = 'green'

        const geometry = new THREE.BoxGeometry(_size, _size, _size)
        const material = new THREE.MeshStandardMaterial({ color: _color })
        super(geometry, material)

        this.currentPoint = currentPoint
        this.endPoint = endPoint

        this.totalFrame = _time * 60
        this.deltaPoint = {
            x: (this.endPoint.x - this.currentPoint.x) / this.totalFrame,
            z: (this.endPoint.z - this.currentPoint.z) / this.totalFrame
        }
        this.gravity = 0.01

        scene.add(this)
        particles.push(this)
    }

    update(): void {
        // If this.totalFrame is zero, this.currentPoint.y is infinity.
        if (this.totalFrame-- == 1) this.destroy()

        this.endPoint.y -= this.gravity

        this.currentPoint.x += this.deltaPoint.x
        this.currentPoint.y += (this.endPoint.y - this.currentPoint.y) / this.totalFrame,
        this.currentPoint.z += this.deltaPoint.z

        this.position.set(this.currentPoint.x, this.currentPoint.y, this.currentPoint.z)
        this.rotateTowardsEndPoint()
    }

    private rotateTowardsEndPoint(): void {
        // Calculate direction vector.
        const currentVec = new THREE.Vector3(this.currentPoint.x, this.currentPoint.y, this.currentPoint.z)
        const endVec = new THREE.Vector3(this.endPoint.x, this.endPoint.y, this.endPoint.z)

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
