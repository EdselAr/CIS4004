function showFilter() {
    document.getElementById("filterContent").style.display = "block";
    document.getElementById("newContent").style.display = "none";
}

function showAddNew() {
    document.getElementById("filterContent").style.display = "none";
    document.getElementById("newContent").style.display = "flex";
}

function filterArticles() {
    const showOpinion = document.getElementById("opinionCheckbox").checked;
    const showRecipe = document.getElementById("recipeCheckbox").checked;
    const showUpdate = document.getElementById("updateCheckbox").checked;

    const opinions = document.querySelectorAll("article.opinion");
    const recipes = document.querySelectorAll("article.recipe");
    const updates = document.querySelectorAll("article.update");

    opinions.forEach(article => article.style.display = showOpinion ? "" : "none");
    recipes.forEach(article => article.style.display = showRecipe ? "" : "none");
    updates.forEach(article => article.style.display = showUpdate ? "" : "none");
}

function addNewArticle() {
    const title = document.getElementById("inputHeader").value;
    const text = document.getElementById("inputArticle").value;

    let typeClass = "";
    let typeLabel = "";

    if (document.getElementById("opinionRadio").checked) {
        typeClass = "opinion";
        typeLabel = "Opinion";
    } else if (document.getElementById("recipeRadio").checked) {
        typeClass = "recipe";
        typeLabel = "Recipe";
    } else if (document.getElementById("lifeRadio").checked) {
        typeClass = "update";
        typeLabel = "Update";
    } else {
        alert("Please select an article type.");
        return;
    }

    if (title.trim() === "" || text.trim() === "") {
        alert("Please provide both a title and text for your article.");
        return;
    }

    const newArticle = document.createElement("article");
    newArticle.className = typeClass;

    const marker = document.createElement("span");
    marker.className = "marker";
    marker.textContent = typeLabel;

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const pText = document.createElement("p");
    pText.textContent = text;

    const pLink = document.createElement("p");
    const aLink = document.createElement("a");
    aLink.href = "moreDetails.html";
    aLink.textContent = "Read more...";
    pLink.appendChild(aLink);

    newArticle.appendChild(marker);
    newArticle.appendChild(h2);
    newArticle.appendChild(pText);
    newArticle.appendChild(pLink);

    const articleList = document.getElementById("articleList");
    articleList.appendChild(newArticle);
    
    filterArticles();

    document.getElementById("inputHeader").value = "";
    document.getElementById("inputArticle").value = "";
    document.getElementById("opinionRadio").checked = false;
    document.getElementById("recipeRadio").checked = false;
    document.getElementById("lifeRadio").checked = false;
}
