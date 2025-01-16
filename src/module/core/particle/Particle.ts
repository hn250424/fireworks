import * as THREE from 'three'
import Coordinates from "../../../type/Coordinates"

export default interface Particle {
    update(): void
    // destroy(): void
    getCurrentAbsolutePoint(): Coordinates
    getExplosionType(): string
    getRemainingFrames(): number
    getElapsedRate(): number
    getColor(): string
    getDustRequestStatus(): boolean
    getMesh(): THREE.Mesh | THREE.InstancedMesh
}