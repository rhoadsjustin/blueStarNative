import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../mobx/store'
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

@observer
class LaunchInfo extends Component {
    constructor() {
        super()
        this.state = {
            clicked: "Add to Favorites",
            isAdded: 'false'
        }
    }
    addNewFavorite() {
        //function to add new Favorite to the store
        store.addFavorite(this.props);
        this.setState({
            clicked: "Favorited",
            isAdded: true
        })
    }

    render() {
        console.log(this.props)
        return (
            <Container>
            <Content>
            <Card  id={this.props.countryCode}>
                <CardItem id={this.props.launchID}>
                    <CardItem cardBody>
                        <Image source={{uri: this.props.rocketImage}} alt="Rocket" />
                        <Text>{this.props.rocketName}</Text>
                        <Text>Launch Name:{this.props.launchName}</Text>
                        <Text>Launch Start:{this.props.launchStartTime}</Text>
                        <Text>Launch Location:{this.props.launchLocation}</Text>
                        <Text>Agencies: {this.props.agencyInfoNames} </Text>
                        <Button onClick={this.props.isFavorited ? this.removeFromFavorites.bind(this) : this.addNewFavorite.bind(this)}>
                            <Text>{this.props.isFavorited ? "Remove Favorite" : this.state.clicked}</Text>
                        </Button>
                    </CardItem>
                </CardItem>
            </Card>
            </Content>
            </Container>

        )
    }
}

export default LaunchInfo