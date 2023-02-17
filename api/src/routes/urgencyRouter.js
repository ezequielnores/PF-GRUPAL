const { Router } = require("express");
const {getUrgencies , getUrgency , postUrgency , putUrgency , getNotAttendedUrgencies} = require("./../controllers/urgencyController");

const router = Router()

router.get("/", (req, res) => {
    try {
        const urgencies = getUrgencies();
        res.status(200).send(urgencies);
    } catch (error) {
        res.status(404).send("There are no urgencies in DataBase");
    }
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    try {
        const urgency = getUrgency(id);
        res.status(200).send(urgency);
    } catch (error) {
        res.status(404).send("The urgency is not in DataBase");
    }
});

router.get("/notAttended", (req, res) => {
    try {
        const urgencies = getNotAttendedUrgencies();
        res.status(200).send(urgencies);
    } catch (error) {
        res.status(404).send("There are no not attended urgencies in DataBase");
    }
})

router.post("/", (req, res) => {
    const {symptomatology , attended} = req.body;
    try {
        const urgency = postUrgency(symptomatology , attended);
        res.status(200).send(urgency);
    } catch (error) {
        res.status(404).send("The urgency was not created");
    }
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const attended = req.body;
    try {
        const urgency = putUrgency(id, attended);
        res.status(200).send(urgency);
    } catch (error) {
        res.status(404).send("The urgency was not changed");
    }
})

module.exports = router;