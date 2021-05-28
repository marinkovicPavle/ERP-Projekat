import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllProducts } from '../store/actions/cartActions';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import { API_URL } from '../utils/urls';

import Link from 'next/link';

import Layout from '../layouts/Main';
import Footer from '../components/footer';

const useOrder = (session_id) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(null);

    const { getToken, user } = useContext(AuthContext);

    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user){
            const fetchOrder = async () => {
                dispatch(removeAllProducts());
                setLoading(true);
                try{
                    const token = await getToken();
                    const res = await fetch(`${API_URL}/orders/confirm`, {
                            method: 'POST',
                            body: JSON.stringify({ checkout_session: session_id }),
                            headers: {
                                'Content-type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                    })
    
                    const data = await res.json();
                    setOrder(data);
                } catch (err){
                    setOrder(null);
                }
                setLoading(false);
            }
            fetchOrder();
        }

    }, [user]);

    return { order, loading }
}

export default function Success(){

    const router = useRouter();
    const { session_id } = router.query;
    const { order, loading } = useOrder(session_id);

    return (
        <Layout>
            <div>
                <h2>Hold on!</h2>
                { loading && <p>We're confirming your purchase!</p>}
                { !loading && order && (
                    <p>Your order was processed successfully! <Link href="/account">View Orders</Link></p>
                )}
            </div>
            <Footer />
        </Layout>
    );
}