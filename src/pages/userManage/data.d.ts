export type TableListItem = {
  id: number;
  name: boolean;
  authentication: boolean; // 是否实名认证
  age: number;
  sex: male|female; // male: 男性， fenale: 女性
  education: primary | juniorHign | high | college | doctorate | small ; // primary: 小学，juniorHign: 初中, high：高中 college： 大学， doctorate：博士, small: 没上过学
  marrary: unmarried | divorce; // unmarried: 未婚 divorce: 离婚
  describe?: string; // 描述
  introduction: string; // 自我介绍
  householdProvince: string; // 户籍-省
  householdCity: string; // 户籍-市
  workplaceProvince: string; // 工作地-省
  workplaceCity: string; // 工作地-市
  work: string; // 工作
  height: number; // 身高
  weight: number; // 体重
  mobile: string; // 手机号
  wechatNum: string; // 微信号
  updatedAt: Date;
  createdAt: Date;
  creator: string; // 创建人
  modifier: string; // 修改人
  requirement: string; // 要求
  mark?: string; // 备注
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

