import React, { Component } from 'react';
import LaunchInfoComp from '../../components/launchInfoComp'
import { observer } from 'mobx-react'
import { View, Text, TextInput, FlatList, Image, StyleSheet, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import store from '../../mobx/store'
import background from '../../assets/rocket.gif'
@observer
export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            startDate: '',
            endDate: '',
            launchArray: [],
            clicked: "Add to Favorites",
            isAdded: 'false'
        }
        this.handleChange = this.handleChange.bind(this);
        this.getLaunchSchedule = this.getLaunchSchedule.bind(this);
    }
    //handle the input change for search
    handleChange(e) {
        let value = e.target.value;
        this.setState({
            [e.target.id]: value
        })
    }

    getLaunchSchedule() {
        let fetchUrl = 'https://launchlibrary.net/1.2/launch/';
        fetchUrl = fetchUrl + this.state.startDate + '/' + this.state.endDate
        return fetch(fetchUrl, {
            method: 'GET'
        })
            .then((resp) => {
                var data = resp.json();
                return data;

            }) // Transform the data into json
            .then((data) => {
                // taking the launch data array to manipulate
                let launchesList = data.launches
                this.setState({
                    launchArray: launchesList
                })
            })
    }

    sortByAgency() {
        //sort by the agency abbreviation
        let FilteredList = this.state.launchArray.sort((a, b) => {
            if (a.rocket.agencies["0"].abbrev > b.rocket.agencies["0"].abbrev) return -1
            if (a.rocket.agencies["0"].abbrev < b.rocket.agencies["0"].abbrev) return 1
            return 0
        })
        this.setState({
            launchArray: FilteredList
        })
    }
    sortByCountry() {
        //sort by the country code
        let FilteredList = this.state.launchArray.sort((a, b) => {
            if (a.location.countryCode > b.location.countryCode) return -1
            if (a.location.countryCode < b.location.countryCode) return 1
            return 0
        })
        this.setState({
            launchArray: FilteredList
        })
    }

    render() {
        return (
            <ImageBackground source={background} style={{ width: null, height: '100%', marginRight: 15}}>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', marginTop: 25}}>
                <View style={{ flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={{fontSize: 30}}>Search Screen</Text>
                    <Text style={{fontSize: 20}}>Find Your Launch Schedule Info Below</Text>
                </View>
                    <View style={{ flexDirection: 'row'}}>
                    <TextInput
                        id="startDate"
                            style={styles.textInput }
                        placeholder="Start Date e.g. 2017-10-10"
                        onChangeText={(startDate) => this.setState({ startDate})}
                        value={this.state.startDate}
                    />
                    <TextInput
                        id="endDate"
                        style={ styles.textInput }
                        placeholder="End Date e.g. 2017-10-10"
                        onChangeText={(endDate) => this.setState({ endDate })}
                        value={this.state.endDate}
                    />
                    </View>
                    <Button
                        large
                        primary
                        onPress={this.getLaunchSchedule}
                        style={{flex: 0,flexDirection: 'row', justifyContent: 'center',marginTop: 10, alignSelf: 'center', width: 150, height: 40}}>
                            <Text>Search</Text>
                    </Button>
                    <Container>
                        <View style={{flexDirection: 'row'}}>
                        <Button
                            small
                            success
                            onPress={this.sortByAgency.bind(this)}
                            style={styles.sortButton}>
                        <Text style={{ color: 'white', fontSize: 10 }}>Sort By Agency</Text>
                        </Button>
                        <Button
                            small
                            success
                            onPress={this.sortByCountry.bind(this)}
                            style={styles.sortButton }>
                            <Text style={{color: 'white', fontSize: 10}}>Sort By Country</Text>
                        </Button>
                        </View>
                    <FlatList
                        data={this.state.launchArray}
                        extraData={this.state}
                        renderItem={({item})=> 
                            <LaunchInfoComp
                                key={item.id}
                                launchName={item.name}
                                launchStartTime={item.windowstart}
                                agencyInfo={item.rocket.agencies}
                                rocketName={item.rocket.name}
                                launchLocation={item.location.name}
                                countryCode={item.location.countryCode}
                                rocketImage={item.rocket.imageURL}
                                addFavorite={true}>
                            </LaunchInfoComp>

                    }>
                    </FlatList>
                    </Container>
            </View>
                </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 32
    },
    textInput: {
        height: 40, width: 175, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginRight: 5, marginTop: 10
    },
    sortButton: {
        marginTop: 5, marginRight: 10, justifyContent: 'center', width: 100
    }
});

