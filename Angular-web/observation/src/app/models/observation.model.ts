// ===== models/observation.model.ts =====
export interface PropertyItem {
  value: any;
  label: string;
}

export interface DataItem {
  samplingTime: string;
  properties: PropertyItem[];
}

export interface RootObject {
  id: number;
  name: string;
  datas: DataItem[];
}
