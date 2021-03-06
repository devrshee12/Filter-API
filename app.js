require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const productsRouter = require("./routes/products");


//middlewares
app.use(express.json());


//routes

app.get("/", (req, res)=>{
    res.send("<h1>hello api</h1><a href='/api/v1/products'>products route</a>");
})


//routes
app.use("/api/v1/products", productsRouter);


//products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`listening at port number ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}


start();











