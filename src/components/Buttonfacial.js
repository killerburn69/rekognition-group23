import React,{useEffect, useState} from 'react'
import axios from 'axios'
import './button.css'
import Text from './Text'
const Buttonfacial = ({title,url,img}) => {
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
        {datas&&datas.data.data.FaceDetails.map((item,index)=>(
            <div key={index}>
                <p>AgeRange: {item.AgeRange.Low} - {item.AgeRange.High}</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Type</th>
                            <th scope="col">Confidece</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.Emotions.map((emotion,indexEmo)=>(
                            <tr key={indexEmo}>
                                <th scope="row">{indexEmo+1}</th>
                                <td>{emotion.Type}</td>
                                <td>{emotion.Confidence}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Gender: {item.Gender.Value}</p>
            </div>
        ))}
    </React.Fragment>
  )
}

export default Buttonfacial