let volume: boolean = false
let spin: boolean = false

const stateManager = {
    getVolumeState: () => { return volume },
    setVolumeState: (state: boolean) => { volume = state },
    getSpinState: () => { return spin },
    setSpinState: (state: boolean) => { spin = state },
}

export default stateManager