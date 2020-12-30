import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Spin, Table, Popconfirm, Modal, Input, Divider, Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { PushAccountList, PushAccount } from 'types/dashboard';
import PushChannel from 'components/Dashboard/Push/PushChannel';
import JSONViewer from 'components/Common/JSONViewer';

export interface CreateAccountFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (platform: string, name: string, credential: string) => void;
    onCancel: () => void;
}

class CreateAccountForm extends React.Component<CreateAccountFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.platform, values.name, values.credential);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                onOk={this.handleSubmitClick}
                onCancel={this.props.onCancel}
                confirmLoading={this.props.loading}
                afterClose={() => {
                    this.props.form.resetFields();
                }}
            >
                <Form layout="vertical">
                    <Form.Item label="渠道">
                        {getFieldDecorator('platform', {
                            rules: [{ required: true }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="账号名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="账号凭据 (JSON)">
                        {getFieldDecorator('credential', {
                            rules: [{ required: true }]
                        })(
                            <Input.TextArea />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedCreateAccountForm = Form.create<CreateAccountFormProps & FormComponentProps>()(CreateAccountForm);

export interface EditAccountFormProps {
    account: PushAccount;
    visible: boolean;
    loading: boolean;
    onSubmit: (id: number, platform: string, name: string, credential: string) => void;
    onCancel: () => void;
}

class EditAccountForm extends React.Component<EditAccountFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.id, values.platform, values.name, values.credential);
            }
        });
    }
    componentDidUpdate(prevProps: EditAccountFormProps & FormComponentProps) {
        if (prevProps.account.id !== this.props.account.id) {
            this.props.form.resetFields();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                confirmLoading={this.props.loading}
                onOk={this.handleSubmitClick}
                onCancel={this.props.onCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="ID">
                        {getFieldDecorator('id', {
                            rules: [{ required: true }],
                            initialValue: this.props.account.id
                        })(
                            <Input
                                disabled={true}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="渠道">
                        {getFieldDecorator('platform', {
                            rules: [{ required: true }],
                            initialValue: this.props.account.platform
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="账号名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true }],
                            initialValue: this.props.account.name
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="账号凭证 (JSON)">
                        {getFieldDecorator('credential', {
                            rules: [{ required: true }],
                            initialValue: JSON.stringify(this.props.account.credential)
                        })(
                            <Input.TextArea />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedEditAccountForm = Form.create<EditAccountFormProps & FormComponentProps>()(EditAccountForm);

export interface Props {
    isLoading: boolean;
    accounts: PushAccountList;
    nowEditingAccount: PushAccount;
    createAccountModalVisible: boolean;
    createAccountModalLoading: boolean;
    editAccountModalVisible: boolean;
    editAccountModalLoading: boolean;
    showCreateAccountModal: () => void;
    hideCreateAccountModal: () => void;
    showEditAccountModal: (account: PushAccount) => void;
    hideEditAccountModal: () => void;
    getAccountList: () => void;
    createAccount: (platform: string, name: string, credential: string) => void;
    editAccount: (id: number, platform: string, name: string, credential: string) => void;
    deleteAccount: (id: number) => void;
}

class Account extends React.Component<Props> {
    accountColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '渠道',
        dataIndex: 'platform',
        key: 'platform',
        render: (platform: string) => {
            return <PushChannel channel={platform} />;
        }
    }, {
        title: '账号名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '账号凭据',
        key: 'credential',
        render: (text: string, record: PushAccount) => {
            return <JSONViewer json={record.credential} />;
        }
    }, {
        title: '操作',
        key: 'operations',
        render: (text: string, record: PushAccount) => {
            return (
                <div>
                    <Button
                        type="link"
                        onClick={() => {
                            this.props.showEditAccountModal(record);
                        }}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteAccount(record.id);
                        }}
                    >
                        <Button
                            type="link"
                            className="danger-text"
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            );
        }
    }];
    componentDidMount() {
        this.props.getAccountList();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="推送渠道账号管理">
                    <Table
                        dataSource={this.props.accounts}
                        columns={this.accountColumns}
                        pagination={false}
                        rowKey="id"
                    />
                    <Divider />
                    <Button 
                        onClick={() => {
                            this.props.showCreateAccountModal();
                        }}
                    >
                        创建新项
                    </Button>
                    <WrappedCreateAccountForm 
                        visible={this.props.createAccountModalVisible}
                        loading={this.props.createAccountModalLoading}
                        onSubmit={this.props.createAccount}
                        onCancel={this.props.hideCreateAccountModal}
                    />
                    <WrappedEditAccountForm 
                        account={this.props.nowEditingAccount}
                        visible={this.props.editAccountModalVisible}
                        loading={this.props.editAccountModalLoading}
                        onSubmit={this.props.editAccount}
                        onCancel={this.props.hideEditAccountModal}
                    />
                </Card>
            </Spin>
        );
    }
}

export default Account;