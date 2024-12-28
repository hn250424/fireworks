import developmentHelper from "../module/feature/developmentHelper"

const launchPointButton = document.getElementById('launchPointButton')
if (! launchPointButton) throw new Error('launchPointButton is not exist !')

let launchPoint = true
launchPointButton.innerText = 'Hide launch point'

launchPointButton?.addEventListener('click', () => {
    if (launchPoint) {
        developmentHelper.hideLaunchPoint()
        launchPoint = false
        launchPointButton.innerText = 'Show launch point'
    } else {
        developmentHelper.showLaunchPoint()
        launchPoint = true
        launchPointButton.innerText = 'Hide launch point'
    }
})

// LaunchPoint for development purpose.
developmentHelper.showLaunchPoint()