const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname,'db.json')

async function addNote(title){
    const notes = await getNotes()
    const note={
        title,id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath,JSON.stringify(notes))
    console.log(chalk.green('note was added'))
}

async function removeNote(id){
    const notes = await getNotes()
    const filteredNotes = notes.filter(n=>n.id!==id)
    await fs.writeFile(notesPath,JSON.stringify(filteredNotes))
    console.log(chalk.red(`note ${id} was removed`))
}
async function updateNote(data){

    const {id,content} = await JSON.parse(data)
    const notes = await getNotes()
    const updatedNoteIndex = notes.findIndex(n=>n.id===id)
    notes[updatedNoteIndex].title = content
    await fs.writeFile(notesPath,JSON.stringify(notes))
    console.log(chalk.green(`note ${id} was updated`))
}
async function getNotes(){
    const notes = await fs.readFile(notesPath,{encoding:'utf-8'})
    return Array.isArray(JSON.parse(notes))?JSON.parse(notes):[]
}

// async function printNotes(){
//     const notes = await getNotes()
//     console.log(chalk.bgBlue('Here is the list of notes'))
//     notes.forEach(n=>console.log(chalk.blue(n.title),'|',chalk.blue(n.id)))
// }

module.exports={addNote,getNotes,removeNote,updateNote}

