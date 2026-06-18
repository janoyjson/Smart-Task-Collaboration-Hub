const express = require("express")
const cors = require('cors')
const app = express()
require('dotenv').config()

const port = 5000
const {connectDB} = require("./src/config/dbConfig")
const {userRouter} = require("./src/users/router/userRouter")
const {projectRouter} = require("./src/projects/route/projectRoute")
const projectMemberRouter = require("./src/projectMember/route/projectMemberRoute")
const taskRouter = require("./src/tasks/route/taskRoute")

app.use(cors())
app.use(express.json())

connectDB()

app.get('/', (req, res) => {
    res.json({message: "Wellcome to Smart Task Hub"})
})

app.use("/Smart_Task_Hub/user", userRouter)
app.use("/Smart_Task_Hub/projects", projectRouter)
app.use("/Smart_Task_Hub/projects", projectMemberRouter)
app.use("/Smart_Task_Hub/projects/", taskRouter)

app.listen(port, () => {
    console.log("server is running at port:", port);
})