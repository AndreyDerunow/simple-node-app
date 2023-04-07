const http = require('http')
const chalk = require('chalk')
const fs = require('fs/promises')
const path = require('path')

const express = require('express')
const {addNote,getNotes,removeNote,updateNote} = require('./notes.controller')
const {request} = require("express");


const port = 3000

const app = express()
app.set('view engine','ejs')
app.set('views','pages')
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.json())
app.get('/',async (req,res)=>{
    try{
    res.render('index',{title:'Express App', notes: await getNotes(),created:false})
    }catch (e) {
        console.log('err',e);
    }
})
app.post('/',async (req,res)=>{
    try{
        await addNote(req.body.title)
        res.render('index',{title:'Express App', notes: await getNotes(),created:true})
    }catch (e) {
        console.log('err',e);
    }

})
app.delete('/:id',async (req, res)=>{
    try{
        await removeNote(req.params.id)
        res.render('index',{title:'Express App', notes: await getNotes(),created:false})
    }catch (e) {
        console.log('err',e);
    }
})
app.put('/:data',async (req, res)=>{
    try{
        await updateNote(req.params.data)
        res.render('index',{title:'Express App', notes: await getNotes(),created:false})
    }catch (e) {
        console.log('err',e);
    }
})
app.listen(port,()=>{
    console.log(chalk.green(`server has been started on port ${port}...`))
})