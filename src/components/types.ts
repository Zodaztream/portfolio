export interface Element {
  i: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  chart?: string;
}

export interface ElementState {
  elements: {
    [key: string]: Element;
  };
}

export interface Elements {
  [key: string]: Element;
}

export interface ResponseType {
  success: boolean;
  message: string;
  data: string;
}

export interface DataArray {
  elements: Element[];
  background: string;
}
