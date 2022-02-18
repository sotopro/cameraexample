import RNFS from 'react-native-fs';
import { MAPS_KEY } from '../constants/maps'; 
import { insertAddress, fetchAddress } from '../db';
export const ADD_PLACE = 'ADD_PLACE'
export const LOAD_PLACE = 'LOAD_PLACE'




export const addPlace = (title, image, location) => {
    const { latitude, longitude } = location
    return async dispatch => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_KEY}`)

        if(!response.ok) throw new Error('No se a podido obtener la dirección')

        const resData = await response.json();

        if(!resData.results) throw new Error('No se a podido obtener la dirección')

        const address = resData.results[0].formatted_address;

        console.warn(address);

        const fileName = image.split('/').pop();
        const Path = `file:///${RNFS.DocumentDirectoryPath}/${fileName}`;

        try {
            await RNFS.copyFile(image, Path);

            const result = await insertAddress(title, Path, address, latitude, longitude);
            dispatch({
                type: ADD_PLACE,
                payload: {
                    id: result.insertId,
                    title,
                    image: Path,
                    address,
                    latitude,
                    longitude
                }
            });
            
            console.warn('add', result);
        } catch (e) {
            console.log(e);
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const places = await fetchAddress();
            dispatch({
                type: LOAD_PLACE,
                payload: places
            })
        }
        catch (e) {
            console.warn(e);
        }
    }
}