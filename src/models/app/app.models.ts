import { ObjectStatus } from "../common/models.enum";

export interface INavItem {
  href: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  children?: INavItem[];
  code?: string;
}

export interface IBannerReq {
  url: string;
  position?: number;
  description?: string;
  status?: ObjectStatus;
}

export interface IBannerRes extends IBannerReq {
  id: number;
  updatedAt: string;
  createdAt: string;
  status: ObjectStatus;
}
