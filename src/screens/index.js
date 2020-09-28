import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import store from "../store";
import Picker from "./picker/Picker";
import SignIn from "./signIn/SignIn";
import Walkthrough from "./walkthrough/Walkthrough";
import AppPickerModal from "./appPickerModal/AppPickerModal";
import PhotoSelection from "./photoSelection/PhotoSelection";
import SignUp from "./signUp/SignUp";
import MapScreen from "./mapScreen/MapScreen";
import TermsAndConditions from "./termsAndConditions/TermsAndConditions";
import Otp from "./otp/Otp";
import SignUpSocial from "./signUpSocial/SignUpSocial";
import ForgetPassword from "./forgetPassword/ForgetPassword";
import SendVerificationCode from "./forgetPassword/SendVerificationCode";
import ResetPassword from "./forgetPassword/ResetPassword";
import ChangePhone from "./otp/ChangePhone";
import IdentityFeatures from "./identityFeatures/IdentityFeatures";

import Profile from "./profile/Profile";
import AboutUs from "./aboutUs/AboutUs";

import AddressBook from "./addressBook/AddressBook";
import AddAddress from "./addAddress/AddAddress";

import Search from "./search/Search";
import ContactUs from "./contactUs/ContactUs";
import SearchResults from "./searchResults/SearchResults";
import BlockList from "./blockList/BlockList";

import UpdateProfile from "./updateProfile/UpdateProfile";
import Settings from "./setting/Setting";

// order screen
// newHome
import newHome from "./Home/Home";

