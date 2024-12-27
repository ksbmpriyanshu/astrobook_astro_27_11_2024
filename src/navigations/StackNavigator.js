import React from 'react';
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import ForgetPassword from '../screens/provider/ForgetPassword';
import ProviderHome from '../screens/home/ProviderHome';
import OrderHistory from '../screens/provider/OrderHistory';
import ProviderChat from '../screens/chat/ProviderChat';
import Logout from '../screens/Logout';
import AstrologerLogin from '../screens/auth/AstrologerLogin';
import GoLive from '../screens/provider/GoLive';
import Live from './Live';
import VerifiedAstrologer from '../screens/provider/VerifiedAstrologer';
import ProviderRemedies from './ProviderRemedies';
import AstrologerWallet from '../screens/provider/AstrologerWallet';
import ProviderFollowing from '../screens/provider/ProviderFollowing';
import ProviderOffer from '../screens/provider/ProviderOffer';
import ProviderProfile from '../screens/provider/ProviderProfile';
import ProviderChatPickup from '../screens/chat/ProviderChatPickup';
import LiveNow from '../screens/provider/LiveNow';
import HostPage from '../screens/provider/HostPage';
import HostLive from '../screens/provider/HostLive';
import AstrologerSignUp from '../screens/auth/AstrologerSignUp';
import Language from '../screens/language/language';
import { useTranslation } from 'react-i18next';
import GiftOrderHistory from '../screens/provider/GiftOrderHistory';
import LivePreview from '../screens/live/LivePreview';
import LiveScreen from '../screens/live/LiveScreen';
import IntakeDetails from '../screens/chat/IntakeDetails';
import CallHistory from '../screens/history/CallHistory';
import LiveChatCall from '../screens/history/LiveChatCall';
import WalletHistroy from '../screens/history/WalletHistroy';
import ChatHistory from '../screens/history/ChatHistory';
import LiveHistory from '../screens/history/LiveHistory';
import ShowKundli from '../screens/kundli/ShowKundli';
import ShowKundliBasic from '../screens/kundli/ShowKundliBasic';
import ShowKundliCharts from '../screens/kundli/ShowKundliCharts';
import ShowKundliPlanets from '../screens/kundli/ShowKundliPlanets';
import ShowKundliKpPlanets from '../screens/kundli/ShowKundliKpPlanets';
import ShowKundliKpHouseCusp from '../screens/kundli/ShowKundliKpHouseCusp';
import ShowDashna from '../screens/kundli/ShowDashna';
import HouseReport from '../screens/kundli/HouseReport';
import KundliBirthDetailes from '../screens/kundli/KundliBirthDetailes';
import AstrologerDetailes from '../screens/provider/AstrologerDetailes';
import AstromallCategory from '../screens/astromall/AstromallCategory';
import PoojaDetails from '../screens/astromall/PoojaDetails';
import RegisterPooja from '../screens/astromall/RegisterPooja';
import RegisteredPooja from '../screens/astromall/RegisteredPooja';
import BookedPoojaDetails from '../screens/astromall/BookedPoojaDetails';
import PoojaUploads from '../screens/astromall/PoojaUploads';
import BasicPanchang from '../screens/kundli/BasicPanchang';
import Ashtakvarga from '../screens/kundli/Ashtakvarga';
import Sarvastak from '../screens/kundli/Sarvastak';
import AscedentReport from '../screens/kundli/AscedentReport';
import RashiReport from '../screens/kundli/RashiReport';
import { ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ChatRequest from '../../ChatRequest';
import AnnouncementDetails from '../screens/home/AnnouncementDetails';
import Contact from '../screens/provider/support ';
import Supportdata from '../screens/provider/Supportdata';
import Walletwithdraw from '../screens/Walletwithdraw';
import DrawerNavigator from './DrawerNavigator';
import VideoHistory from '../screens/history/VideoHistory';
import Assignedpuja from '../screens/assignedpuja/Assignedpuja'
import Assignedpujanext from '../screens/assignedpuja/Assignedpujanext';
import Gifthistrotyorder from '../screens/history/Gifthistrotyorder';
import Completepuja from '../screens/assignedpuja/Completepuja';
import Notifications from '../screens/home/Notifications';
import Completepujanext from '../screens/assignedpuja/Completepujanext';
import NotificationDetails from '../screens/home/NotificationDetails';
import Reviews from '../screens/Reviews';



const Stack = createNativeStackNavigator();

const StackNavigator = (data, data1) => {

  const { t } = useTranslation();

  const data_route = data?.data == 'undefined' ? data?.data1?.redirect_app : data?.data?.redirect_app;
  return (
    // data.data.redirect_app
    <Stack.Navigator initialRouteName={data_route}>
      <Stack.Screen name="splash">
        {(props) => <Splash {...props} data={data} data1={data1} />}
      </Stack.Screen>
      <Stack.Screen name="login" component={Login} />

      <Stack.Screen name="forgetPassword" component={ForgetPassword} />
      <Stack.Screen name="providerHome" component={DrawerNavigator}   options={{ headerShown: false }}/>
      <Stack.Screen name="orderHistory" component={OrderHistory} />
      <Stack.Screen name="providerChat" component={ProviderChat} options={{ headerShown: false }} />
      <Stack.Screen name='intakeDetails' component={IntakeDetails} options={{ headerShown: false }} />
      <Stack.Screen name="logout" component={Logout} />
      <Stack.Screen name="astrologerLogin" component={AstrologerLogin} />
      <Stack.Screen name="astrologerDetailes" component={AstrologerDetailes} />
      <Stack.Screen name='bascipanchang' component={BasicPanchang} options={{ headerShown: false }} />
      <Stack.Screen name='astakvarga' component={Ashtakvarga} options={{ headerShown: false }} />
      <Stack.Screen name='sarvastak' component={Sarvastak} options={{ headerShown: false }} />
      <Stack.Screen name='ascednt' component={AscedentReport} options={{ headerShown: false }} />
      <Stack.Screen name='rashiReport' component={RashiReport} options={{ headerShown: false }} />
      <Stack.Screen name='notificationDetailes' component={NotificationDetails} options={{ headerShown: false }} />
      <Stack.Screen name='Reviews' component={Reviews}  options={{ headerShown: false }}/>

      <Stack.Group
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='livePreview' component={LivePreview} />
        <Stack.Screen name='liveScreen' component={LiveScreen} />
        <Stack.Screen name='liveChatCall' component={LiveChatCall} />
        <Stack.Screen name='walletHistory' component={WalletHistroy} />
        <Stack.Screen name='chatHistory' component={ChatHistory} />
        <Stack.Screen name='callHistory' component={CallHistory} />
        <Stack.Screen name='liveHistory' component={LiveHistory} />
        
        <Stack.Screen name="showKundli" component={ShowKundli} />
        <Stack.Screen name='kundliBasicDetails' component={ShowKundliBasic} />
        <Stack.Screen name='showKundliCharts' component={ShowKundliCharts} />
        <Stack.Screen name='showKundliPlanets' component={ShowKundliPlanets} />
        <Stack.Screen name='showKundliKpPlanets' component={ShowKundliKpPlanets} />
        <Stack.Screen name='showKundliKpHouseCusp' component={ShowKundliKpHouseCusp} />
        <Stack.Screen name='showDashna' component={ShowDashna} />
        <Stack.Screen name='houseReport' component={HouseReport} />
        <Stack.Screen name='kundliBirthDetailes' component={KundliBirthDetailes} />
        <Stack.Screen name="astrologerSignUp" component={AstrologerSignUp} />
        <Stack.Screen name="astromallCategory" component={AstromallCategory} />
        <Stack.Screen name="poojaDetails" component={PoojaDetails} />
        <Stack.Screen name="registerPooja" component={RegisterPooja} />
        <Stack.Screen name="registeredPooja" component={RegisteredPooja} />
        <Stack.Screen name="bookedPoojaDetails" component={BookedPoojaDetails} />
        <Stack.Screen name="poojaUploads" component={PoojaUploads} />
        <Stack.Screen name="chatRequest" component={ChatRequest} />
        <Stack.Screen name="announcementdetails" component={AnnouncementDetails} />
      </Stack.Group>


      {/* //Prvider  */}
      <Stack.Screen name='verifiedAstrologer' component={VerifiedAstrologer} />
      <Stack.Screen name='providerRemedies' component={ProviderRemedies} />
      <Stack.Screen name='astrologerWallet' component={AstrologerWallet} />
      <Stack.Screen name='providerFollowing' component={ProviderFollowing} />
      <Stack.Screen name='providerOffer' component={ProviderOffer} />
      <Stack.Screen name='providerProfile' component={ProviderProfile} />
      <Stack.Screen name='providerChatPickup' component={ProviderChatPickup} />

      <Stack.Screen name="live" component={Live} />
      <Stack.Screen name="livenow" component={LiveNow} options={{ animation: 'fade', headerShown: true, gestureEnabled: false }} />
      <Stack.Screen options={{ headerShown: false }} name="HostPage" component={HostPage} />
      <Stack.Screen options={{ headerShown: false }} name="HostLive" component={HostLive} />

      <Stack.Screen name="language" component={Language} />
      <Stack.Screen name="goLive" component={GoLive} options={{ headerShown: false }} />
      <Stack.Screen name="giftOrderHistory" component={GiftOrderHistory} />
      <Stack.Screen name='support' component={Contact}  options={{ headerShown: false }}/>
      <Stack.Screen name='supportdata' component={Supportdata}  options={{ headerShown: false }}/>
      <Stack.Screen name='Walletwithdraw' component={Walletwithdraw}  options={{ headerShown: false }}/>
      <Stack.Screen name='videohistory' component={VideoHistory}  options={{ headerShown: false }}/>
      <Stack.Screen name='Assignedpuja' component={Assignedpuja}  options={{ headerShown: false }}/>
      <Stack.Screen name='Assignedpujanext' component={Assignedpujanext}  options={{ headerShown: false }}/>
      <Stack.Screen name='Gifthistrotyorder' component={Gifthistrotyorder}  options={{ headerShown: false }}/>
      <Stack.Screen name='Completepuja' component={Completepuja}  options={{ headerShown: false }}/>
      <Stack.Screen name='Notifications' component={Notifications}  options={{ headerShown: false }}/>
      <Stack.Screen name='Completepujanext' component={Completepujanext}  options={{ headerShown: false }}/>
     
     
      <Stack.Screen
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
        options={{ headerShown: false }}
      />
  

    </Stack.Navigator>
  );
};

export default StackNavigator;

// vDyrZdnqcvTtYK8F9BlDDDFWTaF2
