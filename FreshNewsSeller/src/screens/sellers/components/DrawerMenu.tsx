import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View} from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerMenu() {
    return (
        <Drawer.Navigator>
            <View
                style={{
                    backgroundColor: 'red'
                }}
            >

            </View>
        </Drawer.Navigator>
    );
}
