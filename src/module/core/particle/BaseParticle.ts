import * as THREE from 'three'

import CVector3 from '../../../type/CVector3'
import Particle from './Particle'
import PColor from '../../../type/PColor'
import { getRandomFloatInRange } from '../../utils'

export default class BaseParticle implements Particle {
    private instanceName: string
    private beginAbsolutePoint: CVector3
    private explosionType: string
    private pColor: PColor
    private mesh: THREE.InstancedMesh | THREE.Mesh | THREE.Object3D
    private time: number
    private totalFrames: number
    private remainingFrames: number
    private elapsedFrames: number
    private dustCreationFlag: boolean
    private dustCreationInterval: number

    protected constructor(
        instanceName: string,
        beginAbsolutePoint: CVector3,
        explosionType: string,
        pColor: PColor,
        mesh: THREE.InstancedMesh | THREE.Mesh | THREE.Object3D,
        time: number = 0,
        dustCreationInterval: number = 0,
    ) {
        this.instanceName = instanceName
        this.beginAbsolutePoint = beginAbsolutePoint
        this.explosionType = explosionType
        this.pColor = pColor
        this.mesh = mesh
        this.time = time
        this.totalFrames = time * 60
        this.remainingFrames = this.totalFrames
        this.elapsedFrames = 0
        this.dustCreationFlag = false
        this.dustCreationInterval = dustCreationInterval
    }

    public update(): void {
        this.elapsedFrames++
        this.remainingFrames--
        
        let remainingFramesRate = this.remainingFrames / this.totalFrames
        
        if (remainingFramesRate > 0.5) {
            if (this.dustCreationInterval > 0 && (this.remainingFrames % this.dustCreationInterval === 0)) this.dustCreationFlag = true
        }

        if (this.mesh instanceof THREE.InstancedMesh || this.mesh instanceof THREE.Mesh) {
            this.mesh.material.opacity = remainingFramesRate
        } else if (this.mesh instanceof THREE.Object3D) {
            this.mesh.children.forEach(c => {
                if (c instanceof THREE.Mesh) {
                    c.material.opacity = remainingFramesRate
                }
            })
        }
    }

    public getInstanceName(): Readonly<string> {
        return this.instanceName
    }

    protected getBeginAbsolutePoint(): Readonly<CVector3> {
        return this.beginAbsolutePoint
    }

    protected setBeginAbsolutePoint(beginAbsolutePoint: CVector3): void {
        this.beginAbsolutePoint = beginAbsolutePoint
    }

    public getExplosionType(): Readonly<string> {
        return this.explosionType
    }

    protected setExplosionType(explosionType: string): void {
        this.explosionType = explosionType
    }

    public getPColor(): Readonly<PColor> {
        return this.pColor
    }

    // Set the color for the material and update the color variable.
    protected setPColor(pColor: PColor): void {
        this.pColor = pColor
    }

    // Set the color for a specific instance in the InstancedMesh.
    protected setColorAt(index: number, color: string): void {
        if (this.mesh instanceof THREE.InstancedMesh) {
            this.mesh.setColorAt(index, new THREE.Color().setStyle(color))
        } else {
            console.log('setColorAt can only be used with InstancedMesh in BaseParticle.')
        }
    }

