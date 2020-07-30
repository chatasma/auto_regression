import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header.js'
import * as serviceWorker from './serviceWorker';

//pages for this product

ReactDOM.render(
  <React.StrictMode>
    <Container/>
    <Header/>
      
  </React.StrictMode>,
  document.getElementById('root')
);

// export default function home(props){
//     const { ...rest } = props;
//     return(
//         <div>
//             <Header/>
//         </div>
//     );
// }


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
