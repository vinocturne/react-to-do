import { useForm } from "react-hook-form";

interface IForm {
    toDo: string;
}

function ToDoList() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = (data: IForm) => {
        //react-hook-form에서 제공하는 기능 중 setValue는 매개변수로 변경할 변수의 이름과 바뀔 값을 보내면 설정 가능하다.
        //아래는 toDo를 비어있는 필드로 만들기 위한 코드.
        setValue("toDo", "");
    };
    return (
        <div>
            {/* handleSubmit은 react-hook-form에서 가져온 함수. 매개변수로 연결 할 함수를 작성한다.
                여기서는 handleValid 함수를 호출한다.
                handleSumit에서 data를 검사하고, 유효하다면 handleValid를 호출 */}
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("toDo", {
                        required: "Please write a To Do",
                    })}
                    placeholder="Write a to do"
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
