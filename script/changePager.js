let pageButton = ["profile", "rank", "battlePass", "donation", "dungeon", "setting"];
let pages = ["profilePage", "rankPage", "battlePassPage", "donationPage", "dungeonPage", "settingPage"]

// Hidden Pages
hiddenAllPages()

// Show home
document.getElementById("profilePage").style.display = "block";

// Register click page change
pageButton.forEach((id) => {
    let button = document.getElementById(id);

    if (button) {
        button.addEventListener('click', (e) => {
            changePage(id);
        })
    }
});

function changePage(id) {
    hiddenAllPages();
    showPage(id)
}

function showPage(id) {

    // Edit buttopn
    resetButton()
    var button = document.getElementById(id);
    button.style.zIndex = 10;
    button.style.backgroundColor = "rgb(3, 22, 62)";

    // Change page
    var pageSelector = id + "Page";
    let page = document.getElementById(pageSelector);
    page.style.display = "block";
}

function hiddenAllPages() {
    pages.forEach((pageSelector) => {
        page = document.getElementById(pageSelector);
        page.style.display = "none";
    })
}

function resetButton() {
    
    pageButton.forEach((id) => {
        var button = document.getElementById(id);
        button.style.zIndex = 0;
        button.style.backgroundColor = "rgb(1, 3, 8)";
    
    })
}