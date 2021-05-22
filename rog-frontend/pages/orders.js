import Layout from '../layouts/Main';

import Loader from "react-loader-spinner";

import AuthContext from '../context/AuthContext';
import { API_URL, fromImageToUrl } from '../utils/urls';
import { useContext, useState, useEffect } from 'react';

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            if (user) {
                try {
                    const token = await getToken();
                    const orderRes = await fetch(`${API_URL}/orders`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await orderRes.json();
                    console.log('Data', data);
                    setOrders(data);
                } catch (error) {
                    setOrders([]);
                }
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    return { orders, loading };
};

const Orders = () => {
    const { user, getToken } = useContext(AuthContext);
    const { orders, loading } = useOrders(user, getToken);
    console.log(orders);

    if(loading) return (
        <Loader
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        type="Bars"
        color="#FBB03A"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    )

    return (
        <Layout>
            <section className="cart">
                <div className="container">
                    <div className="cart-list">
                        {orders.length > 0 ? (
                            <table>
                                <tbody>
                                    <tr>
                                        <th style={{ textAlign: 'left' }}>
                                            My Orders:
                                        </th>
                                    </tr>

                                    {orders.map((order) => (
                                        <div key={order.id}>
                                            <p>
                                                Date created:{' '}
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString(
                                                    'en-EN'
                                                )}{' '}
                                            </p>
                                            <p>Order total: ${order.total}</p>
                                            <p>Order status: {order.status}</p>
                                            <p>Products:</p>
                                            {order.products.map((product) => (
                                                <tr>
                                                    <td>
                                                        <div className="cart-product">
                                                            <div className="cart-product__img">
                                                                <img
                                                                    src={fromImageToUrl(
                                                                        product.image
                                                                    )}
                                                                    alt=""
                                                                />
                                                            </div>

                                                            <div className="cart-product__content">
                                                                <h3>
                                                                    {
                                                                        product.name
                                                                    }
                                                                </h3>
                                                                <p>
                                                                    #
                                                                    {product.id}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="cart-item-before"
                                                        data-label="Color"
                                                    ></td>
                                                    <td
                                                        className="cart-item-before"
                                                        data-label="Size"
                                                    ></td>
                                                    <td>
                                                        <div className="quantity-button">
                                                            {' '}
                                                            {(() => {
                                                                if (
                                                                    order
                                                                        .products
                                                                        .length ==
                                                                    1
                                                                ) {
                                                                    if (
                                                                        order.total ==
                                                                        product.price
                                                                    ) {
                                                                        return (
                                                                            <span>
                                                                                1
                                                                            </span>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <span>
                                                                                {order.total /
                                                                                    product.price}
                                                                            </span>
                                                                        );
                                                                    }
                                                                } else {
                                                                    return (
                                                                        <span>
                                                                            Unknown
                                                                        </span>
                                                                    );
                                                                }
                                                            })()}
                                                        </div>
                                                    </td>
                                                    <td>${product.price}</td>
                                                </tr>
                                            ))}
                                        </div>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>You still didnt order anything.</p>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Orders;
