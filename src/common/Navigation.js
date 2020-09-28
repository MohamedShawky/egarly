import { BackHandler, Platform } from "react-native";
import { Navigation as NativeNavigation } from "react-native-navigation";
import store from "../store";
import { CHANGE_MENU_STATUS } from "../actions/types";
import * as orderStatus from "./utils/OrderStatus";
import { AppNavigation } from ".";

class Navigation {
  static menuComponentId = 0;

  static INITED = false;

  static lastCommand = "";

  static modalIsOn = false;

  static currentScreen = "";

  static prevScreen = "";

  static backHandler;

  static didAppearListener;

  static commandCompletedListener;

  static didDisappearListener;

  constructor() {
    throw new Error("Cannot construct singleton");
  }

  static goBack = async () => {
    console.log("goBack");

    try {
      await Navigation.pop();
    } catch (error) {
      console.log(error);
      BackHandler.exitApp();
      return false;
    }
  };

  static registerBackHandlerListener = () => {
    Navigation.backHandler = BackHandler;
    Navigation.backHandler.addEventListener("hardwareBackPress", async () => {
      await AppNavigation.goBack();
      return true;
    });
  };

  static clearBackHandlerListener = () => {
    if (Navigation.backHandler) this.backHandler.removeEventListener();
  };

  static registerDidAppearListener = () => {
    Navigation.didAppearListener = NativeNavigation.events().registerComponentDidAppearListener(
      ({ componentId, componentName }) => {
        Navigation.currentScreen = componentName;
        this.currentComponentId = componentId;
        const { menuOpened } = store.getState().menu;
      }
    );
  };

  static clearDidAppearListener = () => {
    if (Navigation.didAppearListener) Navigation.didAppearListener.remove();
  };

  static registerDidDisappearListener = () => {
    Navigation.didDisappearListener = NativeNavigation.events().registerComponentDidDisappearListener(
      ({ componentName }) => {
        Navigation.prevScreen = componentName;
      }
    );
  };

  static clearDidDisappearListener = () => {
    if (Navigation.didDisappearListener) {
      Navigation.didDisappearListener.remove();
    }
  };

  static registerCommandCompletedListener = () => {
    Navigation.commandCompletedListener = NativeNavigation.events().registerCommandCompletedListener(
      ({ commandId }) => {
        Navigation.lastCommand = commandId.replace(/[0-9]/g, "");

        if (Navigation.lastCommand === "showModal") {
          Navigation.modalIsOn = true;
        } else if (
          Navigation.lastCommand === "dismissModal" ||
          Navigation.lastCommand === "dismissAllModals"
        ) {
          Navigation.modalIsOn = false;
        }
      }
    );
  };

  static clearCommandCompletedListener = () => {
    if (Navigation.commandCompletedListener) {
      Navigation.commandCompletedListener.remove();
    }
  };

  static getScreenLayout = (layout) => {
    const options = layout.options;
    if (typeof layout === "string") {
      return {
        component: {
          name: layout,
        },
      };
    }
    if (typeof layout === "object") {
      return {
        component: {
          name: layout.name,
          passProps: layout.passProps,
          options,
        },
      };
    }
  };

  static getBottomTabsLayout = (layout) => {
    if (typeof layout !== "object") return null;
    if (!layout.bottomTabs) return null;

    const children = layout.bottomTabs.map((tab) => ({
      component: {
        name: tab.screen,
        passProps: tab.passProps,
        options: {
          bottomTab: {
            text: tab.label,
            icon: tab.icon,
          },
        },
      },
    }));

    return {
      bottomTabs: {
        children,
      },
    };
  };

