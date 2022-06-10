import Dates, { WeekDaysName } from './Dates';

export type FrequencyTypes = 'weekly' | 'biweekly' | 'monthly';

class Delivery {
  private minDaysToFirstDelivery: number;
  private isDeliveryInHolidays: boolean;
  private isDeliveryInWeekends: boolean;

  constructor(minDaysToFirstDelivery: Delivery['minDaysToFirstDelivery'], isDeliveryInHolidays: Delivery['isDeliveryInHolidays'], isDeliveryInWeekends: Delivery['isDeliveryInWeekends']) {
    this.minDaysToFirstDelivery = minDaysToFirstDelivery;
    this.isDeliveryInHolidays = isDeliveryInHolidays
    this.isDeliveryInWeekends = isDeliveryInWeekends;
  };

  public reviewPolicyOfDelivery(dayOfDelivery: Date): Date {
    if (!this.isDeliveryInHolidays && !this.isDeliveryInWeekends) // No Holidays, no weekends
      return Dates.getNextBusinessDay(dayOfDelivery);
    else if (!this.isDeliveryInHolidays && this.isDeliveryInWeekends) // No Holidays, yes weekends
      return Dates.getNextNoHolidayDay(dayOfDelivery);
    else if (this.isDeliveryInHolidays && !this.isDeliveryInWeekends) // Yes Holidays, no weekends
      return Dates.getNextNoWeekendDay(dayOfDelivery);
    else  //  All days
      return dayOfDelivery;
  };

  /**
   * 
   * @param day Get the first day of delivery
   * @param fromDate 
   * @returns 
   */
  public getFirstDeliveryDate(day: WeekDaysName, fromDate?: Date): Date {
    let date = typeof (fromDate) !== 'undefined' ? fromDate : new Date();

    if (!this.isDeliveryInWeekends)
      if (Dates.weekDays.indexOf(day) === 0 || Dates.weekDays.indexOf(day) === 6)
        throw new Error("Não é permitida entrega aos finais de semana");

    // Sum minimal wait time
    Dates.sumDays(date, this.minDaysToFirstDelivery);

    const dayOfDelivery = Dates.getNextDay(date, day);


    return this.reviewPolicyOfDelivery(dayOfDelivery);
  };

  public getNextDeliveryDay(frequency: FrequencyTypes, firstDelivery: Date): Date {
    let today = new Date();
    let diff = Dates.daysBetween(firstDelivery, today);


    switch (frequency) {
      case 'weekly':
        if (diff % 7 === 0)
          return today;
        else
          return Dates.sumDays(today, 7 - diff % 7);

      case 'biweekly':
        if (diff % 14 === 0)
          return today;
        else
          return Dates.sumDays(today, 14 - diff % 14);

      case 'monthly':
        if (diff % 28 === 0)
          return today;
        else
          return Dates.sumDays(today, 28 - diff % 28);
    };
  };
};

export default Delivery;