import React, { useCallback, useEffect } from "react";
import { Form, Modal, Input } from "antd";
import { Spider } from "types/dashboard";

export interface EditSpiderFormProps {
    visible: boolean;
    loading?: boolean;
    spiderInfo: Spider;
    onCancel: () => void;
    onSubmit: (values: EditSpiderFormValues) => void;
}

export interface EditSpiderFormValues {
    spiderId: number;
    name: string;
    description: string;
    group: string;
    path: string;
}

function EditSpiderForm(props: EditSpiderFormProps) {
    const [form] = Form.useForm<EditSpiderFormValues>();
    const { visible, loading, spiderInfo, onSubmit, onCancel } = props;
    const handleSubmit = useCallback(async () => {
        const values = await form.validateFields();
        onSubmit(values);
    }, [form, onSubmit]);
    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={loading}
            title="编辑"
        >
            <Form form={form} layout="vertical" initialValues={spiderInfo}>
                <Form.Item
                    name="name"
                    label="爬虫名"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="path"
                    label="爬虫路径"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="group"
                    label="Group"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="描述"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditSpiderForm;
