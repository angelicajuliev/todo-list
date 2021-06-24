import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hooliiiis desde el JOME");
});

router.get("/todo", (req, res) => {
  res.json([
    {
        "id": "ID-124",
        "text": "Algo chiquito mas mas",
        "isCompleted": false
    }
])
});

export default router;
