const express=require('express');
const appRoute=require('./routes/route.js');

const app=express();

const PORT= process.env.PORT || 5000;

app.use('/api',appRoute);
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})