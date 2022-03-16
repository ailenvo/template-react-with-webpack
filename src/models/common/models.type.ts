import { ObjectStatus, OrderDirection } from "./models.enum";

export interface IBaseModels {
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  objectStatus?: ObjectStatus;
}

export interface BasePagingReq {
  page?: number;
  pageSize?: number;
  sortNames?: string[];
  sortDirections?: OrderDirection[];
  allItems?: boolean;
  status?: ObjectStatus;
  keyword?: string;
}

export interface BasePagingRes<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  IsFull: boolean;
}

export interface BaseResponse<T> {
  Data: T;
  IsSuccess: boolean;
  IsError: boolean;
  Error: any;
}

export interface MomoPaymentReq {
  appSource: string;
  message: string;
  requestId: string;
  orderId: string;
  extra: string;
  phoneNumber: string;
  status: number;
  data: string;
  momoappversion: string;
  fromapp: string;
  amount: number;
  partnerCode: string;
}

export interface MomoPaymentRes {
  appSource: string;
  message: string;
  requestId: string;
  extra: string;
  phonenumber: string;
  status: 0 | 5 | 6;
  data: string;
  momoappversion: string;
  fromapp: string;
  orderId: string;
}

export interface DeleteMultipleRes {
  ids: number[];
}

export interface IPicker {
  caption: string;
  value: string;
}

export interface IValue {
  code: any;
  name: string;
  icon?: React.ReactNode;
}

export interface IObjectValue {
  [field: string]: any;
}

export interface ISort {
  guid: string;
  name: string;
  direction: OrderDirection;
}

export interface IFilter {
  input?: any;
  sort?: ISort[];
}

export interface IFilterDate {
  title: string;
  startDate: string | Date;
  endDate: string | Date;
}

export interface ICheckBox {
  id: number;
  code: string;
  name: string;
}

export interface IBreadcrumb {
  moduleName: string;
  levelName1: string;
  levelName2?: string;
}

export interface INav {
  title: string;
  path: string;
  icon: JSX.Element | string;
  condition?: boolean;
  children?: INav[];
  info?: any;
  target?: any;
}
