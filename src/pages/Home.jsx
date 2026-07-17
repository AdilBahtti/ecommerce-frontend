import { useState } from 'react';
import CategoryBar from '../components/CategoryBar';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';

import styles from './Home.module.css';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import {getAllProducts  ,getFilterProducts  , productPagination } from '../feature/product/productThunk';
import {getAllCategories } from '../feature/category/categoryThunk';
import { useDispatch } from 'react-redux';


export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });

  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
     const totalPages = products.length > 0 ? Math.ceil(products.length / 1) : 1; // Assuming 1 product per page
    useEffect(() => {

      if (activeCategory === 'all' && !priceRange.minPrice && !priceRange.maxPrice) {
        dispatch(getAllProducts());
      }
      dispatch(getFilterProducts({ category: activeCategory, minPrice: priceRange.minPrice, maxPrice: priceRange.maxPrice }));
    }, [activeCategory, priceRange, dispatch]); 
        
  
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <CategoryBar
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <FilterBar onApply={setPriceRange} />
      </div>

      <ProductGrid products={products} />

    
    </div>
  );
}