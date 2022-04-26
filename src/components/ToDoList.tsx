import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoState);
    console.log(toDos);
    return (
        <div>
            <h1 style={{ color: "white" }}>To Dos</h1>
            <hr />
            <CreateToDo />
            <ul style={{ color: "white" }}>
                {toDos.map((toDo) => (
                    // <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />
                    // 위처럼 모든 프로퍼티를 넘기는 것 보다 아래와 같이 ...을 활용하여 한번에 옮기는 것이 편하고 보기 좋다.
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
