import Dates, { WeekDaysName } from './Dates';

class Delivery {
  private minDaysToFirstDelivery: number;
  private isDeliveryInHolidays: boolean;
  private isDeliveryInWeekends: boolean;

  constructor(minDaysToFirstDelivery: Delivery['minDaysToFirstDelivery'], isDeliveryInHolidays: Delivery['isDeliveryInHolidays'], isDeliveryInWeekends: Delivery['isDeliveryInWeekends']) {
    this.minDaysToFirstDelivery = minDaysToFirstDelivery;
    this.isDeliveryInHolidays = isDeliveryInHolidays
    this.isDeliveryInWeekends = isDeliveryInWeekends;
  };

  public getFirstDeliveryDate(day: WeekDaysName): Date {
    let date = new Date();

    if (!this.isDeliveryInWeekends)
      if (Dates.weekDays.indexOf(day) === 0 || Dates.weekDays.indexOf(day) === 1)
        throw new Error("Não é permitida entrega aos finais de semana");

    // Sum minimal wait time
    Dates.subDays(date, this.minDaysToFirstDelivery);

    let dayOfDelivery = Dates.getNextDay(date, day);

    if (!this.isDeliveryInHolidays && !this.isDeliveryInWeekends)
      return Dates.getNextBusinessDay(dayOfDelivery);
    else if (!this.isDeliveryInHolidays && this.isDeliveryInWeekends)
      return Dates.getNextDay(dayOfDelivery, 'monday');

    return dayOfDelivery;
  };
};

export default Delivery;