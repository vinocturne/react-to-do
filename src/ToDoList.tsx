import { useForm } from "react-hook-form";

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    password1: string;
    extraError?: string;
}

function ToDoList() {
    //register는 useState를 대신할 수 있음.
    //watch는 해당 변수의 변화를 추적할 수 있는 기능
    //handleSubmit이 validation을 진행.
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });
    const onValid = (data: IForm) => {
        if (data.password !== data.password1) {
            //setError(에러를 표시할 변수, {메세지 객체})로 에러를 표시할 수 있다.
            //shouldFocus로 해당 필드로 바로 이동할 것인지 설정할 수 있다.
            setError(
                "password1",
                { message: "Password are not the same" },
                { shouldFocus: true }
            );
        }

        // setError("extraError", { message: "Server offline." });
        // console.log(data);
    };
    console.log(errors);
    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onValid)}
            >
                {/* toDo라는 이름으로 register를 생성하여 props들을 input으로 넣어준다. */}
                <input
                    {...register("email", {
                        required: "Email is required.",
                        //정규식을 이용한 검증도 가능하다.
                        //required를 포함한 각 속성은 value와 message로 나뉘는데, value만 입력해도 상관은 없다.
                        //하지만 message를 표시해주기 위해 value와 message를 둘 다 표기할 수 있다.
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        },
                    })}
                    placeholder="Email"
                />
                <span style={{ color: "white" }}>{errors?.email?.message}</span>
                <input
                    {...register("firstName", {
                        required: "firstName is required",
                        //validate를 통해 각 옵션을 따로 줄 수도 있다.
                        validate: {
                            noNico: (value) =>
                                value.includes("nico")
                                    ? "no nicos allowd"
                                    : true,
                            noNick: (value) =>
                                value.includes("nick")
                                    ? "no nick allowd"
                                    : true,
                        },
                    })}
                    placeholder="First Name"
                />
                <span style={{ color: "white" }}>
                    {errors?.firstName?.message}
                </span>
                <input
                    {...register("lastName", {
                        required: "lastName is required",
                    })}
                    placeholder="Last Name"
                />
                <span style={{ color: "white" }}>
                    {errors?.lastName?.message}
                </span>
                <input
                    {...register("userName", {
                        required: "userName is required",
                        minLength: 10,
                    })}
                    placeholder="UserName"
                />
                <span style={{ color: "white" }}>
                    {errors?.userName?.message}
                </span>
                <input
                    {...register("password", {
                        required: "password is required",
                        minLength: 5,
                    })}
                    placeholder="Password"
                />
                <span style={{ color: "white" }}>
                    {errors?.password?.message}
                </span>
                <input
                    // required를 true로 하지 않고 메세지를 입력할 시, 해당 필드가 비게되면 해당 메세지를 출력한다.
                    {...register("password1", {
                        required: "Password1 is Required",
                        minLength: {
                            value: 5,
                            message: "Password1 must be more than 5",
                        },
                    })}
                    placeholder="Password1"
                />
                <span style={{ color: "white" }}>
                    {errors?.password1?.message}
                </span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );
}

// function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: { value },
//         } = event;
//         setToDoError("");
//         setToDo(value);
//     };
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo);
//         if (toDo.length < 10) {
//             return setToDoError("To do should be longer");
//         }
//     };
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input
//                     onChange={onChange}
//                     value={toDo}
//                     placeholder="Write a to do"
//                 />
//                 <button>Add</button>
//                 {toDoError !== "" ? toDoError : null}
//             </form>
//         </div>
//     );
// }

export default ToDoList;
