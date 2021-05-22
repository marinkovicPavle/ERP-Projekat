import { useContext, useState, useEffect } from "react";
import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Link from 'next/link';
import Head from 'next/head';

import AuthContext from "../context/AuthContext";
import { API_URL } from '../utils/urls'

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            if(user){
                try{
                    const token = await getToken();
                    const orderRes = await fetch(`${API_URL}/orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await orderRes.json();
                    console.log("Data",data);
                    setOrders(data);
                } catch(error){
                    setOrders([]);
                }
            }
            setLoading(false);
        }

        fetchOrders();
    }, [user]);

    return {orders, loading}
}

function getProductById(id) {
    const [product, setProduct] = useState('');

    useEffect(async () => {
        const product_res = await fetch(`${API_URL}/products/${id}`);
        const fetchedProduct = await product_res.json();
        setProduct(fetchedProduct);
    }, []);

    console.log("ID",id);
    console.log("Product",product.name);
    return {product};
}

export default function Account () {

    const { user, logoutUser, getToken} = useContext(AuthContext);
    
    const { orders, loading } = useOrders(user, getToken);
    console.log("Acc.orders",orders);

    if(!user){
        return (
            <div>
                <p>Please Login or Register before accessing this page</p>
                <Link href="/"><a>Go Back</a></Link>
            </div>
        )
    }

    return (
        <Layout>
        <div>
            <Head>
                <title>Your Account</title>
                <meta name="description" content="Your orders will be shown here" />
            </Head>
            <h2>Account Page</h2>
            
            <h3>Your Orders</h3>
            {loading && <p>Orders are Loading</p>}
            {orders.map(order => (
                <div key={order.id}>
                    {new Date(order.createdAt).toLocaleDateString( 'en-EN' )} ${order.total} {order.status}
                    <p>Purchased products:</p>
                    {order.products.map(product => (
                        <div key={product.id}>{product.name}</div>
                    ))}
                </div>
            ))}
            <hr />
            <p>Logged in as {user.email}</p>
            <p><a href="#" onClick={logoutUser}>Logout</a></p>
        </div>
        <Footer />
        </Layout>
    )
}