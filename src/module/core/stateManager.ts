let volume: boolean = false
let revolve: boolean = false

const stateManager = {
    getVolumeState: () => { return volume },
    setVolumeState: (state: boolean) => { volume = state },
    getRevolveState: () => { return revolve },
    setRevolveState: (state: boolean) => { revolve = state },
}

export default stateManager