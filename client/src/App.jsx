import './App.css'
import Header from "./components/Header/Header.jsx";
import StoreItem from "./components/StoreItem/StoreItem.jsx"; 
import pictureSrc from "../public/vite.svg";
function App() {

  return (
    <>
        <Header />
        <div className="store">
          <StoreItem imgSource={pictureSrc} title="vite" price="$4.00"/> 
          <StoreItem imgSource={pictureSrc} title="vite" price="$4.00"/> 
          <StoreItem imgSource={pictureSrc} title="vite" price="$4.00"/> 
        </div>
    </>
  )
}

export default App
