import { atom, selector } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

//타입이 정해져있는경우 해당 요소들을 전부 넣어 알려줄 수 있다.
export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});
