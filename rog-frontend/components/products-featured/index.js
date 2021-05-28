import ProductsCarousel from './carousel';
import useSwr from 'swr';
import Link from 'next/link';


const ProductsFeatured = ({products}) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSwr('/api/products', fetcher);
  console.log('Produkti'+products)

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <Link href="/products">
            <a className="btn btn--rounded btn--border">Show All</a>
          </Link>
        </header>

        <ProductsCarousel products={products} />
      </div>
    </section>
  )
};

export default ProductsFeatured