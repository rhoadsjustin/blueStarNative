import React, { Component } from 'react';
import { observer } from 'mobx-react'
import store from '../../mobx/store'
import { View, Text, TextInput, FlatList, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

@observer

export default class Favorites extends Component {
    removeFromFavorites(favorite) {
        console.log(favorite)
        store.removeFavorite(favorite);
    }
    render() {
        console.log(store.favorites)
        const FavoriteView = observer(({ favorite }) => (
            <Content key>
                <Card id={favorite.countryCode} style={{ width: 300 }}>
                    <CardItem id={favorite.launchID} cardBody style={{ flexDirection: 'column' }}>
                        <Image source={{ uri: favorite.rocketImage }} style={{ height: 100, width: 100, flex: 1 }} alt="Rocket" />
                    </CardItem>
                    <CardItem style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left' }}>{favorite.rocketName}</Text>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>Launch:</Text>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>{favorite.launchName}</Text>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>Launched:{favorite.launchStartTime}</Text>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>Location:{favorite.launchLocation}</Text>
                    </CardItem>
                    <CardItem footer>
                        <Button onPress={this.removeFromFavorites.bind(this, favorite)}>
                            <Text>Remove Favorite</Text>
                        </Button>
                    </CardItem>
                </Card>
            </Content>

        ));
        return (
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', marginTop: 25 }}>
                    <Text style={{ fontSize: 30 }}>Favorites</Text>
                        <Container>
                            {store.favorites.map(favorite => (
                                <FavoriteView favorite={favorite} key={favorite.id} />
                            ))}
                        </Container>
                </View>
            
        )
    }

}