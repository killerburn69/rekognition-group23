import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './button.css'
import Text from './Text'
const Buttontext = ({title,img,url}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [datas, setData] = useState(null)
    const detectLabels = async() =>{
        setIsLoading(true)
        try{
            const res = await axios.post(`http://44.201.164.97:5000/api/${url}`,{
                images:img
            })
            console.log(res)
            setData(res)
            setIsLoading(false)
        }
        catch(err){
            console.log(err.message);
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        setData(null)
    },[img])
  return (
    <React.Fragment>
        <div className='button' onClick={detectLabels}>{title}</div>
        {isLoading ? <p>Loading...</p> : <Text title={title}/>}
        {datas&&(
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Detection Text</th>
                        <th scope="col">Type</th>
                        <th scope="col">Confidence</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datas.data.data.TextDetections.map((item,index)=>(
                            <tr key={index}>
                                <th scope="row">{item.Id}</th>
                                <td>{item.DetectedText}</td>
                                <td>{item.Type}</td>
                                <td>{item.Confidence}</td>
                            </tr>
                        ))
                    }
                    
                </tbody>
          </table>
        )}
       
    </React.Fragment>
  )
}

export default Buttontext