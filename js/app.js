$(document).ready(function () {
  /**Input Validation */
  const inputValidation = function (inputVal) {
    $("#input").val("");

    if (!inputVal) {
      $("#input").attr("placeholder", "Please, enter an animal");
      return false;
    } else {
      for (btn of $(".btnAnimal")) {
        if (btn.textContent === inputVal) {
          $("#input").attr("placeholder", "Please, enter another animal");
          return false;
        }
      }
      $("#input").attr("placeholder", "");
      return true;
    }
  };

  /**Card Creator */
  const createCard = function (imgSrc, rating) {
    const newCard = `
          <div class="col col-4 card">
            <h6 class="card-title">Rating: ${rating}</h6>
            <img src="${imgSrc}" alt="card-image">
          </div>
    `;
    return newCard;
  };

  /**Function for Button Event Listener */
  const getAnimals = function () {
    $(".cards").html("");
    for (btn of $(".btnAnimal")) {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    }
    this.classList.add("active");
    $.ajax({
      url: `https://api.giphy.com/v1/gifs/search?q=${this.textContent.toLowerCase()}&api_key=Mk4HHWpefvD8sqXcSB2YLpS5e5W9iMeP&limit=15`,
      method: "GET",
    }).then((response) => {
      response = response.data;
      for (gif of response) {
        const newCard = createCard(gif.images.downsized.url, gif.rating);
        $(".cards").append(newCard);
      }
    });
  };

  /**Submit Event Listener */
  $(".btnSubmit").on("click", function (e) {
    e.preventDefault();
    const inputVal = $.trim($("#input").val());
    if (inputValidation(inputVal)) {
      const newAnimal = `<button class="btn btnAnimal">${inputVal}</button>`;
      $("#animalNames").append(newAnimal);
      $("#animalNames").children().last().on("click", getAnimals);
    }
  });

  /**Button Event Listener */
  $(".btnAnimal").on("click", getAnimals);
});
