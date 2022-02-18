import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList  } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PlaceItem from '../components/PlaceItem/index'
import * as addressAction from '../store/places.actions'

const PlaceListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const places = useSelector(state => state.places.places)
    console.warn(places)

    useEffect(() => {
        dispatch(addressAction.loadPlaces())
    }, [])

    const onSelectDetail = () => {
        navigation.navigate('Detalle')
    }

    const renderItem = ({ item }) => (
        <PlaceItem 
            title={item.title}
            image={item.image}
            address={item.address}
            onSelect={onSelectDetail}
        />
    )

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    )
}

export default PlaceListScreen
