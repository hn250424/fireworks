import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import camera from '../core/camera'
import { canvas } from '../core/renderer'

const orbitControls = new OrbitControls(camera, canvas)

export default orbitControls