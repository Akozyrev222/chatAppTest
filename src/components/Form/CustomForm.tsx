import {Button, Form, FormInstance, Input, Space} from "antd";

type CustomFormTypes = {
    handleSubmit: () => void
    newTodo: FormInstance<any>
}

const CustomForm = (props: CustomFormTypes) => {
    const {handleSubmit, newTodo} = props
    return (
        <Form
            form={newTodo}
            layout='vertical'
            style={{display: 'flex', alignItems: "center", flexDirection: "column"}}
            onFinish={handleSubmit}
        >
            <Form.Item name="todo" label="Todo" rules={[{required: true, type: "string"}]}>
                <Input/>
            </Form.Item>
            <Space>
                <Button
                    type="primary"
                    htmlType="submit">
                    Submit
                </Button>
            </Space>
        </Form>
    )
}
export default CustomForm