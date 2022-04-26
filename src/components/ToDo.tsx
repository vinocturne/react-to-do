import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    // IToDo 인터페이스의 category 속성만 가져와서 타입 설정이 가능
    // const onClick = (newCategory: IToDo["category"]) => {
    //     console.log(" i wanna to ", newCategory);
    // };
    // 혹은 아래와 같이 buttonElement를 받아와서 처리할 수도 있다.
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        //category 수정을 위한 단계
        //1) toDos에서 변경하고자 하는 toDo의 위치를 알아야한다.
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const oldToDo = oldToDos[targetIndex];
            const newToDo = { text, id, category: name as any };
            console.log(oldToDo, newToDo);
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };
    return (
        <li>
            <span>{text}</span>
            {category !== "DOING" && (
                // <button onClick={() => onClick("DOING")}>Doing</button>
                <button name="DOING" onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== "TO_DO" && (
                // <button onClick={() => onClick("TO_DO")}>To Do</button>
                <button name="TO_DO" onClick={onClick}>
                    To Do
                </button>
            )}
            {category !== "DONE" && (
                // <button onClick={() => onClick("DONE")}>Done</button>
                <button name="DONE" onClick={onClick}>
                    Done
                </button>
            )}
        </li>
    );
}

export default ToDo;
