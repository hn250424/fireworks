import Particle from "./Particle"
import Coordinates from "../../types/Coordinates"
import ExplosionParticle from "./ExplosionParticle";

export default class LaunchingParticle extends Particle {
    constructor(
        currentPoint: Coordinates,
        endPoint: Coordinates,
    ) {
        super(currentPoint, endPoint)
    }

    protected preDestroyTask(): void {
        this.burst(this.currentPoint)
    }
    
    // private burst(currentPoint: Coordinates) {
    //     // Y = 5 -> 0도, 60도, 120도, 180도, 240도, 300도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 3, y: currentPoint.y + 5, z: currentPoint.z }); // 0도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 1.5, y: currentPoint.y + 5, z: currentPoint.z + 2.6 }); // 60도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 1.5, y: currentPoint.y + 5, z: currentPoint.z + 2.6 }); // 120도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 3, y: currentPoint.y + 5, z: currentPoint.z }); // 180도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 1.5, y: currentPoint.y + 5, z: currentPoint.z - 2.6 }); // 240도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 1.5, y: currentPoint.y + 5, z: currentPoint.z - 2.6 }); // 300도
    
    //     // Y = 4 -> 30도, 90도, 150도, 210도, 270도, 330도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.6, y: currentPoint.y + 4, z: currentPoint.z + 2 }); // 30도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.6, y: currentPoint.y + 4, z: currentPoint.z }); // 90도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.6, y: currentPoint.y + 4, z: currentPoint.z - 2 }); // 150도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.6, y: currentPoint.y + 4, z: currentPoint.z - 2 }); // 210도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.6, y: currentPoint.y + 4, z: currentPoint.z }); // 270도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.6, y: currentPoint.y + 4, z: currentPoint.z + 2 }); // 330도
    
    //     // Y = 3 -> 15도, 45도, 75도, 105도, 135도, 165도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.5, y: currentPoint.y + 3, z: currentPoint.z + 2.5 }); // 15도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.1, y: currentPoint.y + 3, z: currentPoint.z + 2.6 }); // 45도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 1, y: currentPoint.y + 3, z: currentPoint.z + 3 }); // 75도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 1, y: currentPoint.y + 3, z: currentPoint.z + 3 }); // 105도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 2.1, y: currentPoint.y + 3, z: currentPoint.z + 2.6 }); // 135도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 2.5, y: currentPoint.y + 3, z: currentPoint.z + 2.5 }); // 165도
    
    //     // Y = 2 -> 10도, 50도, 90도, 130도, 170도, 210도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 2.3, y: currentPoint.y + 2, z: currentPoint.z + 2 }); // 10도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 1.8, y: currentPoint.y + 2, z: currentPoint.z + 2.4 }); // 50도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x + 1, y: currentPoint.y + 2, z: currentPoint.z + 2.8 }); // 90도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 1, y: currentPoint.y + 2, z: currentPoint.z + 2.8 }); // 130도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 1.8, y: currentPoint.y + 2, z: currentPoint.z + 2.4 }); // 170도
    //     new ExplosionParticle({ ...currentPoint }, { x: currentPoint.x - 2.3, y: currentPoint.y + 2, z: currentPoint.z + 2 }); // 210도
    // }
    private burst(currentPoint: Coordinates) {
        const radius = 3; // 구의 반지름
    
        // 고르게 퍼지도록 분포 (각도를 나누는 방식)
        const angles = [
            [0, 0], [60, 0], [120, 0], [180, 0], [240, 0], [300, 0],
            [30, 30], [90, 30], [150, 30], [210, 30], [270, 30], [330, 30],
            [45, 45], [135, 45], [225, 45], [315, 45],
            [15, 60], [75, 60]
        ];
    
        // 각도에 따라 파티클 위치 계산
        angles.forEach(([theta, phi]) => {
            // 세차원 좌표에서의 구의 각도에 맞춰서 x, y, z 값을 계산
            const x = currentPoint.x + radius * Math.sin(Math.PI * phi / 180) * Math.cos(Math.PI * theta / 180);
            const y = currentPoint.y + radius * Math.cos(Math.PI * phi / 180);
            const z = currentPoint.z + radius * Math.sin(Math.PI * phi / 180) * Math.sin(Math.PI * theta / 180);
    
            new ExplosionParticle({ ...currentPoint }, { x, y, z });
        });
    }
    
}