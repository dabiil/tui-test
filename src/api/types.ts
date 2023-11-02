export interface IAutoSuggestResponse {
  category: string;
  icon: string;
  type: string;
  items: IAutoSuggestItem[];
}

export interface IAutoSuggestItem {
  key: string;
  name: string;
  level: number;
  parent: string;
  source: string;
}
