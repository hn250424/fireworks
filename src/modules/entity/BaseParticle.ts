import * as THREE from 'three'

import scene from '../core/scene'
import Coordinates from '../../types/Coordinates'
import Particle from './Particle'
import particles from './particles'

export default class BaseParticle extends THREE.Mesh implements Particle {
    currentPoint: Coordinates
    endPoint: Coordinates
    targetTime: number
    color: string

    deltaPoint: Coordinates
    totalFrame: number

    constructor(
        currentPoint: Coordinates,
        endPoint: Coordinates,
        targetTime: number,
        color: string = 'green'
    ) {
        const _size = 0.1
        const geometry = new THREE.BoxGeometry(_size, _size, _size)
        const material = new THREE.MeshStandardMaterial({ color: color })
        super(geometry, material)

        this.currentPoint = currentPoint
        this.endPoint = endPoint
        this.targetTime = targetTime
        this.color = color

        this.totalFrame = this.targetTime * 60
        this.deltaPoint = {
            x: (this.endPoint.x - this.currentPoint.x) / this.totalFrame,
            y: (this.endPoint.y - this.currentPoint.y) / this.totalFrame,
            z: (this.endPoint.z - this.currentPoint.z) / this.totalFrame
        }

        scene.add(this)
        particles.push(this)
    }

    update(): void {
        if (this.totalFrame-- <= 0) this.destroy()

        this.currentPoint.x += this.deltaPoint.x
        this.currentPoint.y += this.deltaPoint.y
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

    private destroy(): void {
        scene.remove(this)

        const idx = particles.indexOf(this)
        if (idx > -1) particles.splice(idx, 1)

        this.geometry.dispose()
        if (Array.isArray(this.material)) this.material.forEach(material => material.dispose())
        else this.material.dispose()
    }
}
