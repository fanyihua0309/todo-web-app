import React from 'react'
import { Button } from 'antd';
import { Table, Space } from 'antd';
import '../App.less'
import ModalEdit from "./ModalEdit.jsx"
import ModalDetails from './ModalDetails.jsx';


const TodoList = ({todoItems, onClickEditSubmitBtn, onClickDeleteBtn, onClickCompleteBtn}) => {

  const columns = [
    {
      title: '待办事项',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => {
        return (
          <div>
            <span style={{textDecoration: (record.complete ? "line-through" : "none")}}>
              {text}
            </span>
            <ModalDetails 
              create={record.create.slice(0, 10) + " " + record.create.slice(11, -5)}
              content={record.content}
              complete={record.complete ? "完成" : "未完成"}
            />
          </div>
        )
      }
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
          return (
            <Space size="middle">
              <ModalEdit content={record.content} onClickConfirm={(editContent) => onClickEditSubmitBtn(record.id, editContent)}/>
              <Button type="primary" onClick={() => onClickDeleteBtn(record.id)}>删除</Button>
              <Button type="primary" onClick={() => onClickCompleteBtn(record.id)}>
                {record.complete ? "未完成" : "完成"}
              </Button>
            </Space>
          )
      },
    },
  ];


  return (
    <div>
      <Table 
        columns={columns} 
        dataSource={todoItems} 
        pagination={{position: ["topLeft"], pageSize: 4, showQuickJumper: true}}
        rowKey="id"
        id="table"
      />
    </div>
  )
}

export default TodoList;