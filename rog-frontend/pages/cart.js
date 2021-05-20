import Layout from '../layouts/Main';
import ShoppingCart from '../components/shopping-cart';

import { useContext } from 'react';
import AuthContext from "../context/AuthContext";

import Link from 'next/link';

const Products = () => {
  const { user } = useContext(AuthContext);

  if(!user) return (
    <Layout>
        <div className="form-block"  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <Link href={'/login'}>
          <h2 className="form-block__title"><a href="">Log in</a></h2>
        </Link>
          <p className="form-block__description">You need to login to access cart!</p>
        </div>
    </Layout>
  )

  return(
    <Layout>
      <ShoppingCart />
    </Layout>
)}
  
export default Products
  