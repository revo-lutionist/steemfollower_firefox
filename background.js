chrome.pageAction.onClicked.addListener((tab) => {
    //create tab, navigate to page in extension for display.
    var creating = chrome.tabs.create({
        url:"/steemfollowers/steemfollowers.html"
    });
});