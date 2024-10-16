import mongoose, { Schema, Document } from 'mongoose'

export interface ITask extends Document {
    title: string
    description: string
    status: boolean
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
})

export const Task = mongoose.model<ITask>('task', TaskSchema)
