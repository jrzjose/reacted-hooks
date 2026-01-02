export interface Input {
    title?: string,
    file?: string,
    path?: string,
}

export interface State {
    items: string[],
    count: number,
    inputs: Input
    isCollapsed: boolean
}

export interface Action {
    type: string,
    payload: any //! fix this
}