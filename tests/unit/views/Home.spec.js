import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('should filter products by selected category', async () => {
    const wrapper = mount(Home);
    await wrapper.setData({ products: [{ id: 1, category: 'Category 1' }, { id: 2, category: 'Category 2' }] });

    // Set selected category
    await wrapper.setData({ selectedCategory: 'Category 1' });

    // Verify that only products with selected category are displayed
    expect(wrapper.vm.filteredProducts).toEqual([{ id: 1, category: 'Category 1' }]);
  });

  it('should filter products by brand', async () => {
    const wrapper = mount(Home);
    await wrapper.setData({ products: [{ id: 1, brand: 'Brand 1', category: 'Category 1' }, { id: 2, brand: 'Brand 2', category: 'Category 2' }] });

    // Set brand filter
    await wrapper.setData({ brandFilter: 'Brand 1' });

    // Verify that only products with selected brand are displayed
    expect(wrapper.vm.filteredProducts).toEqual([{ id: 1, brand: 'Brand 1', category: 'Category 1' }]);
  });

  // Add more tests for other filters and functionalities as needed
});
