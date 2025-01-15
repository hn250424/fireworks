import * as THREE from 'three';

export default class TestParticle {
    private mesh: THREE.InstancedMesh;
    private count: number;
    private dummy: THREE.Object3D;

    constructor(scene: THREE.Scene, count: number) {
        this.count = count;

        // 지오메트리와 머티리얼 생성
        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        // InstancedMesh 생성
        this.mesh = new THREE.InstancedMesh(geometry, material, this.count);
        this.dummy = new THREE.Object3D();

        // 초기 위치 설정
        for (let i = 0; i < this.count; i++) {
            this.dummy.position.set(Math.random() * 5, Math.random() * 5, Math.random() * 5);
            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this.dummy.matrix);
        }

        scene.add(this.mesh);
    }

    // 업데이트 메서드
    public update(): void {
        for (let i = 0; i < this.count; i++) {
            // 기존 매트릭스 가져오기
            this.mesh.getMatrixAt(i, this.dummy.matrix);
            this.dummy.matrix.decompose(this.dummy.position, this.dummy.quaternion, this.dummy.scale);

            // 위치 업데이트 (X, Y, Z + 0.1)
            this.dummy.position.x += 0.1;
            this.dummy.position.y += 0.1;
            this.dummy.position.z += 0.1;

            // 매트릭스 업데이트
            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this.dummy.matrix);
        }

        // 변화를 GPU에 반영
        this.mesh.instanceMatrix.needsUpdate = true;
    }
}
