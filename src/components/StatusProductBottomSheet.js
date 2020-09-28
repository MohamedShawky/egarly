import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppIcon,
  AppButton,
  showError,
  AppSpinner,
} from "../common";
import { OptionButton, BottomSheet } from ".";

import * as ProductRepo from "../repo/ProductRepo";

class FilterBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: [],
      loading: true,
      // data: [
      //   {
      //     id: 1,
      //     en_name: "Send alerts to all users",
      //     ar_name: "إرسال تنبيهات لجميع المستخدمين",
      //   },
      //   {
      //     id: 2,
      //     en_name: "Advertisement in Instagram only",
      //     ar_name: "العلان فى اانستقراام فقط",
      //   },
      //   {
      //     id: 3,
      //     en_name: "Advertise on Twitter only",
      //     ar_name: "العلان فى تويتر فقط",
      //   },
      //   {
      //     id: 4,
      //     en_name: "Advertise on Facebook only",
      //     ar_name: "العلان فى الفيسبوك فقط",
      //   },
      //   {
      //     id: 5,
      //     en_name:
      //       "Advertising on all social media sites only Twitter - Instagram - Facebook",
      //     ar_name:
      //       "العلان فى جميع مواقع التواصل الجتماعى فقط تويتر - اانستجراام - فيسبوك",
      //   },
      //   {
      //     id: 6,
      //     en_name: "The ad appears at the top of the search page",
      //     ar_name: "ظهور العلان فى أعلى صفحة البحث",
      //   },
      //   {
      //     id: 7,
      //     en_name: "The ad appears on the home page",
      //     ar_name: "ظهور العلان فى الصفحة الرئيسية",
      //   },
      // ],
    };
  }

  async componentDidMount() {
    try {
      const data = await ProductRepo.distinguishStatuses();
      this.setState({
        data,
        loading: false,
      });
    } catch (error) {
      showError("حدث خطا");
      this.setState({
        loading: false,
      });
    }
  }

  onSubmit = (value) => {
    this.props.onConfirm(value);
    this.hide();
  };

  show = () => {
    this.bottomSheetRef.current.show();
    this.setState({
      mount: true,
    });
  };

  hide = () => {
    this.bottomSheetRef.current.hide();
    this.setState({
      mount: false,
    });
  };

  renderFilterItems = () => {
    const { initialValue, rest } = this.props;

    if (this.state.loading) {
      return <AppSpinner />;
    }
    console.log("data ==>>", this.state.data);

    return (
      <AppView stretch height={15} flex>
        <AppView flex stretch>
          <SelectionOptionsGroup
            {...rest}
            horizontal
            onSelect={(value, text) => {
              const status = this.state.data.filter((i) => i.id === value);
              console.log("statues", status);

              this.onSubmit(status);
            }}
            initialValue={initialValue}
          >
            {this.state.data &&
              this.state.data.map((item, index) => (
                <OptionButton
                  buttonBold={false}
                  text={item}
                  value={item.id}
                  key={index}
                  search
                  iconName={item.iconName}
                />
              ))}
          </SelectionOptionsGroup>
        </AppView>
      </AppView>
    );
  };

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={60}
      >
        {this.state.mount && (
          <>
            <AppView stretch paddingHorizontal={12} center height={10}>
              <AppView stretch center>
                <AppText size={6} bold>
                  {I18n.t("setting-product")}
                </AppText>
              </AppView>
            </AppView>
            {this.renderFilterItems()}
          </>
        )}
      </BottomSheet>
    );
  }
}

export default FilterBottomSheet;
