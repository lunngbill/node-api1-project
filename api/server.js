// BUILD YOUR SERVER HERE
// BUILD YOUR SERVER HERE
const express = require("express")
const cors = require("cors")
const users = require("./users/model")

const server = express()
server.use(cors())
server.use(express.json())

server.post("/api/users", async (request, response) => {
    const { name, bio } = request.body;
    if(!name || !bio) {
        return response.status(400).json({ message: "Please provide name and bio for the user"})
    }
    try {
        const newUser = await users.insert({ name, bio })
        response.status(201).json(newUser)
    } catch (err) {
        response.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

server.get("/api/users", async (request, response) => {
    try {
        const allUsers = await users.find()
        response.json(allUsers)
    } catch (err) {
        response.status(500).json({ message: "The users information could not be retreived" })
    }
})

server.get("/api/users/:id", async (request, response) => {
    try {
        const userId = await users.findById(request.params.id)
        if (userId) {
            response.json(userId)
        } else {
            response.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    } catch (err) {
        response.status(500).json({ message: "The users information could not be retreived" })
    }
})

server.delete("/api/users/:id", async (request, response) => {
    try {
        const deleteUser = await users.remove(request.params.id)
        if (deleteUser) {
            response.json(deleteUser)
        } else {
            response.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    } catch (err) {
        response.status(500).json({ message: "The user could not be removed" })
    }
})

server.put("/api/users/:id", async (request, response) => {
    const { name, bio } = request.body;
    if(!name || !bio) {
        return response.status(400).json({ message: "Please provide name and bio for the user"})
    }
    try {
        const updateUser = await users.update(request.params.id, { name, bio})
        if (updateUser) {
            response.json(updateUser)
        } else {
            response.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    } catch (err) {
        response.status(500).json({ message: "The users information could not be modified" })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

