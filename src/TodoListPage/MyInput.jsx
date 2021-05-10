import React, {useState} from 'react'
import { Input } from 'antd';
import "../App.less"

const MyInput = ({placeholder, onClickEnter}) => {

  const [content, setcontent] = useState("");

  /**
   * 存储用户在输入框中输入的内容
   * @param {*} e onChange传递的事件参数
   */
  const storeContent = (e) => {
    setcontent(e.target.value);
  }


  return (
    <Input 
      className="myInput" 
      size="large"
      allowClear
      placeholder={placeholder}
      onChange={storeContent} 
      onPressEnter={() => onClickEnter(content)}
    />
  )
}

export default MyInput;