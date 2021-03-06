import React, { Component } from 'react';
import { observer } from 'mobx-react'
import store from '../../mobx/store'
import { View, Text, TextInput, FlatList, Image, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import LaunchInfoComp from '../../components/launchInfoComp'
import background from '../../assets/rocket.gif'
@observer

export default class Favorites extends Component {
    
    render() {
        console.log(store.favorites)
        const FavoriteView = observer(({ favorite }) => (
            <LaunchInfoComp
                key={favorite.id}
                launchName={favorite.name}
                launchStartTime={favorite.launchStartTime}
                agencyName={favorite.agencyNames}
                agencyAbbrev={favorite.agencyAbbrev}
                rocketName={favorite.rocketName}
                launchLocation={favorite.launchLocation}
                countryCode={favorite.countryCode}
                rocketImage={favorite.rocketImage}
                addFavorite={false}>
            </LaunchInfoComp>

        ));
        return (
            <ImageBackground source={background} style={{width: null, height: '100%', marginRight: 15}}>
           <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', marginTop: 25 }}>
                    <Text style={{ fontSize: 30 }}>Favorites</Text>
                        <Container>
                            {store.favorites.map(favorite => (
                                <FavoriteView favorite={favorite} key={favorite.id} />
                            ))}
                        </Container>
                </View>
                </ImageBackground>
            
        )
    }

}