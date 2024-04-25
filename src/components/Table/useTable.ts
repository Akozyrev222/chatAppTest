import {DragEndEvent, PointerSensor, SensorDescriptor, SensorOptions, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {setTodos} from "../../store/todo-slice";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {TodoModel} from "../../models/redux-models";

type useTableType = {
    onDragEnd: ({active, over}: DragEndEvent) => void
    sensors: SensorDescriptor<SensorOptions>[]
}


export const useTable = (allTodos: TodoModel[]): useTableType => {

    const dispatch = useAppDispatch()
    const onDragEnd = ({active, over}: DragEndEvent) => {
        if (active.id !== over?.id) {
            const todos = () => {
                const activeIndex = allTodos.findIndex((i) => i.id === active.id);
                const overIndex = allTodos.findIndex((i) => i.id === over?.id);
                return arrayMove(allTodos, activeIndex, overIndex);
            }
            dispatch(setTodos(todos()));
        }
    };
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
    );
    return {
        onDragEnd,
        sensors
    }
}