export interface iFinishFailed {
  values: any;
  errorFields: {
      name: (string | number)[];
      errors: string[];
  }[];
  outOfDate: boolean;
}

export type gender = 'male' | 'female' | ''

export interface iPetOwnerItem {
  id: string,
  name: string,
  gender: gender,
  birthday?: string,
  phone: string,
  email?: string,
  [key: string]: any
}

export interface iPetItem {
  id: string,
  name: string,
  gender: gender,
  breed?: string,
  species?: string,
  petOwner?: iPetOwnerItem,
  [key: string]: any
}

export interface iMenu {
  path: string,
  name: string,
  icon: string,
}

export interface iMenus extends iMenu {
  subMenu?: iMenu[]
}

export interface iSidebar {
  menus: iMenus[],
  selectedItem: string[] | undefined,
  openKeys: string[] | undefined,
}

export interface AuthToken {
  accessToken: string,
  expiresIn: number,
  user: {
    [key: string]: any
  },
  [key: string]: any
}

export interface DataList {
  rows?: [],
  count?: number | undefined,
  page?: number | undefined,
  perPage?: number | undefined,
}

export interface DataItem {
  data?: {
    [key: string]: any
  },
  message?: string
}