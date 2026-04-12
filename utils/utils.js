
class Utils {
  isStandalone = () => {
    return window.matchMedia("(display-mode: standalone)").matches;
  };
  putCommas = (number) => {
    if (!number) return number;
    if (typeof number === "undefined") return number;
    if (typeof number === "number") number = number.toString();
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  createRange = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, index) => start + index);
  };
  toEnglishDigits = (str) => {
    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    var e = "۰".charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
      return t.charCodeAt(0) - e;
    });
    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = "٠".charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
      return t.charCodeAt(0) - e;
    });
    return str;
  };
  hasNumber = (term) => {
    return /\d/.test(term);
  };
  parseDigit(str = "") {
    var faNum = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(str).replace(/[0-9]/g, function (w) {
      return faNum[+w];
    });
  }
  toPersianDate = (date) => {
    return date
      .toLocaleDateString("fa-IR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .split(",")
      .join("")
      .split(" ")
      .reverse()
      .join(" ");
  };
  toPersianDateNumberFormat = (date) => {
    return date
      .toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
      .split(",")
      .join("")
      .split(" ")
      .reverse()
      .join(" ");
  };
  toIrTime = (date) => {
    return date
      .toLocaleDateString("fa-IR", {
        hour: "numeric",
        minute: "numeric",
      })
      .split(",")[1];
  };
  lockScroll = () => {
    document.body.style.overflowY = "clip";
    document.documentElement.style.overflowY = "clip";
  };
  enableScroll = () => {
    document.body.style.overflowY = "initial";
    document.documentElement.style.overflowY = "initial";
  };
  preventDefault(e) {
    e.preventDefault();
  }
  chunkArray(arr, chunk_size) {
    let result = [];
    for (let index = 0; index < arr.length; index += chunk_size) {
      const myChunk = arr.slice(index, index + chunk_size);
      result.push(myChunk);
    }
    return result;
  }
  etcString(str = "", count = 10) {
    return str && str !== null
      ? str.length < count
        ? str
        : str.slice(0, count - 2) + "..."
      : null;
  }
  isServer() {
    return !(typeof window != "undefined" && window.document);
  }
  cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  needLogin(cb = () => false) {
    if ("guest") this.showAlert("ابتدا باید وارد  شوید", "info");
    else cb();
  }
  generateRoute(router, filters, filtersList) {
    let filtersListForGenerateUrl = [];
    let urlString = "";

    filters.map((item) => {
      let splitedSelectedFilter = item.split(":");
      filtersList.map((field) => {
        if (field.title === splitedSelectedFilter[0]) {
          filtersListForGenerateUrl.push(
            `${field.value}=${splitedSelectedFilter[1]}`
          );
        }
      });
    });

    filtersListForGenerateUrl.map((item, index) => {
      let value = item.split(' ').join('+')
      if (index === 0) {
		urlString += `?${value}`;
		return;
      }
	  urlString += `&${value}`
    });

	return urlString;
  }
   convertQueryFunction = (query) => {
    let convertQuery = [];
    for (const key in query) {
      convertQuery.push({ key: key, value: query[key] });
    }
    return convertQuery;
  };
}

const utils = new Utils();

export default utils;
