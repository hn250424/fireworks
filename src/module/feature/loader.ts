import * as THREE from 'three'
import { Collada, ColladaLoader } from 'three/examples/jsm/Addons.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

const textureLoader = new THREE.TextureLoader()
const colladaLoader = new ColladaLoader()
const objLoader = new OBJLoader()

const loader = {
    loadTexture(file: string): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            try {
                textureLoader.load(
                    file,
                    (texture: THREE.Texture) => { resolve(texture) }
                )
            } catch (err) {
                reject(err)
            }
        })
    },

    loadCollada(file: string): Promise<THREE.Object3D> {
        return new Promise((resolve, reject) => {
            try {
                colladaLoader.load(
                    file,
                    (collada: Collada) => { resolve(collada.scene) }
                )
            } catch (err) {
                reject(err)
            }
        })
    },

    loadObj(file: string): Promise<THREE.Object3D> {
        return new Promise((resolve, reject) => {
            try {
                objLoader.load(
                    file,
                    (object: THREE.Object3D) => { resolve(object) }
                )
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default loader