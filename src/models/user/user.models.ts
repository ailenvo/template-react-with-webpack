import { ObjectStatus, Roles } from "../common/models.enum";

export interface IUserReq {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: Roles;
  dateOfBirth?: Date | string | null;
  address?: string;
  departmentCode?: string;
  reportPermissionDeptCodes?: string[];
  reportPermissionDeptNames?: string;
  status?: ObjectStatus;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IUserRes {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  email?: string;
  role?: Roles;
  phoneNumber?: string;
  dateOfBirth?: Date | string | null;
  address?: string;
  departmentCode?: string;
  departmentName?: string;
  reportPermissionDeptCodes?: string[];
  reportPermissionDeptNames?: string;
  accountId: number;
  companyId?: number;
  createdAt?: string | Date;
  createdBy?: number | null;
  updatedAt?: string | Date;
  updatedBy?: number | null;
  username?: string;
  objectStatus?: ObjectStatus;
}

export interface IUpdateDepartmentForUsers {
  ids?: number[];
  departmentCode?: string;
}

export interface IUser extends IUserRes {}

export interface IGetPointsRes {
  userId: number;
  point: number;
}

export interface IUpdateAvatarRes {
  //files: ImageOrVideo;
}
