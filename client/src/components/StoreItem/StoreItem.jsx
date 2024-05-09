export default function StoreItem({ imgSource, title, price })
{
    return (
        <div> 
            <img src= { imgSource } alt= { title } />
            <p> { title } </p>
            <p> { price } </p>
        </div>
    )
}
