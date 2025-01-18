import * as THREE from 'three'
import CVector3 from "../../../type/CVector3"

export default interface Particle {
    update(): void
    getMesh(): Readonly<THREE.Mesh | THREE.InstancedMesh>
    getCurrentAbsolutePoint(): Readonly<CVector3>
    getExplosionType(): Readonly<string>
    getColor(): Readonly<string>
    getRemainingFrames(): Readonly<number>
    getDustCreationFlag(): Readonly<boolean>
    setDustCreationFlag(flag: boolean): void
    getDustVector3(): Readonly<CVector3[]>
}

// destroy(): void