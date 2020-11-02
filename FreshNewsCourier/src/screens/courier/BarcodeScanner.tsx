import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {WINDOW_WIDTH} from "../../share/consts";
import {MontserratBold} from "../../share/fonts";

export default function BarcodeScanner({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        navigation.state.params.handleScanner(navigation.state.params.id, data);
        navigation.goBack(null);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: "flex-end",
            }}
        >
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {
                scanned &&
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    style={{
                        borderWidth: 3,
                        borderColor: '#1b7fcd',
                        borderStyle: "solid",
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        width: WINDOW_WIDTH - 150,
                        backgroundColor: '#8CC83F',
                        height: 80,
                        borderRadius: 50
                    }}
                >
                    <Text style={{fontSize: 18, color: '#fff', fontFamily: MontserratBold}}>Сканироват</Text>
                </TouchableOpacity>
            }
        </View>
    );
}
