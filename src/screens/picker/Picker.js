import React, { useState, useEffect } from "react";
import ItemList from "../../common/picker/ItemList";
import { AppHeader } from "../../components";
import { AppView } from "../../common";
import SearchInput from "../../common/picker/SearchInput";
import DefaultNoResult from "../../common/picker/NoResult";

export default props => {
  const {
    NoResult,
    title,
    searchPlaceholder,
    data,
    hideSearch,
    ...rest
  } = props;
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let newData = data;
    if (searchText) {
      newData = data.filter(item =>
        item[props.keyOfLabel]
          .toLowerCase()
          .includes(searchText.toString().toLowerCase())
      );
    }
    setFilteredData(newData);
  }, [searchText]);

  return (
    <>
      <AppHeader title={title} showDismissIcon />

      {!data || !data.length ? (
        !!NoResult ? (
          <NoResult />
        ) : (
          <DefaultNoResult />
        )
      ) : (
        <AppView flex stretch backgroundColor="#F2F2F2" paddingVertical={5}>
          {!hideSearch && (
            <SearchInput
              initialValue={searchText}
              placeholder={searchPlaceholder}
              onChange={setSearchText}
            />
          )}
          <ItemList data={[...filteredData]} {...rest} />
        </AppView>
      )}
    </>
  );
};
