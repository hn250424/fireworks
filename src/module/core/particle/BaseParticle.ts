import * as THREE from 'three'

import CVector3 from '../../../type/CVector3'
import Particle from './Particle'

export default class BaseParticle implements Particle {
    private beginAbsolutePoint: CVector3
    private explosionType: string
    private color: string
    private geometry: THREE.BufferGeometry
    private material: THREE.MeshStandardMaterial
    private mesh: THREE.InstancedMesh | THREE.Mesh
    private totalFrames: number
    private remainingFrames: number
    private elapsedFrames: number
    private dustCreationFlag: boolean
    private dustCreationInterval: number

    protected constructor(
        beginAbsolutePoint: CVector3,
        explosionType: string,
        color: string,
        geometry: THREE.BufferGeometry,
        material: THREE.MeshStandardMaterial,
        mesh: THREE.InstancedMesh | THREE.Mesh,
        time: number,
        dustCreationInterval: number = 0,
    ) {
        this.beginAbsolutePoint = beginAbsolutePoint
        this.explosionType = explosionType
        this.color = color
        this.geometry = geometry
        this.material = material
        this.mesh = mesh
        this.dustCreationFlag = false
        this.dustCreationInterval = dustCreationInterval
        this.totalFrames = time * 60
        this.remainingFrames = this.totalFrames
        this.elapsedFrames = 0
    }

    public update(): void {
        this.elapsedFrames++
        this.remainingFrames--
        
        if (this.dustCreationInterval > 0 && (this.remainingFrames % this.dustCreationInterval === 0)) this.dustCreationFlag = true

        if (this.material instanceof THREE.MeshStandardMaterial) {
            this.material.opacity = this.remainingFrames / this.totalFrames
        }
    }

    protected getBeginAbsolutePoint(): Readonly<CVector3> {
        return this.beginAbsolutePoint
    }

    protected setBeginAbsolutePoint(beginAbsolutePoint: CVector3): void {
        this.beginAbsolutePoint = beginAbsolutePoint
    }

    public getCurrentAbsolutePoint(): Readonly<CVector3> {
        if (this.mesh instanceof THREE.Mesh){
            const arr = this.mesh.position.toArray()
            return {x: arr[0], y: arr[1], z: arr[2]}
        } else {
            throw new Error('Only the mesh type, not instancedMesh type, can call this method.')
        }
    }

    public getExplosionType(): Readonly<string> {
        return this.explosionType
    }

    protected setExplosionType(explosionType: string): void {
        this.explosionType = explosionType
    }

    public getColor(): Readonly<string> {
        return this.color
    }

    protected setColor(color: string): void {
        this.color = color
        if (this.material instanceof THREE.MeshStandardMaterial) {
            this.material.color.set(color)
        }
    }

    protected getGeometry(): Readonly<THREE.BufferGeometry> {
        return this.geometry
    }

    protected setGeometry(geometry: THREE.BufferGeometry): void {
        this.geometry = geometry
    }

    protected getMaterial(): Readonly<THREE.MeshStandardMaterial> {
        return this.material
    }

    protected setMaterial(material: THREE.MeshStandardMaterial): void {
        this.material = material
    }

    public getMesh(): Readonly<THREE.Mesh | THREE.InstancedMesh> {
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
        if (this.mesh instanceof THREE.InstancedMesh) {
            const result: CVector3[] = []
            for (let i = 0; i < this.mesh.count; i++) {
                const matrix = new THREE.Matrix4()
                this.mesh.getMatrixAt(i, matrix)
                const position = new THREE.Vector3().setFromMatrixPosition(matrix)
                result.push({ x: position.x, y: position.y, z: position.z })
            }
            return result
        } else if (this.mesh instanceof THREE.Mesh) {
            return [this.getCurrentAbsolutePoint()]
        } else {
            return []
        }
    }

    protected getTotalFrames(): Readonly<number> {
        return this.totalFrames
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