import React,{useState} from 'react'
import Button from '../components/Button';
import ButtonLabel from '../components/ButtonLabel';
import Buttonmoderation from '../components/Buttonmoderation';
import Buttonfacial from '../components/Buttonfacial';
import Buttoncel from '../components/Buttoncel';
import Buttontext from '../components/Buttontext';
import Buttoncomperation from '../components/Buttoncomperation';
const Main = () => {
    const [img, setImg] = useState('')
    const [imgTarget, setImgTarget] = useState('')
    const handleSubmitImg = (e)=>{
      console.log(e.target.files[0]);
      e.target.files[0].mimetype = e.target.files[0].type
      e.target.files[0].originalname = e.target.files[0].name
      e.target.files[0].preview = URL.createObjectURL(e.target.files[0]) 
      console.log(e.target.files[0]);
      setImg(e.target.files[0])
    }
    const handleSubmitImgTarget = (e)=> {
      e.target.files[0].mimetype = e.target.files[0].type
      e.target.files[0].originalname = e.target.files[0].name
      e.target.files[0].preview = URL.createObjectURL(e.target.files[0]) 
      console.log(e.target.files[0]);
      setImgTarget(e.target.files[0])
    }
  return (
    <div>
        <div>
          <input type="file" name="file" id="" onChange={handleSubmitImg}/>
        </div>
        <Button title='Upload to S3' url='upload' img={img} formDatas = 'image'/>
        <img src={img.preview} alt=""/>
        <ButtonLabel title='Detect Label' url='labels' img={img.name}/>
        <br />
        <Buttonmoderation title = 'Image moderation' url='moderation' img={img.name}/>
        <br />
        <Buttonfacial title='Facial analysis' url='facial' img={img.name}/>
        <br />
        <Buttoncel title="Celebrity recognition" url="celeb" img={img.name}/>
        <br />
        <Buttontext title="Text in image" url="text" img={img.name}/>
        <br />
        <br />
        <br />
        <div>
          <label>Target image for Face comparison</label>
          <input type="file" name="file" id="" onChange={handleSubmitImgTarget}/>
        </div>
        <Button title='Upload img targer to S3' url='uploadTarget' img={imgTarget} formDatas="imagetarget"/>
        <img src={imgTarget.preview} alt=""/>
        <br />
        <Buttoncomperation title="Face comparison" url="comparasion" imgTarget={imgTarget.name} img={img.name}/>
    </div>
  )
}

export default Main