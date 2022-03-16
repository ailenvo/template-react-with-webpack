import moment from "moment";
import { IFilter, IFilterDate, IPicker } from "../../models/common/models.type";
import { PaidType, ShippingStatus } from "../../models/common/models.enum";

const convertTwoRow = (items: any[], amountInRow: number = 0) => {
  if (!items || items.length === 0) return [];
  const rows = items.reduce(function (rows, key, index) {
    return (
      (index % amountInRow === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows
    );
  }, []);
  return rows;
};

const convertCurrency = (currency: number = 0) => {
  if (!currency) return "0 VND";
  if (typeof currency === "string") currency = parseInt(currency);

  return currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};

const formatNumber = (currency: number = 0) => {
  if (currency === undefined) return;
  if (typeof currency === "string") currency = parseInt(currency);

  return currency.toLocaleString("it-IT");
};

const formatDateTime = (date: string) => {
  return moment(date).format("DD/MM/YYYY hh:mm:ss a");
};

const formatDate = (date: string | Date | undefined) => {
  return moment(date).format("DD/MM/YYYY");
};

const generateId = (prefix?: string): string => {
  const _prefix = prefix ? prefix : "";
  const id = `${Math.floor(Math.random() * Math.floor(9999)) + 1111}`;

  return _prefix + Math.floor(Date.now() / 1000) + id;
};

const generateGuidId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const generateWeek = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6];
  let dayOfWeek = arr.map((item) => {
    const day = moment().day(item).format("DD");
    return {
      label: day,
      value: 0,
      gift: [],
    };
  });
  return dayOfWeek;
};

const generatePickerData = (start: number = 0, end: number = 0): IPicker[] => {
  return new Array(230 - start + 1).fill(0).map((_, i) => {
    const value = start + i;
    return { value: `${value}`, caption: `${value}` };
  });
};

const hasEmail = (email: string) => {
  return !!email.match("[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+");
};

const hasPhoneNumber = (phoneNumber: string) => {
  return !!phoneNumber.match("(84|0[3|5|7|8|9])+([0-9]{8})");
};

const hasImage = (mime: string): boolean => {
  return ["image/jpeg", "image/png"].indexOf(mime) === -1;
};

const dateFormat = (currentDate: Date) => {
  return moment(currentDate)
    .set("date", currentDate.getDate())
    .format("dddd, DD/MM/YYYY hh:mm");
};

const capitalize = (value: string | undefined) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const mergeSearchParams = (_filter: IFilter, oldFilter: any = {}) => {
  const filterData = _filter.input ? _filter.input : {};
  const sortData = _filter.sort || [];
  const sortNames = sortData.map((item) => item.name);
  const sortDirections = sortData.map((item) => item.direction);

  let newFilter: any = { ...oldFilter, ...filterData };
  newFilter.sortNames = sortNames;
  newFilter.sortDirections = sortDirections;

  return newFilter;
};

const checkContentContainingAbsolutePath = (content: string) => {
  const regex = /src=["'](.*?)["']/gm;

  let hasAbsolutePath = false;

  const regExpMatchArray = content.match(regex);

  regExpMatchArray?.forEach((item) => {
    if (!item.match("data:image") && !item.match(/(http|https):[//]/)) {
      hasAbsolutePath = true;
    }
  });

  return hasAbsolutePath;
};

const checkLink = (link: string) => {
  return !!link.match(/(http|https):[//]/);
};

function startDownloadFile(file: Buffer, fileName: string) {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const getFilterRangeDate = (): IFilterDate[] => {
  const date = new Date();

  const filterDate: IFilterDate[] = [
    {
      title: "Hôm nay",
      startDate: moment(date)
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toISOString(),
      endDate: moment(date)
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toISOString(),
    },
    {
      title: "7 ngày gần đây",
      startDate: moment(date)
        .set("dates", date.getDate() - 6)
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toISOString(),
      endDate: moment(date)
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toISOString(),
    },
    {
      title: "Tuần này",
      startDate: moment(date)
        .startOf("weeks")
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toISOString(),
      endDate: moment(date)
        .endOf("weeks")
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toISOString(),
    },
    {
      title: "Tháng này",
      startDate: moment(date)
        .startOf("months")
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toISOString(),
      endDate: moment(date)
        .endOf("months")
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toISOString(),
    },
  ];

  return filterDate;
};

const addDays = (date: Date, days: number): Date => {
  date.setDate(date.getDate() + days);
  return date;
};

const renderTextShippingStatus = (value: ShippingStatus, isCash: boolean) => {
  switch (value) {
    case ShippingStatus.Create: {
      return "Tạo mới chưa thanh toán";
    }
    case ShippingStatus.Cash: {
      // if (isCash) {
      //   return "Thanh toán khi nhận hàng";
      // }

      // return "Đã thanh toán";

      return "Đã nhận đơn hàng";
    }
    case ShippingStatus.Pack: {
      return "Đang đóng gói";
    }
    case ShippingStatus.Delivery: {
      return "Đang giao hàng";
    }
    case ShippingStatus.Delivered: {
      return "Đã giao hàng";
    }
    case ShippingStatus.Refund: {
      return "Đang chuyển hoàn";
    }
    case ShippingStatus.Refunded: {
      return "Đã chuyển hoàn";
    }
    default:
      return "";
  }
};

const renderTextPaidType = (value: PaidType) => {
  switch (value) {
    case PaidType.ATM: {
      return "ATM";
    }
    case PaidType.Cash: {
      return "Tiền mặt";
    }
    case PaidType.Momo: {
      return "Ví Momo";
    }
    case PaidType.Points: {
      return "Điểm thưởng";
    }
    case PaidType.InternationalCard: {
      return "Thẻ quốc tế";
    }
    default:
      return "";
  }
};

const convertListToTree = (
  list: any,
  field: string = "id",
  fieldParent: string = "parentId"
) => {
  var map: any = {},
    node,
    roots: any[] = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i][field]] = i;
    list[i].children = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node[fieldParent] && list[map[node[fieldParent]]]) {
      list[map[node[fieldParent]]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};

function findNode(code: string, array: any) {
  for (const node of array) {
    if (node.code === code) return [node];
    if (node.children) {
      const child: any = findNode(code, node.children);
      if (child) return child;
    }
  }
}

const CommonHandle = {
  addDays,
  convertTwoRow,
  convertCurrency,
  formatNumber,
  generateId,
  generateWeek,
  formatDateTime,
  formatDate,
  generateGuidId,
  hasEmail,
  hasPhoneNumber,
  hasImage,
  dateFormat,
  generatePickerData,
  capitalize,
  mergeSearchParams,
  checkContentContainingAbsolutePath,
  checkLink,
  startDownloadFile,
  getFilterRangeDate: getFilterRangeDate,
  renderTextShippingStatus,
  renderTextPaidType,
  convertListToTree,
  findNode,
};

export default CommonHandle;
