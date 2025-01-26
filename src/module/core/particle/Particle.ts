import * as THREE from 'three'
import CVector3 from "../../../type/CVector3"
import Color from '../../../type/PColor'

export default interface Particle {
    update(): void
    getInstanceName(): Readonly<string>
    getMesh(): Readonly<THREE.Mesh | THREE.InstancedMesh>
    getCurrentAbsolutePoint(): Readonly<CVector3>
    getExplosionType(): Readonly<string>
    getPColor(): Readonly<Color>
    getRemainingFrames(): Readonly<number>
    getDustCreationFlag(): Readonly<boolean>
    setDustCreationFlag(flag: boolean): void
    getDustVector3(): Readonly<CVector3[]>
}

// destroy(): void