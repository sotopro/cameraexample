import { ADD_PLACE, LOAD_PLACE } from "./places.actions"
import Place from "../models/Places"

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.payload.id,
                action.payload.title, 
                action.payload.image,
                action.payload.address,
                action.payload.latitude,
                action.payload.longitude
            )
            return {
                ...state,
                places: state.places.concat(newPlace)
            }
        case LOAD_PLACE:
            console.warn('action.payload', action.payload)
            return {
                ...state,
                places: action.payload.map(place => {
                    return new Place(
                        place.id,
                        place.title,
                        place.image,
                        place.address,
                        place.latitude,
                        place.longitude
                    )
                })
            }
        default:
            return state
    }
}