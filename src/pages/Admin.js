import React, { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
    const navigate = useNavigate()
    const [dataList, setDataList] = useState(null)
    const [imgFace, setImgFace] = useState('')
    const [collectionName, setCollectionName] = useState('')
    const [dataCollection, setDataCollection] = useState(null)
    const [success, setSuccess] = useState('')
    const onHandleChangeCollection = async(e)=>{
        e.preventDefault()
        try{
            let res = await axios.post('http://44.201.164.97:5000/api/collection',{
                collectionname:collectionName
            })
            console.log(res);
            setSuccess(res.data.data.StatusCode)
            setDataCollection([...dataCollection,collectionName])
            setCollectionName('')
        }
        catch(err){
            console.log(err.message);
        }
    } 
    const getDataCollection = async()=>{
        try{
            let result = await axios.get('http://44.201.164.97:5000/api/listCollection')
            console.log(result);
            setDataCollection(result.data.data.CollectionIds)
        }
        catch(err){
            console.log(err.message);
        }
    }
    const getDataList = async()=>{
        try{
            let result = await axios.get('http://44.201.164.97:5000/api/listingFace')
            console.log(result);
            setDataList(result.data.data.Faces)
        }
        catch(err){
            console.log(err.message);
        }
    }
    const getAddFace = (e)=>{
        e.target.files[0].mimetype = e.target.files[0].type
        e.target.files[0].originalname = e.target.files[0].name
        e.target.files[0].preview = URL.createObjectURL(e.target.files[0]) 
        console.log(e.target.files[0]);
        setImgFace(e.target.files[0])
    }
    const onHandleSubmitFace = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.post('http://44.201.164.97:5000/api/addIndex',{
                imgAddFace: imgFace.name
            })
            console.log(res);
            setDataList([...dataList,res.data.data.FaceRecords[0].Face])
            setImgFace('')
        }
        catch(err){
            console.log(err.message);
        }
    }

    const deleteItemFace = async(item)=>{
        try{
            const res = await axios.post('http://44.201.164.97:5000/api/deleteFace',{
                imgDelete: item.FaceId
            })
            console.log(res);
            setDataList(dataList.filter(items=>items.FaceId!==item.FaceId))
        }
        catch(err){
            console.log(err.message);
        }
    }
    const toSign =()=>{
        navigate('/signin')
    }
    useEffect(()=>{
        getDataCollection()
        getDataList()
    },[])
  return (
    <div>
        <h1>Trang chủ quản lý Group 23</h1>
        <div className='pt-5'>
            <h1>Tạo Collection</h1>
            <form className="mb-3" onSubmit={onHandleChangeCollection}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Tên CollectionID</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e)=>setCollectionName(e.target.value)}/>
                <div>
                    <button className='btn btn-primary' type='submit'>Tạo tên</button>
                </div>
                {success === 200 && <p>Tạo thành công Collection</p>}
            </form>
            <h1 className='mb-3'>Hiển thị tất cả các Collection ID</h1>
            <table className="table text-start">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Collection ID</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCollection && dataCollection.map((item,index)=>(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1>Quản lý các list face images được lưu trong Collection</h1>
            <table className="table text-start">
                <thead>
                    <tr>
                        <th scope="col">Face Id</th>
                        <th scope="col">Image Id</th>
                        <th scope="col">Confidence</th>
                        <th scope="col">ExternalImageId</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList && dataList.map((item,index)=>(
                        <tr key={`${uuidv4()}65`}>
                            <th scope="row">{item.FaceId}</th>
                            <td>{item.ImageId}</td>
                            <td>{item.Confidence}</td>
                            <td>
                                {item.ExternalImageId}
                            </td>
                            <td>
                                <button className='btn btn-primary' onClick={()=>deleteItemFace(item)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={onHandleSubmitFace}>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                    <input type="file" className="form-control" id="inputGroupFile01" onChange={getAddFace}/>
                </div>
                <div>
                    <img src={imgFace.preview} alt="" />
                </div>
                <button type="submit" className="btn btn-primary">Thêm vào danh sách list</button>
            </form>
            <Button title='Upload to S3' url='upload' img={imgFace} formDatas = 'image'/>
            <button className='btn btn-primary' onClick={toSign}>Quay về trang login</button>
        </div>
    </div>
  )
}

export default Admin