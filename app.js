const logger = require('pino')()
const cors = require("cors");
const express = require("express");
const httpErrorHandler = require("http-errors-express").default;

const app = express();
require('./models')
require('dotenv').config()

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

app.use(
    httpErrorHandler({
        formatError: (err, _req, _isExposed) => {
            return {
                result: false,
                error: {
                    name: err.message,
                    status: err.code,
                    message: err.data,
                    stack: err.stack,
                }
            };
        },
    })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
});