var addButton;
var xhr;
var suggestionsContainer;
var items;
var suggested;

function start() {

    // Retrieve the add button element and add an event listner when it is clicked
    addButton = document.getElementById("addbutton");
    console.log(addButton.parentNode.id);

    suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.style.width = "0";
    console.log(suggestionsContainer.style.display);

    items = document.getElementById("items");

    suggested = false;

    addButton.addEventListener("click", function () {
        suggestionsContainer.style.width = "100%";

        console.log(suggestionsContainer.style.display);
        if (!suggested) {
            var h3 = document.createElement("h3");
            h3.innerHTML = "Items you might be interested in";
            suggestionsContainer.insertBefore(h3, suggestionsContainer.childNodes[0]);

            showSuggestions(this.parentNode.id);
            console.log(suggestionsContainer.childNodes);
        }
    }, false);
}

function showSuggestions(parentId) {

    switch (parentId) {
        case "addarganoil":
            console.log("suggesting: soap, clay");
            getSuggections(["exfoliatingsoap", "lavaclay"]);
            break;
        case "addblacksoap":
            console.log("suggesting: argan, clay");
            getSuggections(["arganoil", "lavaclay"]);
            break;
        case "addlavaclay":
            console.log("suggesting: argan, soap");
            getSuggections(["arganoil", "exfoliatingsoap"]);
            break;
    }
}

function getSuggections(suggestions) {
    try {
        xhr = new XMLHttpRequest(); // create request object

        // register event handler
        xhr.onreadystatechange = function () {
            suggestions.forEach(suggestion => {
                console.log("calling add ", suggestion);
                add(suggestion);
            });
            suggested = true;
        };
        xhr.open("GET", "json/suggestions.json", true);
        xhr.send(null);
    } catch (exception) {
        alert("Something went wrong.");
    }
}

function add(suggestion) {
    console.log(suggestion);
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        console.log("status", xhr.readyState);
        switch (suggestion) {
            case "arganoil":
                console.log("response[0]", response[0]);
                display(response[0]);
                break;
            case "exfoliatingsoap":
                console.log("response[1]", response[1]);
                display(response[1])
                break;
            case "lavaclay":
                console.log("response[2]", response[2]);
                display(response[2])
                break;
            default: console.log("nomatch");
        }
    }
}

function display(item) {
    var container = document.createElement("div");
    container.setAttribute("class", "round");

    var img = document.createElement("img");
    img.setAttribute("src", item.src);
    img.setAttribute("alt", item.alt);

    var anchor = document.createElement("a");
    anchor.setAttribute("href", item.href);
    anchor.append(img);

    container.append(anchor);

    items.append(container);
}

window.addEventListener("load", start, false);