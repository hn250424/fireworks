import * as THREE from 'three'
import CVector3 from "../../../type/CVector3"

export default interface Particle {
    update(): void
    // destroy(): void
    getCurrentAbsolutePoint(): CVector3
    getExplosionType(): string
    getRemainingFrames(): number
    getColor(): string
    getDustCreationFlag(): boolean
    setDustCreationFlag(flag: boolean): void
    getMesh(): THREE.Mesh | THREE.InstancedMesh
    getDustVector3(): CVector3[]
}