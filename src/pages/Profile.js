import React ,{useEffect, useState}from 'react'
import Webcam from 'react-webcam'
import Button from '../components/Button'
import { v4 as uuidv4 } from 'uuid';
import ButtonCheck from '../components/ButtonCheck';
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user'
}
const Profile = () => {
  const [picture, setPicture] = useState(null)
  const [imgTaking, setImgTaking] = useState('')
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    console.log(pictureSrc);
    setPicture(pictureSrc)
  },[webcamRef])
  useEffect(()=>{
      if(picture!==null){
          function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
        //Usage example:
        var file = dataURLtoFile(picture,uuidv4());
        file.mimetype = file.type
        file.originalname = file.name
        file.preview = URL.createObjectURL(file) 
        console.log(file);
        setImgTaking(file)
      }
  },[picture])
  return (
      <div>
              <h2 className="mb-5 text-center">
                  Đăng nhập bằng cách nhận diện khuôn mặt
              </h2>
              <div>
                  
                      <Webcam
                      audio={false}
                      height={400}
                      ref={webcamRef}
                      width={400}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      />
                 
              </div>
              <div className='mb-3'>
                    
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setPicture(null)
                        }}
                        className="btn btn-primary mx-3"
                      >
                        Retake
                      </button>
                    
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          capture()
                        }}
                        className="btn btn-danger"
                      >
                        Capture
                      </button>
            </div>
            {picture && (<div>
                <img src={picture} alt='kakh'/>
            </div>)}
            <Button title='Upload to S3' url='upload' img={imgTaking} formDatas = 'image'/>
            <ButtonCheck title='Đăng nhập' url='searching' img={imgTaking.name}/>
  </div>
  )
}

export default Profile