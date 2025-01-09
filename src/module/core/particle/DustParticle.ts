import * as THREE from 'three'

import Particle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"

export default class DustParticle extends Particle {
    constructor(
        currentAbsolutePoint: Coordinates,
        color: string
    ) {
        const endRelativePoint: Coordinates = { x: 0, y: 0, z: 0 }
        const time: number = 0.5
        const width = 0.03
        const height = 0.03
        const depth = 0.03
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        super(currentAbsolutePoint, endRelativePoint, color, time, geometry, material)
    }

    public static create(
        currentAbsolutePoint: Coordinates,
        color: string
    ): DustParticle {
        return new DustParticle(currentAbsolutePoint, color)
    }

    public recycle(
        currentAbsolutePoint: Coordinates,
        color: string
    ): void {
        super.setCurrentAbsolutePoint(currentAbsolutePoint)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        super.setColor(color)
    }

    public update(): void {
        this.position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)
        super.update()
    }
}