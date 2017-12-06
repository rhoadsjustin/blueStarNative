import React, { Component } from 'react';
import LaunchInfoComp from '../../components/launchInfoComp'
import { observer } from 'mobx-react'
import { View, Text, TextInput, FlatList, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

@observer
class Search extends Component {
    constructor() {
        super()
        this.state = {
            startDate: '',
            endDate: '',
            launchArray: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.getLaunchSchedule = this.getLaunchSchedule.bind(this);
        // this.handleAgencyFilter = this.handleAgencyFilter.bind(this);
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
        console.log(this.state);
        fetchUrl = fetchUrl + this.state.startDate + '/' + this.state.endDate
        console.log(fetchUrl)
        return fetch(fetchUrl, {
            method: 'GET'
        })
            .then((resp) => {
                var data = resp.json();
                return data;

            }) // Transform the data into json
            .then((data) => {
                // taking the launch data array to manipulate
                console.log(data)
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
        console.log(FilteredList, this.state.launchArray)
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
        //launch info
        // const LaunchInfoNodes = this.state.launchArray.map((launch) => {
        //     //list of agencies
        //     const agencyNodes = launch.rocket.agencies.map((agency) => {
        //         var agencyNames = agency.name
        //         return agencyNames
        //     })
        //     const agencyAbbrv = launch.rocket.agencies.map((agency) => {
        //         return agency.abbrev
        //     })
        //     return (
        //         <LaunchInfoComp
        //             //unique id for iterator
        //             key={launch.id}
        //             launchName={launch.name}
        //             launchStartTime={launch.windowstart}
        //             agencyInfoNames={agencyNodes}
        //             agencyAbbr={agencyAbbrv}
        //             rocketName={launch.rocket.name}
        //             launchLocation={launch.location.name}
        //             countryCode={launch.location.countryCode}
        //             rocketImage={launch.rocket.imageURL}>
        //         </LaunchInfoComp>
        //     )
        // });

        return (
            // <div>
            //     <div>
            //         <div className="col-md-8 offset-md-2" id="searchInput">
            //             <input type="text" id="startDate" value={this.state.startDate} onChange={this.handleChange} placeholder="Start Date eg.2015-08-20 " />
            //             <input type="text" id="endDate" value={this.state.endDate} onChange={this.handleChange} placeholder="End Date eg.2015-08-28" />
            //             <button
            //                 onClick={this.getLaunchSchedule}>
            //                 Search
            //             </button>
            //         </div>
            //     </div>
            //     <div>
            //         <div className="center-align">
            //             <button onClick={this.sortByCountry.bind(this)}>Sort By Country</button>
            //             <button onClick={this.sortByAgency.bind(this)}>Sort By Agency</button>
            //         </div>
            //         {LaunchInfoNodes}
            //     </div>
            // </div>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', marginTop: 25}}>
                <Text style={{fontSize: 30 }}>Search Screen</Text>
                <TextInput
                    id="startDate"
                    style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Start Date e.g. 2017-10-10"
                    onChangeText={(startDate) => this.setState({ startDate})}
                    value={this.state.startDate}
                />
                <TextInput
                    id="endDate"
                    style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="End Date e.g. 2017-10-10"
                    onChangeText={(endDate) => this.setState({ endDate })}
                    value={this.state.endDate}
                />
                <Button
                    large
                    primary
                    onPress={this.getLaunchSchedule}
                    style={{flex: 0, justifyContent: 'center', marginLeft: 125, width: 150, height: 40}}>
                        <Text>Search</Text>
                </Button>
                <Container>
                <FlatList
                    data={this.state.launchArray}
                    renderItem={({ item }) => 
                                // <LaunchInfoComp   
                                //         key={item.id}
                                //         launchName={item.name}
                                //         launchStartTime={item.windowstart}
                                //      /* agencyInfoNames={item}
                                //         agencyAbbr={agencyAbbrv} */
                                //         rocketName={item.rocket.name}
                                //         launchLocation={item.location.name}
                                //         countryCode={item.location.countryCode}
                                //         rocketImage={item.location.countryCode}>
                                //         </LaunchInfoComp>
                            <Content key={item.id}>
                                <Card id={item.location.countryCode}>
                                    <CardItem >
                                        <CardItem cardBody style={{ flexDirection: 'column'}}>
                                            <Image source={{ uri: item.location.countryCode }} alt="Rocket" />
                                            <Text>{item.rocket.name}</Text>
                                            <Text>Launch Name:{item.name}</Text>
                                            <Text>Launch Start:{item.windowstart}</Text>
                                            <Text>Launch Location:{item.location.name}</Text>
                                            <Text>Agencies: {this.props.agencyInfoNames} </Text>
                                            {/* <Button onClick={this.props.isFavorited ? this.removeFromFavorites.bind(this) : this.addNewFavorite.bind(this)}>
                                                <Text>{this.props.isFavorited ? "Remove Favorite" : this.state.clicked}</Text>
                                            </Button> */}
                                        </CardItem>
                                    </CardItem>
                                </Card>
                            </Content>
                        }
                /> 
                </Container>
            </View>
        )
    }
}

export default Search
