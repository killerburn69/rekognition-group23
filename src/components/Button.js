import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './button.css'
import Text from './Text'
const Button = ({ title, url, img, formDatas }) => {
  const [isLoading, setIsLoading] = useState(false)
  const uploadImg = async () => {
    setIsLoading(true)
    try {
      let formData = new FormData()
      formData.append(formDatas, img)
      const res = await axios.post(`http://44.201.164.97:5000/api/${url}`, formData)
      console.log(res)
      setIsLoading(false)
    } catch (err) {
      console.log(err.message)
      setIsLoading(false)
    }
  }
  return (
    <React.Fragment>
      <div className="button" onClick={uploadImg}>
        {title}
      </div>
      {isLoading ? <p>Loading...</p> : <Text title={title} />}
    </React.Fragment>
  )
}

export default Button
