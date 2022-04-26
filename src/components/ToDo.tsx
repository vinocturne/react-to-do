import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import { toast } from "react-toastify";

const List = styled.li`
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 10px 15px;
    border-radius: 20px;
    box-shadow: rgba(215, 218, 220, 0.444) 0px 3px 24px;
`;

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const modifiedToDo = { text, id, category: name as any };
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const list = [
                ...oldToDos.slice(0, targetIndex),
                modifiedToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
            localStorage.setItem("toDoList", JSON.stringify(list));
            toast.info(`Your To Do have been moved to "${name}" category`);
            return list;
        });
    };

    const onClickDelete = () => {
        setToDos((oldToDos) => {
            const list = [...oldToDos.filter((toDo) => toDo.id !== id)];
            toast.error("Your To Do have been removed.");
            localStorage.setItem("toDoList", JSON.stringify(list));
            return list;
        });
    };

    return (
        <List>
            <span>{text}</span>
            <div>
                {category !== Categories.DOING && (
                    <IconButton
                        aria-label="doing"
                        color="info"
                        name={Categories.DOING}
                        onClick={onClick}
                    >
                        <HourglassTopTwoToneIcon />
                    </IconButton>
                )}
                {category !== Categories.TO_DO && (
                    <IconButton
                        aria-label="toDo"
                        color="secondary"
                        name={Categories.TO_DO}
                        onClick={onClick}
                    >
                        <FormatListBulletedTwoToneIcon />
                    </IconButton>
                )}
                {category !== Categories.DONE && (
                    <IconButton
                        aria-label="done"
                        color="success"
                        name={Categories.DONE}
                        onClick={onClick}
                    >
                        <CheckCircleOutlineIcon />
                    </IconButton>
                )}
                <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={onClickDelete}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </List>
    );
}

export default ToDo;
