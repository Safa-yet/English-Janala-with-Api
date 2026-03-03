let lessonLink = () => {
  let link = "https://openapi.programming-hero.com/api/levels/all";
  fetch(link)
    .then((res) => res.json())
    .then((lesson) => showData(lesson.data));
};

lessonLink();

let showData = (li) => {
  let lessonCont = document.getElementById("lesson-container");
  lessonCont.innerHTML = " ";
  for (let e of li) {
    let newDiv = document.createElement("div");

    newDiv.innerHTML = `
            <button onClick ="showId(${e.level_no})" id="clickBtn-${e.level_no}" class="btn btn-outline btn-primary lessonBtn"><i class="fa-brands fa-leanpub"></i>Lesson - ${e.lessonName}</button>
        
        `;
    lessonCont.appendChild(newDiv);
  }
};

let remove = ()=> {
    let lessonBtn = document.querySelectorAll(".lessonBtn")
    lessonBtn.forEach(btn=>{
        btn.classList.remove("active");
    })
}

let showId = (id) => {
  let url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showWord(data.data));

    remove();

    let btn = document.getElementById(`clickBtn-${id}`);
    btn.classList.add("active")

};

let showWord = (words) => {
  let wordCont = document.getElementById("word-container");
  wordCont.innerHTML = "";

  if(words.length == 0){

    wordCont.innerHTML = `
    
     <div class="bg-gray-200 col-span-full text-center space-y-5 py-12 hind-font">
             <img class="mx-auto" src="./assets/alert-error.png" alt="">
  
            <p class="text-xl font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold ">নেক্সট Lesson এ যান</h2>
          </div>
          
          `;
          return;
  
  }
  for (let word of words) {
    
    let card = document.createElement("div");
    card.innerHTML = `
          <div class=" relative py-10 px-8 bg-cyan-50 rounded-xl text-center space-y-3">
          <p class="absolute top-4" >${word.id}</p>
                <h1 class="text-3xl font-semibold">${word.word ? word.word : "Word Missing"}</h1>
                <h3 class="text-sm">${word.pronunciation ? word.pronunciation : "Word Missing"}</h3>
                <p class=" text-lg font-semibold">${word.meaning ? word.meaning : "Word Missing"}</p>

                <div class=" flex justify-between items-center">
            <button class="btn  rounded-lg  bg-white hover:bg-[#00BCFF] hover:text-white">
            <i class="fa-solid fa-circle-info"></i>
          </button>
            <button class="btn  rounded-lg  bg-white hover:bg-[#00BCFF] hover:text-white">
            <i class="fa-solid fa-play"></i>
          </button>

        </div>
            </div>
           

        `;
    wordCont.appendChild(card);
  }

  // for
};
