// ^==============> HTML Elements
let sideBar = $("#sideBar");
let openCloseSidebar = $("#open-close-icon");
let SideBarWidth = $(".inner-layer").innerWidth();
let sideBarList = $(".sideBarList li");


// ^==============> Call API

async function getAllMeals() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let meals = await res.json();
  return meals;
}

(async function () {
    
  let meals = await getAllMeals();
  displayMeals(meals);
  $("#loadingPage").fadeOut(500)
  $("body").css("overflow", "auto");
})();

// ^==============> Functions
sideBarList.animate(
  {
    top: 300,
  },
  500
);

function displayMeals(x) {
  let box = "";
  for (let i = 0; i < 25; i++) {
    box += `
        <div class="col-md-3">
                    <div onclick="getMealDetails('${x.meals[i].idMeal}')" class="inner-layer rounded-2 position-relative overflow-hidden">
                        <img src="${x.meals[i].strMealThumb}" class="w-100 rounded-2" alt="">
                        <div class="img-overlay position-absolute top-100 h-100 start-0 w-100 d-flex justify-content-start align-items-center">
                            <h3 class="ms-2">${x.meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
  }

  $("#homeSection").html(box);
}
// ^ =======================> single meal
async function getMealDetails(id) {
    $('#loadingPage2').fadeIn(500)
    await MealDetails(id);
  
    $('#loadingPage2').fadeOut(500)
}

async function MealDetails(id) {
    
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let singleMeal = await res.json();
  displaySingleMeal(singleMeal.meals);
}

function displaySingleMeal(meal) {
  $('#home').css('display','none')
  clearHome();
  
  let box = `
    <div class="col-md-4 text-white">
    <img src="${meal[0].strMealThumb}" class="w-100 rounded-3" alt="">
    <h3>${meal[0].strMeal}</h3>

    </div>

    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${meal[0].strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal[0].strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal[0].strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap" id="Recipes">
            <li class="alert alert-info m-2 p-1">1 Packet Filo Pastry</li><li class="alert alert-info m-2 p-1">150g Minced Beef</li><li class="alert alert-info m-2 p-1">150g Onion</li><li class="alert alert-info m-2 p-1">40g Oil</li><li class="alert alert-info m-2 p-1">Dash Salt</li><li class="alert alert-info m-2 p-1">Dash Pepper</li>
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap" id="tags">
        
        <li class="alert alert-danger m-2 p-1">${meal[0].strTags}</li>
        </ul>

        <a target="_blank" href="${meal[0].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal[0].strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
        </div>
    `;


    $("#homeSection").html(box);


    



    let Recipes = '';
  let x = meal[0]
  for(let i = 0 ; i < 20 ; i++){
    if(x[`strIngredient${i}`] && x[`strMeasure${i}`]){
        Recipes += `
        <li class="alert alert-info m-2 p-1">${x[`strMeasure${i}`]} ${x[`strIngredient${i}`]}</li>
        `
    }
  }

  $('#Recipes').html(Recipes)
    


    if(meal[0].strTags != null){
        $('#tags').html(`<li class="alert alert-danger m-2 p-1">${meal[0].strTags}</li>`)
    } else {
        $('#tags').html(' ')
    }

    
}

function clearHome() {
  let box = "";
  $("#homeSection").html(box);
}



//  &========================> Search 


function showSearchInput(){
    $('#home').css('display','block')
    clearHome();
    sideBar.css("left", -SideBarWidth);
    openCloseSidebar.css("display", "block");
    $("#close-icon").css("display", "none");
    let searchInputs=`
    <div class="container">
            <div class="row py-5 g-4" >
                <div class="col-md-6">
                <input class="form-control searchName" placeholder="Search By Name" onkeyup="searchName(this.value)" type="text">
                </div>

                <div class="col-md-6">
                <input class="form-control searchName" placeholder="Search By letter" maxlength="1" onkeyup="searchLetter(this.value)" type="text">
                </div>
            </div>
        </div>


    `
    $('#home').html(searchInputs)
}


// by Letter

async function searchLetter(name){
    $('#loadingPage2').fadeIn(500)
    await SearchMealsbyLetter(name)
    $('#loadingPage2').fadeOut(500)
}

async function SearchMealsbyLetter(letter){
    let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      let letterSearchMeal = await res.json();
      searchDisplay(letterSearchMeal.meals)
      console.log(letterSearchMeal);
}
// by Name
async function searchName(name){
    $('#loadingPage2').fadeIn(500)
    await SearchMeals(name)
    $('#loadingPage2').fadeOut(500)
}

async function SearchMeals(name){
    let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      );
      let singleMeal = await res.json();
      searchDisplay(singleMeal.meals)
}


function searchDisplay(x) {
    let box = "";
    for (let i = 0; i < x.length; i++) {
      box += `
          <div class="col-md-3">
                      <div onclick="getMealDetails('${x[i].idMeal}')" class="inner-layer rounded-2 position-relative overflow-hidden">
                          <img src="${x[i].strMealThumb}" class="w-100 rounded-2" alt="">
                          <div class="img-overlay position-absolute top-100 h-100 start-0 w-100 d-flex justify-content-start align-items-center">
                              <h3 class="ms-2">${x[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>
          `;
    }
  
    $("#homeSection").html(box);
  }

// &=========================> Category 

async function showCategory(){
    $('#home').css('display','none')
    $('#loadingPage2').fadeIn(500)
    sideBar.css("left", -SideBarWidth);
    openCloseSidebar.css("display", "block");
    $("#close-icon").css("display", "none");
    await getCategory()
    $('#loadingPage2').fadeOut(500)
}

async function getCategory(){
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let mealsCategory = await res.json();
    displayCategory(mealsCategory.categories)
}


async function displayCategory(x) {
    let box = "";
    let m = '';
    for (let i = 0; i < x.length; i++) {
        if(x[i].strCategoryDescription != null){
            m = await x[i].strCategoryDescription.split(" ").slice(0,20).join(" ");
        }
      box += `
          <div class="col-md-3">
                      <div onclick="categoriesMeals('${x[i].strCategory}')" class="inner-layer rounded-2 position-relative overflow-hidden">
                          <img src="${x[i].strCategoryThumb}" class="w-100 rounded-2" alt="">
                          <div class="img-overlay position-absolute top-100 h-100 start-0 w-100 d-flex flex-column overflow-hidden  align-items-center">
                              <h3 class="ms-2 mt-3">${x[i].strCategory}</h3>
                              <p class="ms-2">${m}</p>
                          </div>
                      </div>
                  </div>
          `;
    }
  
    $("#homeSection").html(box);
}


async function categoriesMeals(mealName){
    $('#home').css('display','none')
    $('#loadingPage2').fadeIn(500)
    await getCategoryMeals(mealName)
    $('#loadingPage2').fadeOut(500)
}

async function getCategoryMeals(mealName){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`)
    let mealsCategory = await res.json();
    displayCategoryMeals(mealsCategory.meals)
}


function displayCategoryMeals(x){
    let box = "";
    for (let i = 0; i < x.length; i++) {
      box += `
          <div class="col-md-3">
                      <div onclick="getMealDetails('${x[i].idMeal}')" class="inner-layer rounded-2 position-relative overflow-hidden">
                          <img src="${x[i].strMealThumb}" class="w-100 rounded-2" alt="">
                          <div class="img-overlay position-absolute top-100 h-100 start-0 w-100 d-flex justify-content-start align-items-center">
                              <h3 class="ms-2">${x[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>
          `;
    }
  
    $("#homeSection").html(box);
}


// &==========================================> Area

async function showArea(){
    $('#loadingPage2').fadeIn(500)
    $('#home').css('display','none')
    sideBar.css("left", -SideBarWidth);
    openCloseSidebar.css("display", "block");
    $("#close-icon").css("display", "none");
    await getArea();
    $('#loadingPage2').fadeOut(500)
}


async function getArea(){
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let mealsArea = await res.json();
    displayArea(mealsArea.meals)
}

function displayArea(area){
    let box = ``;
    for(let i =0 ;i<area.length;i++){
        box +=`
        <div class="col-md-3 text-white">
        <div onclick="filterByArea('${area[i].strArea}')" class="inner-layer2 rounded-2 p-5  position-relative flex-column  d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-house-laptop "></i>
            <h3>${area[i].strArea}</h3>
        </div>
    </div>
        `
    }


    $("#homeSection").html(box);

}


async function filterByArea(area) { 
    $('#home').css('display','none')
    $('#loadingPage2').fadeIn(500)
    await mealsByArea(area);
    $('#loadingPage2').fadeOut(500)
}


async function mealsByArea(area){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let filterMealsByArea = await res.json()
    displayMealsByArea(filterMealsByArea.meals)
    
}
function displayMealsByArea(area){
    let box = "";
    for (let i = 0; i < area.length; i++) {
      box += `
          <div class="col-md-3">
                      <div onclick="getMealDetails('${area[i].idMeal}')" class="inner-layer rounded-2 position-relative overflow-hidden">
                          <img src="${area[i].strMealThumb}" class="w-100 rounded-2" alt="">
                          <div class="img-overlay position-absolute top-100 h-100 start-0 w-100 d-flex justify-content-start align-items-center">
                              <h3 class="ms-2">${area[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>
          `;
    }
  
    $("#homeSection").html(box);
}


// =====================================> Ingredients
async function showIngredients(){
    $('#loadingPage2').fadeIn(500)
    $('#home').css('display','none')
    sideBar.css("left", -SideBarWidth);
    openCloseSidebar.css("display", "block");
    $("#close-icon").css("display", "none");
    await getIngredients();
    $('#loadingPage2').fadeOut(500)
}


async function getIngredients(){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let mealsIngredients = await res.json();
    dispalyAllIngredients(mealsIngredients.meals)
    console.log(mealsIngredients.meals);
}

async function dispalyAllIngredients(x){
    
 
    let box = ``;
    let m = '';
    for(let i =0 ;i<25;i++){
        if(x[i].strDescription != null){
            m = await x[i].strDescription.split(" ").slice(0,20).join(" ");
        }
        box +=`
        <div class="col-md-3 text-white text-center">
        <div onclick="filterByIngredients('${x[i].strIngredient}')" class="inner-layer2 rounded-2 py-5  position-relative flex-column  d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-drumstick-bite"></i>
            <h3>${x[i].strIngredient}</h3>
            <p>${m}</p>
        </div>
    </div>
        `
    }


    $("#homeSection").html(box);
}

async function filterByIngredients(IngredientsName) {
    $('#home').css('display','none')
    $('#loadingPage2').fadeIn(500)
    await getIngredientsByName(IngredientsName);
    $('#loadingPage2').fadeOut(500)
  }



async function getIngredientsByName(name) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    let IngredientsByName = await res.json();
    displayByIngredientsName(IngredientsByName.meals);
    console.log(IngredientsByName.meals);
  }

function displayByIngredientsName(x){
    let box = "";
    for (let i = 0; i < x.length; i++) {
      box += `
          <div class="col-md-3">
                      <div onclick="getMealDetails('${x[i].idMeal}')" class="inner-layer rounded-2 position-relative overflow-hidden">
                          <img src="${x[i].strMealThumb}" class="w-100 rounded-2" alt="">
                          <div class="img-overlay position-absolute top-100 h-100 start-0 w-100 d-flex justify-content-start align-items-center">
                              <h3 class="ms-2">${x[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>
          `;
    }
  
    $("#homeSection").html(box);
}





// &==================================> Inputs Validations


function showInputs(){
    $('#home').css('display','none')
    
    sideBar.css("left", -SideBarWidth);
    openCloseSidebar.css("display", "block");
    $("#close-icon").css("display", "none");
    clearHome();
    let box = `
    <div class="row py-5 g-4 " id="rowData"><div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control form2" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control form2" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control form2" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control form2" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control form2" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number and at least one special character:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control form2" placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> </div>
    `;
    $('#homeSection').html(box)




    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })


}


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }



    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        document.getElementById('submitBtn').removeAttribute("disabled")
    } else {
        document.getElementById('submitBtn').setAttribute("disabled", true)
    }
}


