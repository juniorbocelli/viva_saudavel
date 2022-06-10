class DeliveryDates {
  once: Date | null;
  weekly: Date | null;
  biweekly: Date | null;
  monthly: Date | null;

  constructor(once: DeliveryDates['once'], weekly: DeliveryDates['weekly'], biweekly: DeliveryDates['biweekly'], monthly: DeliveryDates['monthly']) {
    this.once = once;
    this.weekly = weekly;
    this.biweekly = biweekly;
    this.monthly = monthly;
  };
};

export default DeliveryDates;