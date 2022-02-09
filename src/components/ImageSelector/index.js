import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { COLORS } from '../../constants';

const ImageSelector = (props) => {
    const [pickedUri, setPickedUri] = useState();

    const verifyPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'CAMERA EXAMPLE APP Camera Permission',
                    message: 'CAMERA EXAMPLE APP needs access to your camera',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                });
            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const handleTakeImage = async () => {
        const isCameraOk = await verifyPermission();
        if(!isCameraOk) return;

        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
       ImagePicker.launchCamera(options, (response) => {
           setPickedUri(response.assets[0].uri)
       })

        
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {!pickedUri ? (<Text>No hay una imagen seleccionada</Text>) : (
                    <Image style={styles.image} source={{ uri: pickedUri }} />
                )}
            </View>
            <Button title="tomar foto" color={COLORS.MAROON} onPress={handleTakeImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImageSelector;