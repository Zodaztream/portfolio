export interface Element {
  i: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  chart?: string;
}

export interface ResponseType {
  success: boolean;
  message: string;
  data: string;
}

export interface DataArray {
  elements: Element[];
}
