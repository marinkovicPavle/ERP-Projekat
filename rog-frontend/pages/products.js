import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';

import { API_URL } from '../utils/urls';

const Products = ({categories, products}) => (
  <Layout>
    <Breadcrumb />
    <section className="products-page">
      <div className="container">
        <ProductsFilter categories={categories} />
        <ProductsContent products={products}/>
      </div>
    </section>
    <Footer />
  </Layout>
)

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const categories_res = await fetch(`${API_URL}/categories`);
    const products_res = await fetch(`${API_URL}/products`);

    const categories = await categories_res.json();
    const products = await products_res.json();

    return {
        props: {
            categories: categories,
            products: products
        }
    };
}

export default Products
  