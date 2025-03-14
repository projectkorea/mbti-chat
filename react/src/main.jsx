import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import "src/css/style.css";
import "src/css/loader.css";
import "src/css/font.css";

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// dev용인가?
// if (window.location.hostname === "localhost") {
//   firebase.functions().useEmulator("localhost", 5001);
// }
