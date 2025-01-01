import Particle from "../module/core/particle/Particle"

const _arr: Particle[] = []

const particles = {
    add(particle: Particle): void {
        _arr.push(particle)
    },

    remove(particle: Particle): void {
        const idx = _arr.indexOf(particle)
        if (idx > -1) _arr.splice(idx, 1)
    },

    /**
     * Iterate over each particle and execute the provided callback.
     * @param callback - A function to process each particle. The particle is provided automatically.
     */
    processEachParticle(callback: (particle: Particle) => void): void {
        _arr.forEach(callback)
    },

    isEmpty(): Promise<void> {
        return new Promise((resolve) => {
            const check = () => {
                if (_arr.length === 0) resolve()
                else setTimeout(check, 500)
            }

            check()
        })
    }
}

export default particles
