class Url {
  readonly URL: URL;

  constructor(url?: string | URL) {
    if (typeof (url) === "undefined") {
      this.URL = new URL(window.location.href);

      return;
    }

    if (url instanceof URL)
      this.URL = url;
    else
      this.URL = new URL(url);
  };

  // TODO: Change any type
  static getParams(url?: string | URL): any {
    let u = new Url(url);

    return this.getParamsFromSearch(u.URL.search);
  };

  // TODO: Change any type
  static getParamsFromSearch(s: string): any {
    let qs = s.split('+').join(' ');

    let params: any = {};
    let tokens;
    let re = /[?&]?([^=]+)=([^&]*)/g;

    while ((tokens = re.exec(qs)) !== null) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    };

    return params;
  };
};

export default Url;