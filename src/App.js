
import { useEffect, useState } from 'react'

import './App.css';
import Quiz from './containers/Quiz/Quiz';
import Footer from './components/Footer/Footer';
import ScreenRotation from './components/UI/ScreenRotation/ScreenRotation';

function App() {
  const [orientationDeg, setOrientationDeg] = useState(0);

  useEffect(() => {

    if(window.innerWidth <= 760 && window.matchMedia('(orientation:landscape)').matches){
      setOrientationDeg(90)
    }
    handleOrientationChange();
  }, []);

  const handleOrientationChange= () => {
    if ('onorientationchange' in window) {
      window.addEventListener("orientationchange", (ev) => {
        console.log(ev.currentTarget.orientation);
        console.log(ev);
        setOrientationDeg(ev.currentTarget.orientation)
      }, false);
    }
  };

  let app = (
    <div className="App">
      <Quiz />
      <Footer/>
    </div>
  );

  if (orientationDeg === 90) {
    app = <ScreenRotation/> 
  };

  return app;
}

export default App;
