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
    let result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);

    return result;
  };

  public static subDays(date: Date, days: number): Date {
    let result = new Date(date);
    result.setUTCDate(result.getUTCDate() - days);

    return result;
  };

  public static getNextDay(from: Date, day: WeekDaysName): Date {
    const numberDay = this.weekDays.indexOf(day);

    if (numberDay > from.getUTCDate())
      return this.sumDays(from, numberDay - from.getUTCDate());
    else if (numberDay < from.getUTCDate())
      return this.subDays(from, from.getUTCDate() - numberDay);

    return from;
  };

  public static getNextBusinessDay(date: Date): Date {
    while (this.isWeekend(date) || this.isWeekend(date)) {
      this.sumDays(date, 1);
    };

    return date;
  };
};

export default Dates;