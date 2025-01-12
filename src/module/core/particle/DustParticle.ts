import * as THREE from 'three'

import Particle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"
import TYPE from '../../../definition/type'

export default class DustParticle extends Particle {
    constructor(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ) {
        const endRelativePoint: Coordinates = { x: 0, y: 0, z: 0 }
        let time: number = 0.5
        if (explosionType === TYPE.EXPLOSION.ROUTINE.BURST) time = 0.2
        else if (explosionType === (TYPE.EXPLOSION.ROUTINE.ERUPT || TYPE.EXPLOSION.ROUTINE.BLOOM)) time = 3
        const width = 0.03
        const height = 0.03
        const depth = 0.03
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        super(currentAbsolutePoint, endRelativePoint, explosionType, color, time, geometry, material)
    }

    public static create(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ): DustParticle {
        return new DustParticle(currentAbsolutePoint, explosionType, color)
    }

    public recycle(
        currentAbsolutePoint: Coordinates,
        explosionType: string,
        color: string
    ): void {
        super.setCurrentAbsolutePoint(currentAbsolutePoint)
        super.setExplosionType(explosionType)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        super.setColor(color)
    }

    public update(): void {
        this.position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)
        super.update()
    }
}