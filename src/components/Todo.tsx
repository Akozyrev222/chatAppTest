import {Flex, Form} from "antd";
import CustomForm from "./Form/CustomForm";
import ProgressBar from "./ProgressBar/ProgressBar";
import {useTodo} from "./useTodo";
import CustomTable from "./Table/Table";


const Todo = () => {

    const {
        allTodos,
        newTodo,
        form,
        editingID,
        cancel,
        save,
        edit,
        deleteTodoToggle,
        isEditing,
        handleSubmit,
        handleSelect
    } = useTodo()


    return (
            <Form form={form} component={false}>
                <Flex style={
                    {
                        margin: '24px', display: 'grid',
                        gridAutoFlow: 'column',
                        gridColumnGap: '25px'
                    }
                }
                      justify='center'
                      align='center'
                >
                    <CustomForm handleSubmit={handleSubmit} newTodo={newTodo}/>
                    <ProgressBar allTodos={allTodos}/>
                </Flex>
                <CustomTable allTodos={allTodos}
                             editingID={editingID}
                             edit={edit}
                             deleteTodoToggle={deleteTodoToggle}
                             cancel={cancel}
                             save={save}
                             isEditing={isEditing}
                             handleSelect={handleSelect}
                />
            </Form>
    );
};
export default Todo