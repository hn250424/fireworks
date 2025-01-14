let volume: boolean = false

const stateManager = {
    getVolumeState: () => {
        return volume
    },

    setVolumeState: (state: boolean) => {
        volume = state
    }
}

export default stateManager