  static getSideMenuLayout = (layout) => {
    if (typeof layout !== "object") return null;
    if (!layout.sideMenu) return null;

    const menu = {};

    if (typeof layout.rtl === "boolean") {
      if (layout.rtl) {
        menu.right = {
          component: { name: layout.sideMenu },
        };
        Navigation.menuDirection = "right";
      } else {
        menu.left = {
          component: { name: layout.sideMenu },
        };
        Navigation.menuDirection = "left";
      }
    } else if (Navigation.menuDirection) {
      if (Navigation.menuDirection === "right") {
        menu.right = {
          component: { name: layout.sideMenu },
        };
      } else if (Navigation.menuDirection === "left") {
        menu.left = {
          component: { name: layout.sideMenu },
        };
      }
    }

    Navigation.menuComponentId += 1;

    const MainLayout = layout.bottomTabs
      ? Navigation.getBottomTabsLayout(layout)
      : Navigation.getScreenLayout(layout);

    return {
      sideMenu: {
        id: `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        center: {
          stack: {
            children: [{ ...MainLayout }],
          },
        },
        ...menu,
      },
    };
  };

  static init = (initialStack, layout) => {
    console.log("INITED>>>>>>>>>>>>>>>.", this.INITED);
    if (this.INITED) {
      this.clearBackHandlerListener();
      this.clearCommandCompletedListener();
      this.clearDidAppearListener();
      this.clearDidDisappearListener();
    }
    Navigation.modalIsOn = false;
    this.initialStack = initialStack;
    this.currentStack = initialStack;
    console.log("this.initialStack", this.initialStack, this.currentStack);
    this.mainLayout = null;
    this.mainStack = initialStack;

    // /listener
    this.registerBackHandlerListener();
    this.registerCommandCompletedListener();
    this.registerDidAppearListener();
    this.registerDidDisappearListener();

    this.mainLayoutRaw = layout;
    this.mainLayout = Navigation.getLayout(layout);
    Navigation.currentScreen = "";

    console.log("init>>>>>>>>", initialStack, this.mainLayout);
    NativeNavigation.setRoot({
      root: {
        stack: {
          id: initialStack,
          children: [this.mainLayout],
        },
      },
    });

    this.INITED = true;
  };

  // if setMainLayout = true, layout must be defined
  static setStackRoot = async (layout, stack, setMainLayout) => {
    try {
      if (setMainLayout && !layout) {
        throw new Error("Navigation.setStackRoott() ERROR");
      }
    } catch (error) {
      console.log(error);
      return;
    }

    const newLayout = layout
      ? Navigation.getLayout(layout)
      : Navigation.getLayout(this.mainLayoutRaw);

    if (setMainLayout) {
      this.mainLayoutRaw = layout;
      this.mainLayout = newLayout;
    }

    await NativeNavigation.setStackRoot(stack || this.mainStack, newLayout);
  };

  static getLayout = (layout) =>
    Navigation.getSideMenuLayout(layout) ||
    Navigation.getBottomTabsLayout(layout) ||
    Navigation.getScreenLayout(layout);

  static push = async (layout) => {
    if (layout.bottomTabs) {
      await NativeNavigation.push("MAIN_STACK", Navigation.getLayout(layout));
      return;
    }
    const screenName = typeof layout === "string" ? layout : layout.name;
    const passProps = typeof layout === "string" ? {} : layout.passProps;
    const stackName = typeof layout === "object" ? layout.stackName : null;

    if (screenName === Navigation.currentScreen) return;
    Navigation.currentScreen = screenName;

    if (stackName) {
      await NativeNavigation.showModal({
        stack: {
          id: stackName,
          children: [
            {
              component: {
                name: screenName,
                passProps,
              },
            },
          ],
        },
      });
      this.currentStack = stackName;
      Navigation.modalIsOn = true;
    } else {
      const componentId =
        Platform.OS === "ios"
          ? this.currentComponentId || this.currentStack
          : this.currentStack;
      console.log("push stack", componentId, screenName);

      await NativeNavigation.push(componentId, {
        component: {
          name: screenName,
          passProps,
        },
      });
    }
  };

  static pop = async (popTo) => {
    const componentId =
      Platform.OS === "ios"
        ? this.currentComponentId || this.currentStack
        : this.currentStack;

    console.log(
      "componentId",
      Navigation.modalIsOn,
      componentId,
      this.currentStack
    );
    if (Navigation.modalIsOn && this.currentStack === this.initialStack) {
      try {
        NativeNavigation.dismissAllModals();
      } catch (error) {
        console.log(error);
      }
      return;
    }

    try {
      if (popTo) {
        await NativeNavigation.popTo(popTo);
      } else {
        await NativeNavigation.pop(componentId);
      }
    } catch (error) {
      console.log(error);
      if (Navigation.modalIsOn) {
        this.currentStack = this.initialStack;
        try {
          NativeNavigation.dismissAllModals();
        } catch (error) {
          console.log(error);
        }
      } else {
        throw error;
      }
    }
  };

  static showModal = (layout) => {
    if (this.modalIsOn) {
      Navigation.push(layout);
      return;
    }

    const resolvedLayout = Navigation.getLayout(layout);
    const screenName = typeof layout === "string" ? layout : layout.name;

    if (resolvedLayout.component.name === Navigation.currentScreen) return;

    NativeNavigation.showModal({
      stack: {
        children: [resolvedLayout],
      },
    });
  };

  static dismissBranchStack = async () => {
    await NativeNavigation.dismissAllModals();
  };

  static dismissAllModal = async () => {
    await NativeNavigation.dismissAllModals();
  };

  static openMenu = () => {
    if (Navigation.menuDirection === "right") {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: true,
            },
          },
        }
      );
    } else if (Navigation.menuDirection === "left") {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: true,
            },
          },
        }
      );
    }
  };

  static closeMenu = () => {
    if (Navigation.menuDirection === "right") {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: false,
            },
          },
        }
      );
    } else if (Navigation.menuDirection === "left") {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: false,
            },
          },
        }
      );
    }
  };

  static enableMenu = async () => {
    if (Navigation.menuDirection === "left") {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              enabled: true,
            },
          },
        }
      );
    } else if (Navigation.menuDirection === "right") {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              enabled: true,
            },
          },
        }
      );
    }
  };

  static disableMenu = async () => {
    await NativeNavigation.mergeOptions(
      `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
      {
        sideMenu: {
          right: {
            visible: false,
            enabled: false,
          },
        },
      }
    );

    await NativeNavigation.mergeOptions(
      `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
      {
        sideMenu: {
          left: {
            visible: false,
            enabled: false,
          },
        },
      }
    );
  };

  static navigateToHome() {
    // this.init("MAIN_STACK", {
    //   name: "newHome"
    // });
    this.init("MAIN_STACK", {
      bottomTabs: [
        {
          screen: "newHome",
          label: "home",
          icon: require("../assets/imgs/chance.png"),
        },
        {
          screen: "notifications",
          label: "home",
          icon: require("../assets/imgs/chance.png"),
        },
        {
          // screen: "orderRent",
          screen: "lastMessage",
          label: "home",
          icon: require("../assets/imgs/chance.png"),
        },
        {
          // screen: "settings",
          screen: "myOrders",

          label: "home",
          icon: require("../assets/imgs/chance.png"),
        },
      ],
    });
  }

  static async navigateToCreateOrderSteps(stepNumber, passProps) {
    const stackName = "ORDER_STACK";

    let currentStep = {
      passProps,
    };

    switch (stepNumber) {
      case 1:
        currentStep = {
          ...currentStep,
          name: "createSpecificOrderStepOne",
        };
        break;
      case 2:
        currentStep = {
          ...currentStep,
          name: "createSpecificOrderStepTwo",
        };
        break;
      case 3:
        currentStep = {
          ...currentStep,
          name: "createSpecificOrderStepThree",
        };
        break;
      case 4:
        currentStep = {
          ...currentStep,
          name: "createOrderSpecificStepFour",
        };
        break;
    }

    if (this.currentStack == stackName) {
      console.log(">>>>no");
      await this.push(currentStep);
    } else {
      console.log(">>>>yes");

      currentStep.stackName = stackName;
      await this.push(currentStep);
    }
  }

  static navigateToOrderStatus = async (status, orderId) => {
    console.log("navigateToOrderStatus timeout", status, orderId);

    const stackName = "ORDER_STACK";
    const currentOrderStatusScreen = {
      passProps: {
        orderId,
        status,
        stackName: stackName,
      },

      // options: {
      //   animations: false
      // }
    };

    switch (status) {
      case 1:
        currentOrderStatusScreen.name = "orderRent";
        break;
      case 3:
      case 2:
      case 12:
        currentOrderStatusScreen.name = "orderCheck";
        break;
      case 4:
      case 5:
        currentOrderStatusScreen.name = "payment";
        break;
      case 6:
      case 7:
      case 8:
        currentOrderStatusScreen.name = "deliverRentOrder";
        break;
      case 9:
      case 10:
        currentOrderStatusScreen.name = "recovery";
        break;
    }
    if (this.currentStack == stackName) {
      await this.setStackRoot(currentOrderStatusScreen, stackName);
    } else if (currentOrderStatusScreen.name) {
      currentOrderStatusScreen.stackName = stackName;
      await this.push(currentOrderStatusScreen);
    }
  };

  // ///////// external

  static navigateToCreateOrderBidSteps(stepNumber, passProps) {
    const stackName = "ORDER_BID_STACK";

    let currentStep = {
      passProps,
    };

    switch (stepNumber) {
      case 1:
        currentStep = {
          ...currentStep,
          name: "createOrderBidStepOne",
        };
        break;
      case 2:
        currentStep = {
          ...currentStep,
          name: "createOrderBidStepTwo",
        };
        break;
      case 3:
        currentStep = {
          ...currentStep,
          name: "createOrderBidStepThree",
        };
        break;
      case 4:
        currentStep = {
          ...currentStep,
          name: "createOrderBidStepFour",
        };
        break;
    }

    if (this.currentStack == stackName) {
      this.push(currentStep);
    } else {
      currentStep.stackName = stackName;
      this.push(currentStep);
    }
  }

  static navigateToOrderBidStatus = (status, orderId) => {
    const stackName = "ORDER_BID_STACK";
    const currentOrderStatusScreen = {
      passProps: {
        orderId,
      },
      // options: {
      //   animations: false,
      // },
      name: "orderBidTab",
    };
    if (status === "PUSH_NOTIFICATION") {
      console.log("====================================");
      console.log("PUSH_NOTIFICATION", orderId);
      console.log("====================================");
      this.push(currentOrderStatusScreen);
    } else {
      console.log("====================================");
      console.log("Not push", orderId);
      console.log("====================================");
      this.setStackRoot(currentOrderStatusScreen, stackName);
    }
  };
}

export default Navigation;
