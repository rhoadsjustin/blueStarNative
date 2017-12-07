import React from 'react'
import Search from '../layouts/search'
import Favorites from '../layouts/favorites'
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14


const RootTabs = TabNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Search',
            
        },
    },
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            tabBarLabel: 'Favorites',
           
        },
    },
});

export default RootTabs;

