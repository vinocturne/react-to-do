import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import { BootstrapInput } from "../assets/component-styled";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Container = styled.div`
    margin: 0 auto;
    width: 400px;
    padding: 30px 15px;
`;
const Title = styled.h1`
    color: white;
    font-size: 32px;
`;
const CreateContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const ListContainer = styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 13px;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const setToDos = useSetRecoilState(toDoState);
    const [category, setCategory] = useRecoilState(categoryState);
    const onChange = (event: SelectChangeEvent<Categories>) => {
        const {
            target: { value },
        } = event;

        setCategory(value as any);
    };
    useEffect(() => {
        const loadToDoList: string = localStorage.getItem("toDoList") as any;
        if (loadToDoList !== null) {
            setToDos(() => JSON.parse(loadToDoList));
        }
    }, []);

    return (
        <Container>
            <Title>📑 To Dos</Title>
            <hr />
            <CreateContainer>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <Select
                        value={category}
                        label="state"
                        input={<BootstrapInput />}
                        onChange={onChange}
                        size="small"
                    >
                        <MenuItem value={Categories.TO_DO}>To Do</MenuItem>
                        <MenuItem value={Categories.DOING}>Doing</MenuItem>
                        <MenuItem value={Categories.DONE}>Done</MenuItem>
                    </Select>
                </FormControl>
                <CreateToDo />
            </CreateContainer>
            <ListContainer>
                {toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ListContainer>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    );
}

export default ToDoList;
