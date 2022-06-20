// array di posts di persone
const allUserPosts = [
  {
    id: 1,
    name: "Phil Mangione",
    pictureProfile: "https://unsplash.it/300/300?image=10",
    date: "25/06/2021",
    postText: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    image: "https://unsplash.it/600/300?image=171",
    likes: 80
  },
  {
    id: 2,
    name: "Sofia Perlari",
    pictureProfile: "https://unsplash.it/300/300?image=20",
    date: "3/9/2021",
    postText: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    image: "https://unsplash.it/600/300?image=167",
    likes: 120
  },
  {
    id: 3,
    name: "Lorezo Veropalumbo",
    pictureProfile: null,
    date: "11/17/2020",
    postText: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    image: null,
    likes: 2000
  },
];

const postContainer = document.getElementById("container");
// funzione per printare i posts
drawAllPosts(allUserPosts,postContainer);

// -----------------------------------
//           FUNCTION
// -----------------------------------

function drawAllPosts(allUserPosts,postContainer){
  // Scorro l'arrey per ogni singola classe
  for(let i = 0; i < allUserPosts.length; i++) { 
    
    // Mi salvo ogni singola classe in una variabile
    const userPost = allUserPosts[i];
    
    drawPost(userPost,postContainer);
  }
}

function drawPost(userPost,postContainer){
  
  const {name,pictureProfile,date,postText,image,likes} = userPost;
  
  // creo l' innerHTML per metterlo nel documento
  const  cardUserPost =
  `
    <div class="post">
      <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
              ${pictureProfile === null ? getProfileInitialsHtml(name) : `<img class="profile-pic" src="${pictureProfile}" alt="${name}"></img>`}                          
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${name}</div>
                <div class="post-meta__time">${getItalianDate(date)}</div>
            </div>                    
        </div>
      </div>
      <div class="post__text">${postText}</div>
      ${image === null ? '' : getImageHtml(image)}
      <div class="post__footer">
          <div class="likes js-likes">
              <div class="likes__cta">
                  <a class="like-button  js-like-button" href="#" data-postid="1">
                      <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                      <span class="like-button__label">Mi Piace</span>
                  </a>
              </div>
              <div class="likes__counter">
                  Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone
              </div>
          </div> 
      </div>            
    </div>
  `;

  // lo inserisco nel documento 
  postContainer.innerHTML += cardUserPost;
}

function getImageHtml(image) {
  return `
  <div class="post__image">
    <img src=${image}> 
  </div>
  `;
}

function getItalianDate(date){
  const dateArray = date.split("/");
  let dates = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2]
  return dates;
}

function getProfileInitialsHtml(name){
  
  const myArray = name.split(" ");
  const names = myArray[0][0] + myArray[myArray.length - 1][0];
  return`
    <div class="profile-pic-default">${names}</div> 
  `;
}

// -------------------
// EVENT LISTENERS
// -------------------

// Mi prendo le variabili da sovrascrivere
const btnLikeClickable = document.querySelectorAll('.js-like-button');
const btnLikeTexts = document.querySelectorAll('.js-likes-counter');

for(let i = 0; i < btnLikeClickable.length; i++) {
    
  const thisLikeBtn = btnLikeClickable[i];
  
  thisLikeBtn.addEventListener('click', function(event) {
    // Evitiamo il comportamento di default del browser
    event.preventDefault();

    // Prenderci l'elemento html di testo che ha il numero relativo a questo btn
    const relatedNumberText = btnLikeTexts[i];
    // Ci prendiamo il numero dentro relatedNumberText
    let relatedNumber = parseInt(relatedNumberText.innerHTML);

    // Incrementiamo il like solo se l'elemento su cui ho cliccato non ha gia classe clicked
    if(!this.classList.contains('like-button--liked')) {
            
      // Aggiungo all'elemento cliccato la classe 'like-button--liked'
      this.classList.add('like-button--liked');
                    
      // Incrementiamo di 1
      relatedNumber++;
      // Scriviamo il numero incrementato dentro relatedNumberText
      relatedNumberText.innerHTML = relatedNumber;
    } else {
          
      // Rimuovo all'elemento cliccato la classe 'like-button--liked'
      this.classList.remove('like-button--liked');
        
      // Decremento di 1
      relatedNumber--;
          
      // Scriviamo il numero decrementato dentro relatedNumberText
      relatedNumberText.innerHTML = relatedNumber;
    }
  });
}