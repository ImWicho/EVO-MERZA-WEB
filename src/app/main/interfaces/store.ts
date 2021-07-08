export interface Store {
  id_tienda: number;
  nombre: string;
  domicilio: string;
}

export interface Aisle {
  id_pasillotienda: number;
  id_tienda: number;
  id_pasillo: number;
  descripcion: string;
}

export interface Shelf {
  id_estante: number;
  id_pasillotienda: number;
  codigo: string;
  filas_total: number;
  columnas_total: number;
}


