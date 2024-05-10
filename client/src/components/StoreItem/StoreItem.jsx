import "./StoreItem.css"; 

export default function StoreItem({ imgSource, title, price })
{
    return (
        <div className="store-item"> 
            <img src= { imgSource } alt= { title } />
            <p> { title } </p>
            <p> { price } </p>
        </div>
    )
}
