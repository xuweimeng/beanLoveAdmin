import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message } from 'antd';

import type { FC } from 'react';
import { useState } from 'react';
import ProForm, {
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTimePicker,
  ProFormDatePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { 
  genderEnum, 
  educationEnum, 
  incomeEnum, 
  marryStatusEnum,
  carEnum,
  houseEnum,
  expectMarryEnum,
  sureEnum,
} from '@/constant';
// import { fakeSubmitForm } from './service';
import styles from './style.less';

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}
type InternalNamePath = (string | number)[];

const fieldLabels = {
  name: '姓名',
  nickname: '昵称',
  gender: '性别',
  birthday: '出生日期',
  height: '身高(cm)',
  weight: '体重(Kg)',
  education: '学历',
  job: '工作',
  residentialAddress: '居住地址',
  domicile: '户籍',
  marryStatus: '婚姻状态',
  expectMarry: '何时结婚',
  child: '孩子',
  income: '收入',
  onlyChild: '独生子女',
  house: '房产',
  car: '车',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '成员姓名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '工号',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  return (
    <ProForm
      layout="vertical"
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={{ span: 7, }} lg={{ span: 7 }} md={{ span: 7 }} sm={24}>
              <ProFormText
                label={fieldLabels.nickname}
                name="nickname"
                rules={[{ required: true, message: `${fieldLabels.nickname}不能为空！` }]}
                placeholder={`请输入${fieldLabels.nickname}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7, offset: 1}} md={{ span: 7, offset: 1}} sm={24}>
              <ProFormSelect
                label={fieldLabels.gender}
                name="gender"
                valueEnum={genderEnum}
                rules={[{ required: true, message: `${fieldLabels.gender}不能为空！` }]}
                placeholder={`请选择${fieldLabels.gender}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7, offset: 1}} md={{ span: 7, offset: 1}} sm={24}>
              <ProFormDatePicker
                label={fieldLabels.birthday}
                name="birthday"
                fieldProps={{
                  style: {
                    width: '100%',
                  }
                }}
                rules={[{ required: true, message: `${fieldLabels.birthday}不能为空！` }]}
                placeholder={`请选择${fieldLabels.birthday}`}
              />
            </Col>
            <Col xl={{ span: 7, }} lg={{ span: 7 }} md={{ span: 7 }} sm={24}>
              <ProFormDigit
                label={fieldLabels.height}
                name="height"
                min={1}
                max={280}
                fieldProps={{ precision: 0 }}
                rules={[{ required: true, message: `${fieldLabels.height}不能为空！` }]}
                placeholder={`请输入${fieldLabels.height}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7, offset: 1}} md={{ span: 7, offset: 1}} sm={24}>
              <ProFormDigit
                label={fieldLabels.weight}
                name="weight"
                min={1}
                max={300}
                rules={[{ required: true, message: `${fieldLabels.weight}不能为空！` }]}
                placeholder={`请选择${fieldLabels.weight}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7, offset: 1}} md={{ span: 7, offset: 1}} sm={24}>
              <ProFormSelect
                label={fieldLabels.education}
                name="education"
                valueEnum={educationEnum}
                rules={[{ required: true, message: `${fieldLabels.education}不能为空！` }]}
                placeholder={`请选择${fieldLabels.education}`}
              />
            </Col>
            <Col xl={{ span: 7, }} lg={{ span: 7 }} md={{ span: 7 }} sm={24}>
              <ProFormText
                label={fieldLabels.job}
                name="job"
                rules={[{ required: true, message: `${fieldLabels.job}不能为空！` }]}
                placeholder={`请输入${fieldLabels.job}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7 }} md={{ span: 7 }} sm={24}>
              <ProFormText
                label={fieldLabels.residentialAddress}
                name="residentialAddress"
                rules={[{ required: true, message: `${fieldLabels.residentialAddress}不能为空！` }]}
                placeholder={`请输入${fieldLabels.residentialAddress}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7 }} md={{ span: 7 }} sm={24}>
              <ProFormText
                label={fieldLabels.domicile}
                name="domicile"
                rules={[{ required: true, message: `${fieldLabels.domicile}不能为空！` }]}
                placeholder={`请输入${fieldLabels.domicile}`}
              />
            </Col>
          </Row>
        </Card>
        <Card title="详细信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={{ span: 7}} lg={{ span: 7 }} md={{ span: 7 }} sm={24}>
              <ProFormSelect
                label={fieldLabels.marryStatus}
                name="marryStatus"
                valueEnum={marryStatusEnum}
                rules={[{ required: true, message: `${fieldLabels.marryStatus}不能为空！` }]}
                placeholder={`请选择${fieldLabels.marryStatus}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7, offset: 1}} md={{ span: 7, offset: 1}} sm={24}>
               <ProFormSelect
                label={fieldLabels.expectMarry}
                name="expectMarry"
                valueEnum={expectMarryEnum}
                rules={[{ required: true, message: `${fieldLabels.expectMarry}不能为空！` }]}
                placeholder={`请选择${fieldLabels.expectMarry}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7, offset: 1}} md={{ span: 7, offset: 1}} sm={24}>
               <ProFormSelect
                label={fieldLabels.onlyChild}
                name="onlyChild"
                valueEnum={sureEnum}
                rules={[{ required: true, message: `${fieldLabels.onlyChild}不能为空！` }]}
                placeholder={`请选择${fieldLabels.onlyChild}`}
              />
            </Col>
            <Col xl={{ span: 7, }} lg={{ span: 7}} md={{ span: 7}} sm={24}>
               <ProFormSelect
                label={fieldLabels.income}
                name="income"
                valueEnum={incomeEnum}
                rules={[{ required: true, message: `${fieldLabels.income}不能为空！` }]}
                placeholder={`请选择${fieldLabels.income}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7, offset: 1}} md={{ span: 7, offset: 1}} sm={24}>
              <ProFormSelect
                label={fieldLabels.car}
                name="car"
                valueEnum={carEnum}
                rules={[{ required: true, message: `${fieldLabels.car}不能为空！` }]}
                placeholder={`请选择${fieldLabels.car}`}
              />
            </Col>
            <Col xl={{ span: 7, offset: 1}} lg={{ span: 7, offset: 1}} md={{ span: 7, offset: 1}} sm={24}>
              <ProFormSelect
                label={fieldLabels.house}
                name="house"
                valueEnum={houseEnum}
                rules={[{ required: true, message: `${fieldLabels.house}不能为空！` }]}
                placeholder={`请选择${fieldLabels.house}`}
              />
            </Col>
          </Row>
        </Card>
      
        <Card title="理想的TA" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name2}
                name="name2"
                rules={[{ required: true, message: '请输入' }]}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={fieldLabels.url2}
                name="url2"
                rules={[{ required: true, message: '请选择' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={fieldLabels.owner2}
                name="owner2"
                rules={[{ required: true, message: '请选择管理员' }]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.approver2}
                name="approver2"
                rules={[{ required: true, message: '请选择审批员' }]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
                placeholder="请选择审批员"
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormTimePicker
                label={fieldLabels.dateRange2}
                name="dateRange2"
                rules={[{ required: true, message: '请输入' }]}
                placeholder="提醒时间"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={fieldLabels.type2}
                name="type2"
                rules={[{ required: true, message: '请选择仓库类型' }]}
                options={[
                  {
                    label: '私密',
                    value: 'private',
                  },
                  {
                    label: '公开',
                    value: 'public',
                  },
                ]}
                placeholder="请选择仓库类型"
              />
            </Col>
          </Row>
        </Card>
        <Card title="关注的TA" bordered={false}>
          <ProForm.Item name="members">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
              }}
              columns={columns}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
