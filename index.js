const question = document.getElementById("question");
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const choix = document.getElementById("choix");
const trouver = document.getElementById("trouver");
const defaite = document.getElementById("defaite");
const check = document.getElementById("check");
const clear = document.getElementById("clear");

if (!(localStorage["gagne"] && localStorage.perdu)) {
  localStorage["gagne"] = 0;
  localStorage.perdu = 0;
} else {
  trouver.textContent = localStorage["gagne"];
  defaite.textContent = localStorage.perdu;
}

function generer() {
  fetch("https://opentdb.com/api.php?amount=1")
    .then((reponse) => reponse.json())
    .then((answer) => {
      let n = answer.results[0].incorrect_answers.length;
      difficulty.innerHTML =
        '<strong class=" blue-text soulign">Difficulty:</strong> ' +
        answer.results[0].difficulty;
      category.innerHTML =
        '<span class="blue-text">Category <br/></span>' +
        answer.results[0].category;
      question.innerHTML =
        '<strong class=" blue-text soulign">Question: <br/></strong> ' +
        answer.results[0].question;
      let entier = Math.round(Math.random() * n);
      for (let i = 0; i <= n; i++) {
        if (i == entier) {
          choix.innerHTML +=
            '<div class="col s5 teal lighten-4 marge vrai">' +
            answer.results[0].correct_answer +
            "</div>";
        } else {
          choix.innerHTML +=
            '<div class="col s5 teal lighten-4 marge faux">' +
            answer.results[0].incorrect_answers[i] +
            "</div>";
        }
        console.log(localStorage["gagne"]);
      }
      try {
        function reload() {
          let vrai = document.querySelector(".vrai");
          let faux = document.querySelectorAll(".faux");
          vrai.addEventListener("click", function (e) {
            localStorage["gagne"]++;
            trouver.textContent = localStorage["gagne"];
            choix.textContent = "";
            generer();
          });
          for (var i = 0; i < n; i++) {
            faux[i].addEventListener("click", function (ev) {
              localStorage.perdu++;
              defaite.textContent = localStorage.perdu;
              choix.textContent = "";
              generer();
            });
          }
        }
        reload();
      } catch (err) {
        choix.textContent = "";
        generer();
      }
    });
}

generer();

clear.addEventListener("click", function () {
  localStorage["gagne"] = 0;
  localStorage.perdu = 0;
  trouver.textContent = localStorage["gagne"];
  defaite.textContent = localStorage.perdu;
  choix.textContent = "";
  generer();
});
check.addEventListener("click", function () {
  choix.textContent = "";
  generer();
});
