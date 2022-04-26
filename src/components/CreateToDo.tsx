import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { BootstrapInput } from "../assets/component-styled";
import { FormControl, IconButton } from "@mui/material";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import styled from "styled-components";
import { toast } from "react-toastify";

interface IForm {
    toDo: string;
}

const InputFieldsContainer = styled.div`
    display: flex;
    align-items: center;
`;

function CreateToDo() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);

    const handleValid = async ({ toDo }: IForm) => {
        await setToDos((oldToDos) => {
            const newToDo = { text: toDo, id: Date.now(), category };
            const list = JSON.stringify([newToDo, ...oldToDos]);
            localStorage.setItem("toDoList", list);
            return [newToDo, ...oldToDos];
        });
        setValue("toDo", "");
        toast.success("Your to do is successfully updated");
    };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <FormControl sx={{ m: 1 }} variant="standard">
                <InputFieldsContainer>
                    <BootstrapInput
                        style={{ height: "100%" }}
                        {...register("toDo", {
                            required: "Please write a To Do",
                        })}
                        placeholder="Write a to do"
                    />
                    <IconButton
                        style={{ marginLeft: "10px" }}
                        size="small"
                        type="submit"
                        sx={{ color: "#ebffda" }}
                    >
                        <BorderColorTwoToneIcon />
                    </IconButton>
                </InputFieldsContainer>
            </FormControl>
        </form>
    );
}

export default CreateToDo;
