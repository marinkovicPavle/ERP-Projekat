import Layout from '../layouts/Main';

import { API_URL, fromImageToUrl } from '../utils/urls';

const About = ({about}) => {
    /*const { user, getToken } = useContext(AuthContext);
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
    )*/

    return (
        <Layout>
            <section className="cart">
                <div className="container">
                    <div className="cart-list">
                            <table>
                                <tbody>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>
                                            {about.title}
                                        </th>
                                    </tr>
                                        <div key={about.id}>
                                            <img style={{ display: 'block', margin: '0 auto' }}
                                                src={fromImageToUrl(about.cover)} alt=""
                                            />
                                            <br></br>
                                            <p>{about.content}</p>
                                        </div>
                                </tbody>
                            </table>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const about_res = await fetch(`${API_URL}/about`);

    const about = await about_res.json();

    return {
        props: {
            about: about,
        }
    };
}

export default About;
