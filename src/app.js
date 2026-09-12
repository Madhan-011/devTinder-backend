const express = require('express');

const app = express();


app.use("/test",(req,res)=>{  
    res.send("hello from test route")
})

app.use("/user",(req,res)=>{  
    res.send("hello from user route")
})

app.use("/demo",(req,res)=>{  
    res.send("hello from demo route")
})

app.use("/",(req,res)=>{  // this function is known as request handler function
    res.send("hello world")
})

app.listen(7777, ()=>{
    console.log("server is running on port 7777")
})