export function twoZeros(number: string | number): string {
  return ("0" + String(number)).slice(-2);
};

// Format dd/mm/yyyy
export function printDateFromTimestamp(timestamp: Date | number | string): string {
  var date: Date | number | string;
  var year, month, day: string;

  if (timestamp instanceof Date && !isNaN(timestamp.valueOf())) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  };

  year = String(date.getUTCFullYear());
  month = twoZeros(date.getUTCMonth() + 1);
  day = twoZeros(date.getUTCDate());

  return day + "/" + month + "/" + year;
}

// Format mm/yyyy
export function printCompetenceFromTimestamp(timestamp: Date | number | string): string {
  var date: Date | number | string;
  var year, month: string;

  if (timestamp instanceof Date && !isNaN(timestamp.valueOf())) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  };

  year = String(date.getUTCFullYear());
  month = twoZeros(date.getUTCMonth() + 1);

  return month + "/" + year;
}

// Format dd/mm/yyyy 00:00
export function printDateTimeFromTimestamp(timestamp: Date | number | string): string {
  var date: Date | number | string;
  var year, month, day, hour, minute: string;

  if (timestamp instanceof Date && !isNaN(timestamp.valueOf())) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  };

  year = String(date.getUTCFullYear());
  month = twoZeros(date.getUTCMonth() + 1);
  day = twoZeros(date.getUTCDate());

  hour = twoZeros(date.getUTCHours());
  minute = twoZeros(date.getUTCMinutes());

  return day + "/" + month + "/" + year + " " + hour + ":" + minute;
};

export function monthName(month: number): string | null {
  switch (month) {
    case 0:
      return "Janeiro";

    case 1:
      return "Fevereiro";

    case 2:
      return "Março";

    case 3:
      return "Abril";

    case 4:
      return "Maio";

    case 5:
      return "Junho";

    case 6:
      return "Julho";

    case 7:
      return "Agosto";

    case 8:
      return "Setembro";

    case 9:
      return "Outubro";

    case 10:
      return "Novembro";

    case 11:
      return "Dezembro";

    default:
      return null;
  };
};

// 25 de Março, 2021 às 10:48
export function readableDateTime(d: Date | number): string {
  let date: Date;

  if (d instanceof Date && !isNaN(d.valueOf())) {
    date = d;
  } else {
    date = new Date(d);
  };

  return `${date.getUTCDay()} de ${monthName(date.getUTCMonth())}, ${date.getUTCFullYear()} às ${date.getUTCHours()}:${date.getUTCMinutes()}`;
};

// Format 1.000.000,00
export function maskMoney(number: number | string): string {
  let money: string;
  let intPart: string;
  let centPart: string;

  if (typeof (number) === "number") number = number.toFixed(2);

  money = String(number);

  if (money.indexOf("c") !== -1 || money.indexOf("C") !== -1) {
    money = "0";
  }

  money = money.replace(/\D/g, "");
  if (money === "") {
    money = "0";
  }
  money = parseInt(money).toString();

  if (money.length > 13) {
    money = money.substring(0, 14);
  }

  if (money.length < 3 && money === "0") {
    money = "000";
  } else {
    for (var i = money.length; i < 3; i++) {
      money = "0" + money;
    }
  }

  intPart = money.slice(0, money.length - 2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  centPart = money.slice(-2);

  money = intPart + "," + centPart;

  return money;
}

export function mask_cnpj_cpf(value: string): string {
  let nValue = value.replace(/\D/g, "");

  if (nValue.length <= 11) {
    if (nValue.length > 11) {
      nValue = nValue.substring(0, 11);
    };

    nValue = nValue.replace(/^(\d{3})(\d)/, "$1.$2");
    nValue = nValue.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    nValue = nValue.replace(/^(\d{3})\.(\d{3}).(\d{3})(\d)/, "$1.$2.$3-$4");
    //value = value.replace(/(\d{3})(\d)/, "$1-$2");
  } else {
    if (nValue.length > 14) {
      nValue = nValue.substring(0, 14);
    };

    nValue = nValue.replace(/^(\d{2})(\d)/, "$1.$2");
    nValue = nValue.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    nValue = nValue.replace(/\.(\d{3})(\d)/, ".$1/$2");
    nValue = nValue.replace(/(\d{4})(\d)/, "$1-$2");
  };

  return nValue;
};

export function maskCEP(s: string): string {
  let digits = s.replace(/\D/g, "");

  if (digits.length !== 8) return "";

  return digits.slice(0, 2) + "." + digits.slice(2, 5) + "-" + digits.slice(5, 8);
};