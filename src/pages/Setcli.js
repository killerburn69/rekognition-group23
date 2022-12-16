import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Setcli = () => {
    const navigate = useNavigate()
    const [accessKeyId, setAccessKeyId] = useState('')
    const [secretAccessKey, setSecretAccessKey] = useState('')
    const [sessionToken, setSessionToken] = useState('')
    const [success, setSuccess] = useState('')
    const [err, setError] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const awsCLI = {
                accessKeyId:accessKeyId,
                secretAccessKey:secretAccessKey,
                sessionToken:sessionToken,
            }
            const res = await axios.post(`http://44.201.164.97:5000/api/setCLI`,{ accessKeyId:accessKeyId,
            secretAccessKey:secretAccessKey,
            sessionToken:sessionToken,})
            setSuccess(res.data)
            console.log(res.data);
            console.log(awsCLI);
            navigate("/signin")
        }
        catch(err){
           setError(err.message)
            console.log(err.message);
        }
        
    }
  return (
    <div>
        <h1>Bạn phải có AWS CLI để có thể sử dụng các dịch vụ này</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="" className='form-label'>Access Key Id</label>
                <input type="text"  className="form-control" name="" id="" onChange={(e)=>setAccessKeyId(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor="" className='form-label'>Secret Access Key</label>
                <input type="text" className="form-control" name="" id="" onChange={(e)=>setSecretAccessKey(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor="" className='form-label'>Session Token</label>
                <input type="text" className="form-control" name="" id="" onChange={(e)=>setSessionToken(e.target.value)}/>
            </div>
            <button type='submit' className="btn btn-primary">Đăng nhập</button>
        </form>
        <p>{success}</p>

        <p>{err}</p>
    </div>
  )
}

export default Setcli