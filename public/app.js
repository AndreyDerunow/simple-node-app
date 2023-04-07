document.addEventListener('click',(e)=>{
    if(e.target.dataset.type==="remove"){
        const id = e.target.dataset.id
        remove(id).then(()=>{
            e.target.closest('li').remove()
        })

    }
    if(e.target.dataset.type==="update"){
        const content = prompt('Введите новое название')
        const id = e.target.dataset.id
        const data = JSON.stringify({id,content})
        update(data).then(()=>{
         e.target.closest('li').childNodes[0].textContent=content
        })
    }
})

    async function remove(id){
       await fetch(`/${id}`,{method: "DELETE"})

    }
async function update(data){
    await fetch(`/${data}`,{method: "PUT"})

}