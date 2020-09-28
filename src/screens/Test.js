import ParallaxScroll from "@monterosa/react-native-parallax-scroll";
import { AppView, AppList, AppText } from "../common";
import React, { Component } from "react";
import { API_ENDPOINT_GATEWAY } from "../utils/Config";
import I18n from "react-native-i18n"

// Inside of a component's render() method:

export default class Test extends Component {

  render() {
    return (
      <ParallaxScroll
        renderHeader={({ animatedValue }) => (
          <AppView
            height={10}
            stretch
            animatedValue={animatedValue}
            backgroundColor="blue"
          />
        )}
        headerHeight={50}
        isHeaderFixed={false}
        parallaxHeight={250}
        renderParallaxBackground={({ animatedValue }) => (
          <AppView
            stretch
            height={40}
            backgroundColor="red"
            animatedValue={animatedValue}
          />
        )}
        renderParallaxForeground={({ animatedValue }) => (
          <AppView
            backgroundColor="green"
            stretch
            animatedValue={animatedValue}
          />
        )}
        parallaxBackgroundScrollSpeed={5}
        parallaxForegroundScrollSpeed={2.5}
        isBackgroundScalable={true}
        contentContainerStyle={{ flex: 1,  }}
      >
        {/* <AppView backgroundColor="pink" stretch flex /> */}
        <AppList
          flatlist
          paddingTop={5}
          refreshControl={this.props.myOrderRent}
          height={100}
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}orders`,

            responseResolver: (response) => {
              console.log("**** offers ", response);

              return {
                data: response.data,
                pageCount: response.data.pageCount,
              };
            },
            onError: (error) => {
              console.log("erro", JSON.parse(JSON.stringify(error)));

              return I18n.t("ui-error-happened");
            },
          }}
          //   staticData
          //   data={[1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,11,1,1,1,1,1,11,1,1,1,1,1,1,1]}
          noResultsComponent={
            <AppView flex stretch center>
              <AppText> No Data </AppText>
            </AppView>
          }
          stretch
          rowRenderer={(item) => (
            <AppView
              backgroundColor="transparent"
              data={item}
              height={30}
              marginBottom={5}
              backgroundColor="blue"
              stretch
              onPress={() => {
                console.log("order +++++++++==>>", item.order.status_id);

                if (this.state.selectedValue === 11)
                  AppNavigation.navigateToOrderStatus(
                    item.order.status_id,
                    item.order.id
                  );
              }}
            />
          )}
        />
      </ParallaxScroll>
    );
  }
}
