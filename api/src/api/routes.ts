import express from "express";
import { ToDo } from "../db/models";

const router = express.Router();

router.get("/todo", async (_, response, next) => {
  try {
    const toDos = await ToDo.find({});
    response.json(toDos);
  } catch (error) { next()}
});

router.delete("/todo/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await ToDo.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {}
});

router.put("/todo/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const toDo = request.body;
    const toDoUpdated = {
      text: toDo.text,
      isCompleted: toDo.isCompleted
    }
    const updated = await ToDo.findByIdAndUpdate(id, toDoUpdated, {new: true});
    response.json(updated).end()
  } catch (error) {}
});

router.post("/todo", async (request, response) => {
  const toDo = request.body;

  if (!toDo.text) {
    return response.status(400).json({
      error: `Falta el atributo "text"`,
    });
  }

  const newToDo = new ToDo({
    text: toDo.text,
    isCompleted: false,
    order: toDo.order,
  });

  try {
    const savedToDO = await newToDo.save();
    return response.json(savedToDO);
  } catch (error) {
    console.error("Error al guardar", error);
    return response.status(500).end();
  }
});


router.use((error, request, response, next) => {
  console.error('Error', error);
  response.status(500).end()
})

export default router;
