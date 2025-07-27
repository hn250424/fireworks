import * as THREE from 'three'
import CVector3 from "../type/CVector3"
import PColor from '../type/PColor'

export default interface Particle {
    update(deltaTime: number): void
    getInstanceName(): Readonly<string>
    getMesh(): Readonly<THREE.Mesh | THREE.InstancedMesh> | THREE.Object3D
    getExplosionType(): Readonly<string>
    getPColor(): Readonly<PColor>
    getRemainingTime(): Readonly<number>
    getDustCreationFlag(): Readonly<boolean>
    setDustCreationFlag(flag: boolean): void
    getDustVector3(): Readonly<CVector3[]>
}

// destroy(): void