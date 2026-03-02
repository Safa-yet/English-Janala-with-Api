

let lessonLink = ()=>{
    let link = "https://openapi.programming-hero.com/api/levels/all"
    fetch(link)
    .then((res)=>res.json())
    .then((lesson)=> showData(lesson.data))
}

lessonLink()

let showData=(li)=>{
    let lessonCont = document.getElementById('lesson-container');
    lessonCont.innerHTML = " ";
    for(let e of li){
        let newDiv = document.createElement("div");
    
        newDiv.innerHTML =`
            <button class="btn btn-outline btn-primary"><i class="fa-brands fa-leanpub"></i>Lesson- ${e.level_no}</button>
        
        `
        lessonCont.appendChild(newDiv)
    }

}

