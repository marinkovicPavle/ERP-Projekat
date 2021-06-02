import Layout from '../layouts/Main';
import Link from 'next/link';

const Faq = () => {
return (
    <Layout>
        <div className="form-block"  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <Link href={'/'}>
          <h2 className="form-block__title"><a href="">Back home</a></h2>
        </Link>
          <p className="form-block__description">Coming soon!</p>
          <br></br>
          <p className="form-block__description">Page is not avaliable yet! We will release the page as soon as posible. Subscribe to oure newsletter so you can be informed when page come live.</p>
        </div>
    </Layout>
)
};

export default Faq;