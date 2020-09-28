import React, { Component } from "react";
import { AppView, AppText, AppImage, AppButton, AppList } from "../../common";
import { AppHeader } from "../../components";
import wallet from "../../assets/imgs/wallet.png";
import I18n from "react-native-i18n";
import { App } from "react-native-firebase";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import { CardWallet } from "./CardWallet";
class Wallet extends Component {
  render() {
    return (
      <AppView stretch flex>
        <AppHeader title={I18n.t("wallet")} />
        <AppView
          backgroundColor="#F3F3F3"
          center
          stretch
          borderRadius={7}
          margin={7}
          flex
        >
          <AppImage source={wallet} stretch height={13} />
          <AppView stretch center marginTop={10}>
            <AppText size={6.5}> رصيدك </AppText>
            <AppText color="primary"> 120 </AppText>
          </AppView>

          <AppButton
            title="طلب رصيد"
            stretch
            backgroundColor="primary"
            margin={5}
            marginTop={10}
          />
        </AppView>
        <AppView stretch flex center>
          <AppText> جميع العمليات</AppText>
          <AppList
            flatlist
            flex
            stretch
            apiRequest={{
              url: `${API_ENDPOINT_GATEWAY}wallet/logs`,
              responseResolver: (response) => {
                console.log("Res fuzzy:::::::");
                console.log(response);

                return {
                  data: response.data.logs,
                  pageCount: response.data.total,
                };
              },

              onError: (error) => {
                console.log(JSON.parse(JSON.stringify(error.response)));
                I18n.t("ui-error-happened");
              },
            }}
            noResultsComponent={
              <AppView stretch flex center>
                <AppText> No data</AppText>
              </AppView>
            }
            rowRenderer={(data) => <CardWallet {...data} />}
            paddingHorizontal={7}
          />
        </AppView>
      </AppView>
    );
  }
}

export default Wallet;
