import {Flex, Progress} from "antd";
import {TodoModel} from "../../models/redux-models";
import {useEffect, useState} from "react";

type ProgressBarTypes = {
    allTodos: TodoModel[]
}

const ProgressBar = (props: ProgressBarTypes) => {
    const {allTodos} = props
    const [percent, setPercent] = useState<number>(Math.round((100 * allTodos.filter(todo => todo.completed).length) / allTodos.length))
    useEffect(() => {
            setPercent(Math.round((100 * allTodos.filter(todo => todo.completed).length) / allTodos.length))
        },
        [allTodos])
    return (
        <Flex gap="small" wrap="wrap">
            <Progress type="circle" percent={percent} format={(percent) => `${percent}`}/>
        </Flex>
    )
}
export default ProgressBar