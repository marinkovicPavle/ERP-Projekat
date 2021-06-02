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

const AdminPage = ({categories, products}) => {

  const [input, setInput] = useState("");

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const { register, errors } = useForm();

  const { getToken,logoutUser, user } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    var product = {
        name: name,
        content: content,
        price: price,
        category: category.id
    }
    e.preventDefault();
    const token = await getToken();
    const res = await fetch(`${API_URL}/products/`, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
    });
    alert('Product added!');
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
            <h2 className="form-block__title">Add product</h2>
            <p className="form-block__description">Fill the form belov to add new product to site. 
            Please fill all fields. Added product can be found on products page after submiting form.</p>
            
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
    <Dropdown.Toggle style={{width: "100%"}} title={category.name ? category.name : "Select Category"} btnStyle="flat"/>
    <Dropdown.Menu>
    {categories.map(item => (
              <MenuItem eventKey={item} onSelect={(eventKey) => {
                    setCategory(eventKey);
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
                  placeholder="Content" 
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }
              </div>

              <div className="form__input-row">
                <input 
                  className="form__input" 
                  type="number" 
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price" 
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }
              </div>

              <div className="form__input-row">
                <input 
                  className="form__input" 
                  type="text" 
                  placeholder="Image" 
                  onChange={(e) => setImage(e.target.value)}
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }
              </div>

              <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Add product</button>
            </form>
          </div>

        </div>
      </section>
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

export default AdminPage
  