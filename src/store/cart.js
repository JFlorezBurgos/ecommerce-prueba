export default {
    state: {
      items: {}, // Cambiado a un objeto para almacenar la cantidad de cada producto
      products: [],
      showSuccessMessage: false,
      hideTimer: null,

    },
    mutations: {
      addToCart(state, product) {
        if (state.items[product.id]) {
          state.items[product.id].quantity++; // Incrementa la cantidad si el producto ya está en el carrito
        } else {
          // Agrega el producto al carrito con una cantidad inicial de 1
          state.items[product.id] = { ...product, quantity: 1 };
        }
        state.showSuccessMessage = true;
        clearTimeout(state.hideTimer);
        state.hideTimer = setTimeout(() => {
          state.showSuccessMessage = false;
        }, 5000);
      },
      removeFromCart(state, productId) {
        // Elimina el producto del carrito
        delete state.items[productId];
      },
      setSearchResults(state, searchResults) {
        state.searchResults = searchResults;
      },
      hideSuccessMessage(state) {
        state.showSuccessMessage = false;
        console.log(state)
      }
     
      
    },
    actions: {
      addProductToCart({ commit }, product) {
        commit('addToCart', product);
      },
      removeProductFromCart({ commit }, productId) {
        commit('removeFromCart', productId);
      },
      searchProducts({ commit, state }, searchTerm) {
        // Obtener la lista de productos del estado
        const products = state.products;
      
        // Realizar la búsqueda de productos basada en el término de búsqueda
        const searchResults = products.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        // Actualizar el estado con los resultados de la búsqueda
        commit('setSearchResults', searchResults);
      }
    }
    
  };
  