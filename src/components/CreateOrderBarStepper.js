import React from 'react';
import I18n from 'react-native-i18n';
import { AppView, AppText, AppIcon } from '../common';

export default props => {
  // / arrayOfstepsKey I18n

  const { arrayOfstepsKey, currentStep } = props;
  const currentStepIndex = currentStep - 1;

  const steps = I18n.t(arrayOfstepsKey, { returnObjects: true });

  steps.forEach((step, index) => {
    if (index == currentStepIndex) {
      steps[index] = { ...step, active: true, Done: false };
    } else if (index < currentStepIndex) {
      steps[index] = { ...step, active: false, Done: true };
    } else {
      steps[index] = { ...step, active: false, Done: false };
    }
  });

  return (
    <AppView stretch center row paddingVertical={5} paddingHorizontal={7}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <OrderStep {...step} />
          {index !== steps.length - 1 && <Divider {...step} />}
        </React.Fragment>
      ))}
    </AppView>
  );
};

const Divider = ({ active, Done }) => (
  <AppView flex stretch center marginBottom={12} marginHorizontal={-5}>
    <AppView
      height={0.2}
      stretch
      flax
      backgroundColor={Done ? 'done' : '#D5D5D5'}
    />
  </AppView>
);

const OrderStep = ({ text, active, Done }) => (
  <AppView flex centerX stretch>
    <AppView stretch center>
      <AppIcon
        flip={!active && !Done}
        name={
          Done
            ? 'checkcircle'
            : active
            ? 'ios-arrow-dropdown'
            : 'ios-arrow-dropright'
        }
        type={Done ? 'ant' : 'ion'}
        marginTop={Done ? 1.5 : 0}
        size={Done ? 10.5 : 12}
        color={ Done ? 'done':active?'primary' : '#9F9F9F'}
      />
    </AppView>
    <AppText
      color={active ?'primary' : '#9F9F9F'}
      size={5}
      marginTop={2}
      center
    >
      {text}
    </AppText>
  </AppView>
);
