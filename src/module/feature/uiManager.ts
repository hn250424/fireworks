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

const originIcon = document.getElementById('originIcon')
if (! originIcon) throw new Error('originIcon is not exist !')

const cartesianIcon = document.getElementById('cartesianIcon')
if (! cartesianIcon) throw new Error('cartesianIcon is not exist !')

const spinningIcon = document.getElementById('spinningIcon')
if (! spinningIcon) throw new Error('spinningIcon is not exist !')
    
const volumeIcon = document.getElementById('volumeIcon')
if (! volumeIcon) throw new Error('volumeIcon is not exist !')

let volume: boolean
let cartesian: boolean
let spin: boolean

const cartesianAxesElementArray: THREE.Mesh[] = []
const launchPointArray: THREE.Mesh[] = []

function createElements(): void {
    if (originIcon) originIcon.style.backgroundImage = `url(${ASSETS.ICONS.ORIGIN})`
    // if (cartesianIcon) cartesianIcon.style.backgroundImage = `url(${ASSETS.ICONS.HIDE_CARTESIAN})`
    // if (spinningIcon) spinningIcon.style.backgroundImage = `url(${ASSETS.ICONS.STOP_SPINNING})`
    // if (volumeIcon) volumeIcon.style.backgroundImage = `url(${ASSETS.ICONS.OFF_VOLUME})`

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
    // launchPointArray.forEach(p => scene.add(p)) 

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

function showCartesian() {
    if (cartesianIcon) {
        cartesianIcon.style.backgroundImage = `url(${ASSETS.ICONS.SHOW_CARTESIAN})`
        cartesian = true
        cartesianAxesElementArray.forEach(e => scene.add(e)) 
    }
}

function hideCartesian() { 
    if (cartesianIcon) {
        cartesianIcon.style.backgroundImage = `url(${ASSETS.ICONS.HIDE_CARTESIAN})`
        cartesian = false
        cartesianAxesElementArray.forEach(e => scene.remove(e)) 
    }
}

function startSpinning() {
    if (spinningIcon) {
        spinningIcon.style.backgroundImage = `url(${ASSETS.ICONS.START_SPINNING})`
        spin = true
        stateManager.setSpinState(spin)
    }
}

function stopSpinning() {
    if (spinningIcon) {
        spinningIcon.style.backgroundImage = `url(${ASSETS.ICONS.STOP_SPINNING})`
        spin = false
        stateManager.setSpinState(spin)
    }
}

function turnOnTheVolume() {
    if (volumeIcon) {
        volumeIcon.style.backgroundImage = `url(${ASSETS.ICONS.ON_VOLUME})`
        stateManager.setVolumeState(true)
        volume = true
    }
}

function turnOffTheVolume() {
    if (volumeIcon) {
        volumeIcon.style.backgroundImage = `url(${ASSETS.ICONS.OFF_VOLUME})`
        stateManager.setVolumeState(false)
        volume = false
    }
}

const uiManager = {
    init() {
        loadingPage.style.display = 'none'

        container.style.width = '100%'
        container.style.height = '100%'
        container.style.display = 'block'

        createElements()
        hideCartesian()
        stopSpinning()
        turnOffTheVolume()
    },

    registerUiListeners() {
        volumeIcon.addEventListener('click', () => {
            if (volume) turnOffTheVolume()
            else turnOnTheVolume()
        })

        cartesianIcon.addEventListener('click', () => {
            if (cartesian) hideCartesian()
            else showCartesian() 
        })

        spinningIcon.addEventListener('click', () => {
            if (spin) stopSpinning()
            else startSpinning()
        })

        originIcon.addEventListener('click', () => {
            if (! stateManager.getSpinState()) camera.position.set(INIT.CAMERA.X, INIT.CAMERA.Y, INIT.CAMERA.Z)
        })
    },
}

export default uiManager
