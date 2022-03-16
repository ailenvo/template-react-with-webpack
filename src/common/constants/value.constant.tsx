import * as React from "react";
import { IValue } from "../../models/common/models.type";
import { Circle } from "@mui/icons-material";
import { ObjectStatus, ShippingStatus } from "../../models/common/models.enum";

export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_REQ_FORMAT = "YYYY-MM-DD HH:mm:ss";

const FILTER_FIELD_BASE: IValue[] = [
  {
    code: "id",
    name: "Mã",
  },
  {
    code: "title",
    name: "Tiêu đề",
  },
  {
    code: "updatedAt",
    name: "Ngày chỉnh sửa",
  },
  {
    code: "createdAt",
    name: "Ngày tạo",
  },
  {
    code: "objectStatus",
    name: "Trạng thái",
  },
];

const FILTER_STATUS: IValue[] = [
  {
    code: ObjectStatus.Active,
    name: "Hiển thị",
    icon: (
      <Circle
        sx={{
          color: "rgb(39, 171, 110)",
          width: 10,
          height: 10,
          marginRight: 2,
        }}
      />
    ),
  },
  {
    code: ObjectStatus.DeActive,
    name: "Ẩn",
    icon: (
      <Circle
        sx={{
          color: "rgb(171 39 39)",
          width: 10,
          height: 10,
          marginRight: 2,
        }}
      />
    ),
  },
];

const FILTER_STATUS_ALL: IValue[] = [
  {
    code: "All",
    name: "Tất cả",
    icon: (
      <Circle
        sx={{
          color: "#5664d2",
          width: 10,
          height: 10,
          marginRight: 2,
        }}
      />
    ),
  },
  {
    code: ObjectStatus.Active,
    name: "Hiển thị",
    icon: (
      <Circle
        sx={{
          color: "rgb(39, 171, 110)",
          width: 10,
          height: 10,
          marginRight: 2,
        }}
      />
    ),
  },
  {
    code: ObjectStatus.DeActive,
    name: "Ẩn",
    icon: (
      <Circle
        sx={{
          color: "rgb(171 39 39)",
          width: 10,
          height: 10,
          marginRight: 2,
        }}
      />
    ),
  },
];

const FILTER_SHIPPING_STATUS: IValue[] = [
  { code: ShippingStatus.Create, name: "Tạo mới chưa thanh toán" },
  { code: ShippingStatus.Cash, name: "Đã nhận đơn hàng" },
  { code: ShippingStatus.Pack, name: "Đang đóng gói" },
  { code: ShippingStatus.Delivery, name: "Đang giao hàng" },
  {
    code: ShippingStatus.Delivered,
    name: "Đã giao hàng",
  },
  { code: ShippingStatus.Refund, name: "Đang chuyển hoàn" },
  {
    code: ShippingStatus.Refunded,
    name: "Đã chuyển hoàn",
  },
];

const REPORT_TYPE: IValue[] = [
  {
    code: "soluong",
    name: "Số lượng",
  },
  {
    code: "thoigian",
    name: "Thời gian",
  },
  {
    code: "phantram",
    name: "Phần trăm",
  },
];

const VALUE_LIST = {
  FILTER_FIELD_BASE,
  FILTER_STATUS,
  FILTER_STATUS_ALL,
  FILTER_SHIPPING_STATUS,
  REPORT_TYPE,
};

export default VALUE_LIST;