    protected needsUpdateInstanceColor(): void {
        if (this.mesh instanceof THREE.InstancedMesh && this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
    }

    public getMesh(): Readonly<THREE.Mesh | THREE.InstancedMesh> | THREE.Object3D {
        return this.mesh
    }

    protected setMesh(mesh: THREE.Mesh | THREE.InstancedMesh): void {
        this.mesh = mesh
    }

    protected setMatrixAt(i: number, matrix: THREE.Matrix4): void {
        if (this.mesh instanceof THREE.InstancedMesh) this.mesh.setMatrixAt(i, matrix)
    }

    protected needsUpdateInstanceMatrix(): void {
        if (this.mesh instanceof THREE.InstancedMesh) this.mesh.instanceMatrix.needsUpdate = true
    }

    protected getTime(): Readonly<number> {
        return this.time
    }

    protected setTime(time: number) {
        this.time = time
    }

    protected getTotalFrames(): Readonly<number> {
        return this.totalFrames
    }

    protected setTotalFrames(time: number) {
        this.totalFrames = time * 60
    }

    public getRemainingFrames(): Readonly<number> {
        return this.remainingFrames
    }

    protected setRemainingFrames(remainingFrames: number): void {
        this.remainingFrames = remainingFrames
    }

    protected getElapsedFrames(): Readonly<number> {
        return this.elapsedFrames
    }

    // Function for initializing the variable this.pointStorage using the index of for loop as elapsedFrames.
    protected setElapsedFrames(elapsedFrames: number): void {
        this.elapsedFrames = elapsedFrames
    }

    // protected getElapsedRate(): Readonly<number> {
    //     return this.elapsedFrames / this.totalFrames
    // }

    protected setDustCreationInterval(dustCreationInterval: number) {
        this.dustCreationInterval = dustCreationInterval
    }

    public getDustCreationFlag(): Readonly<boolean> {
        return this.dustCreationFlag
    }

    public setDustCreationFlag(flag: boolean): void {
        this.dustCreationFlag = flag
    }

    public getDustVector3(): Readonly<CVector3[]> {
        if (this.mesh instanceof THREE.InstancedMesh) {     // this.instanceName === TYPE.INSTANCE.EXPLOSION || this.instanceName === TYPE.INSTANCE.DUST
            const result: CVector3[] = []
            for (let i = 0; i < this.mesh.count; i++) {
                const matrix = new THREE.Matrix4()
                this.mesh.getMatrixAt(i, matrix)
                const position = new THREE.Vector3().setFromMatrixPosition(matrix)
                result.push({ x: position.x, y: position.y, z: position.z })
            }
            return result
        } else if (this.mesh instanceof THREE.Mesh || this.mesh instanceof THREE.Object3D) {    // this.instanceName === TYPE.INSTANCE.LAUNCHING
            const position = this.mesh.position
            const dustVectorList = [
                { x: position.x, y: position.y, z: position.z },
                { x: position.x + getRandomFloatInRange(-0.2, 0.2), y: position.y - 0.2, z: position.z + getRandomFloatInRange(-0.2, 0.2) },
                { x: position.x + getRandomFloatInRange(-0.2, 0.2), y: position.y - 0.3, z: position.z + getRandomFloatInRange(-0.2, 0.2) },
                { x: position.x + getRandomFloatInRange(-0.2, 0.2), y: position.y - 0.4, z: position.z + getRandomFloatInRange(-0.2, 0.2) },
                { x: position.x + getRandomFloatInRange(-0.2, 0.2), y: position.y - 0.5, z: position.z + getRandomFloatInRange(-0.2, 0.2) },
                { x: position.x + getRandomFloatInRange(-0.2, 0.2), y: position.y - 0.6, z: position.z + getRandomFloatInRange(-0.2, 0.2) },
                { x: position.x + getRandomFloatInRange(-0.2, 0.2), y: position.y - 0.7, z: position.z + getRandomFloatInRange(-0.2, 0.2) },
            ]
            return dustVectorList
        } else {
            return []
        }
    }

    protected rotateTowardsEndPoint(currentPoint: CVector3, endPoint: CVector3, object3D: THREE.Object3D | null = null): void {
        // Calculate direction vector.
        const currentVec = new THREE.Vector3(currentPoint.x, currentPoint.y, currentPoint.z)
        const endVec = new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)

        const direction = new THREE.Vector3().subVectors(endVec, currentVec).normalize()
        const up = new THREE.Vector3(0, 1, 0) // Default 'up' direction.

        // Calculate rotation quaternion.
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction)

        // Apply rotation.
        if (object3D) object3D.quaternion.copy(quaternion)
        else this.mesh.quaternion.copy(quaternion)
    }

    // Function for initializing the variable this.pointStorage using the index of for loop as elapsedFrames.
    protected getEaseOutFactor(elapsedFrames: number): Readonly<number> {
        const elapsedRate = elapsedFrames / this.totalFrames
        const easeOutFactor = 1 - (1 - elapsedRate) ** 4
        // const easeInFactor = elapsedRate ** 4
        return easeOutFactor
    }
}

// public destroy(): void {
//     this.geometry.dispose()
//     if (Array.isArray(this.material)) this.material.forEach(material => material.dispose())
//     else this.material.dispose()
// }