import * as THREE from 'three'
import CVector3 from "../../../type/CVector3"
import Color from '../../../type/PColor'
import PStatus from '../../../type/PType'

export default interface Particle {
    update(): void
    getMesh(): Readonly<THREE.Mesh | THREE.InstancedMesh>
    getCurrentAbsolutePoint(): Readonly<CVector3>
    getPStatus(): Readonly<PStatus>
    getPColor(): Readonly<Color>
    getRemainingFrames(): Readonly<number>
    getDustCreationFlag(): Readonly<boolean>
    setDustCreationFlag(flag: boolean): void
    getDustVector3(): Readonly<CVector3[]>
}

// destroy(): void