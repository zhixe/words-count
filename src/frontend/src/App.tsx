import { useState } from "react";
import { Button, Select, Typography, Form, Card, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./App.css";
import 'antd/dist/reset.css';
import Footer from "./component/Footer.tsx";
import { BACKEND_COUNT } from "./_shared/constants";
import { Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

export default function App() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<number | null>(null);

    const onFinish = async (values: any) => {
        setLoading(true);
        setResult(null);
        try {
            const resp = await fetch(BACKEND_COUNT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!resp.ok) {
                setLoading(false);
                message.error("Network error!");
                return;
            }
            const data = await resp.json();
            setResult(data.total_count);
        } catch (err) {
            message.error("Failed to count! Please try again.");
        }
        setLoading(false);
    };

    // Helper to read file text and set into form
    const handleFileUpload = (file: RcFile) => {
        const isTxt = file.type === "text/plain";
        if (!isTxt) {
            message.error("Only .txt files are supported!");
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target) return;
            form.setFieldsValue({ character: e.target.result });
        };
        reader.readAsText(file);
        return false; // prevent upload to server
    };

    return (
        <div className="container">
            <Card style={{ width: 750 }}>
                <Title level={2} style={{ textAlign: "center" }}>
                    Character Count
                </Title>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    initialValues={{ count_with_spaces: "yes", count_type: "row" }}
                >
                    <Form.Item label="Count with spaces?" name="count_with_spaces" rules={[{ required: true }]}>
                        <Select>
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Count by:" name="count_type" rules={[{ required: true }]}>
                        <Select>
                            <Option value="row">Row (Line)</Option>
                            <Option value="column">Column (Field)</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Text File:" style={{ marginBottom: 10 }}>
                        <Upload
                            accept=".txt"
                            showUploadList={false}
                            beforeUpload={handleFileUpload}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item className="text-validation" label="Input:" name="character" rules={[{ required: true, message: "Input is required! (any text or character)" }]}>
                        <TextArea rows={6} placeholder="Paste or type your text here..." />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Count
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    setResult(null);
                                }}
                            >
                                Clear
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                {result !== null && (
                    <div style={{ textAlign: "center", marginTop: 20 }}>
                        <Title level={4}>Total: {result}</Title>
                    </div>
                )}
                <Footer />
            </Card>
        </div>
    );
}