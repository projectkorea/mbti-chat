import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./css/style.css";
import "./css/loader.css";
import "./css/font.css";

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// dev용인가?
// if (window.location.hostname === "localhost") {
//   firebase.functions().useEmulator("localhost", 5001);
// }
