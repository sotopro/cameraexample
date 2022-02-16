class Place {
    constructor (id, title, image, address, latitude, longitude) {
        this.id = id.toString()
        this.title = title
        this.image = image
        this.address = address
        this.latitude = latitude
        this.longitude = longitude
    }
}

export default Place