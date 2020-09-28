import React from "react";
import Input from "../Input";
import Icon from "../Icon";

export default props => {
  return (
    <Input
      height={6}
      backgroundColor="white"
      marginHorizontal={5}
      marginBottom={5}
      noValidation
      leftItems={<Icon name="md-search" type="ion" size={10} />}
      {...props}
    />
  );
};
