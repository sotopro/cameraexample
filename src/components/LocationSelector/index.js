import React , {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Alert, Button } from 'react-native'
import { COLORS } from '../../constants';
import Geolocation from '@react-native-community/geolocation';
import MapPreview from '../MapPreview/index';
import { useRoute } from '@react-navigation/native';

const LocationSelector = ({ onLocation, onMapLocation }) => {
    const [pickedLocation, setPickedLocation] = useState('');
    const route = useRoute();
    const mapLocation = route?.params?.mapLocation;

    useEffect(() => {
        if(mapLocation) {
            setPickedLocation(mapLocation);
            onLocation(mapLocation);
        }
    }, [mapLocation])

    const handleGetLocation = () => {
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
                setPickedLocation(location)
                onLocation(location);
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
    }

    const handlePickOnMap = () => {
        onMapLocation();
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.preview}>
                {pickedLocation ? 
                    <Text>{pickedLocation.latitude}, {pickedLocation.longitude}</Text> :
                    <Text>No hay una ubicación seleccionada</Text>
                    
                }
            </View> */}
            <MapPreview
                location={pickedLocation}
                style={styles.preview}
            >
                <Text>No hay una ubicación seleccionada</Text>
            </MapPreview>
            <View style={styles.action}>
                <Button
                    title="Seleccionar ubicación"
                    color={COLORS.PEACH_PUFF}
                    onPress={handleGetLocation}
                />
                <Button
                    title="Elegir del mapa"
                    color={COLORS.LIGTH_PINK}
                    onPress={handlePickOnMap}
                />
            </View>
            
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
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default LocationSelector;