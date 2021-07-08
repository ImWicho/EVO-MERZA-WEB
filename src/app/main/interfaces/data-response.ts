export interface DataService {
  id_historialestante: number;
  id_estante: number;
  id_estatusalerta: number;
  url_foto: string;
  descripcion_alerta: string;
  fecha_creacion: Date;
  products: Product[];
}

export interface Product {
  id_historialproductosestante: number;
  id_historialestante: number;
  total_productos_detectado: number;
  id_producto: number;
}
