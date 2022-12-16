import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import './button.css'
import Text from './Text'
const Buttoncomperation = ({title, url,imgTarget, img}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [datas, setData] = useState(null)
    const detectLabels = async() =>{
        setIsLoading(true)
        try{
            const res = await axios.post(`http://44.201.164.97:5000/api/${url}`,{
                images:img,
                imagesTarget:imgTarget
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
    },[img,imgTarget])
  return (
    <React.Fragment>
        <div className='button' onClick={detectLabels}>{title}</div>
        {isLoading ? <p>Loading...</p> : <Text title={title}/>}
        {datas&&datas.data.data.FaceMatches.map((item,index)=>(
            <div key={index}>
                <p>Similarity: {item.Similarity}</p>
            </div>
        ))}
    </React.Fragment>
  )
}

export default Buttoncomperation