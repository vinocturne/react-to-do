import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
    toDo: string;
}

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

function ToDoList() {
    // const value = useRecoilValue(toDoState);
    // const modFn = useSetRecoilState(toDoState);
    //필요할 때는 위에 처럼 따로 설정이 가능하지만, useState처럼 두개 동시에 설정도 가능하다.
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setValue("toDo", "");
        //setToDos를 할 경우에, 함수를 넣게되면 return값이 새로운 toDos가 된다.
        //아래는 이전 값들을 그대로 반환하는 것.
        setToDos((oldToDos) => [
            { text: toDo, id: Date.now(), category: "TO_DO" },
            ...oldToDos,
        ]);
    };
    console.log(toDos);
    return (
        <div>
            <h1 style={{ color: "white" }}>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("toDo", {
                        required: "Please write a To Do",
                    })}
                    placeholder="Write a to do"
                />
                <button>Add</button>
            </form>
            <ul style={{ color: "white" }}>
                {toDos.map((toDo) => (
                    <li key={toDo.id}>{toDo.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
