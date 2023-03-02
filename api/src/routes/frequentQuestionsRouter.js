const { Router } = require("express");
const {
    createFrequentAsk,
    getFrequentAskById,
    findAllFrequentQuestions,
    updateFrequentAskById,
    deleteFrequentAskById,
    getFrequentAskByAsk
} = require("../controllers/frequentQuestionsController");
const frequentQuestionsRouter = Router();

frequentQuestionsRouter.get("/", async (req, res) => {
    const { ask } = req.query;

    try {
        if (ask) {
            const frequentAsk = await getFrequentAskByAsk(ask);
            if (!frequentAsk) throw new Error(`No se encuentra una pregunta frecuente como ${frequentAsk} en la BDD.`);
            res.status(200).json(frequentAsk);
            return;
        }

        const frequentQuestions = await findAllFrequentQuestions();
       // if (!frequentQuestions.length) throw new Error("No se encuentran preguntas frecuentes en la BDD.");

        res.status(200).json(frequentQuestions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

frequentQuestionsRouter.get("/frequentAskByAsk", async (req, res) => {
    // const { ask } = req.body;
    const { ask } = req.query;
    try {
        if (!ask) throw new Error("La pregunta esta indefinida.");

        const frequentAsk = await getFrequentAskByAsk(ask);
        if (!frequentAsk) throw new Error(`No se encontro la pregunta ${ask} en la BDD.`);

        res.status(200).json(frequentAsk);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

frequentQuestionsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id de la pregunta frecuente esta indefinido.");
        const frequentAsk = await getFrequentAskById(id);
        if (!frequentAsk) throw new Error(`La pregunta frecuente con el id ${id} no esta en la BDD.`);

        res.status(200).json(frequentAsk);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

frequentQuestionsRouter.post("/", async (req, res) => {
    const { answer, ask } = req.body;

    try {
        if (!answer) throw new Error("La respuesta no esta definida");
        if (!ask) throw new Error("La pregunta no esta definida");

        const frequentAskCreated = await createFrequentAsk(answer, ask);
        if (!frequentAskCreated) throw new Error("Error al crear la pregunta frecuente.");

        res.status(200).json(frequentAskCreated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

frequentQuestionsRouter.put("/update/:id", async (req, res) => {
    const { id }  = req.params;
    const attributes = req.query;

    try {
        if (![id, attributes].every(Boolean)) throw new Error("Datos incompletos para acualizar.");

        const frequentAskUpdated = await updateFrequentAskById(attributes, id);
        if (!frequentAskUpdated) throw new Error(`No se encuentra una pregunta frecuente con el id ${id} en la BDD.`);

        res.status(200).json(frequentAskUpdated);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

frequentQuestionsRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("El id de la pregunta frecuente esta indefinido.");

        const frequentAskDeleted = await deleteFrequentAskById(id);
        if (!frequentAskDeleted) throw new Error(`No se encuentra una pregunta frecuente con el id ${id} en la BDD.`);

        res.status(200).json(frequentAskDeleted);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});
module.exports = frequentQuestionsRouter;