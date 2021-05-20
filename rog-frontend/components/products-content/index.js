import { useState } from 'react';
import List from './list';

const ProductsContent = ({products}) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  console.log(products);
  
  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>All products<span> ({products.length})</span></h2>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className="products-filter-btn"><i className="icon-filters"></i></button>
        <form className={`products-content__filter ${orderProductsOpen ? 'products-order-open' : ''}`}>
          <div className="products__filter__select">
            <h4>Show products: </h4>
            <div className="select-wrapper">
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sort by: </h4>
            <div className="select-wrapper">
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List products={products}/>
    </section>
  );
};
  
export default ProductsContent
  