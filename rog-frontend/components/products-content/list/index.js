import useSwr from 'swr';
import ProductItem from './../../product-item';
import ProductsLoading from './loading';

import { fromImageToUrl } from '../../../utils/urls';


const ProductsContent = ({products}) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr('/api/products', fetcher);

  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!products && 
        <ProductsLoading />
      }

      {data &&
        <section className="products-list">
          {products.map(item => (
            <ProductItem 
              discount={item.discount} 
              key={item.id}
              id={item.id} 
              price={item.price}
              currentPrice={item.price}
              productImage={fromImageToUrl(item.image)} 
              name={item.name}
              slug={item.slug}
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent