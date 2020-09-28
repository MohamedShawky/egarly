import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Item from "./Item";
import NoResult from "./NoResult";
import { moderateScale } from "../utils/responsiveDimensions";
import { AppView } from "..";

export default props => {
  const {
    keyOfLabel,
    keyOfValue,
    selectedValue,
    onSelect,
    data,
    renderItem,
    Footer,
    ListHeader
  } = props;
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <AppView stretch flex>
        {!!ListHeader && <ListHeader />}
        <FlatList
          // ListHeaderComponent={listHeader}
          // ListEmptyComponent={!!noResult ? noResult : <NoResult />}
          style={styles.list}
          // contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(_, index) => `#${index}`}
          data={data}
          renderItem={({ item, index }) => {
            const selected = selectedValue
              ? selectedValue === item[keyOfValue]
              : false;

            return !!renderItem ? (
              renderItem({
                item,
                index,
                selected,
                onSelect,
                keyOfLabel,
                keyOfValue
              })
            ) : (
              <Item
                selected={selected}
                index={index}
                keyOfLabel={keyOfLabel}
                keyOfValue={keyOfValue}
                onSelect={onSelect}
                item={item}
              />
            );
          }}
        />
        {!!Footer && <Footer />}
      </AppView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white"
  },
  list: { flex: 1, alignSelf: "stretch", backgroundColor: "#F2F2F2" },
  contentContainerStyle: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#F2F2F2"
    // marginBottom:moderateScale(10)
  }
});
