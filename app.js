const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
 




const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');
const bookRouter = require('./routes/bookRoutes');



const notFoundMiddleware = require('./middleware/Not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(morgan('tiny'));




app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/movie', movieRouter);
app.use('/api/v1/book', bookRouter);





app.get('/',(req,res) => {
    res.send('This is my Homepage')
});

app.get('/api/v1',(req,res) => {
    console.log(req.signedCookies);
    res.send('This is my Homepage');
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