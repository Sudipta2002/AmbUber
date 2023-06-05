const express = require('express');
const { PORT } = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const apiRoutes = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.send('Working Fine Bro!')
});


const serverRun = () => {
    app.listen(PORT, () => {
        console.log("Server started : " + PORT);
    });
}
serverRun();