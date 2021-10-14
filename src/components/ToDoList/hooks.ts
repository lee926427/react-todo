import {useState} from "react";
import {filter,map} from "ramda";

export type ToDoType = {
    id: number;
    todo: string;
    isEdit: boolean;
    isDone: boolean;
}
export function useTodo(){
    const [toDoItems,setToDoItem] = useState<ToDoType[]>([]);

    const addToDo = (content:string) =>{
        setToDoItem([...toDoItems,{id:toDoItems.length+1,todo:content,isEdit:false,isDone:false}]);
    };

    const ModifyTodo = (id:number,todo:string) =>{
        console.log(id,todo)
        const newToDoList = toDoItems.map(
            item=>{
                if(item.id !== id) return item
                return {
                    ...item,
                    todo
                }
            }
        );
        setToDoItem(newToDoList);
    };

    const editTodo = (id:number) =>{
        const handleEdit = (item:ToDoType) =>{
                if(item.id !== id) return item
                return {
                    ...item,
                    isEdit: !item.isEdit
                }
            }
        setToDoItem(map(handleEdit,toDoItems));
    };
    const completeTodo = (id:number) =>{
        const handleComplete = (item:ToDoType)=>{
                if(item.id !== id) return item
                return {
                    ...item,
                    isDone: !item.isDone
                }
            }

        setToDoItem(map(handleComplete,toDoItems));
    };

    const destroyTodo = (toDoId:number) =>{
        const items = filter(({id})=>id !== toDoId,toDoItems)
        setToDoItem(items);
    };

    return{
        toDoItems,
        addToDo,
        editTodo,
        ModifyTodo,
        destroyTodo,
        completeTodo,
    }
}