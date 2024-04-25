import {Checkbox, Flex, Popconfirm, Space, Table, Typography} from "antd";
import {TodoModel} from "../../models/redux-models";
import {EditableCell} from "../EditableCell/EditableCell";
import {DndContext} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useTable} from "./useTable";
import {Row} from "./Row";

type CustomTableTypes = {
    allTodos: TodoModel[],
    editingID: number | null
    edit: (record: Partial<TodoModel> & { id: number }) => void
    deleteTodoToggle: (id: number) => void
    cancel: () => void
    save: (id: number) => Promise<void>
    isEditing: (record: TodoModel) => boolean
    handleSelect: (id: number, completed: boolean) => void
}
const CustomTable = (props: CustomTableTypes) => {

    const {isEditing, save, cancel, editingID, edit, deleteTodoToggle, allTodos, handleSelect} = props
    const {onDragEnd, sensors} = useTable(allTodos)

    const columns = [
        {
            title: 'Done',
            dataIndex: 'completed',
            render: (_: any, record: TodoModel) => {
                return (
                    <Flex justify={'center'} align={'center'}>
                        <Checkbox checked={record.completed}
                                  onChange={() => handleSelect(record.id, record.completed)}/>
                    </Flex>
                )
            },
            sorter: (a: TodoModel, b: TodoModel) => Number(a.completed) - Number(b.completed),
            width: '10%'

        },
        {
            title: 'TODO',
            dataIndex: 'todo',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: TodoModel) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link onClick={() => save(record.id)} style={{marginRight: 8}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Space>
                        <Typography.Link disabled={editingID !== null} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Typography.Link onClick={() => deleteTodoToggle(record.id)}>
                            Delete
                        </Typography.Link>
                    </Space>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: TodoModel) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    return (
        <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext
                // rowKey array
                items={allTodos.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
            >
                <Table
                    components={{
                        body: {
                            row: Row,
                            cell: EditableCell,
                        },
                    }}
                    rowKey={(record) => record.id}
                    bordered
                    dataSource={allTodos}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </SortableContext>
        </DndContext>
    );
};
export default CustomTable