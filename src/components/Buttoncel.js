import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import './button.css'
import Text from './Text'
const Buttoncel = ({title,img,url}) => {
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
        {datas&&datas.data.data.CelebrityFaces.map((item,index)=>(
            <div key={index}>
                <p>{item.Name}</p>
            </div>
        ))}
        {(datas&&datas.data.data.CelebrityFaces.length===0) && (
            <p>Không phải người nổi tiếng</p>
        )}
    </React.Fragment>
  )
}

export default Buttoncel