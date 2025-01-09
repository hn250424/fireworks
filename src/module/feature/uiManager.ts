import * as THREE from 'three'
import COLOR from '../../definition/color'
import POINT from '../../definition/point'
import scene from '../core/scene'

const loadingPage = document.getElementById('loadingPage')
if (! loadingPage) throw new Error('loadingPage is not exist !')

const container = document.getElementById('container')
if (! container) throw new Error('loadingPage is not exist !')

const cartesianAxesButton = document.getElementById('cartesianAxesButton')
if (! cartesianAxesButton) throw new Error('cartesianAxesButton is not exist !')

const launchPointButton = document.getElementById('launchPointButton')
if (! launchPointButton) throw new Error('launchPointButton is not exist !')

let cartesianAxes: boolean
let launchPoint: boolean

const cartesianAxesElementArray: THREE.Mesh[] = []
const launchPointArray: THREE.Mesh[] = []

function createElements(): void {
    // Cartesian Axes Elements.
    const cubeSize = 0.5
    const lineWidth = 0.05
    const lineLength = 5
    const lineStartPoint = 2.5

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
        new THREE.MeshStandardMaterial({ color: COLOR.CATESIAN_AXES.BASE_POINT })
    )
    const x = new THREE.Mesh(
        new THREE.BoxGeometry(lineLength, lineWidth, lineWidth),
        new THREE.MeshStandardMaterial({ color: COLOR.CATESIAN_AXES.X })
    )
    const y = new THREE.Mesh(
        new THREE.BoxGeometry(lineWidth, lineLength, lineWidth),
        new THREE.MeshStandardMaterial({ color: COLOR.CATESIAN_AXES.Y })
    )
    const z = new THREE.Mesh(
        new THREE.BoxGeometry(lineWidth, lineWidth, lineLength),
        new THREE.MeshStandardMaterial({ color: COLOR.CATESIAN_AXES.Z })
    )

    x.position.set(lineStartPoint, 0, 0)
    y.position.set(0, lineStartPoint, 0)
    z.position.set(0, 0, lineStartPoint)

    cartesianAxesElementArray.push(cube, x, y, z)

    // Fireworks Launch Points
    const radius = 0.1
    const segment = 32
    Object.values(POINT.LAUNCHING_BASE).forEach(p => {
        const point = new THREE.Mesh(
            new THREE.SphereGeometry(radius, segment, segment),
            new THREE.MeshStandardMaterial({ color: COLOR.LAUNCH_POINT })
        )
        point.position.set(p.x, p.y, p.z)
        launchPointArray.push(point)
    })

    // For testing coordinates during development.
    POINT.RED.forEach(p => {
        const point = new THREE.Mesh(
            new THREE.SphereGeometry(radius, segment, segment),
            new THREE.MeshStandardMaterial({ color: 'red' })
        )
        point.position.set(p.x, p.y, p.z)
        launchPointArray.push(point)
    })
    POINT.BLUE.forEach(p => {
        const point = new THREE.Mesh(
            // new THREE.CylinderGeometry(0.05, 0, 0.7),
            new THREE.SphereGeometry(radius, segment, segment),
            new THREE.MeshStandardMaterial({ color: 'blue' })
        )
        point.position.set(p.x, p.y, p.z)
        launchPointArray.push(point)
    })
}

function showCartesianAxes() { 
    cartesianAxesElementArray.forEach(e => scene.add(e)) 
    cartesianAxes = true
    if (cartesianAxesButton) cartesianAxesButton.innerText = 'Hide cartesian axes'
}

function hideCartesianAxes() { 
    cartesianAxesElementArray.forEach(e => scene.remove(e)) 
    cartesianAxes = false
    if (cartesianAxesButton) cartesianAxesButton.innerText = 'Show cartesian axes'
}

function showLaunchPoint() { 
    launchPointArray.forEach(p => scene.add(p)) 
    launchPoint = true
    if (launchPointButton) launchPointButton.innerText = 'Hide launch point'
}

function hideLaunchPoint() { 
    launchPointArray.forEach(p => scene.remove(p)) 
    launchPoint = false
    if (launchPointButton) launchPointButton.innerText = 'Show launch point'
}

const uiManager = {
    init() {
        loadingPage.style.display = 'none'

        container.style.width = '100%'
        container.style.height = '100%'
        container.style.display = 'block'

        createElements()
        showCartesianAxes()
        showLaunchPoint()
    },

    registerUiListeners() {
        cartesianAxesButton.addEventListener('click', () => {
            if (cartesianAxes) hideCartesianAxes()
            else showCartesianAxes() 
        })

        launchPointButton.addEventListener('click', () => {
            if (launchPoint) hideLaunchPoint()
            else showLaunchPoint()
        })
    },
}

export default uiManager
