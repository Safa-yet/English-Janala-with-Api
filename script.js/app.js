let lessonLink = () => {
  let link = "https://openapi.programming-hero.com/api/levels/all";
  fetch(link)
    .then((res) => res.json())
    .then((lesson) => showData(lesson.data));
};


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
};


let spinner = document.getElementById("spinner");

let wordContainer = document.getElementById("word-container");


let searchBtn = document.getElementById("search-btn")
let searchInput = document.getElementById("search-input")


let makeSpin = (status)=>{
    if(status){
        spinner.classList.remove("hidden");
        wordContainer.classList.add("hidden")
    }else{
        wordContainer.classList.remove("hidden")
    spinner.classList.add("hidden");

}
}

let makeSynBtn = (arr) => {
  let spanBox = arr.map((elem) => `<span>${elem}</span>`);
  let arrToString = spanBox.join(" ");
  return arrToString;
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

let remove = () => {
  let lessonBtn = document.querySelectorAll(".lessonBtn");
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

let showId = (id) => {
      makeSpin(true);
  let url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showWord(data.data));

  remove();

  let btn = document.getElementById(`clickBtn-${id}`);
  btn.classList.add("active");
};

let showWord = (words) => {
  let wordCont = document.getElementById("word-container");
  wordCont.innerHTML = "";


  if (words.length == 0) {
    wordCont.innerHTML = `
    
     <div class="bg-gray-200 col-span-full text-center space-y-5 py-12 hind-font">
             <img class="mx-auto" src="./assets/alert-error.png" alt="">
  
            <p class="text-xl font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold ">নেক্সট Lesson এ যান</h2>
          </div>
          
          `;
          makeSpin(false);
    return;

  }
  for (let word of words) {
    let card = document.createElement("div");
    card.innerHTML = `
          <div class=" relative py-10 px-8 bg-cyan-50 rounded-xl text-center space-y-3 hover:shadow-md ">
          <p class="absolute top-4" >${word.id}</p>
                <h1 class="text-3xl font-semibold">${word.word ? word.word : "Word Missing"}</h1>
                <h3 class="text-sm">${word.pronunciation ? word.pronunciation : "Word Missing"}</h3>
                <p class=" text-lg font-semibold">${word.meaning ? word.meaning : "Word Missing"}</p>

                <div  class=" flex justify-between items-center">
            <button onclick="modalFunction(${word.id})" class="btn  rounded-lg  bg-white hover:bg-[#00BCFF] hover:text-white">
            <i class="fa-solid fa-circle-info"></i>
          </button>
            <button onClick="pronounceWord('${word.word}')" class="btn  rounded-lg  bg-white hover:bg-[#00BCFF] hover:text-white">
            <i class="fa-solid fa-play"></i>
          </button>

        </div>
            </div>
           

        `;
        wordCont.appendChild(card);
        makeSpin(false);
  }


  // for
};

let modalFunction = (id) => {
  url = `https://openapi.programming-hero.com/api/word/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => showModal(data.data));
};

let showModal = (box) => {
  let modalContainer = document.getElementById("info_modal");
  modalContainer.innerHTML = `
    <div class="modal-box  space-y-3 hover:shadow-lg shadow-black">
    <h3 class="text-lg font-bold">${box.word} (<i class="fa-solid fa-microphone-lines"></i>  :${box.pronunciation})</h3>
    
      <h2>Meaning</h2>
      <p class="font-bold">${box.meaning}</p>
    
    
      <h2>Example</h2>
      <p class="font-bold">${box.sentence}</p>
    
    <div>
      <h2>সমার্থক শব্দ গুলো</h2>
      <div class="space-x-3 mt-4">${makeSynBtn(box.synonyms) ? makeSynBtn(box.synonyms) : "Not Found..."}
      
      </div>
    </div>
    <div class="flex justify-between">
  
      <div class="modal-action left-0">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-primary">Complete Learning</button>
        </form>
      </div>


    </div>
  </div>

    `;

  modalContainer.showModal();
};





    searchBtn.addEventListener("click",()=>{
        let inputValue = searchInput.value.trim().toLowerCase();

        fetch('https://openapi.programming-hero.com/api/words/all')
        .then((res)=>res.json())
        .then((data)=> {
            let allData = data.data
            let filterValue = allData.filter((word)=>word.word.toLowerCase().includes(inputValue));
            console.log(filterValue);
            showWord(filterValue);
        });

    });
