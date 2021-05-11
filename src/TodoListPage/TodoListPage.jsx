import React, { useState, useEffect } from "react";
import MyInput from './MyInput.jsx'
import MySearch from './MySearch.jsx'
import TodoList from './TodoList.jsx'
import '../App.less'
import { Layout } from 'antd';
import axiosInst from '../initAxios.js'


const { Header, Footer, Content } = Layout;

const TodoListPage = () => {

  const [todoItems, settodoItems] = useState([]);   // 用于管理待办事项数据列表

  /**
   * 请求所有待办事项数据存储到 todoItems 对象数组中
   */
  const fetchAllTodoItems = () => {
    axiosInst
      .get("/todos")
      .then((res) => {
        settodoItems(res);
    })
  }
    
  /**
   * 本组件被挂载后发请求获取所有待办事项
   */
  useEffect(() => {
    fetchAllTodoItems();
  }, [])

  /**
   * 用户新增一条待办事项时，向服务器发 post 请求
   * @param {string} value 待办事项的内容
   */
  const handleAddTodoItem = (value) => {
    axiosInst
      .post("/todos", {
        content: value
      })
      .then(() => {
        fetchAllTodoItems();
      })
  }

  /**
   * 当用户在搜索框键入 content，向服务器发送 get 请求返回对应的待办事项
   * @param {string} content 待办事项的内容
   */
  const handleSearchTodoItems = (content) => {
    axiosInst
      .get(`/todos?keyword=${content}`)
      .then((res) => {
        settodoItems(res);
      })
  }

  /**
   * 当用户输入编辑内容完毕，点击提交按钮时，更新服务器对应待办事项的 content
   * @param {number} id 待办事项的 id
   */
  const handleEditTodoItem = (id, editContent) => {
    axiosInst
      .patch("/todos", {
        id,
        content: editContent,
      })
      .then(() => {
        fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
      })
  }

  /**
   * 当用户点击删除按钮时，向服务器发 post 请求删除对应 id 的待办事项
   * @param {number} id 待删除待办事项的 id
   */
  const handleDeleteTodoItem = (id) => {
    axiosInst
      .delete(`todos/${id}`)
      .then(() => {
        fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
      })
  }

  /**
   * 当用户点击完成/未完成按钮时, 更新服务器对应待办事项的完成状态，即 complete 的值
   * @param {number} id 当前待办事项的id
   */
  const handleCompleteTodoItem = (id) => {
    let original_complete;
    Array.from(todoItems).forEach((curItem) => {
      if(curItem.id === id){
        original_complete = curItem.complete;
      }
    })
    axiosInst
      .patch("/todos", {
        id,
        complete: !original_complete,
      })
      .then(() => {
        fetchAllTodoItems();
      });
  }


  return (
    <Layout style={{width: "100%"}}>
      <Header id="header">
        <h1 className="big-title" style={{fontSize: "30px"}}>待办事项管理系统</h1>
      </Header>
      <Content style={{height: "calc(100vh - 64px)", backgroundColor: "white"}}>
        <div>
          <MyInput placeholder="按回车新建待办事项" onClickEnter={handleAddTodoItem}/>
          <MySearch placeholder="按回车搜索待办事项" onClickEnter={handleSearchTodoItems}/>
        </div>

        <div>
          <h2 className="sub-title">待办事项列表</h2>
          <TodoList 
            todoItems={todoItems}
            onClickEditSubmitBtn={(id, editContent) => handleEditTodoItem(id, editContent)}
            onClickDeleteBtn={(id) => handleDeleteTodoItem(id)}
            onClickCompleteBtn={(id) => handleCompleteTodoItem(id)} 
          />
        </div>
      </Content>
      <Footer id="footer">
        <footer>
          <div className="copyright" style={{textAlign: "center"}}>
            &copy; Copyright <em>Fan Yihua</em>. All Rights Reserved.
             Contact me through <em>nuaaccstfyh@163.com</em>
          </div>
        </footer>
      </Footer>
    </Layout>
  );
}

export default TodoListPage;