// // @ts-ignore
// import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
// import MainScreen from '../screens/main/MainScreen';
// import SideBar from '../screens/main/components/sideBar/SideBar';
// import ShopPage from '../screens/main/components/shopPage/ShopPage';
// import PaymentPage from '../screens/main/components/shopPage/paymentPage/PaymentPage';
// import MapPage from '../screens/main/components/shopPage/paymentPage/MapPage';
// import BasketPage from '../screens/main/components/shopPage/basketPage/BasketPage';
// import {CloudPayment} from '../screens/main/components/shopPage/paymentPage/CloudPayment';
// import MyData from '../screens/main/components/sideBar/MyData';
// import AssemblyPage from "../screens/main/components/shopPage/paymentPage/AssemblyPage";
// import FinishOfferPage from "../screens/main/components/shopPage/paymentPage/FinishOfferPage";
// import FinishPaymentPage from "../screens/main/components/shopPage/paymentPage/FinishPaymentPage";
// import PurchaseHistory from "../screens/main/components/sideBar/PurchaseHistory";
//
// export default createStackNavigator(
//     {
//         MainScreen: {
//             screen: MainScreen,
//             navigationOptions: {
//                 headerTitle: 'Главная',
//             },
//         },
//         SideBar: {
//             screen: SideBar,
//             navigationOptions: {
//                 headerTitle: 'Сайдбар',
//             },
//         },
//         MyData: {
//             screen: MyData,
//             navigationOptions: {
//                 headerTitle: 'Мои данные',
//             },
//         },
//         ShopPage: {
//             screen: ShopPage,
//             navigationOptions: {
//                 headerTitle: 'Магазин',
//             },
//         },
//         BasketPage: {
//             screen: BasketPage,
//             navigationOptions: {
//                 headerTitle: 'Корзина',
//             },
//         },
//         PurchaseHistory: {
//             screen: PurchaseHistory,
//             navigationOptions: {
//                 headerTitle: 'История заказов',
//             },
//         },
//         PaymentPage: {
//             screen: PaymentPage,
//             navigationOptions: {
//                 headerTitle: 'Оплата',
//             },
//         },
//         AssemblyPage: {
//             screen: AssemblyPage,
//             navigationOptions: {
//                 headerTitle: 'Заказ собирается',
//             },
//         },
//         FinishOfferPage: {
//             screen: FinishOfferPage,
//             navigationOptions: {
//                 headerTitle: 'Заказ собирается',
//             },
//         },
//         FinishPaymentPage: {
//             screen: FinishPaymentPage,
//             navigationOptions: {
//                 headerTitle: 'Оплата заказа',
//             },
//         },
//         MapPage: {
//             screen: MapPage,
//             navigationOptions: {
//                 headerTitle: 'Карта',
//             },
//         },
//         CloudPayment: {
//             screen: CloudPayment,
//             navigationOptions: {
//                 headerTitle: 'CloudPayment заставка',
//             },
//         },
//     },
//     {
//         initialRouteName: 'MainScreen',
//         defaultNavigationOptions: {
//             header: () => null,
//             ...TransitionPresets.ModalSlideFromBottomIOS,
//             cardStyle: {
//                 backgroundColor: '#fff',
//             },
//         },
//     },
// );
