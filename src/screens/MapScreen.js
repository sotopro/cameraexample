import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { COLORS } from '../constants/index'
import { useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';


const MapScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                console.warn(position);
                const { latitude, longitude} = position.coords;
                const location = {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
                setInitialRegion(location);
            },
            error => {
                console.warn(error);
                Alert.alert(
                    'Could not fetch location',
                    'Please enable location services and try again',
                    [{ text: 'Okay' }]
                )
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                forceRequestLocation: true,
                showLocationDialog: true,
            }
        )
    }, [])

    const handleSelectLocation = event => {
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        })
    }

    const handleSaveLocation = () => {
        if(selectedLocation) {
            navigation.navigate('Nuevo', {
                mapLocation: selectedLocation,
            })
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleSaveLocation}>
                    <Text style={styles.buttonText}>
                        Guardar
                    </Text>
                </TouchableOpacity>
            ),
        })
    }, [ navigation, handleSaveLocation ])

    return (
        <>
        {initialRegion ? (
            <MapView
                style={styles.container}
                region={initialRegion}
                onPress={handleSelectLocation}
            >
            {selectedLocation && (
                <Marker
                    title='Ubicación seleccionada'
                    coordinate={selectedLocation}
                />
            )}
        </MapView>) : <Text style={styles.loading}>Cargando</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        backgroundColor: COLORS.WHITE,
        fontSize: 16,
        color: COLORS.BLACK,
        padding: 4,
        borderRadius: 4,
    },
    loading: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: 'bold',
    }
})

export default MapScreen
