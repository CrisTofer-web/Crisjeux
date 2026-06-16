let compteur = 0;

setInterval(() => {
compteur++;
document.getElementById("visiteurs").innerText =
"👥 Visiteurs : " + compteur;
},1000);

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

let filtre =
searchInput.value.toLowerCase();

let cartes =
document.querySelectorAll(".card");

cartes.forEach(carte => {

let titre =
carte.querySelector("h2")
.textContent.toLowerCase();

if(titre.includes(filtre)){
carte.style.display="block";
}else{
carte.style.display="none";
}

});

});
