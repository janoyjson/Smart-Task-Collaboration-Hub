const express = require("express");
const router = express.Router();

const projectController = require("../controller/projectController");
const authetincateToken = require("../../middleware/authenticateToken");
const authorize = require("../../middleware/authorize");


router.post("/NewProjects", authetincateToken, authorize("admin"), (req, res) => {
  projectController.createProject(req, res);
});

router.get("/AllProjects", authetincateToken, authorize("admin"), (req, res) =>{
    projectController.getAllProjects(req, res)
})

router.get("/AllProjects/:id", authetincateToken, (req, res) =>{
    projectController.getProject(req, res)
})

router.put("/AllProjects/:id", authetincateToken, authorize("admin"), (req, res) =>{
    projectController.updateProject(req, res)
})

router.delete("/:id", authetincateToken, authorize("admin"), (req, res) => {
    projectController.deleteProject(req, res);
});

router.get("/", authetincateToken, (req, res) => {
    projectController.getMemberProjects(req, res);
});


exports.projectRouter = router;
