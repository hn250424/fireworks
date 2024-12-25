import developmentHelper from "../module/feature/developmentManager"

const cartesianAxesButton = document.getElementById('cartesianAxesButton')
if (! cartesianAxesButton) throw new Error('cartesianAxesButton is not exist !')

let cartesianAxes = true
cartesianAxesButton.innerText = 'Hide cartesian axes'

cartesianAxesButton?.addEventListener('click', () => {
    if (cartesianAxes) {
        developmentHelper.hideCartesianAxes()
        cartesianAxes = false
        cartesianAxesButton.innerText = 'Show cartesian axes'
    } else {
        developmentHelper.showCartesianAxes()
        cartesianAxes = true
        cartesianAxesButton.innerText = 'Hide cartesian axes'
    }
})

// Cartesian Axes for development purpose.
developmentHelper.showCartesianAxes()