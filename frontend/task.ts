export interface ITask {
    _id?: string | any
    title: string
    description: string
    status: boolean
    onDelete?: (id: string) => void;
    onToggleStatus?: (id: string) => void;
}
