import {useEffect, useState} from "react";
import {Button, Select, Typography, Form, Card, Space, message, Tooltip} from "antd";
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
    const [fullFileText, setFullFileText] = useState<string>("");
    const [caseType, setCaseType] = useState<string | undefined>(undefined);
    const [characterValue, setCharacterValue] = useState("");
    const [prevCharacterValue, setPrevCharacterValue] = useState<string>(""); // stores the "original" state for toggling
    const [lastCaseType, setLastCaseType] = useState<string | undefined>(undefined); // stores the last transformation type

    const onFinish = async (values: any) => {
        setLoading(true);
        setResult(null);
        try {
            // Use full file if present, otherwise the form value
            const character = fullFileText || values.character;
            const payload = { ...values, character };
            const resp = await fetch(BACKEND_COUNT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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

    useEffect(() => {
        // Block right-click, copy, cut, paste
        const prevent = (e: Event) => e.preventDefault();

        document.addEventListener("contextmenu", prevent);

        return () => {
            document.removeEventListener("contextmenu", prevent);
        };
    }, []);

    // Log a message to the console for developers
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.console &&
            !window.__hasShownEasterEgg
        ) {
            const mainStyle = "color: #64ffda; font-size: 12px; font-weight: bold;";
            const footerStyle = "color: #aaa; font-style: italic;";
            console.log("%cYo dude, what are you doing here?!", mainStyle);
            console.log("%c— Am", footerStyle);
            window.__hasShownEasterEgg = true; // Mark as shown for this session
        }
    }, []);

    function toSentenceCase(str: string) {
        return str
            .toLowerCase()
            .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
    }
    function toCapitalizeEachWord(str: string) {
        return str.replace(/\b\w+\b/g, (word) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
    }
    function toToggleEachWord(str: string) {
        return str.replace(/\b\w+\b/g, (word) =>
            word.charAt(0).toLowerCase() + word.slice(1).toUpperCase()
        );
    }

    // Helper to read file text and set into form
    const handleFileUpload = (file: RcFile) => {
        const isTxt = file.type === "text/plain";
        if (!isTxt) {
            message.error("Only .txt files are supported!");
            return false;
        }
        if (file.size > 20 * 1024 * 1024) {
            message.error("File must be smaller than 20MB!");
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target) return;
            const text = e.target.result as string;
            setFullFileText(text); // Store the full content for submission
            const lines = text.split('\n');
            const preview = lines.slice(0, 500).join('\n').slice(0, 20000);
            form.setFieldsValue({ character: preview });
            setCharacterValue(preview); // Update the character value for TextArea
            message.info("Preview limited to first 500 lines. Full file will be counted.");
        };
        reader.readAsText(file);
        return false;
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
                    <Form.Item label="Text File: (Max 20MB)" style={{ marginBottom: 10 }}>
                        <Upload
                            accept=".txt"
                            showUploadList={false}
                            beforeUpload={handleFileUpload}
                            maxCount={1}
                        >
                            <Tooltip title="Max 20MB, only .txt file!">
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Tooltip>
                        </Upload>
                    </Form.Item>
                    <Form.Item className="text-validation" label="Input:" name="character" rules={[{ required: true, message: "Input is required! (any text or character)" }]}>
                        <TextArea
                            rows={6}
                            placeholder="Paste or type your text here..."
                            value={characterValue}
                            onChange={e => {
                                setCharacterValue(e.target.value);
                                form.setFieldsValue({ character: e.target.value });
                                setPrevCharacterValue("");          // Reset previous state
                                setLastCaseType(undefined);         // Reset last transformation type
                            }}
                        />

                    </Form.Item>
                    <Form.Item>
                        <div className="bottom-buttons">
                            <Space>
                                <Tooltip title="Count the characters in the input text or uploaded file">
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Count
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Clear the input and results">
                                    <Button
                                        onClick={() => {
                                            form.resetFields();
                                            setResult(null);
                                            setFullFileText(""); // Clear the full file text
                                            setCharacterValue(""); // Clear TextArea value
                                            setCaseType(undefined); // Reset case type
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </Tooltip>
                            </Space>
                            <Space>
                            <Select
                                value={caseType}
                                placeholder="Case Transformation"
                                allowClear
                                style={{ width: 180 }}
                                onChange={setCaseType}
                                options={[
                                    { label: "Sentence case", value: "sentence" },
                                    { label: "lowercase", value: "lower" },
                                    { label: "UPPERCASE", value: "upper" },
                                    { label: "Capitalize Each Word", value: "capitalize" },
                                    { label: "tOGGLE cASE", value: "toggle" },
                                ]}
                            />
                            <Tooltip title="Apply 'Case Transformation' to the input text">
                                <Button
                                    type="default"
                                    disabled={!characterValue.trim() || !caseType}
                                    onClick={() => {
                                        const val = form.getFieldValue("character");
                                        if (!val || !val.trim()) {
                                            message.error("Please add input.");
                                            return;
                                        }
                                        if (!caseType) {
                                            message.error("Please select a case transformation.");
                                            return;
                                        }
                                        
                                        // Special logic for "toggle" to cycle properly
                                        if (caseType === "toggle") {
                                            if (caseType === lastCaseType && prevCharacterValue) {
                                                // If toggled, go back to original
                                                form.setFieldsValue({ character: prevCharacterValue });
                                                setCharacterValue(prevCharacterValue);
                                                setPrevCharacterValue(val);
                                                return;
                                            }
                                            // First time applying toggle or caseType changed
                                            const toggled = toToggleEachWord(val);
                                            setPrevCharacterValue(val);
                                            setLastCaseType(caseType);
                                            form.setFieldsValue({ character: toggled });
                                            setCharacterValue(toggled);
                                            setFullFileText("");
                                            return;
                                        }

                                        // All other case transforms
                                        if (caseType === lastCaseType && prevCharacterValue) {
                                            // Cycle back to previous state
                                            form.setFieldsValue({ character: prevCharacterValue });
                                            setCharacterValue(prevCharacterValue);
                                            setPrevCharacterValue(val); // update prev state
                                            return;
                                        }

                                        let newText = val;
                                        switch (caseType) {
                                            case "sentence":
                                                newText = toSentenceCase(val);
                                                break;
                                            case "lower":
                                                newText = val.toLowerCase();
                                                break;
                                            case "upper":
                                                newText = val.toUpperCase();
                                                break;
                                            case "capitalize":
                                                newText = toCapitalizeEachWord(val);
                                                break;
                                            // case "toggle": handled above
                                            default:
                                                break;
                                        }
                                        setPrevCharacterValue(val);
                                        setLastCaseType(caseType);
                                        form.setFieldsValue({ character: newText });
                                        setCharacterValue(newText);
                                        setFullFileText("");
                                    }}
                                >
                                    Apply
                                </Button>
                            </Tooltip>
                        </Space>
                        </div>
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