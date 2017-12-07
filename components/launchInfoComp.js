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
    removeFromFavorites() {
        store.removeFavorite(this.props);
        this.setState({
            clicked: 'Add To Favorites',
            isAdded: 'false'
        })
    }

    render() {
        console.log(this.props.agencyInfo)
        const agencyInfoNames = this.props.agencyInfo.map((agency) =>{
            return agency.name
        })
        const agencyAbbrev = this.props.agencyInfo.map((agency) =>{
            return agency.abbrev
        })
        return (
            <Content id={agencyAbbrev}>
             <Card  key id={this.props.countryCode} style={{ width: 300}}>
                <CardItem id={this.props.launchID} cardBody style={{ flexDirection: 'column'}}>
                        <Image source={{uri: this.props.rocketImage}} style={{ height: 100, width: 200, flex: 1}} alt="Rocket" />
                </CardItem>
                <CardItem style={{ flexDirection: 'column'}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left' }}>{this.props.rocketName}</Text>
                </CardItem>
                <CardItem style={{flexWrap: 'wrap', alignItems: 'center'}}>
                        <Text style={{  fontSize: 10 }}>Launch:</Text>
                        <Text style={{ fontSize: 10 }}>{this.props.launchName}</Text>
                        <Text style={{  fontSize: 10 }}>Launched: {this.props.launchStartTime}</Text>
                        <Text style={{ fontSize: 10 }}>Location: {this.props.launchLocation}</Text>
                        <Text style={{ fontSize: 10 }}>Agencies: {agencyInfoNames}</Text>
                </CardItem>
                        <CardItem footer style={{ justifyContent: 'center'}}>
                        <Button
                            style={{ width: 110, alignItems: 'center'}} 
                            onPress={this.props.addFavorite ? this.addNewFavorite.bind(this) : this.removeFromFavorites.bind(this)}>
                            <Text>{this.props.addFavorite ? this.state.clicked : 'Remove'}</Text>
                        </Button>
                        </CardItem>
             </Card>
            </Content>
        )
    }
}

export default LaunchInfo