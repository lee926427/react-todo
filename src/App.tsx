import clsx from "clsx";
import ToDoList from "./components/ToDoList";
function App(){
    return(
        <div id='app' 
            className={clsx(
                'w-screen h-screen',
                'flex justify-center items-center',
            )}
        >
            <ToDoList/>
        </div>
    )
}

export default App;