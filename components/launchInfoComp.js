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
        console.log(store.favorites)
        store.addFavorite(this.props);
        this.setState({
            clicked: "Favorited",
            isAdded: true
        })
    }

    render() {
        return (
            <Content key={this.props.id} id={this.props.agencyAbbr}>
             <Card  id={this.props.countryCode} style={{ width: 300}}>
                <CardItem id={this.props.launchID} cardBody style={{ flexDirection: 'column'}}>
                        <Image source={{uri: this.props.rocketImage}} style={{ height: 100, width: 200, flex: 1}} alt="Rocket" />
                </CardItem>
                <CardItem style={{ flexDirection: 'column'}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left' }}>{this.props.rocketName}</Text>
                </CardItem>
                <CardItem style={{flexWrap: 'wrap'}}>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>Launch:</Text>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>{this.props.launchName}</Text>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>Launched: {this.props.launchStartTime}</Text>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>Location: {this.props.launchLocation}</Text>
                        <Text style={{ alignContent: 'center', fontSize: 10 }}>Agencies: {this.props.agencyNames}</Text>
                </CardItem>
                        <CardItem footer style={{ justifyContent: 'center'}}>
                        <Button
                            style={{ width: 100, alignItems: 'center'}} 
                            onPress={this.addNewFavorite.bind(this)}>
                            <Text>{this.state.clicked}</Text>
                        </Button>
                        </CardItem>
             </Card>
            </Content>
        )
    }
}

export default LaunchInfo