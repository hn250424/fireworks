import * as THREE from 'three'

import INIT from '../../definition/init'
import ASSETS from '../../definition/assets'
import COLOR from '../../definition/color'
import POINT from '../../definition/point'
import camera from '../core/camera'
import scene from '../core/scene'

import stateManager from '../core/stateManager'

const loadingPage = document.getElementById('loadingPage')
if (! loadingPage) throw new Error('loadingPage is not exist !')

const container = document.getElementById('container')
if (! container) throw new Error('loadingPage is not exist !')
    
const displayButton = document.getElementById('displayButton')
if (! displayButton) throw new Error('displayButton is not exist !')

const volumeButton = document.getElementById('volumeButton')
if (! volumeButton) throw new Error('volumeButton is not exist !')

const launchPointButton = document.getElementById('launchPointButton')
if (! launchPointButton) throw new Error('launchPointButton is not exist !')

const cartesianAxesButton = document.getElementById('cartesianAxesButton')
if (! cartesianAxesButton) throw new Error('cartesianAxesButton is not exist !')

const revolveButton = document.getElementById('revolveButton')
if (! revolveButton) throw new Error('revolveButton is not exist !')

const originButton = document.getElementById('originButton')
if (! originButton) throw new Error('originButton is not exist !')

const phrase = document.getElementById('phrase')
if (! phrase) throw new Error('phrase is not exist !')

let display: boolean
let volume: boolean
let cartesianAxes: boolean
let launchPoint: boolean
let revolve: boolean

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
    const size = 0.1
    Object.values(POINT.LAUNCHING_BASE).forEach(p => {
        const point = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshStandardMaterial({ color: COLOR.LAUNCH_POINT })
        )
        point.position.set(p.x, p.y, p.z)
        launchPointArray.push(point)
    })

    // For testing point during development.
    // const radius = 0.1
    // const segment = 8
    // POINT.RED.forEach(p => {
    //     const point = new THREE.Mesh(
    //         new THREE.SphereGeometry(radius, segment, segment),
    //         new THREE.MeshStandardMaterial({ color: 'red' })
    //     )
    //     point.position.set(p.x, p.y, p.z)
    //     launchPointArray.push(point)
    // })
    // POINT.BLUE.forEach(p => {
    //     const point = new THREE.Mesh(
    //         // new THREE.CylinderGeometry(0.05, 0, 0.7),
    //         new THREE.SphereGeometry(radius, segment, segment),
    //         new THREE.MeshStandardMaterial({ color: 'blue' })
    //     )
    //     point.position.set(p.x, p.y, p.z)
    //     launchPointArray.push(point)
    // })
}

function displayButtons() {
    if (displayButton) {
        displayButton.style.backgroundImage = "url('/images/hide_menu.png')"
        display = true
        if (launchPointButton) launchPointButton.style.display = 'block'
        if (cartesianAxesButton) cartesianAxesButton.style.display = 'block'
        if (revolveButton) revolveButton.style.display = 'block'
        if (originButton) originButton.style.display = 'block'
        if (phrase) phrase.style.display = 'block'
    }
}

function hideButtons() {
    if (displayButton) {
        displayButton.style.backgroundImage = "url('/images/show_menu.png')"
        display = false
        if (launchPointButton) launchPointButton.style.display = 'none'
        if (cartesianAxesButton) cartesianAxesButton.style.display = 'none'
        if (revolveButton) revolveButton.style.display = 'none'
        if (originButton) originButton.style.display = 'none'
        if (phrase) phrase.style.display = 'none'
    }
}

function turnOnTheVolume() {
    if (volumeButton) {
        volumeButton.style.backgroundImage = `url(${ASSETS.IMAGES.ON_VOLUME})`
        stateManager.setVolumeState(true)
        volume = true
    }
}

function turnOffTheVolume() {
    if (volumeButton) {
        volumeButton.style.backgroundImage = `url(${ASSETS.IMAGES.OFF_VOLUME})`
        stateManager.setVolumeState(false)
        volume = false
    }
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

function startRevolving() {
    revolve = true
    stateManager.setRevolveState(revolve)
    if (revolveButton) revolveButton.innerText = 'Stop revolving'
}

function stopRevolving() {
    revolve = false
    stateManager.setRevolveState(revolve)
    if (revolveButton) revolveButton.innerText = 'Start revolving'
}

const uiManager = {
    init() {
        loadingPage.style.display = 'none'

        container.style.width = '100%'
        container.style.height = '100%'
        container.style.display = 'block'

        createElements()
        hideButtons()
        turnOffTheVolume()
        hideCartesianAxes()
        hideLaunchPoint()
        stopRevolving()
    },

    registerUiListeners() {
        displayButton.addEventListener('click', () => {
            if (display) hideButtons()
            else displayButtons()
        })

        volumeButton.addEventListener('click', () => {
            if (volume) turnOffTheVolume()
            else turnOnTheVolume()
        })

        launchPointButton.addEventListener('click', () => {
            if (launchPoint) hideLaunchPoint()
            else showLaunchPoint()
        })

        cartesianAxesButton.addEventListener('click', () => {
            if (cartesianAxes) hideCartesianAxes()
            else showCartesianAxes() 
        })

        revolveButton.addEventListener('click', () => {
            if (revolve) stopRevolving()
            else startRevolving()
        })

        originButton.addEventListener('click', () => {
            if (! stateManager.getRevolveState()) camera.position.set(INIT.CAMERA.X, INIT.CAMERA.Y, INIT.CAMERA.Z)
        })
    },
}

export default uiManager