import WellcomPage from "./walkthrough/WellcomPage";
import AddProduct from "./addProduct/AddProduct";
import OrderRent from "./orderRent/OrderRent";
import OrderCheck from "./orderRent/OrderCheck";
import Payment from "./orderRent/Payment";
import DeliverRentOrder from "./orderRent/DeliverRentOrder";
import Recovery from "./orderRent/Recovery";
import AddOffer from "./addOffer/AddOffer";
import PresentToOrderRent from "./presentToOrderRent/PresentToOrderRent";
import AcceptedOrder from "./acceptedOrder/AcceptedOrder";
import RecoveryAccepted from "./acceptedOrder/RecoveryAccepted";
import PaymentAccepted from "./acceptedOrder/PaymentAccepted";
import OrderAcceptedCheck from "./acceptedOrder/OrderAcceptedCheck";
import DeliverAcceptedOrder from "./acceptedOrder/DeliverAcceptedOrder";
import DeliverRefusedOrder from "./refusedOrder/DeliverRefusedOrder";
import OrderRefusedCheck from "./refusedOrder/OrderRefusedCheck";
import PaymentRefused from "./refusedOrder/PaymentRefused";
import RecoveryRefused from "./refusedOrder/RecoveryRefused";
import RefusedOrder from "./refusedOrder/RefusedOrder";
import Favorite from "./favorite/Favorite";
import ProductDetails from "./productDetails/ProductDetails";
import OrderTab from "./myOrders/OrderTab";
import ApproveAccount from "./approveAccount/ApproveAccount";
import ApproveAccountStepOne from "./approveAccountSteper/ApproveAccountStepOne";
import ApproveAccountStepTwo from "./approveAccountSteper/ApproveAccountStepTwo";
import ApproveAccountStepThree from "./approveAccountSteper/ApproveAccountStepThree";
import ApproveAccountStepFour from "./approveAccountSteper/ApproveAccountStepFour";
import AdvantageProduct from "./advantageProduct/AdvantageProduct";
import AdvantageProductStepTwo from "./advantageProduct/AdvantageProductStepTwo";
import Chat from "./chat/Chat";
import OrderToRent from "./orderToRent/OrderToRent";
import Notifications from "./notification/Notifications";
import Wallet from "./wallet/Wallet";
import Test from "./Test";
import ShareList from "./shareList/ShareList";
import LastMessage from "./lastMessage/LastMessage";
import UserProfile from "./userProfile/UserProfile";
import OfferDetails from "./offerDetails/OfferDetails";
import AddNewProduct from "./addNewProductInOffer/AddNewProduct";
import UpdateProduct from "./updateProduct/UpdateProduct";
import ChangePassword from "./changePassword/ChangePassword";
import Calender from "./calender/Calender";
import CreditCard from "./creditCard/CreditCard";
export default function() {
  const createScene = (InternalComponent) => () =>
    gestureHandlerRootHOC(
      class SceneWrapper extends Component {
        render() {
          return (
            <Provider store={store}>
              <InternalComponent {...this.props} />
            </Provider>
          );
        }
      }
    );

  Navigation.registerComponent("picker", createScene(Picker));

  Navigation.registerComponent("newHome", createScene(newHome));

  Navigation.registerComponent("signIn", createScene(SignIn));
  Navigation.registerComponent("walkthrough", createScene(Walkthrough));
  Navigation.registerComponent("otpScreen", createScene(Otp));
  Navigation.registerComponent("photoSelection", createScene(PhotoSelection));

  Navigation.registerComponent(
    "termsAndCondition",
    createScene(TermsAndConditions)
  );
  Navigation.registerComponent("appPickerModal", createScene(AppPickerModal));
  Navigation.registerComponent("signUp", createScene(SignUp));

  Navigation.registerComponent("mapScreen", createScene(MapScreen));
  Navigation.registerComponent(
    "termsAndCondition",
    createScene(TermsAndConditions)
  );
  Navigation.registerComponent("signUpSocial", createScene(SignUpSocial));
  Navigation.registerComponent("forgetPassword", createScene(ForgetPassword));
  Navigation.registerComponent(
    "sendVerificationCode",
    createScene(SendVerificationCode)
  );
  Navigation.registerComponent("resetPassword", createScene(ResetPassword));
  Navigation.registerComponent("changePhone", createScene(ChangePhone));
  Navigation.registerComponent(
    "identityFeatures",
    createScene(IdentityFeatures)
  );

  Navigation.registerComponent("profile", createScene(Profile));
  Navigation.registerComponent("aboutUs", createScene(AboutUs));
  Navigation.registerComponent("addAddress", createScene(AddAddress));
  Navigation.registerComponent("addressBook", createScene(AddressBook));
  Navigation.registerComponent("search", createScene(Search));

  Navigation.registerComponent("contactUs", createScene(ContactUs));
  Navigation.registerComponent("searchResults", createScene(SearchResults));
  Navigation.registerComponent("blockList", createScene(BlockList));
  Navigation.registerComponent("updateProfile", createScene(UpdateProfile));
  Navigation.registerComponent("settings", createScene(Settings));

  Navigation.registerComponent("wellcomPage", createScene(WellcomPage));
  Navigation.registerComponent("addProduct", createScene(AddProduct));
  Navigation.registerComponent("orderRent", createScene(OrderRent));
  Navigation.registerComponent("orderCheck", createScene(OrderCheck));
  Navigation.registerComponent("payment", createScene(Payment));
  Navigation.registerComponent(
    "deliverRentOrder",
    createScene(DeliverRentOrder)
  );
  Navigation.registerComponent("recovery", createScene(Recovery));
  Navigation.registerComponent("addOffer", createScene(AddOffer));
  Navigation.registerComponent(
    "presentToRentOrder",
    createScene(PresentToOrderRent)
  );
  // screen accepted order
  Navigation.registerComponent("acceptedOrder", createScene(AcceptedOrder));
  Navigation.registerComponent(
    "recoveryAccepted",
    createScene(RecoveryAccepted)
  );
  Navigation.registerComponent("paymentAccepted", createScene(PaymentAccepted));
  Navigation.registerComponent(
    "orderAcceptedCheck",
    createScene(OrderAcceptedCheck)
  );
  Navigation.registerComponent(
    "deliverAcceptedOrder",
    createScene(DeliverAcceptedOrder)
  );

  Navigation.registerComponent(
    "deliverRefusedOrder",
    createScene(DeliverRefusedOrder)
  );
  Navigation.registerComponent(
    "orderRefusedCheck",
    createScene(OrderRefusedCheck)
  );
  Navigation.registerComponent("paymentRefused", createScene(PaymentRefused));
  Navigation.registerComponent("recoveryRefused", createScene(RecoveryRefused));
  Navigation.registerComponent("refusedOrder", createScene(RefusedOrder));
  Navigation.registerComponent("favorite", createScene(Favorite));
  Navigation.registerComponent("productDetails", createScene(ProductDetails));
  Navigation.registerComponent("myOrders", createScene(OrderTab));
  Navigation.registerComponent("approveAccount", createScene(ApproveAccount));
  Navigation.registerComponent(
    "approveAccountStepOne",
    createScene(ApproveAccountStepOne)
  );
  Navigation.registerComponent(
    "approveAccountStepTwo",
    createScene(ApproveAccountStepTwo)
  );
  Navigation.registerComponent(
    "approveAccountStepThree",
    createScene(ApproveAccountStepThree)
  );
  Navigation.registerComponent(
    "approveAccountStepFour",
    createScene(ApproveAccountStepFour)
  );
  Navigation.registerComponent(
    "advantageProduct",
    createScene(AdvantageProduct)
  );
  Navigation.registerComponent(
    "advantageProductStepTwo",
    createScene(AdvantageProductStepTwo)
  );
  Navigation.registerComponent("chat", createScene(Chat));
  Navigation.registerComponent("orderToRent", createScene(OrderToRent));
  Navigation.registerComponent("notifications", createScene(Notifications));
  Navigation.registerComponent("wallet", createScene(Wallet));
  Navigation.registerComponent("test", createScene(Test));
  Navigation.registerComponent("shareList", createScene(ShareList));
  Navigation.registerComponent("lastMessage", createScene(LastMessage));
  Navigation.registerComponent("userProfile", createScene(UserProfile));
  Navigation.registerComponent("offerDetails", createScene(OfferDetails));
  Navigation.registerComponent("addNewProduct", createScene(AddNewProduct))
  Navigation.registerComponent("updateProduct", createScene(UpdateProduct))
  Navigation.registerComponent("changePassword", createScene(ChangePassword))
  Navigation.registerComponent('otp', createScene(Otp))
  Navigation.registerComponent('calender', createScene(Calender))
  Navigation.registerComponent('creditCard', createScene(CreditCard))





}
