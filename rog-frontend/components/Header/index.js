import { useState, useEffect, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import useOnClickOutside from 'use-onclickoutside';
import Logo from '../../assets/icons/logo';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AuthContext from '../../context/AuthContext'

/*dropdown*/
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';

import { removeAllProducts } from '../../store/actions/cartActions';
import { useDispatch } from 'react-redux';

const Header = ({ isErrorPage }) => {
  const router = useRouter();
  const { cartItems } = useSelector(state => state.cart);
  console.log(cartItems)
  const arrayPaths = ['/'];  

  const [onTop, setOnTop] = useState(( !arrayPaths.includes(router.pathname) || isErrorPage ) ? false : true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const { user, logoutUser } = useContext(AuthContext);

  const dispatch = useDispatch();

  const headerClass = () => {
    if(window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  }

  useEffect(() => {
    if(!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function() {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const closeSearch = () => {
    setSearchOpen(false);
  }

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return(
    <header className={`site-header ${!onTop ? 'site-header--fixed' : ''}`}>
      <div className="container">
        <Link href="/">
          <a><h1 className="site-logo"><Logo />ROG-Shop</h1></a>
        </Link>
        <nav ref={navRef} className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}>
          <Link href="/products">
            <a>Products</a>
          </Link>
          {user && user.email == 'pavle019@live.com' && window.location.pathname == '/admin' ?
          <>
          <a href="#">Add product</a>
          <a href="#">Add category</a>
          </>
          : 
          <>
          <a href="#">Inspiration</a>
          <a href="#">Rooms</a>
          <button className="site-nav__btn"><p>Account</p></button>
          </>
          }
        </nav>

        <div className="site-header__actions">
          <button ref={searchRef} className={`search-form-wrapper ${searchOpen ? 'search-form--active' : ''}`}>
            <form className={`search-form`}>
              <i className="icon-cancel" onClick={() => setSearchOpen(!searchOpen)}></i>
              <input type="text" name="search" placeholder="Enter the product you are looking for" />
            </form>  
            <i onClick={() => setSearchOpen(!searchOpen)}  className="icon-search"></i>
          </button>
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>	
              {cartItems.length > 0 && user ?
                <span className="btn-cart__count">{cartItems.length}</span>
              : <span></span>}
            </button>
          </Link>
          {user ? 
          
          <Dropdown style={{marginLeft: "20px"}}>
    <Dropdown.Toggle title={user.email} btnStyle="link"/>
    <Dropdown.Menu>
        <MenuItem onSelect={() => {
                router.push('/account');
            }}>
            Profile
        </MenuItem>
        <MenuItem onSelect={() => {
                router.push('/orders');
            }}>
            Orders
        </MenuItem>
        {user.email == 'pavle019@live.com' &&
            <MenuItem onSelect={() => {
                router.push('/admin');
            }}>
                Admin panel
            </MenuItem>
        }
        <MenuItem onSelect={() => {
                logoutUser();
                dispatch(removeAllProducts());
                //router.push('/');
            }}>
            Logout
        </MenuItem>
    </Dropdown.Menu>
</Dropdown>
          /*(
              
                    <Link href="/account">
                        <button className="site-header__btn-avatar">
                            <i className="icon-avatar"></i> {user.email}
                        </button>
                    </Link>
                )*/ : (
                    <Link href="/login">
                        <button className="site-header__btn-avatar">Login</button>
                    </Link>
                )}
          {/*<Link href="/login">
            <button className="site-header__btn-avatar"><i className="icon-avatar"></i></button>
                </Link>*/}
          <button 
            onClick={() => setMenuOpen(true)} 
            className="site-header__btn-menu">
            <i className="btn-hamburger"><span></span></i>
          </button>
        </div>
      </div>
    </header>
  )
};


export default Header;
