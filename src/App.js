import './App.css';
import './css/font.css';

import thumbnail from './media/img/landscape-1858602_1280.jpg';

import React,{ useState }from 'react';
import Filter from './components/Filter.js'
import List from './components/List.js'




function App() {
  const [seachData, setSearch] = useState('');
  const [catData, setCatData] = useState (' ');
  const [orderElement, setOrderElement] = useState ('name');
  const [order, setOrder] = useState('true');
  


  const changeSearch = newD => {
    setSearch(newD);
    console.log(newD);
  };

  const changeCatData = newD =>{
    setCatData(newD);
    console.log(newD);
  }

  const changeOrder = newD =>{
    setOrder(newD);
    console.log(newD);
  }

  const changeOrderElement = newD =>{
    setOrderElement(newD);
    console.log(newD);
  }

  return (
    <div className="App">
      <nav>
       <h3>Unic Edition</h3>
       <h2>
         RandomFind
       </h2>
       <h3>29/12/2013</h3>
      </nav>

        <div className='blocoEntrada'>
          <div className="imageDiv">
            <img src={thumbnail} alt="Imagem ThumbNail"/>
          </div>
          <div className='textoBlocoEntr'>
            <h1>
              Search Occurrences of Animals and Plants!
            </h1>
            <h6 id='textoApi' >power by BGIF API</h6>
          </div>
        </div>

        <div className='corpo'>
          <div className='aaa'>
            <div className='all'>
            <Filter changeSearch={changeSearch} changeCatData={changeCatData} changeOrder={changeOrder} changeOrderElement={changeOrderElement}/>
            </div>
          </div>
          <div className='corpoInt all'>
          <List seachData={seachData} catData={catData} order={order} orderElement={orderElement}/>
          </div>
        </div>

        <footer>
            <div>
              <h4>
                About:
              </h4>
              <p>
                This website aims to research/exploit animals and plants through incidents recorded by Gbif users.
                 Having been developed within the scope of the Web Development course - FCTUC.
              </p>
            </div>
            <div>
               <h4>
                 Scope:
               </h4>
               <p>
                 UC (University of Coimbra)
               </p>
               <p>                
                 FCTUC (Faculty of Science and Technology of Coimbra)
               </p>
               <p>
                 MDM (Master’s in Multimedia Design)
               </p>
               <p>
                 DW (Web Development)
               </p>
            </div>
        </footer>
      </div>

  );
}

export default App;
