const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const morgan = require('morgan');




const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoutes')




const notFoundMiddleware = require('./middleware/Not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');




app.use(express.json());
app.use(morgan('tiny'));




app.use('/api/v1/auth', authRouter);






app.get('/',(req,res) => {
    res.send('This is my Homepage')
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

port = process.env.PORT || 5000;

const start = async (req, res) => {
    try {
       await connectDB(process.env.MONGO_URI);
       app.listen(port, 
        console.log(`server is listening on port ${port}`)
       ) 
    } catch (error) {
        console.log(error);
    }
};

start();