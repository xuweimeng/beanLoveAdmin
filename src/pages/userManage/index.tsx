import React, {useRef, useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { ProFormInstance } from '@ant-design/pro-form';
import { 
  Button, 
  message, 
  Input, 
  Drawer, 
  Typography,
  Popconfirm
} from 'antd';
import type { TableListItem, TableListPagination } from './data';
import CreatePanel from './components/CreatePanel';

const UserManage = () => {
  
  const formRef = useRef<ProFormInstance<TableListItem>|undefined>(undefined);

  const [showDrawer, setShowDrawer]=useState<boolean>(false);

  // 删除操作
  const confirmDelete = () => {
    message.success('删除成功！')
  }
  // 取消删除
  const cancelDelete = () => {
    message.error('取消删除！')
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a>
            {dom}
          </a>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'describe',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: '性别',
      dataIndex: 'sex',
      sorter: true,
      valueEnum: {
        'male': {
          text: '男',
        },
        'female': {
          text: '女'
        }
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: '婚姻状况',
      dataIndex: 'marrary',
      sorter: true,
      valueEnum: {
        'unmarried': {
          text: '未婚',
          status: 'Default'
        },
        'divorce': {
          text: '离婚',
          status: 'Error'
        }
      }
    },
    {
      title: '实名认证',
      dataIndex: 'authentication',
      hideInForm: true,
      valueEnum: {
        true: {
          text: '是',
          status: 'Success'
        },
        false: {
          text: '否',
          status: 'Error'
        }
      }
    },
    {
      title: '工作',
      dataIndex: 'job',
      hideInForm: true,
    },
    {
      title: '工作地',
      hideInForm: true,
      hideInSearch: true,
      dataIndex: 'workplaceProvince',
      render: (val, record) => <span>{val} - {record.workplaceCity}</span>
    },
    {
      title: '户籍',
      dataIndex: 'householdProvince',
      hideInForm: true,
      hideInSearch: true,
      render: (val, record) => <span>{val} - {record.householdCity}</span>
    },
    {
      title: '创建信息',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInSearch: true,
      render: (value, record) => {
        return (<>
        <span>{record.creator}</span><br></br>
        <span>{value}</span>
        </>)
      }
    },
    {
      title: '修改信息',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      render: (value, record) => {
        return (<>
        <span>{record.modifier}</span><br></br>
        <span>{value}</span>
        </>)
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Typography.Link>编辑</Typography.Link>,
        <Popconfirm
          title="确定删除吗?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          okText="确定"
          cancelText="取消"
        >
        <Typography.Link>删除</Typography.Link>
      </Popconfirm>
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="查询表格"
        // actionRef={actionRef}
        dataSource={[{
          name: '李康',
          id: 1
        }]}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => setShowDrawer(true)}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request={rule}
        columns={columns}
      />
      <CreatePanel
        showDrawer={showDrawer}
        formRef={formRef}
        onCloseCreatePanel={() => setShowDrawer(false)}
      />
    </PageContainer>
  );
};

export default UserManage;
