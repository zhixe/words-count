import { useState } from "react";
import { Button, Select, Typography, Form, Card, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./App.css";
import 'antd/dist/reset.css';
import Footer from "./component/Footer.tsx";

const { Title } = Typography;
const { Option } = Select;

const API_URL = "http://localhost:8080/api/count";
export default function App() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<number | null>(null);

    const onFinish = async (values: any) => {
        setLoading(true);
        setResult(null);
        try {
            const resp = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!resp.ok) throw new Error("Network error!");
            const data = await resp.json();
            setResult(data.total_count);
        } catch (err) {
            message.error("Failed to count! Please try again.");
        }
        setLoading(false);
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
                    <Form.Item className="text-validation" label="Enter the text:" name="character" rules={[{ required: true }]}>
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
                                Reset
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