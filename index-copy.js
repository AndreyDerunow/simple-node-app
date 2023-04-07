const yargs = require('yargs')
const {addNote,printNotes,removeNote} = require('./notes.controller')


yargs.command({
    command:'add',
    describe:'add new note to list',
    builder:{
        title:{
            type:'string',
            describe:'note title',
            demandOption: true
        }
    },
    handler({title}){
        addNote(title)
    }
})

yargs.command({
    command:'list',
    describe:'print all notes',
    async handler(){
        printNotes()
    }
})

yargs.command({
    command:'remove',
    describe:'remove note by id',
    builder:{
        id:{
            type:'string',
            describe:'note id',
            demandOption: true
        }
    },
    handler({id}){
        removeNote(id)
    }
})

yargs.parse()