function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(document.getElementById('emailInput').value))
}

function phoneValidation() {
    return (/^01[0-2]{1}[0-9]{8}$/.test(document.getElementById('phoneInput').value))
}

function ageValidation() {
    return (/^(1[89]|[2-9][0-9]|1[0-4][0-9]|150)$/.test(document.getElementById('ageInput').value))
}

function passwordValidation() {
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]).{8,}$/.test(document.getElementById('passwordInput').value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}






// ^==============> Events
if(sideBar.css("left") == '0px'){
    sideBar.css("left", -SideBarWidth);
}
openCloseSidebar.click(() => {
  sideBar.css("left", 0);
  for (let i = 0; i < sideBarList.length; i++) {
    sideBarList.eq(i).animate(
      {
        top: 0,
      },
      (i + 5) * 100
    );
  }
  $("#close-icon").css("display", "block");
  openCloseSidebar.css("display", "none");
});

$("#close-icon").click(() => {
  sideBarList.animate(
    {
      top: 300,
    },
    500
  );
  sideBar.css("left", -SideBarWidth);
  openCloseSidebar.css("display", "block");
  $("#close-icon").css("display", "none");
});

// $(document).ready(() => {
//   $("#loadingPage").fadeOut(500,()=>{
//     $("body").css("overflow", "auto");
//   });
// //   $("#loadingPage").remove();
  
// });
