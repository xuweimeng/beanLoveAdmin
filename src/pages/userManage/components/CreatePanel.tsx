import React, { useRef } from 'react';
import { Button, message } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormDigit,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { TableListItem } from '../data.d'

interface CreatePanelProps {
  showDrawer: boolean;
  formRef: React.MutableRefObject<ProFormInstance<TableListItem>|undefined>
}

const CreatePanel:React.FC<CreatePanelProps> = (props) => {

  const {formRef, showDrawer} = props;

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <DrawerForm<TableListItem>
      visible={showDrawer}
      title="新建用户"
      formRef={formRef}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建表单
        </Button>
      }
      autoFocusFirstInput
      layout={"vertical"}
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          width="md"
          label="用户姓名"
          tooltip="最长为 24 位"
          placeholder="请输入用户姓名"
        />
         <ProFormSelect
          valueEnum={{
            male: '男',
            fenale: '女'
          }}
          width="md"
          name="sex"
          label="性别"
        />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormDigit label="年龄" name="age"  width="md" min={1} max={100} />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
        <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          width="xs"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '履行完终止',
            },
          ]}
          name="unusedMode"
          label="合同约定失效效方式"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
      <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
    </DrawerForm>
  )
}

export default CreatePanel;