import React, { useEffect, useState } from 'react';

const List = ({seachData,catData,order,orderElement}) => {
    //url 
    //const url = 'https://api.gbif.org/v1/species/suggest?q=';
    const url = 'https://api.gbif.org/v1/occurrence/search?q=';
    const lim = '&limit=30'
    //const urlMedia = 'https://api.gbif.org/v1/species/';
    const urlMedia = '&mediaType=StillImage';
    
    
    //DATA
      //carregar sugestion Data
        const [data, setData] = useState(null); 
      //filtrar sugestion Data 
        const [dataFilt, setDataFilt] = useState(null);
      //carregar media Data
        const [dataD, setDataD] = useState ([]);

    //Loadings 
      //sugestion caarregamento 
      const [loading, setLoading] = useState(true);
      //media carregamento
      const [indLoad, setIndLoad] = useState([]);   
      const [nLoad,setNLoad] = useState(0);   
      const [allInLoad,setInLoad] = useState(true);
      //filtragem
      const [loadingFilt,setLoadFilt] = useState(true); 
      //ordem
      const [loadingOrder,setLoadOrder] = useState(true);
      const [orderData, setOrderData] = useState([]); 
      //Imagem 
      const [dataImageL, setImageL] = useState ([]); //Array de loading de imagens 
  
    let name = 'aa';

    //Filtros 
      const [catAntF, setCatAntF] = useState ('');

    //order 
      let orderAnt;
      let orientaAnt;

    //return
      const [idD, setId] = useState(-1);

    ////////////////////////////////////////////CARREGAMENTO DE SUGESTOES 
    useEffect(() => {
      const fetchData = async () => {
        let result = [];
        let array = [];

        try {
          console.log(catData.toLowerCase());
          const response = await fetch(`${url}${name}${urlMedia}${lim}`);
          console.log(`${url}${name}`);
          if (!response.ok) {
            throw new Error(`Error HTTPS! Status: ${response.status}`);
          }
  
          ///////////////////////////////////////////////GET DATA
          result = await response.json();

          //console.log(indLoad,array);
          let auxData=[];
          for(let i=0; i<result.results.length; i++){
            auxData.push({data:result.results[i],id:i});/////////////////////////////SET DATA
            console.log({data:result.results[i],id:i});
          } 
          setData(auxData);

          //Imagens logadas
          let mediaLArray = [];
          for(let a=0; a<result.results.length; a++){
          for(let i=0; i<result.results[a].media.length;i++){
                mediaLArray.push(true);
          }
          setImageL(dataImageL=>[...dataImageL,{id:a, mediaL:mediaLArray}]);
         }
          

        } catch (err) {
          console.error('Erro:', err);
        }finally{

           ///////////////////////////// CARREGAMENTO DOS MEDIA
          setNLoad(result.length);
        }
      };
      clear();
      fetchData();
    },[seachData]); 


    ///////////////////////////////////////////////////////////////////////////////////////FILTRAGEM DE DADOS 
    useEffect(()=>{
       const filterData = async() =>{
          if(data!=null && data.length>=0 && catData!=null){
            console.log(data.length);
            //SE TIVER FILTRO DE CATEGORIA
            if(catAntF!==catData){
              if(catData!== ' '){
                const lower = catData.toLowerCase();
                console.log('a'+ lower);
                const filteredData = data.filter(dado => dado.data.kingdom.toLowerCase() === lower);
                setDataFilt(filteredData);
                setCatAntF(catData.toLowerCase());
              }else if(catData === ' '){
                setDataFilt(data);
              }
            }else{
            }
          }
       }

      setDataFilt([]);
      filterData();

      console.log(data);
    },[catData,data])

    ///////////////////////////////////////////////////////////////////////////////////ATUALIZAR ESTADO DE FILTRO
    useEffect(()=>{
      console.log("array filt:" + dataFilt);
    },[dataFilt])

    ///////////////////////////////////////////////////////////////////////////////////ORDENAÇÃO DE DADOS 
    useEffect(()=>{
      const reOrderData = () =>{
        let arrayOrder = [];
          //ORDER /ORDER BY ID NAME KINGDOM 
          console.log('order:' + order);
          console.log('orderElement' + orderElement);


          if(dataFilt!=null){
            if(orderElement === 'image'){ //ORDENAR NUMERICAMENTE N Images
              if(order === 'false'){ //ASC
                arrayOrder = [...dataFilt].sort((a, b) => a.data.media.length - b.data.media.length);
              }else if(order === 'true'){ //DESC
                arrayOrder = [...dataFilt].sort((a, b) => b.data.media.length - a.data.media.length);
              }

            }else if(orderElement == 'kingdom'){ //ORDENAR ALFABETICAMENTE KINGDOM
              if(order === 'true'){ //ASC
                arrayOrder = [...dataFilt].sort((a, b) =>
                  a.data.kingdom > b.data.kingdom ? 1 : -1,
                );
              }else if(order === 'false'){ //DESC
                arrayOrder = [...dataFilt].sort((a, b) =>
                a.data.kingdom > b.data.kingdom ? -1 : 1,
              );
              }

            }else if(orderElement === 'name'){ //ORDENAR ALFABETICAMENTE NAME
              if(order === 'true'){ //ASC
                arrayOrder = [...dataFilt].sort((a, b) =>
                  a.data.scientificName > b.data.scientificName ? 1 : -1,
                );
              }else if(order === 'false'){ //DESC
                arrayOrder = [...dataFilt].sort((a, b) =>
                a.data.scientificName > b.data.scientificName ? -1 : 1,
              );
              }
            }
            setOrderData(arrayOrder);
            console.log(dataFilt);
          }
      }
      reOrderData();
      setLoading(false);
    },[dataFilt,order,orderElement])


    function clear(){
      setData([]);
      name = seachData.toLowerCase();

      setLoading(true);
      setImageL([]);
      setDataFilt([]);
      setOrderData([]);

    }

    const setImageLoaded = (mk,k) => {
      setImageL(dataImageL => {

        const newDataImageL = [...dataImageL];
        const objetoEncontrado = newDataImageL.find(item => item.id === mk);
  
        if (objetoEncontrado) {
          const novoArrayInterno = [...objetoEncontrado.mediaL];
  
          novoArrayInterno[k] = false; 
          objetoEncontrado.mediaL = novoArrayInterno;
        }
  
        return newDataImageL;
      });

      //console.log(dataImageL);
    }
    

    return (
      <div className="dataDisplay">
        {loading ? (
        <p>A carregar...</p>
      ) : (
        <>
          {orderData.map((value,i)=>(
            <div className="indData">
            <div className='displayName'>
              <h5>{value.data.scientificName}</h5>
            </div>

            <div className='grid'>
            <div className='caixaInfos'>
              <p><span><b>Scientific Name: </b></span><span>{value.data.scientificName}</span></p>

              {value.data.kingdom!==undefined?( <p><span><b>Kingdom: </b></span><span>{value.data.kingdom}</span></p>):(<></>)}
              {value.data.order!==undefined?( <p><span><b>Order: </b></span><span>{value.data.order}</span></p>):(<></>)}
              {value.data.family!==undefined?( <p><span><b>Family: </b></span><span>{value.data.family}</span></p>):(<></>)}
              {value.data.parent!==undefined?( <p><span><b>Parent: </b></span><span>{value.data.parent}</span></p>):(<></>)}
            </div>

            {value.data.media.length>0?(
            <></>  
            ):(
            <div className='withoutImages'>
              Without Images
            </div>
            )}

            {value.data.media.map((value1,j)=>(
              <div className='imageA'>
                <div className={dataImageL.find(item => item.id===value.id).mediaL[j]?('loadingBoxDisplay'):('oculta')}>
                  <div className="bar"></div>
                  <div className="bar1"></div>
                </div> 
                
                <figure className={dataImageL.find(item => item.id===value.id).mediaL[j]?('loadingBox'):('displayBox')}>
                    <img src={value1.identifier} 
                    alt={value1.type}
                    onLoad={() => setImageLoaded(value.id,j)}
                    />
               </figure>
              </div>
            ))}
            </div>
            </div>
          ))}
        </>
      )}
      </div>
    );
  };
  
  export default List;
  