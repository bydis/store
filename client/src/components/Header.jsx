import "./Header.css"; 

export default function Header()
{
    return(
        <div className="header">
            <a className="header-item" id="store"  href="">Store</a>
            <a className="header-item"   href="">Cart</a>
            <a className="header-item"   href="">Checkout</a>
            <a className="header-item" id="login"  href="">Login</a>
        </div>
    ); 
}
