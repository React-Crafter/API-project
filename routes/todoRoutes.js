const express = require('express');
const router = express.Router();
const todoModel = require('../models/todoModel')

// application routes
// return all todos
router.get("/", async (req, res) => {
    try {
        const todos = await todoModel.find();
        if(todos) {
            res.status(200).json(todos);
        } else {
            res.status(404).json({message: 'no any todo found'});
            console.log(todos);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// return a spacific todo
router.get('/:id', async (req, res) => {
    try {
        const todos = await todoModel.find({_id: req.params.id});
        if(todos) {
            res.status(200).json({
                success: true,
                message: "return singale products",
                data: todos
            });
        } else {
            res.status(404).json({
                message: 'ihis todo is not found'
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// post a todo
router.post('/', async (req, res) => {
    try {
        // get all data from body
        const newTodo = todoModel({
            title: req.body.title,
            description: req.body.description,
            // Date: req.body.Date
        });
        const todoData = await newTodo.save();

        res.status(201).json(todoData);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete a spacific todo
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todos = await todoModel.findByIdAndDelete({_id: id});
        if (todos) {
            res.status(200).json({
                success: true,
                message: "deleted singale todo",
                data: todos
            });
        } else {
            res.status(404).json({
                message: "this todo is not found"
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// update a spacific todo
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateTodo = await todoModel.findByIdAndUpdate({_id: id}, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        },
        {new: true}
        );
        if(updateTodo) {
            res.status(200).json({
                success: true,
                message: "update successfully",
                data: updateTodo
            });
        } else {
            res.status(404).json({
                success: false,
                message: "this todo is not found"
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// export the router
module.exports = router;