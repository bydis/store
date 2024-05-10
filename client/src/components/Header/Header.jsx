import "./Header.css"; 

export default function Header()
{
    return(
        <nav className="header">
        <button className="hamburger-button">
          <span className="hamburger-line" />
        </button>
            <a className="header-item" id="store"  href="">Store</a>
            <a className="header-item"   href="">Cart</a>
            <a className="header-item"   href="">Checkout</a>
            <a className="header-item" id="login"  href="">Login</a>
        </nav>
    ); 
}
