import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Platform,
    Button
} from "react-native";
import {size34, WINDOW_HEIGHT, WINDOW_WIDTH} from "../../../share/consts";
import Feather from "react-native-vector-icons/Feather";
import {MontserratRegular} from "../../../share/fonts";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';

export const AddModal = ({handleCloseAddModal, handleSaveAddItem}: any) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState(1);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const Name = (value: any) => {
        setName(value);
    };

    const Price = (value: any) => {
        setPrice(value.replace(/[^0-9]/g, ''));
    };

    const Weight = (value: any) => {
        setWeight(value);
    };

    const Description = (value: any) => {
        setDescription(value);
    };

    const Save = () => {
        handleSaveAddItem(name, 1, weight, 'piece', price, description, image)
    };

    return (
        <View
            style={{
                width: WINDOW_WIDTH / 1.2,
                height: WINDOW_HEIGHT / 1.3,
                justifyContent: "flex-start",
                alignItems: "center"
            }}
        >
            <View
                style={{
                    width: '100%',
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: 'row',
                    marginBottom: 20
                }}
            >
                <TouchableOpacity
                    onPress={() => alert('edit')}
                >
                    <Feather
                        name={'edit'}
                        size={size34}
                        color={'rgba(112, 112, 112, 0.4)'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleCloseAddModal()}
                >
                    <Feather
                        name={'x'}
                        size={size34}
                        color={'rgba(112, 112, 112, 0.4)'}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: 10,
                }}
            >
                <View
                    style={{
                        width: '100%',
                    }}
                >
                    {
                        image
                            ? <Image
                                resizeMode={"cover"}
                                source={{uri: image}}
                                style={{
                                    width: WINDOW_WIDTH / 1.2,
                                    height: WINDOW_HEIGHT / 4,
                                    marginBottom: 10,
                                }}
                            />
                            : null
                    }
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            width: WINDOW_WIDTH / 2,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: '#179edb',
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#fff'
                            }}
                        >
                            Изменитъ картину
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        width: WINDOW_WIDTH / 1.22,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            width: WINDOW_WIDTH / 1.22,
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                width: WINDOW_WIDTH / 1.22,
                                justifyContent: "flex-start",
                                marginBottom: 5
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                Имя:
                            </Text>
                        </View>
                        <View
                            style={{
                                width: WINDOW_WIDTH / 1.22,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <TextInput
                                style={{
                                    width: WINDOW_WIDTH / 1.22,
                                    height: 40,
                                    borderColor: 'gray',
                                    borderWidth: 2,
                                    paddingLeft: 10
                                }}
                                onChangeText={text => Name(text)}
                                value={name}
                                placeholder={'Имя товара'}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            width: WINDOW_WIDTH / 1.22,
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                width: WINDOW_WIDTH / 1.22,
                                justifyContent: "flex-start",
                                marginBottom: 5
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                Цена:
                            </Text>
                        </View>
                        <View
                            style={{
                                width: WINDOW_WIDTH / 1.22,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <TextInput
                                style={{
                                    width: WINDOW_WIDTH / 1.22,
                                    height: 40,
                                    borderColor: 'gray',
                                    borderWidth: 2,
                                    paddingLeft: 10
                                }}
                                onChangeText={text => Price(text)}
                                value={String(price)}
                                placeholder={'Цена товара'}
                                keyboardType={"number-pad"}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            width: WINDOW_WIDTH / 1.22,
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                width: WINDOW_WIDTH / 1.22,
                                justifyContent: "flex-start",
                                marginBottom: 5
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                Вес:
                            </Text>
                        </View>
                        <View
                            style={{
                                width: WINDOW_WIDTH / 1.22,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <TextInput
                                style={{
                                    width: WINDOW_WIDTH / 1.22,
                                    height: 40,
                                    borderColor: 'gray',
                                    borderWidth: 2,
                                    paddingLeft: 10,
                                    backgroundColor: 'grey'
                                }}
                                // onChangeText={text => Price(text)}
                                value={"1 кг."}
                                placeholder={'Цена товара'}
                                keyboardType={"number-pad"}
                                editable={false}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            width: WINDOW_WIDTH / 1.22,
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                width: WINDOW_WIDTH / 1.22,
                                justifyContent: "flex-start",
                                marginBottom: 5
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                Описание:
                            </Text>
                        </View>
                        <View
                            style={{
                                width: WINDOW_WIDTH / 1.22,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <TextInput
                                style={{
                                    height: 150,
                                    justifyContent: "flex-start",
                                    borderColor: 'gray',
                                    borderWidth: 2,
                                    width: WINDOW_WIDTH / 1.22,
                                    paddingLeft: 10
                                }}
                                underlineColorAndroid="transparent"
                                placeholder="Описание"
                                placeholderTextColor="grey"
                                numberOfLines={10}
                                multiline={true}
                                onChangeText={text => Description(text)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => Save()}
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: '#8CC83F',
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5
                }}
            >
                <Text
                    style={{
                        fontSize: 15,
                        color: '#fff'
                    }}
                >
                    Сохранитъ
                </Text>
            </TouchableOpacity>
        </View>
    )
}
