import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import INIT from '../../definition/init'
import camera from '../core/camera'
import renderer from '../core/renderer'

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.target.set(INIT.CONTROLS_TARGET.X, INIT.CONTROLS_TARGET.Y, INIT.CONTROLS_TARGET.Z)

export default orbitControls