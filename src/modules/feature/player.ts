
import scene from "../core/scene"
import camera from "../core/camera"
import { renderer } from "../core/renderer"

import Particle from "../core/particle/Particle"
import Coordinates from "../../types/Coordinates"
import LaunchingParticle from "../core/particle/LaunchingParticle"
import ExplosionParticle from "../core/particle/ExplosionParticle"
import TraceParticle from "../core/particle/TraceParticle"
import BaseParticle from "../core/particle/BaseParticle"

const _particles: Particle[] = []

const player = {
    animate() {
        _particles.forEach((particle: Particle) => { 
            particle.update() 

            if (particle instanceof LaunchingParticle) {
                if (particle.remainingFrames % 6 === 0) {
                    const tp = new TraceParticle({...particle.currentAbsolutePoint}, particle.color)
                    _particles.push(tp)
                    scene.add(tp)
                }
            }
            
            // If this.remainingFrames is zero, this.currentAbsolutePoint.y is infinity.
            if (particle.remainingFrames == 1) {
                particle.destroy()

                const idx = _particles.indexOf(particle)
                if (idx > -1) _particles.splice(idx, 1)
                    
                scene.remove(particle as BaseParticle)
                
                if (particle instanceof LaunchingParticle) {
                    setTimeout(() => {
                        player.burst(particle.currentAbsolutePoint, particle.color)
                    }, 1000)
                }
            }
        })

        renderer.render(scene, camera)
        requestAnimationFrame(player.animate)
    },

    ignite(currentAbsolutePoint: Coordinates, endRelativePoint: Coordinates, ms: number) {
        setTimeout(() => {
            const lp = new LaunchingParticle(currentAbsolutePoint, endRelativePoint)
            _particles.push(lp)
            scene.add(lp)
        }, ms)
    },

    burst(currentPoint: Coordinates, color: string) {
        const relativeEndPointArray = [
            { x: 10, y: 10, z: 0  },
            { x: 0, y: 10, z: 10  },
            { x: 10, y: 10, z: 10  },
        ]
    
        relativeEndPointArray.forEach(endPoint => { 
            const ep = new ExplosionParticle({...currentPoint}, endPoint, color)
            _particles.push(ep) 
            scene.add(ep)
        })
    }
}

export default player