import {useState} from "react";
import {useTodo,ToDoType} from "./hooks";
import clsx from "clsx";
import { FormEvent,ChangeEvent, ReactNode } from "react";

export interface MemoInputProps {
 onAdd: (toDoContent:string) => void
} 

function MemoInput({onAdd}:MemoInputProps){
    const [memo, setMemo] = useState<string>('')
    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault();
        onAdd(memo);
        setMemo('');
    }
    return (
        <form 
            className={clsx(
                'w-full',
                'my-2',
                'flex flex-row justify-start'
            )}
            onSubmit={handleSubmit}
        >
            <input type="text" className="w-full px-2 py-1 outline-none border rounded" name="todoContent" placeholder="待辦事項" onChange={e=>setMemo(e.target.value)} value={memo} required/>
            <button type="submit" 
                className={clsx(
                    'font-bold text-2xl  transition duration-200 border rounded-lg shadow-none',
                    'ml-2 p-3',
                    'bg-gray-200 text-gray-700 border-gray-200',
                    'hover:text-yellow-500 hover:border-yellow-500',
                    'active:bg-gray-500 active:shadow-inner'
                )}
            >+
            </button>
        </form>
    )
}

export interface ToDoItemEvents{
    onEdit?: ()=>void,
    onModify?:(content:string)=>void,
    onComplete?: ()=>void,
    onDestroy?: ()=>void,
}
export interface ToDoItemProps extends ToDoItemEvents{
    todo: string;
    isEdit: boolean;
    isDone: boolean;
}

function ToDoItem({todo,isEdit,isDone,onEdit=()=>{},onModify=()=>{},onDestroy=()=>{},onComplete=()=>{}}:ToDoItemProps){
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>onModify(e.target.value);
    const content = isEdit ? (
        <input 
            type="text" 
            className={clsx(
                'w-full',
                'shadow-inner outline-none rounded-md',
                {
                    'bg-gray-400': isEdit,
                    'bg-transparent': !isEdit,
                },
                'focus:ring-green-600'
            )} 
            onChange={handleChange} 
            value={todo}
        />
    ) : (
        <span 
            className="w-full"
        >
            {todo}
        </span>
    );
    const visibleTrash = isEdit ? (
    <button 
        className={clsx(
            'destroyToDo bg-transparent',
            'font-bold text-gray-100',
            'mx-1 px-3',
            'rounded-xl',
            'transition duration-200',
            'hover:bg-red-700'
        )} 
        onClick={onDestroy}
    >
            🗑
    </button>
    ):null;
    return(
        <div
            className={clsx(
                'bg-gray-200',
                'font-bold text-lg',
                'border rounded-md px-3 py-2',
                'grid grid-cols-10'
            )}>
                <div className="col-span-2 flex items-center border-r border-gray-400">
                    <label 
                        className={clsx(
                            'w-full h-full px-3 py-1 rounded-lg transition',
                            'flex flex-row justify-center items-center',
                            {
                                'bg-transparent': !isEdit,
                                ' bg-gray-800 cursor-pointer': isEdit
                            }
                        )}
                    >
                        <input type="checkbox" className="hidden"  defaultChecked={isDone} checked={isDone} onChange={onComplete} disabled={!isEdit}/>
                        <span className={clsx('text-sm font-bold',{'text-red-600':!isDone,'text-green-600':isDone})}>{isDone ? '完成':'未完成'}</span>
                    </label>
                </div>
                <div className="col-span-6 px-4 py-1">
                    {content}
                </div>
                <div 
                    className={clsx(
                        'col-span-2',
                        'flex flex-row'
                    )}
                >
                    <button 
                    className={clsx(
                        'editToDo bg-transparen',
                        'font-bold text-gray-100',
                        'mx-1 px-3',
                        'rounded-xl',
                        'transition duration-200',
                        'hover:bg-gray-800'
                    )} 
                    onClick={onEdit}>
                        {isEdit?'📥':'📝'}
                    </button>
                    {visibleTrash}
                </div>  
        </div>
    )
}

export interface ToDoListProps {
    todos: ToDoType[];
    todo: (props:ToDoType)=>ReactNode;
}

function ToDoList({todos,todo}:ToDoListProps){
    return(
        <ul>
            {
                todos.map((props)=><li key={props.id} className=" mt-4 first:mt-0">{todo(props)}</li>)
            }
        </ul>
    )
}

function ToDoForm(){
    const {toDoItems,addToDo,editTodo,ModifyTodo,destroyTodo,completeTodo} = useTodo();
    return(
        <div
            className={clsx(
                'w-4/12',
                'font-bold text-lg',
                'rounded-md shadow-lg px-3 py-2'
            )}
        >
            <MemoInput onAdd={addToDo}/>
            <ToDoList 
                todos={toDoItems} 
                todo={
                    (props)=><ToDoItem 
                        {...props} 
                        onEdit={()=>editTodo(props.id)} 
                        onModify={(content)=>ModifyTodo(props.id,content)}
                        onComplete={()=>completeTodo(props.id)}
                        onDestroy={()=>destroyTodo(props.id)}
                    />
                }
            />
        </div>
    )
}

export default ToDoForm;