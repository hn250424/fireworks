import * as THREE from 'three'

import BaseParticle from "./BaseParticle"
import Coordinates from "../../../type/Coordinates"
import TYPE from '../../../definition/type'
import ChildDustInfo from '../../../type/ChildDustInfo'

export default class ExplosionParticle extends BaseParticle {
    private endRelativeYPointStorage: number[] = []   // Updating the y-endPoint to affect the particle's rotation.
    private pointStorage: Coordinates[]
    // private trailStorage: THREE.Vector3[]
    // private trail: THREE.Line

    private constructor(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string,
        color: string
    ) {
        const time = 5
        const radius = 0.05
        const segment = 8
        const geometry = new THREE.SphereGeometry(radius, segment, segment)
        const material = new THREE.MeshStandardMaterial({ color: color, transparent: true })
        const childDustInfo: ChildDustInfo = {
            use: true,
            unit: 20,
            request: false
        }
        if (explosionType === TYPE.EXPLOSION.ROUTINE.BURST) childDustInfo.unit = 10
        else if (explosionType === TYPE.EXPLOSION.FINALE.HUGE_BURST || explosionType === TYPE.EXPLOSION.FINALE.CHAIN_BURST) childDustInfo.use = false
        super(currentAbsolutePoint, endRelativePoint, explosionType, color, time, geometry, material, childDustInfo)

        this.endRelativeYPointStorage = new Array(this.getTotalFrames())
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        // this.trailStorage = []
        // const trailGeometry = new THREE.BufferGeometry().setFromPoints(this.trailStorage)
        // const trailMaterial = new THREE.LineBasicMaterial({ color: this.getColor() })
        // this.trail = new THREE.Line(trailGeometry, trailMaterial)

        const copyedStartAbsolutePoint_y = this.getCurrentAbsolutePoint().y
        let copyedEndRelativePoint_y = this.getEndRelativePoint().y
        const gravity = 0.03
        for (let i = 0; i < this.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)
            
            this.pointStorage[i].x = this.getCurrentAbsolutePoint().x + (this.getEndRelativePoint().x * easeOutFactor) 

            this.endRelativeYPointStorage[i] = copyedEndRelativePoint_y
            this.pointStorage[i].y = copyedStartAbsolutePoint_y + copyedEndRelativePoint_y * easeOutFactor
            copyedEndRelativePoint_y -= gravity

            this.pointStorage[i].z = this.getCurrentAbsolutePoint().z + (this.getEndRelativePoint().z * easeOutFactor) 
        }
    }

    public static create(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string,
        color: string
    ): ExplosionParticle {
        return new ExplosionParticle(currentAbsolutePoint, endRelativePoint, explosionType, color)
    }

    public recycle(
        currentAbsolutePoint: Coordinates,
        endRelativePoint: Coordinates,
        explosionType: string,
        color: string
    ): void {
        super.setCurrentAbsolutePoint(currentAbsolutePoint)
        super.setEndRelativePoint(endRelativePoint)
        super.setExplosionType(explosionType)
        super.setRemainingFrames(this.getTotalFrames())
        super.setElapsedFrames(0)
        super.setColor(color)
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        // this.trailStorage = []
        // const trailGeometry = new THREE.BufferGeometry().setFromPoints(this.trailStorage)
        // const trailMaterial = new THREE.LineBasicMaterial({ color: this.getColor() })
        // this.trail = new THREE.Line(trailGeometry, trailMaterial)
        
        this.endRelativeYPointStorage = new Array(this.getTotalFrames())
        this.pointStorage = new Array(this.getTotalFrames()).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
        const copyedStartAbsolutePoint_y = this.getCurrentAbsolutePoint().y
        let copyedEndRelativePoint_y = this.getEndRelativePoint().y
        const gravity = 0.03
        for (let i = 0; i < this.getTotalFrames(); i++) {
            const easeOutFactor = super.getEaseOutFactor(i)
            
            this.pointStorage[i].x = this.getCurrentAbsolutePoint().x + (this.getEndRelativePoint().x * easeOutFactor)

            this.endRelativeYPointStorage[i] = copyedEndRelativePoint_y
            this.pointStorage[i].y = copyedStartAbsolutePoint_y + copyedEndRelativePoint_y * easeOutFactor
            copyedEndRelativePoint_y -= gravity

            this.pointStorage[i].z = this.getCurrentAbsolutePoint().z + (this.getEndRelativePoint().z * easeOutFactor)
        }
    }

    public update(): void {
        this.getCurrentAbsolutePoint().x = this.pointStorage[this.getElapsedFrames()].x
        this.getCurrentAbsolutePoint().y = this.pointStorage[this.getElapsedFrames()].y
        this.getCurrentAbsolutePoint().z = this.pointStorage[this.getElapsedFrames()].z
        this.getEndRelativePoint().y = this.endRelativeYPointStorage[this.getElapsedFrames()]

        this.position.set(this.getCurrentAbsolutePoint().x, this.getCurrentAbsolutePoint().y, this.getCurrentAbsolutePoint().z)
        // Call if ExplosionParticle's shape is rect.
        // super.rotateTowardsEndPoint()

        // const trailPos = new THREE.Vector3(this.pointStorage[this.getElapsedFrames()].x, this.pointStorage[this.getElapsedFrames()].y, this.pointStorage[this.getElapsedFrames()].z)
        // this.trailStorage.push(trailPos)

        // if (this.trailStorage.length > 10) this.trailStorage.shift()

        // const trailGeometry = new THREE.BufferGeometry().setFromPoints(this.trailStorage)
        // const trailMaterial = new THREE.LineBasicMaterial({ 
        //     color: this.getColor(),
        //     transparent: true,
        //     opacity: (this.getRemainingFrames() / this.getTotalFrames()) / 2
        // })
        // this.trail = new THREE.Line(trailGeometry, trailMaterial)

        super.update()
    }

    // public getTrail(): THREE.Line {
    //     return this.trail
    // }
}