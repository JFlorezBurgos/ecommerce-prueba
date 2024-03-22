import { getProducts } from '@/api/api'; // Ajusta la ruta de importación según sea necesario
import fetchMock from 'fetch-mock';

describe('getProducts', () => {
  afterEach(() => {
    fetchMock.restore(); // Restaurar fetchMock después de cada prueba
  });

  it('should return products', async () => {
    // Simular la respuesta de la API con datos de prueba
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    fetchMock.get('https://dummyjson.com/products', {
      status: 200,
      body: { products: mockProducts }
    });

    // Llamar a la función getProducts
    const products = await getProducts();

    // Verificar que la función devuelva los productos esperados
    expect(products).toEqual(mockProducts);
  });
});
