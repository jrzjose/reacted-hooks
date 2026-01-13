import { Timestamp } from "firebase/firestore";

export interface Input {
    title?: string,
    file?: string,
    path?: string,
}

export interface State {
    items: string[],
    count: number,
    inputs: Input
    isCollapsed: boolean,
    placeholders: string[],
}

export interface Action {
    type: string,
    payload: any //! fix this
}

export interface Media {
    path: string,
    title: string,
    createdAt: Timestamp,
    user: string,
    id: string
}