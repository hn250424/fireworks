import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
renderer.setSize(window.innerWidth, window.innerHeight)

// Container.
const container = document.getElementById('container')
if (! container) throw new Error('Container is not exist !')

container.appendChild(renderer.domElement)

// // *** todo
// let isDragging = false;

// // 마우스 다운
// renderer.domElement.addEventListener('mousedown', function (event) {
//     if (event.button === 0) { // 0은 왼쪽 마우스 버튼
//         isDragging = true;
//         console.log('Mouse drag start');
//     }
// });

// // 마우스 이동
// renderer.domElement.addEventListener('mousemove', function (event) {
//     if (isDragging) {
//         console.log('Mouse dragging:', event.clientX, event.clientY); // 드래그 중 좌표 추적
//     }
// });

// // 마우스 업
// renderer.domElement.addEventListener('mouseup', function (event) {
//     if (event.button === 0) {
//         isDragging = false;
//         console.log('Mouse drag end');
//     }
// });

// // 마우스 휠 이벤트 리스너
// renderer.domElement.addEventListener('wheel', function (event) {
//     console.log('Mouse wheel used: ', event.deltaY);  // 휠의 방향을 추적
//     console.log('Mouse wheel used: ', event.clientX, event.clientY);  // 휠의 방향을 추적
//     // 여기서 휠에 따른 카메라 또는 다른 처리를 할 수 있습니다
// });
// // ***


export default renderer
