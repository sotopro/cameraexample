import RNFS from 'react-native-fs'

export const ADD_PLACE = 'ADD_PLACE'


export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const Path = `file:///${RNFS.DocumentDirectoryPath}/${fileName}`;

        try {

            await RNFS.copyFile(image, Path)
            dispatch({
                type: ADD_PLACE,
                payload: {
                    title,
                    image: Path
                }
            })
        } catch (e) {
            console.warn('catch fileName')
            console.log(e)
        }
    }
}