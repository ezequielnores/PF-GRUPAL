const { Router } = require("express");
const { findByMail } = require("../controllers/doctorController");
const { getPatientByMail } = require("../controllers/patientController");
const {
  getComments,
  allCommentsByDoc,
  allCommentsByPatient,
  containOffensiveWords,
} = require("../controllers/commentsController");
const { Comments } = require("../db.js");
// const BadWords = require('bad-words');

const router = Router();
// const filter = new BadWords();

router.get("/", async (req, res) => {
  try {
    const commentsInfo = await getComments();
    console.log(commentsInfo);
    if (!commentsInfo.length) {
      //res.status(404).send("No comments in data base");
      res.status(200).json(commentsInfo);
    } else {
      res.status(200).send(commentsInfo);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/commentsByMailDoctor", async (req, res) => {
  let { mail } = req.query;

  try {
    if (!mail) throw new Error("El mail esta indefinido.");

    let doctor = await findByMail(mail);
    if (!doctor)
      throw new Error(
        `No se encuentra un medico con el mail ${mail} en la BDD.`
      );

    let comments = await allCommentsByDoc(doctor.id);
    console.log(comments);
    if (!comments.length) comments = [];

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/commentsByMailPatient", async (req, res) => {
  const { mail } = req.query;

  try {
    if (!mail) throw new Error("El mail esta indefinido.");

    const patient = await getPatientByMail(mail);
    if (!patient)
      throw new Error(
        `No se encuentra un paciente con el mail ${mail} en la BDD.`
      );

    const comments = await allCommentsByPatient(patient.id);
    if (!comments.length) comments = [];

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//-------------------------- trae los comentario por Doctor
router.get("/doctor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const commentsDoctor = await allCommentsByDoc(id);
      if (commentsDoctor.length) {
        res.status(200).send(commentsDoctor);
      } else {
        res.status(404).send("The doctor has no comments");
      }
    } else {
      res.status(404).send("Id not found");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//-------------------------- trae los comentario por Paciente
router.get("/patient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const commentsPatient = await allCommentsByPatient(id);
      if (commentsPatient.length) {
        res.status(200).send(commentsPatient);
      } else {
        res.status(404).send("The patient has no comments");
      }
    } else {
      res.status(404).send("Id not found");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await getComments();

    if (id) {
      const commentsById = await Comments.findByPk(id);
      if (commentsById) {
        res.status(200).json(commentsById);
      } else {
        res.status(404).send("Comment not found");
      }
    } else {
      res.status(404).send("Id not found");
    }
  } catch (error) {
    res.status(404).json({ error: error.message }, "Error de get id");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, message, rating, doctorId, patientId } = req.body;
    if (message) {
      const filterMessage = containOffensiveWords(title);
      const filterTitle = containOffensiveWords(message);
      const comment = await Comments.create({
        title: filterTitle,
        message: filterMessage,
        rating: rating,
      });

      await comment.setDoctor(doctorId);
      await comment.setPatient(patientId);

      res.status(200).send("Comment create successfully");
    } else {
      res.status(404).send("Fantaron datos para crear el comentario");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    if (id) {
      if (message) {
        const findComment = await Comments.findByPk(id);
        await findComment.update(
          {
            message,
          },
          { where: { id: id } }
        );
        res.status(200).send("Comentario modificado con exito");
      } else {
        res.status(404).send("Error al modificar el comentario");
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message }, "Entro al error del put");
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commentsDelete = await Comments.findByPk(id);
    if (!commentsDelete) {
      res.status(404).send("Comment not found");
    } else {
      commentsDelete.destroy(); // esto no sino que poner estado en activo en false
      res.status(200).send("Comment delete successfully");
    }
  } catch (error) {
    res.status(404).json({ error: error.message }, "Entro al error del delete");
  }
});

module.exports = router;
