export async function getProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error; // Lanzar el error para que sea manejado por el componente que llame a esta función
    }
  }