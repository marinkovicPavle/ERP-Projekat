import Layout from '../../layouts/Main';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { server } from '../../utils/server'; 
import { postData } from '../../utils/services'; 
import { useRouter } from 'next/router';

import { useContext, useState } from 'react';
import { API_URL } from '../../utils/urls'

import AuthContext from '../../context/AuthContext';

/*dropdown*/
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';

const CategoriesPage = ({products}) => {

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [product, setProduct] = useState("");

  const { register, errors } = useForm();

  const { getToken,logoutUser, user } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    var category = {
        name: name,
        description: content,
        products: [product.id]
    }
    e.preventDefault();
    const token = await getToken();
    const res = await fetch(`${API_URL}/categories/`, {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
    });
    alert('Category added!');
  };

  if(!user || user.email != 'pavle019@live.com') { 
    router.push('/');
    return (
        <Layout>
        <div className="form-block"  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
        <Link href={'/login'}>
          <h2 className="form-block__title"><a href="">Log in</a></h2>
        </Link>
          <p className="form-block__description">You need to have admin rights to access this page!</p>
        </div>
    </Layout>
    )
  }

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/">
              <a><i className="icon-left"></i> Back to store</a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Add category</h2>
            <p className="form-block__description">Fill the form belov to add new category to site. 
            Please fill all fields. Added category can be found on products page after submiting form.</p>
            
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  placeholder="Name" 
                  onChange={(e) => setName(e.target.value)}
                  type="text" 
                  name="email"
                  ref={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                {errors.email && errors.email.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }

                {errors.email && errors.email.type === 'pattern' && 
                  <p className="message message--error">Please write a valid email</p>
                }
              </div>

              <div className="form__input-row">
              <Dropdown style={{marginLeft: "20px", width: "90%", marginLeft: "5%"}}>
    <Dropdown.Toggle style={{width: "100%"}} title={product.name ? product.name : "Select Product"} btnStyle="flat"/>
    <Dropdown.Menu>
    {products.map(item => (
              <MenuItem eventKey={item} onSelect={(eventKey) => {
                    setProduct(eventKey);
               }}>
                 {item.name} 
                </MenuItem>
            ))}
    </Dropdown.Menu>
</Dropdown>
</div>
              
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Description" 
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }
              </div>

              <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Add category</button>
            </form>
          </div>

        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const products_res = await fetch(`${API_URL}/products`);

    const products = await products_res.json();

    return {
        props: {
            products: products
        }
    };
}

export default CategoriesPage