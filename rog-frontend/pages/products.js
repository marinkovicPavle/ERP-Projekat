import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';

import { API_URL } from '../utils/urls';
import { useEffect, useState } from 'react';

const Products = ({categories, products}) => {

    const [productData, setProductData] = useState(null)
    const [query, setQuery] = useState(null);

    useEffect(()=>{
        if(products) {
            setProductData(products)
        }
    }, [products])

    useEffect(()=>{
        if(productData && query) {
            filterCategory()
        }
    }, [query])

    function choseType(type) {
        if(type) {
            if(type === query) {
                setProductData(products)
                setQuery(null)
                return;
            }
            setQuery(type)

        }
    }

    function filterCategory() {
        const filteredData = []
        products.map((product)=>{
            if(product.category.Name === query) {
                filteredData.push(product)
            }
        })

        setProductData(filteredData)
    }

    return (
        <Layout>
          <Breadcrumb />
          <section className="products-page">
            <div className="container">
              <ProductsFilter categories={categories} choseType={choseType} query={query} />
              <ProductsContent products={productData} query={query}/>
            </div>
          </section>
          <Footer />
        </Layout>
      )
}

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
  