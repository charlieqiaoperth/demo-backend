require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectToDB = require('./utils/database')
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 4500;
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/v1', routes);
app.use(errorHandler);

app.listen(PORT, () => {
                console.log(`Server is listening on PORT: ${PORT}`);
            });

// if (process.env.NODE_ENV !== 'test') {
// connectToDB()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server is listening on PORT: ${PORT}`);
//         });
//     })
//     .catch(e => {
//         console.log('DB connection failed');
//         console.log(e.message);
//         process.exit(1);
//     });
// } else {app.listen(5000)}
module.exports = app;