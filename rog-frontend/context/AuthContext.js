import { createContext, useState, useEffect } from 'react';
import Router from "next/router";
import { Magic } from 'magic-sdk';
import { MAGIC_PUBLIC_KEY } from '../utils/urls';

import { postData } from '../utils/services'; 
import { API_URL } from '../utils/urls'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { useDispatch, useSelector } from 'react-redux';
import { removeAllProducts } from '../store/actions/cartActions';

const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart);


    //const router = useRouter();

    /*const loginUserWithEmailAndPassword = async (data) => {
        loginProvider = 'normal';
        //console.log(data)
        await postData(`${API_URL}/auth/local`, {
          identifier: data.email,
          password: data.password
        }).then(res =>{
            if (res.user) {
                setUser(res);
            }
        });
        //console.log(res);
        console.log('user'+user);
        console.log(loginProvider);
    };*/

    const removeFromCart = () => {
        console.log(cartItems);
        console.log(cartItems);
        /*dispatch(removeAllProducts(
          { 
            cartItems
          }
        ))*/
      }

    const loginUser = async (email) => {
        try {
            await magic.auth.loginWithMagicLink({ email });
            setUser({ email });
            Router.push('/');
        } catch (error) {
            setUser(null);
            console.log(error);
        }
    }

    const logoutUser = async () => {
        try {
            await magic.user.logout();
            setUser(null);
            Router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const checkUserLoggedIn = async () => {
        try {
            const isLoggedIn = await magic.user.isLoggedIn();

            if (isLoggedIn) {
                setLoading(true);
                const { email } = await magic.user.getMetadata();
                setUser({ email });
                //Add this just for test
                const token = await getToken();
                setLoading(false);
                console.log("checkUserLoggedIn token", token);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const getToken = async () => {
        try{
            const token = await magic.user.getIdToken();
            return token;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(cartItems);
        magic = new Magic(MAGIC_PUBLIC_KEY);
        checkUserLoggedIn();
    }, []);

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
        timeout={4000} //3 secs
      />
    );

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
            {props.children}
        </AuthContext.Provider>
    )

}

const emptyCart = () => {
    useSelector(state => {
        state.cart.cartItems = [];
    });
}

export default AuthContext;