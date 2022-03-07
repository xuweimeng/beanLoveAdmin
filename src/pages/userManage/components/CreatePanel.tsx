import React, { useRef } from 'react';
import { Button, message } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormDigit,
  ProFormTextArea,
  ProFormRadio,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { TableListItem } from '../data.d';
import { formLayout } from '@/constant';

interface CreatePanelProps {
  showDrawer: boolean;
  onCloseCreatePanel: () => void;
  formRef: React.MutableRefObject<ProFormInstance<TableListItem> | undefined>;
}

const CreatePanel: React.FC<CreatePanelProps> = (props) => {
  const { formRef, showDrawer, onCloseCreatePanel } = props;

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
      width={1000}
      autoFocusFirstInput
      layout={'horizontal'}
      labelAlign={"right"}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: onCloseCreatePanel,
      }}
      {...formLayout}
    >
      <ProForm.Group>
        <ProFormText 
        name="name" 
        width="md" 
        label="姓名" 
        placeholder="请输入姓名"
         />
        <ProFormSelect
          valueEnum={{
            male: '男',
            fenale: '女',
          }}
          width="md"
          name="sex"
          label="性别"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit 
        label="年龄" 
        name="age" 
        width="md" 
        min={1} 
        max={100} 
        />
         <ProFormSelect
          valueEnum={{
            unmarried: '未婚',
            divorce: '离异',
          }}
          width="md"
          name="marrary"
          label="婚姻"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText 
        width="md" 
        name="job" 
        label="工作" 
        placeholder="请输入工作" 
        />
         <ProFormRadio.Group
          name="authentication"
          label="实名认证"
          valueEnum={{
            '0': '否',
            '1': '是',
          }}
          style={{
            width: '328px'
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="job" label="身高" placeholder="请输入身高(单位：cm)" />
        <ProFormText width="md" name="weight" label="体重" placeholder="请输入体重(单位：kg)" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="mobile" label="联系方式" placeholder="请输入联系方式" />
        <ProFormText width="md" name="wechatNum" label="微信" placeholder="请输入微信" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="birthDate" label="出生日期" placeholder="请输入出生日期" />
       
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea 
        name="requirement"
         width={'xl'} 
         label="择偶要求" 
         labelCol={{
          span: 4
        }}
          wrapperCol= {{
            span: 20
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea name="introduction" width={'xl'} label="自我介绍"
        labelCol={{
          span: 4
        }}
          wrapperCol= {{
            span: 20
          }} />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea name="mark" width={'xl'} label="备注" 
        labelCol={{
          span: 4
        }}
          wrapperCol= {{
            span: 20
          }}/>
      </ProForm.Group>
    </DrawerForm>
  );
};

export default CreatePanel;
