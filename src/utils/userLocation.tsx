import snackBar from "./snackBar"

let userLocation = {
    coordinates: { lat: null, lng: null },
    disable: false,
    getUserLocation: () => {
        if (navigator.geolocation && !userLocation.disable) {
            navigator.geolocation.getCurrentPosition(userLocation.updatePosition, userLocation.showError)
            userLocation.disable = false
        } else {
            snackBar({ type: "error", text: "Geolocation is not supported by this browser.", timeout: 3000 })
        }
    },

    updatePosition: (position: any) => {
        userLocation.coordinates = { lat: position.coords.latitude, lng: position.coords.longitude }
    },
    showError(error: any) {
        userLocation.disable = true
        switch (error.code) {
            case error.PERMISSION_DENIED:
                snackBar({ type: "error", text: "User denied the request for Geolocation.", timeout: 3000 })
                break;
            case error.POSITION_UNAVAILABLE:
                snackBar({ type: "error", text: "Location information is unavailable.", timeout: 3000 })
                break;
            case error.TIMEOUT:
                snackBar({ type: "error", text: "The request to get user location timed out.", timeout: 3000 })
                break;
            case error.UNKNOWN_ERROR:
                snackBar({ type: "error", text: "An unknown error occured", timeout: 3000 })
                break;
        }
    }
}
export default userLocation