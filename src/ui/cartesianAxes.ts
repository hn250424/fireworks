import uiManager from "../module/feature/uiManager"

const cartesianAxesButton = document.getElementById('cartesianAxesButton')
if (! cartesianAxesButton) throw new Error('cartesianAxesButton is not exist !')

let cartesianAxes = true
cartesianAxesButton.innerText = 'Hide cartesian axes'

cartesianAxesButton?.addEventListener('click', () => {
    if (cartesianAxes) {
        uiManager.hideCartesianAxes()
        cartesianAxes = false
        cartesianAxesButton.innerText = 'Show cartesian axes'
    } else {
        uiManager.showCartesianAxes()
        cartesianAxes = true
        cartesianAxesButton.innerText = 'Hide cartesian axes'
    }
})

// Cartesian Axes for development purpose.
uiManager.showCartesianAxes()