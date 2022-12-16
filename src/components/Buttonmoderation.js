import React, { useEffect, useState }from 'react'
import axios from 'axios'
import './button.css'
import Text from './Text'
const Buttonmoderation = ({title, url, img}) => {
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
        {(datas  && datas.data.data.ModerationLabels.length !==0)&& (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Confidence</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.data.data.ModerationLabels.map((item,index)=>(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{item.Name}</td>
                            <td>{item.Confidence}</td>
                        </tr>
                    ))}
                        
                </tbody>
            </table>
        )}
        {(datas  && datas.data.data.ModerationLabels.length===0) && (
            <p>Nội dung đã được kiểm duyệt</p>
        )}




    </React.Fragment>
  )
}

export default Buttonmoderation