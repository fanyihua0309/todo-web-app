import React from "react";
import MyInput from './MyInput.jsx'
import MySearch from './MySearch.jsx'
import TodoList from './TodoList.jsx'
import '../App.less'
import { Layout } from 'antd';
import axiosInst from '../initAxios.js'


const { Header, Footer, Content } = Layout;

class TodoListPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {todoItems: []};

    // 类组件中声明的普通函数需要绑定，若使用箭头函数则不需要
    this.fetchAllTodoItems = this.fetchAllTodoItems.bind(this);
    this.fetchAddTodoItem = this.fetchAddTodoItem.bind(this);
    this.fetchSearchTodoItems = this.fetchSearchTodoItems.bind(this);
    this.fetchEditTodoItem = this.fetchEditTodoItem.bind(this);
    this.fetchCompleteTodoItem = this.fetchCompleteTodoItem.bind(this);
    this.fetchDeleteTodoItem = this.fetchDeleteTodoItem.bind(this);
  }

  componentDidMount() {
    this.fetchAllTodoItems();
  }

  /**
   * 请求所有待办事项数据存储到 todoItems 对象数组中
   */
  fetchAllTodoItems() {
    axiosInst
      .get("/todos")
      .then((res) => {
        this.setState({ todoItems: res });
    })
  }

  /**
   * 用户新增一条待办事项时，向服务器发 post 请求
   * @param {string} value 待办事项的内容
   */
  // 也可以使用箭头函数，不需要绑定
  // fetchAddTodoItem = (value) => {}
  fetchAddTodoItem(value) {
  // fetchAddTodoItem = (value) => {
    axiosInst
      .post("/todos", {
        content: value
      })
      .then(() => {
        this.fetchAllTodoItems();
      })
  }

  /**
   * 当用户在搜索框键入 content，向服务器发送 get 请求返回对应的待办事项
   * @param {string} content 待办事项的内容
   */
  fetchSearchTodoItems(content) {
    axiosInst
      .get(`/todos?keyword=${content}`)
      .then((res) => {
        this.setState({ todoItems: res });
      })
  }

    /**
   * 当用户输入编辑内容完毕，点击提交按钮时，更新服务器对应待办事项的 content
   * @param {number} id 待办事项的 id
   */
  fetchEditTodoItem(id, editContent) {
    axiosInst
      .patch("/todos", {
        id,
        content: editContent,
      })
      .then(() => {
        this.fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
      })
    }
    
  /**
   * 当用户点击删除按钮时，向服务器发 post 请求删除对应 id 的待办事项
   * @param {number} id 待删除待办事项的 id
   */
  fetchDeleteTodoItem(id) {
    axiosInst
      .delete(`todos/${id}`)
      .then((res) => {
        this.fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
      })
  }
    
  /**
   * 当用户点击完成/未完成按钮时, 更新服务器对应待办事项的完成状态，即 complete 的值
   * @param {number} id 当前待办事项的id
   */
  fetchCompleteTodoItem(id) {
    let original_complete;
    Array.from(this.state.todoItems).forEach((curItem) => {
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
        this.fetchAllTodoItems();
      });
  }
    

  render() {
    return (
      <Layout style={{width: "100%"}}>
        <Header id="header">
          <h1 className="big-title" style={{fontSize: "30px"}}>待办事项管理系统</h1>
        </Header>
        <Content style={{height: "calc(100vh - 64px)", backgroundColor: "white"}}>
          <div>
            <MyInput placeholder="按回车新建待办事项" onClickEnter={this.fetchAddTodoItem}/>
            <MySearch placeholder="按回车搜索待办事项" onClickEnter={this.fetchSearchTodoItems}/>
          </div>

          <div>
            <h2 className="sub-title">待办事项列表</h2>
            <TodoList 
              todoItems={this.state.todoItems}
              onClickEditSubmitBtn={(id, editContent) => this.fetchEditTodoItem(id, editContent)}
              onClickDeleteBtn={(id) => this.fetchDeleteTodoItem(id)}
              onClickCompleteBtn={(id) => this.fetchCompleteTodoItem(id)} 
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
    )
  }
}

export default TodoListPage;