import uiManager from "../module/feature/uiManager"

const launchPointButton = document.getElementById('launchPointButton')
if (! launchPointButton) throw new Error('launchPointButton is not exist !')

let launchPoint = true
launchPointButton.innerText = 'Hide launch point'

launchPointButton?.addEventListener('click', () => {
    if (launchPoint) {
        uiManager.hideLaunchPoint()
        launchPoint = false
        launchPointButton.innerText = 'Show launch point'
    } else {
        uiManager.showLaunchPoint()
        launchPoint = true
        launchPointButton.innerText = 'Hide launch point'
    }
})

// LaunchPoint for development purpose.
uiManager.showLaunchPoint()