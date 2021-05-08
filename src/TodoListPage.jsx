import React, { useState, useEffect } from "react";
// import history from 'history/browser';
// import history from 'history/hash';
import { createHashHistory } from 'history';
import MyInput from './MyInput.jsx'
import TodoList from './TodoList.jsx'
import './App.less'
import axios from "axios"
import { Layout } from 'antd';
import { message } from 'antd';

const { Header, Footer, Content } = Layout;

const axiosInst = axios.create({
  baseURL: "http://42.193.140.83:3001",
  timeout: 10000,
});

axiosInst.interceptors.response.use(
  function (response) {
    const {
      meta: { code, errors },
      data,
    } = response.data;
    if (code !== 0) {
      message.info(errors[0]);
      return Promise.reject(errors);
    }
    return data;
  },
  function (error) {
    if (error.response) {
      if(error.response.data === "Forbidden"){
        message.info("您尚未登录！\n请先登录！");
      }
    } 
    let history = createHashHistory();
    history.push("/login");
    // history.back();
    return Promise.reject(error);
  }
);

export { axiosInst }


const TodoListPage = () => {

  const [todoItems, settodoItems] = useState([]);   // 用于管理待办事项数据列表

  /**
   * 当用户点击编辑按钮时
   * @param {number} id 当前待办事项的id
   */
  const handleEdit = (id) => {
    let copyTodoItems = Array.from(todoItems);
    copyTodoItems = copyTodoItems.map((curItem) => {
      if(curItem.id === id){
        curItem.edit = true;
      }
      return curItem;
    })
    settodoItems(copyTodoItems);
  }

  /**
   * 当用户输入编辑内容完毕，点击提交按钮时，更新服务器对应待办事项的 content
   * @param {number} id 待办事项的 id
   */
     const fetchEditTodoItem = (id, editContent) => {
      axiosInst
        .patch("/todos", {
          id,
          content: editContent,
        })
        .then(() => {
          settodoItems([]);     // 先将本地的 todoItems 置为空
          fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
        })
    }

  /**
   * 当用户点击删除按钮时，向服务器发 post 请求删除对应 id 的待办事项
   * @param {number} id 待删除待办事项的 id
   */
  const fetchDeleteTodoItem = (id) => {
    axiosInst
      .delete(`todos/${id}`)
      .then((res) => {
        settodoItems([]);     // 先将本地的 todoItems 置为空
        fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
      })
  }

  /**
   * 当用户点击完成/未完成按钮时, 更新服务器对应待办事项的完成状态，即 complete 的值
   * @param {number} id 当前待办事项的id
   */
  const fetchCompleteTodoItem = (id) => {
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
        settodoItems([]);
        fetchAllTodoItems();
      });
  }

  /**
   * 请求所有待办事项数据存储到 todoItems 对象数组中
   */
  const fetchAllTodoItems = () => {
    axiosInst.defaults.headers.common['Authorization'] = localStorage.getItem("token");

    axiosInst
      .get("/todos")
      .then((res) => {
        settodoItems(res);
    })
  }
  
  /**
   * 在页面加载时发请求获取所有待办事项
   */
  useEffect(() => {
    fetchAllTodoItems();
  }, [])

  /**
   * 用户新增一条待办事项时，向服务器发 post 请求
   * @param {string} value 待办事项的内容
   */
  const fetchAddTodoItem = (value) => {
    axiosInst
      .post("/todos", {
        content: value
      })
      .then(() => {
        settodoItems([]);
        fetchAllTodoItems();
      })
  }

  /**
   * 当用户在搜索框键入 content，向服务器发送 get 请求返回对应的待办事项
   * @param {string} content 待办事项的内容
   */
  const fetchSearchTodoItems = (content) => {
    axiosInst
      .get(`/todos?keyword=${content}`)
      .then((res) => {
        settodoItems([]);
        settodoItems(res);
      })
  }

  return (
    <Layout>
      <Header id="header">
        <h1 className="big-title" style={{fontSize: "30px"}}>待办事项管理系统</h1>
      </Header>
      <Content style={{height: "calc(100vh - 64px)"}}>
        <div>
          <MyInput placeholder="按回车新建待办事项" isSearch="false" onClickEnter={fetchAddTodoItem}/>
          <MyInput placeholder="按回车搜索待办事项" isSearch="true" onClickEnter={fetchSearchTodoItems}/>
        </div>

        <div>
          <h2 className="sub-title">待办事项列表</h2>
          <TodoList 
            todoItems={todoItems}
            onClickEditBtn={(id) => handleEdit(id)}
            onClickEditSubmitBtn={(id, editContent) => fetchEditTodoItem(id, editContent)}
            onClickDeleteBtn={(id) => fetchDeleteTodoItem(id)}
            onClickCompleteBtn={(id) => fetchCompleteTodoItem(id)} 
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