import moment from "moment";
import orderType from "../../utils/orderType";

export const calculateWorkingHours = workingPeriods =>
  workingPeriods.reduce((workingHours, workingPeriod, index) => {
    if (!workingPeriod.endDate) {
      workingPeriod.endDate = +moment.utc();
    }

    let diff = moment
      .utc(+moment.utc(workingPeriod.endDate))
      .diff(+moment.utc(workingPeriod.startDate), "seconds");

    if (diff < 0) diff = 0;
    if (!workingHours) workingHours = moment.duration(diff, "seconds");
    else
      workingHours = moment
        .duration(workingHours, "seconds")
        .add(diff, "seconds");

    return workingHours;
  }, 0);

export const reCalculateWorkingHours = (
  { workingPeriods },
  { currentStartDate, currentEndDate }
) => {
  let newWorkingPeriods = [...workingPeriods];
  if (newWorkingPeriods && newWorkingPeriods.length) {
    const lastWorkingPeriod = newWorkingPeriods[newWorkingPeriods.length - 1];
    if (moment.utc(lastWorkingPeriod.startDate).isSame(currentStartDate))
      return newWorkingPeriods;
    newWorkingPeriods[newWorkingPeriods.length - 1] = {
      startDate: lastWorkingPeriod.startDate,
      endDate: currentEndDate
    };
    newWorkingPeriods[newWorkingPeriods.length] = {
      startDate: currentStartDate
    };
  } else {
    newWorkingPeriods = [
      {
        startDate: currentStartDate,
        endDate: currentEndDate
      }
    ];
  }
  return newWorkingPeriods;
};

export const addAdditionCostToTotalPrice = (
  { price, transportationPrice, previewPrice, type },
  { additionalService }
) => {
  let newTotalPrice = price;
  if (type == orderType.HOUR) {
    newTotalPrice = additionalService.price;
    if (transportationPrice) newTotalPrice += transportationPrice;
    if (previewPrice) newTotalPrice += previewPrice;
    // 10 is min price
    if (newTotalPrice < 10) newTotalPrice = price;
  } else {
    // /type service
    newTotalPrice = price + additionalService.price;
  }
  return newTotalPrice;
};

export const addAdditionalCostToOrder = additionalService => {
  const {
    price,
    transportationPrice,
    previewPrice,
    type
  } = this.state.orderDetails;
  let newTotalPrice = price;
  if (type == "HOUR") {
    newTotalPrice = additionalService.price;
    if (transportationPrice) newTotalPrice += transportationPrice;
    if (previewPrice) newTotalPrice += previewPrice;
    // 10 is min price
    if (newTotalPrice < 10) newTotalPrice = price;
  } else {
    // /type service
    newTotalPrice = price + additionalService.price;
  }
  return newTotalPrice;
};
