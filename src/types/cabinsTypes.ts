export interface CabinType {
  description: string;
  discount: number;
  image: string | ImageFileType;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
export interface CabinResponseType extends CabinType {
  id: number;
  created_at: Date;
  image: string;
}

export interface ImageFileType extends Blob {
  name: string;
  size: number;
  type: string;
}
