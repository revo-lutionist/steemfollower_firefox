chrome.pageAction.onClicked.addListener((tab) => {
    //get username after '@'
    var user = tab.url.split("@")[1];

    //store user for use on steemFollower.html/js
    window.localStorage.setItem("user", user);

    //create tab, navigate to page in extension for display.
    var creating = chrome.tabs.create({
        url:"/steemfollowers/steemfollowers.html"
    });
});