import brazilHolidays from '../../assets/json/brazilHolidays.json';

export type WeekDaysName = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

class Dates {
  public static weekDays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  private static holidays = JSON.parse(JSON.stringify(brazilHolidays));

  public static treatAsUTC(date: Date): Date {
    let result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());

    return result;
  };

  public static daysBetween(startDate: Date, endDate: Date): number {
    let millisecondsPerDay = 24 * 60 * 60 * 1000;

    return Math.floor((this.treatAsUTC(endDate).getTime() - this.treatAsUTC(startDate).getTime()) / millisecondsPerDay);
  };

  public static dateToString(date: Date): string {
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}`;
  };

  public static isHoliday(date: Date): boolean {
    return typeof (this.holidays[this.dateToString(date)]) === 'undefined';
  };

  public static isWeekend(date: Date) {
    return date.getUTCDate() === 0 || date.getUTCDate() === 6;
  };

  public static sumDays(date: Date, days: number): Date {
    let result = date;
    result.setUTCDate(date.getUTCDate() + days);

    return result;
  };

  public static subDays(date: Date, days: number): Date {
    let result = date;
    result.setUTCDate(date.getUTCDate() - days);

    return result;
  };

  /**
   * Return the next week day from a date
   * @param from 
   * @param day 
   * @returns 
   */
  public static getNextDay(from: Date, day: WeekDaysName): Date {
    const numberDay = this.weekDays.indexOf(day);

    if (numberDay > from.getUTCDay())
      return this.sumDays(from, numberDay - from.getUTCDay());
    else if (numberDay < from.getUTCDay())
      return this.sumDays(from, 7 - from.getUTCDay() + numberDay);

    return from;
  };

  /**
   * Return the next business day from a data
   * @param date 
   * @returns 
   */
  public static getNextBusinessDay(date: Date): Date {
    while (this.isWeekend(date) || this.isWeekend(date)) {
      this.sumDays(date, 1);
    };

    return date;
  };
};

export default Dates;