// sokol prosongsa porom koruna moy allh taler
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
//app use
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// connect mongodb
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todos');
        console.log('DB is connected');
    } catch (error) {
        console.log('DB is not connected');
        console.log(error.message);
    }
};

// application routes
app.get('/', (req, res) => {
    res.send('hello');
});

// todo routes
app.use('/todos', todoRoutes);

// defoult error handaler
function errorHandaler(err, req, res, next) {
    if(res.headerSent) {
        return next(err);
    } 
    res.status(500).json({error: err});
}

// stert thr server
app.listen(3000, async () => {
   console.log('the port num 3000'); 
   await connectDB();
});