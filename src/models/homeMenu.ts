import { DataSourceItemObject } from 'antd/lib/auto-complete';

export const MenuType = ['menu', 'floor', 'URL', 'generalTerms'] as const;

type HomeMenuModel = {
  ID: string;
  homeMenuName: string;
  description?: string;
  customUrl?: string;
  createdAt: Date;
  menuType: typeof MenuType;
};

export default HomeMenuModel;
