import { useState } from 'react';
import Footer from '../../components/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFeatured from '../../components/products-featured';
import Gallery from '../../components/product-single/gallery';
import Content from '../../components/product-single/content';
import Description from '../../components/product-single/description';
import Reviews from '../../components/product-single/reviews';
import { server } from '../../utils/server'; 

import { fromImageToUrl, API_URL } from '../../utils/urls'


/*export async function getServerSideProps({ query }) {

  const pid = query.pid;
  const res = await fetch(`${server}/api/product/${pid}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  }
}*/

const Product = ({ product }) => {
  const [showBlock, setShowBlock] = useState('description');

  return (
    <Layout>
      <Breadcrumb currentPage={product.name} />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            {/*<Gallery images={fromImageToUrl(product.image)} />*/}
            <div className="product-gallery__image">
                <img style={{height: "600px", width: "800px", paddingRight: "50px"}} src={fromImageToUrl(product.image)} alt="" />
            </div>
            <Content product={product} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button type="button" onClick={() => setShowBlock('description')} className={`btn btn--rounded ${showBlock === 'description' ? 'btn--active' : ''}`}>Description</button>
              <button type="button" onClick={() => setShowBlock('reviews')} className={`btn btn--rounded ${showBlock === 'reviews' ? 'btn--active' : ''}`}>Reviews (2)</button>
            </div>

            <Description product={product} show={showBlock === 'description'} />
            <Reviews product={product} show={showBlock === 'reviews'} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps({params: {slug}}) {
    const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
    const found = await product_res.json()
  
    return {
      props: {
          product: found[0]
      }
    }
  }
  
  export async function getStaticPaths() {
      // Get external data from the file system, API, DB, etc.
      const products_res = await fetch(`${API_URL}/products`)
      const products = await products_res.json()
      return {
          paths: products.map(el => ({
              params: {slug: String(el.slug)}
          })),
          fallback: false
      };
  }

export default Product
