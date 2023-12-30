import React, { useEffect, useState } from 'react';
import './css/filter.css';

import lupa from '../media/img/lupa.png'
import funil from '../media/img/funil.png'
import orderBy from '../media/img/orderBy.png'

const Filter = ({changeSearch,changeCatData,changeOrder,changeOrderElement}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checks, setChecks] = useState({'order':false});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.gbif.org/v1/enumeration/basic/Kingdom');
        
        if (!response.ok) {
          throw new Error(`Error HTTPS! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (erro) {
        console.error('Erro:', erro);
      } finally {
        setLoading(false); // Marca o carregamento como concluído, mesmo em caso de erro
      }
    };

    fetchData();
  }, []); 

  const hEnter = (e) =>{
    if(e.key ==='Enter'){
       console.log("alteras-te");
    }
  }

  const hChange = (e) =>{
       console.log("alteras-te " + e.target.value);
       changeSearch(e.target.value);
  }

  const hChangeSelect = (e) =>{
       console.log(e.target.value);
       changeCatData(e.target.value);
  }

  const hChangeOrderElement = (e) =>{
       console.log(e.target.value);
       changeOrderElement(e.target.value);
  }

  const hChangeOrder = (e) =>{
    console.log(e.target.value);
    changeOrder(e.target.value);
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='parametros'>
          {loading ? (
            <p>a carregar</p>
          ) : (
            <>
            <div className='searchDiv'>
              <div className='iconDiv'>
                <img className="icon" src={lupa} alt="icon lupa"/>
              </div>
              <input name="search" type="search" 
                placeholder="Search"
                onChange={hChange}
                onKeyDown={hEnter}
              />
            </div>

            <div className='filterDiv'>
              <div className='iconDiv'>
                <img className="icon" src={funil} alt="icon lupa"/>
              </div>
              <select name="categoria" id="cat"
                onChange={hChangeSelect}
              >
                <option key="-1" value=' '>All</option>
                {Array.from({ length: data.length }, (_, i) => (
                    <option key={i} value={data[i]}>
                      {capitalizeFirstLetter(data[i].toLowerCase())}    
                    </option>
                ))}
              </select>
            </div>

            <div className='orderDiv'>
               <div className='iconDiv'>
                  <img className="icon" src={orderBy} alt="icon lupa"/>
                </div>
              <div>
                <select name="elementOrder" 
                  id="orderElem"
                  onChange={hChangeOrderElement}
                >
                    <option key='0' value='name' >Name</option>
                    <option key='1' value='image'>Image</option>
                    <option key='2' value='kingdom'>Kingdom</option>
                </select>
                <select
                  name="order"
                  id="order"
                  onChange={hChangeOrder}
                  >
                    <option key='0' value={true}>Ascending</option>
                    <option key='1' value={false}>Descending</option>
                  </select>
              </div>
              </div>
            </>
          )}
        </div>
  );
};

export default Filter;


