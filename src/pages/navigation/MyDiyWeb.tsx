import UserModel, { UserModelType } from '@/models/navigation';
import { UploadOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Input,
  InputNumber,
  Card,
  Select,
  Modal,
  Form,
  FormInstance,
  message,
  Upload,
  BackTop,
  Tabs,
} from 'antd';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './index.less';

import { connect, Dispatch, request, useRequest } from 'umi';
import MyContainer from './components/MyContainer';
import { getAuthority } from '@/utils/authority';
import MutilSearchBar from './components/MutilSearchBar';
import CateContainer from './catecompents/CateContainer';

const { Option } = Select;
export interface Props {
  name: string;
  list: any;
  loading: any;
  webInfoUpdateModal: any;
  dispatch: Dispatch;
}

const MyDiyWeb: React.FC<Props> = (props) => {
  const { list, loading, dispatch, webInfoUpdateModal } = props;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [webCategoryList, setWebCategoryList] = useState<any>([]);
  useRequest(
    () => ({
      url: '/api/webCategory/listAll',
      method: 'get',
      data: {},
    }),
    {
      manual: false,
      onSuccess: (result, params) => {
        setWebCategoryList(result.content);
      },
    },
  );

  const updateWebCategoryList = () => {
    dispatch({
      type: 'navigation/fetchWebCategoryListAll',
      payload: {},
      callback: (response: any) => {
        setWebCategoryList(response.content);
      },
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWebCategoryModalOpen, setIsWebCategoryModalOpen] = useState(false);
  const [isSortWebCategoryModalOpen, setIsSortWebCategoryModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showWebCategoryModal = () => {
    setIsWebCategoryModalOpen(true);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        const result = webCategoryList.find((item: any) => item.uid === values.webCategoryId);
        dispatch({
          type: 'navigation/fetchWebInfoSave',
          payload: {
            ...values,
            webCategoryName: result.name,
          },
          callback: (response: any) => {
            updateWebCategoryList();
            message.success('操作成功！');
          },
        });
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleOkWebCategory = async () => {
    form2
      .validateFields()
      .then((values) => {
        dispatch({
          type: 'navigation/fetchWebCategorySave',
          payload: {
            ...values,
          },
          callback: (response: any) => {
            updateWebCategoryList();
            message.success('操作成功！');
          },
        });
        form2.resetFields();
        setIsWebCategoryModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelWebCategory = () => {
    setIsWebCategoryModalOpen(false);
  };


  const handleSortCancelWebCategory = () => {
    updateWebCategoryList();
    setIsSortWebCategoryModalOpen(!isSortWebCategoryModalOpen);
  };

  const renderWebCategoryOptions = () => {
    const options: any = [];
    webCategoryList.forEach((item: any) => {
      options.push(
        <Option key={item.uid} value={item.uid}>
          {item.name}
        </Option>,
      );
    });

    return <Select style={{ width: 120 }}>{options}</Select>;
  };

  const UploadProps = {
    name: 'file',
    action: '/api/webInfo/uploadSave',
    headers: {
      authorization: getAuthority(),
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        updateWebCategoryList();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleDownload = () => {
    const fileUrl = '/api/webInfo/download';
    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: getAuthority(),
      },
    };
    fetch(fileUrl, requestOptions).then((response) => {
      const filenames = response.headers.get('content-disposition');
      let filename = '';
      if (filenames !== null && filenames !== undefined) {
        filename = filenames.split('filename=')[1];
      }
      filename = decodeURIComponent(filename);
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  };

  const webInfoUpdate = (record: any) => {
    setIsModalOpen(true);
    form.setFieldValue('fundCode', record.fundCode);
    form.setFieldValue('name', record.name);
    form.setFieldValue('quantity', record.quantity);
    form.setFieldValue('pastPrice', record.pastPrice);
  };

  const editInfo = (record: any) => {
    debugger;
    form3.setFieldValue('name', record.name);
    form3.setFieldValue('url', record.url);
    form3.setFieldValue('name', record.name);
    form3.setFieldValue('webCategoryId', record.webCategoryId);
  };

  const handleCancel2 = async () => {
    dispatch({
      type: 'navigation/setWebInfoModal',
      payload: {
        webInfoUpdateModal: { webInfoModal: false },
      },
      callback: (response: any) => {
        form3.resetFields();
      },
    });
  };
  const handleOk3 = async () => {
    form3
      .validateFields()
      .then((values) => {
        const result = webCategoryList.find((item: any) => item.uid === values.webCategoryId);
        dispatch({
          type: 'navigation/fetchWebInfoUpdateSelect',
          payload: {
            ...values,
            webCategoryName: result.name,
            uid: webInfoUpdateModal.uid,
          },
          callback: (response: any) => {
            updateWebCategoryList();
            message.success('操作成功！');
            form3.resetFields();
            handleCancel2();
          },
        });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  return (
    <PageContainer>
      <Modal
        title="编辑网址"
        open={webInfoUpdateModal.webInfoModal}
        onOk={handleOk3}
        onCancel={handleCancel2}
      >
        {webInfoUpdateModal.name}
        <br />
        {webInfoUpdateModal.url}
        <br />

        <Form form={form3}>
          <Form.Item
            name="webCategoryId"
            label="分类"
            rules={[{ required: true, message: '分类!', whitespace: true }]}
          >
            {renderWebCategoryOptions()}
          </Form.Item>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '网页名称自动回填可修改!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="网址"
            rules={[
              {
                type: 'url',
                message: '网址不合法，样例https://poe-mirror.com!',
              },
              {
                required: true,
                message: '请输入网址',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="新增网页" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form}>
          <Form.Item
            name="webCategoryId"
            label="分类"
            rules={[{ required: true, message: '分类!', whitespace: true }]}
          >
            {renderWebCategoryOptions()}
          </Form.Item>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '网页名称自动回填可修改!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="网址"
            rules={[
              {
                type: 'url',
                message: '网址不合法，样例https://cn.bing.com!',
              },
              {
                required: true,
                message: '请输入网址',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="新增分类"
        open={isWebCategoryModalOpen}
        onOk={handleOkWebCategory}
        onCancel={handleCancelWebCategory}
      >
        <Form form={form2}>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="weight"
            label="序号"
            rules={[{ required: true, message: '序号', whitespace: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal

        title="分类排序(防止失去网站联系请关注公众号：恒生科技小姐姐)"
        open={isSortWebCategoryModalOpen}
        onOk={handleSortCancelWebCategory}
        onCancel={handleSortCancelWebCategory}
        width={1000}

      >
        <div >
          <DndProvider backend={HTML5Backend} >
            <CateContainer a="a" />
          </DndProvider>
        </div>
        <hr />
        <br />
        <p></p>
        <p></p>
      </Modal>

      <GridContent>
        <MutilSearchBar name={''} />
        <br />
        <br />
        <br />
        <br />
        <div className={styles.MyDiyWebButton}>
          <Button type="primary" onClick={showModal}>
            新增网址
          </Button>
          <Button type="primary" onClick={showWebCategoryModal}>
            新增分类
          </Button>
          <Button type="primary" onClick={handleSortCancelWebCategory}>
            分类排序
          </Button>
          <Button type="primary" onClick={handleDownload}>
            备份下载
          </Button>
          <Upload {...UploadProps}>
            <Button icon={<UploadOutlined />}>批量导入</Button>
          </Upload>
        </div>

        {/* {webCategoryList.map((item, index) => {
                    return <Card bordered={false} key={item.uid}>



                        <DndProvider backend={HTML5Backend} >
                            <MyContainer webCategory={item} updateWebCategoryList={updateWebCategoryList} />
                        </DndProvider>
                    </Card>;
                })} */}

        <Tabs tabPosition="top">
          {webCategoryList.map((item, index) => {
            return (
              <Tabs.TabPane tab={item.name} key={item.uid}>
                <Card bordered={false} key={item.uid}>
                  <DndProvider backend={HTML5Backend}>
                    <MyContainer
                      webCategory={item}
                      updateWebCategoryList={updateWebCategoryList}
                      webInfoUpdate={webInfoUpdate}
                      editInfo={editInfo}
                    />
                  </DndProvider>
                </Card>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </GridContent>

      <BackTop>
        <div>UP</div>
      </BackTop>
    </PageContainer>
  );
};

export type ConnectState = {
  list: any;
  loading: any;
  webInfoUpdateModal: any;
};
function mapStateToProps(state: any) {
  //state是项目所有的models

  const { list } = state.navigation; //获取namespace命名空间为navigation的models数据state
  const { webInfoUpdateModal } = state.navigation;
  return {
    list,
    webInfoUpdateModal,
  };
}
export default connect(mapStateToProps)(MyDiyWeb as any);
