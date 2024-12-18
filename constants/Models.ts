interface TVariant {
  berat: number;
  harga: number;
  harga_diskon: number;
  id: number;
  stok: number;
  ukuran: string;
  warna: string;
}

export interface TProduct {
  alamat_toko: string;
  deskripsi: string;
  foto1: string;
  foto2: null | string;
  foto3: null | string;
  id: number;
  id_toko: number;
  kode_alamat: string;
  kondisi: string;
  nama_produk: string;
  nama_toko: string;
  rating: number;
  updated_at: string;
  value: string;
  varian: TVariant[];
}
