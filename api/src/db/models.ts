import { Schema, model } from "mongoose";

interface ToDoDocument {
  id: string;
  order?: number;
  text: string;
  isCompleted: boolean;
}

const toDoSchema = new Schema<ToDoDocument>({
  order: Number,
  text: { type: String, required: true },
  isCompleted: Boolean,
});
 


toDoSchema.set("toJSON", {
  transform: (_: any, returnedObj: any) => {
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.__v;

    return returnedObj
  },
});

export const ToDo = model<ToDoDocument>("ToDo", toDoSchema);
