import React, { Component } from "react";
import { View } from "react-native";
import { AppHeader } from "../../components";
import I18n from "react-native-i18n";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Text } from "react-native-animatable";
import colors from "../../common/defaults/colors";

export default class Calender extends Component {
  state = {
    day: null,
    markedDays: ["2020-09-16"],
    selected: {
      "2020-09-16": {
        selected: true,
        marked: true,
        selectedColor: colors.primary,
      },
    },
  };
  render() {
    console.log("selected", this.state.selected);

    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <AppHeader title={I18n.t("calender")} />
        <Calendar
          // Initially visible month. Default = Date()
          current={"2020-09-23"}
          
          // markingType={'period'}
          // markedDates={{
          //   // '2020-09-15': {marked: true, dotColor: '#50cebb'},
          //   // '2020-09-16': {marked: true, dotColor: '#50cebb'},
          //   '2020-09-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
          //   // '2020-09-22': {color: '#70d7c7', textColor: 'white'},
          //   // '2020-09-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
          //   // '2020-09-24': {color: '#70d7c7', textColor: 'white'},
          //   '2020-09-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
          // }}
          markedDates={this.state.selected}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={new Date()}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2070-05-30"}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log("selected day", day);
            this.setState((previousState) => ({
              selected: { ...previousState.selected, ...day.dateString },
            }));
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("selected day", day);

            this.setState((previousState) => ({
              selected: {
                ...previousState.selected,
                [day.dateString]: {
                  selected: true,
                  marked: true,
                  selectedColor: colors.primary,
                },
              },
            }));
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MM"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          hideArrows={false}
          disableMonthChange={false}
          firstDay={1}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.
          renderHeader={(date) => {
            /*Return JSX*/
            <View style={{ width: 150, height: 70, backgroundColor: "red" }} />;
          }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
      </View>
    );
  }
}
