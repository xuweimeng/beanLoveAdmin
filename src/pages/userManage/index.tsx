import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Input, Drawer } from 'antd';
import type { TableListItem, TableListPagination } from './data';

const UserManage = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            // onClick={() => {
            //   setCurrentRow(entity);
            //   setShowDetail(true);
            // }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'describe',
      valueType: 'textarea',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      sorter: true,
      hideInForm: true,
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
    },
    {
      title: '婚姻状况',
      dataIndex: 'marrary',
      sorter: true,
      hideInForm: true,
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
      title: '工作地',
      dataIndex: 'workplaceProvince',
      render: (val, record) => <span>{val} - {record.workplaceCity}</span>
    },
    {
      title: '户籍',
      dataIndex: 'householdProvince',
      render: (val, record) => <span>{val} - {record.householdCity}</span>
    },
    {
      title: '实名认证',

    },
    {
      title: '创建信息',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      render: (value, record) => {
        return (<>
        <span>{record.creator}</span><br></br>
        <span>{value}</span>
        </>)
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            // handleUpdateModalVisible(true);
            // setCurrentRow(record);
          }}
        >
          配置
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="查询表格"
        // actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request={rule}
        columns={columns}
      />
    </PageContainer>
  );
};

export default UserManage;
