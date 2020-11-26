import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, RefreshControl, BackHandler} from "react-native";
import {WINDOW_WIDTH} from "../../share/consts";
import {observer} from "mobx-react";
import DeliveryOrders from "./DeliveryOrders";
import CollectedOrders from "./CollectedOrders";
import ShopAssortment from "./ShopAssortment";
import AllCollectedOrders from "./AllCollectedOrders";
import {MontserratRegular} from "../../share/fonts";
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import sellerStore from '../../stores/SellerStore';
import authStore from '../../stores/UserInfo';
import {toJS} from "mobx";
// @ts-ignore
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import {EditModal} from "./modals/EditModal";
import {InfoModal} from "./modals/InfoModal";
import {AddModal} from "./modals/AddModal";
import {ErrorModal} from "./modals/ErrorModal";

@observer
export default // @ts-ignore
class HomeSellerPage extends Component<any, any> {

    state = {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        refreshing: false,
        orders: null,
        products: null,
        startOrder: [],
        buildOrder: [],
        finishOrder: [],
        editModal: false,
        editData: [],
        infoModal: false,
        infoData: [],
        addModal: false,
        addData: [],
        errorModal: false,
        errorData: [],
    };

    async componentDidMount() {
        sellerStore.getUserData();
        authStore.getUserInfo();
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            this.setState({
                orders: toJS(sellerStore.sellerData.orders),
                products: toJS(sellerStore.sellerData.products),
            }, () => {
                console.log('sellerStore.errorData', sellerStore.errorData);
                if (sellerStore.errorData !== null) {
                    console.log('----------')
                    console.log('sellerStore.errorData', toJS(sellerStore.errorData))
                    this.setState({
                        errorData: toJS(sellerStore.errorData),
                        errorModal: true
                    })
                } else if (authStore.errorData !== null) {
                    console.log('authStore.errorData ', authStore.errorData);
                    let error = toJS(String(authStore.errorData));
                    let errorCode = error.substr(error.length - 3);
                    console.log('errorCode', errorCode);
                    let errorData = {
                        status_code: errorCode,
                        message: 'Network Error',
                    };
                    this.setState({
                        errorData: errorData,
                        errorModal: true
                    })
                }
                // @ts-ignore
                this.state.orders && this.state.orders.map((item: any) => {
                    if (item.status === 1) {
                        // @ts-ignore
                        this.state.startOrder.push(item);
                        // console.log('startOrder', this.state.startOrder)
                    } else if (item.status === 3 || item.status === 4 || item.status === 5) {
                        // @ts-ignore
                        this.state.buildOrder.push(item);
                        // console.log('buildOrder', this.state.buildOrder)
                    } else if (item.status === 6) {
                        // @ts-ignore
                        this.state.finishOrder.push(item);
                        // console.log('finishOrder', this.state.finishOrder)
                    }
                })
            })
            this.setState({
                refreshing: false
            })
        }, 2000);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    };

    handleShow1() {
        this.setState({
            show1: !this.state.show1
        })
    };

    handleShow2() {
        this.setState({
            show2: !this.state.show2
        })
    };

    handleShow3() {
        this.setState({
            show3: !this.state.show3
        })
    };

    handleShow4() {
        this.setState({
            show4: !this.state.show4
        })
    };

    onRefresh() {
        sellerStore.getUserData();
        authStore.getUserInfo();
        this.setState({
            refreshing: true,
            orders: null,
            products: null,
            startOrder: [],
            buildOrder: [],
            finishOrder: []
        })
        setTimeout(() => {
            this.setState({
                orders: toJS(sellerStore.sellerData.orders),
                products: toJS(sellerStore.sellerData.products),
            }, () => {
                // @ts-ignore
                this.state.orders && this.state.orders.map((item: any) => {
                    if (item.status === 1) {
                        // @ts-ignore
                        this.state.startOrder.push(item);
                        // console.log('startOrder', this.state.startOrder)
                    } else if (item.status === 3 || item.status === 4 || item.status === 5) {
                        // @ts-ignore
                        this.state.buildOrder.push(item);
                        // console.log('buildOrder', this.state.buildOrder)
                    } else if (item.status === 6) {
                        // @ts-ignore
                        this.state.finishOrder.push(item);
                        // console.log('finishOrder', this.state.finishOrder)
                    }
                })
            })
            this.setState({
                refreshing: false
            })
        }, 2000);
    };

    handleOpenEditModal = async (id: any) => {
        sellerStore.getDataInfo(id);
        setTimeout(() => {
            this.setState({
                editModal: true,
                editData: toJS(sellerStore.dataInfo.product),
                infoData: toJS(sellerStore.dataInfo.product)
            })
        }, 1000);
    };

    handleCloseEditModal = async () => {
        await this.setState({
            editModal: false,
        })
    };

    handleOpenAddModal = async () => {
        await this.setState({
            addModal: true,
        })
    };

    handleCloseAddModal = async () => {
        await this.setState({
            addModal: false,
        })
    };

    handleOpenInfoModal = async (id: any) => {
        console.log('id', id);
        sellerStore.getDataInfo(id);
        setTimeout(() => {
            this.setState({
                infoModal: true,
                infoData: toJS(sellerStore.dataInfo.product),
                editData: toJS(sellerStore.dataInfo.product)
            })
        }, 1000)

    };

    handleCloseInfoModal = async () => {
        await this.setState({
            infoModal: false,
        })
    };

    handleChangeInfoModalToEditModal = async () => {
        this.setState({
            infoModal: !this.state.infoModal,
            editModal: !this.state.editModal,
        })
    };

    handleCloseErrorModal = async () => {
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    };

    onBackPress = () => {
        this.props.navigation.navigate('HomeSellerPage')
        return true;
    };

    handleSaveAddItem = (name: any, category_id: any, weight: any, type: any, price: any, description: any, image: any) => {
        sellerStore.getAddItem(name, 1, weight, 'piece', price, description, image);
        setTimeout(() => {
            this.handleCloseAddModal();
            if (sellerStore.errorData !== null) {
                console.log('----------')
                console.log('sellerStore.errorData', toJS(sellerStore.errorData))
                this.setState({
                    errorData: toJS(sellerStore.errorData),
                    errorModal: true
                })
            }
        }, 3000)
    };

    handleSaveEditItem = (id: any, name: any, category_id: any, weight: any, type: any, price: any, description: any, image: any) => {
        sellerStore.getEditItem(id, name, category_id, weight, type, price, description, image);
        setTimeout(() => {
            this.handleCloseEditModal();
            if (sellerStore.errorData !== null) {
                console.log('----------')
                console.log('sellerStore.errorData', toJS(sellerStore.errorData))
                this.setState({
                    errorData: toJS(sellerStore.errorData),
                    errorModal: true
                })
            }
        }, 3000)
    };

    render() {

        const {show1, show2, show3, show4, refreshing} = this.state;

        return (
            <>
                {
                    refreshing
                        ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }}
                            >
                                <PulseIndicator
                                    size={100}
                                    color='#8CC83F'
                                />
                            </View>
                        )
                        : (
                            <>
                                <Modal
                                    visible={this.state.editModal}
                                    useNativeDriver={true}
                                    footer={
                                        <ModalFooter
                                            style={{
                                                backgroundColor: 'red',
                                            }}
                                        >
                                            <ModalButton
                                                text="Закрить"
                                                textStyle={{
                                                    color: '#fff'
                                                }}
                                                onPress={() => {
                                                    this.setState({editModal: false})
                                                }}
                                            />
                                        </ModalFooter>
                                    }
                                    onTouchOutside={() => {
                                        this.setState({editModal: false});
                                    }}
                                >
                                    <ModalContent>
                                        <EditModal
                                            data={this.state.editData}
                                            handleCloseEditModal={this.handleCloseEditModal}
                                            handleSaveEditItem={this.handleSaveEditItem}
                                        />
                                    </ModalContent>
                                </Modal>
                                <Modal
                                    visible={this.state.infoModal}
                                    useNativeDriver={true}
                                    footer={
                                        <ModalFooter
                                            style={{
                                                backgroundColor: 'red'
                                            }}
                                        >
                                            <ModalButton
                                                text="Закрить"
                                                textStyle={{
                                                    color: '#fff'
                                                }}
                                                onPress={() => {
                                                    this.setState({infoModal: false})
                                                }}
                                            />
                                        </ModalFooter>
                                    }
                                    onTouchOutside={() => {
                                        this.setState({infoModal: false});
                                    }}
                                >
                                    <ModalContent>
                                        <InfoModal
                                            data={this.state.infoData}
                                            handleCloseInfoModal={this.handleCloseInfoModal}
                                            handleChangeInfoModalToEditModal={this.handleChangeInfoModalToEditModal}
                                        />
                                    </ModalContent>
                                </Modal>
                                <Modal
                                    visible={this.state.addModal}
                                    useNativeDriver={true}
                                    footer={
                                        <ModalFooter
                                            style={{
                                                backgroundColor: 'red'
                                            }}
                                        >
                                            <ModalButton
                                                text="Закрить"
                                                textStyle={{
                                                    color: '#fff'
                                                }}
                                                onPress={() => {
                                                    this.setState({addModal: false})
                                                }}
                                            />
                                        </ModalFooter>
                                    }
                                    onTouchOutside={() => {
                                        this.setState({addModal: false});
                                    }}
                                >
                                    <ModalContent>
                                        <AddModal
                                            handleCloseAddModal={this.handleCloseAddModal}
                                            handleSaveAddItem={this.handleSaveAddItem}
                                        />
                                    </ModalContent>
                                </Modal>
                                <Modal
                                    visible={this.state.errorModal}
                                    useNativeDriver={true}
                                    footer={
                                        <ModalFooter
                                            style={{
                                                backgroundColor: 'red'
                                            }}
                                        >
                                            <ModalButton
                                                text="Закрить"
                                                textStyle={{
                                                    color: '#fff'
                                                }}
                                                onPress={() => this.handleCloseErrorModal()}
                                            />
                                        </ModalFooter>
                                    }
                                    onTouchOutside={() => {
                                        this.setState({errorModal: false});
                                    }}
                                >
                                    <ModalContent>
                                        <ErrorModal
                                            data={this.state.errorData}
                                            // handleOpenErrorModal={this.handleOpenErrorModal}
                                            handleCloseErrorModal={this.handleCloseErrorModal}
                                        />
                                    </ModalContent>
                                </Modal>
                                <ScrollView
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#fff',
                                    }}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                >
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => this.handleShow1()}
                                            style={{
                                                width: WINDOW_WIDTH,
                                                height: 48,
                                                justifyContent: 'center',
                                                alignItems: "center",
                                                backgroundColor: '#f5f4f4'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: WINDOW_WIDTH - 40,
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {
                                                    show1
                                                        ? (
                                                            <View
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    backgroundColor: '#8cc83f',
                                                                    marginRight: 15,
                                                                    borderRadius: 4
                                                                }}
                                                            />
                                                        )
                                                        : (
                                                            <View
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    backgroundColor: '#d96363',
                                                                    marginRight: 15,
                                                                    borderRadius: 4
                                                                }}
                                                            />
                                                        )
                                                }

                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: '400',
                                                        fontFamily: MontserratRegular,
                                                        color: '#000'
                                                    }}
                                                >
                                                    Заказы на сброку
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            show1
                                                ? <DeliveryOrders
                                                    startOrder={this.state.startOrder}
                                                    navigation={this.props.navigation}
                                                />
                                                : null
                                        }
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => this.handleShow2()}
                                            style={{
                                                width: WINDOW_WIDTH,
                                                height: 48,
                                                justifyContent: 'center',
                                                alignItems: "center",
                                                backgroundColor: '#f5f4f4'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: WINDOW_WIDTH - 40,
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {
                                                    show2
                                                        ? (
                                                            <View
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    backgroundColor: '#8cc83f',
                                                                    marginRight: 15,
                                                                    borderRadius: 4
                                                                }}
                                                            />
                                                        )
                                                        : (
                                                            <View
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    backgroundColor: '#d96363',
                                                                    marginRight: 15,
                                                                    borderRadius: 4
                                                                }}
                                                            />
                                                        )
                                                }
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: '400',
                                                        fontFamily: MontserratRegular,
                                                        color: '#000'
                                                    }}
                                                >
                                                    Собранные заказы
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            show2
                                                ? <CollectedOrders
                                                    buildOrder={this.state.buildOrder}
                                                    navigation={this.props.navigation}
                                                />
                                                : null
                                        }

                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => this.handleShow3()}
                                            style={{
                                                width: WINDOW_WIDTH,
                                                height: 48,
                                                justifyContent: 'center',
                                                alignItems: "center",
                                                backgroundColor: '#f5f4f4'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: WINDOW_WIDTH - 40,
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {
                                                    show3
                                                        ? (
                                                            <View
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    backgroundColor: '#8cc83f',
                                                                    marginRight: 15,
                                                                    borderRadius: 4
                                                                }}
                                                            />
                                                        )
                                                        : (
                                                            <View
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    backgroundColor: '#d96363',
                                                                    marginRight: 15,
                                                                    borderRadius: 4
                                                                }}
                                                            />
                                                        )
                                                }
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: '400',
                                                        fontFamily: MontserratRegular,
                                                        color: '#000'
                                                    }}
                                                >
                                                    Ассортимент магазина
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            show3
                                                ? <ShopAssortment
                                                    products={this.state.products}
                                                    navigation={this.props.navigation}
                                                    handleOpenEditModal={this.handleOpenEditModal}
                                                    handleOpenInfoModal={this.handleOpenInfoModal}
                                                    handleOpenAddModal={this.handleOpenAddModal}
                                                />
                                                : null
                                        }

                                    </View>
                                    <View
                                        style={
                                            show4
                                                ? {
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginBottom: 45
                                                }
                                                : {
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginBottom: 5
                                                }
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={() => this.handleShow4()}
                                            style={{
                                                width: WINDOW_WIDTH,
                                                height: 48,
                                                justifyContent: 'center',
                                                alignItems: "center",
                                                backgroundColor: '#f5f4f4'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: WINDOW_WIDTH - 40,
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {
                                                    show4
                                                        ? (
                                                            <View
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    backgroundColor: '#8cc83f',
                                                                    marginRight: 15,
                                                                    borderRadius: 4
                                                                }}
                                                            />
                                                        )
                                                        : (
                                                            <View
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    backgroundColor: '#d96363',
                                                                    marginRight: 15,
                                                                    borderRadius: 4
                                                                }}
                                                            />
                                                        )
                                                }
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: '400',
                                                        fontFamily: MontserratRegular,
                                                        color: '#000'
                                                    }}
                                                >
                                                    Все собранные заказы
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            show4
                                                ? <AllCollectedOrders
                                                    finishOrders={this.state.finishOrder}
                                                    navigation={this.props.navigation}
                                                />
                                                : null
                                        }
                                    </View>
                                </ScrollView>
                            </>
                        )
                }
            </>
        )
    };
}
