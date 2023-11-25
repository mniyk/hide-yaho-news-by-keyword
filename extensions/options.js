window.addEventListener("load", () => {
    chrome.storage.sync.get(null, (options) => {
        let keywords = options.keywords;

        if (keywords != undefined) {
            document.getElementById("keywords").value = keywords;
        }
    });
}, false);

function create_keywords_list(input_value) {
    let keywords = [];
    
    input_value.split(",").forEach((keyword) => {
        keyword = keyword.trim();
        
        if (keyword != "") {
            keywords.push(keyword)
        };
    });
    
    return keywords
}

function set_keywords() {
    let input_value = document.getElementById("keywords").value

    keywords = create_keywords_list(input_value);

    let options = {keywords}

    chrome.storage.sync.set(options);
    document.getElementById("keywords").value = keywords
};

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    set_keywords()
});
