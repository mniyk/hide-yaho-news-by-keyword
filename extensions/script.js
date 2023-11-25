let selectors = [".sc-fHCHyC", ".newsFeed_item_link"];
let retry = 5;
let sleep_ms = 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function get_elements(selector) {
    let elements;

    for (let i = 0; i < retry; i++) {
        elements = document.querySelectorAll(selector);

        if (elements != null) {
            break;
        }

        await sleep(sleep_ms)
    }

    return elements;
};


function main() {
    selectors.forEach((selector) => {
        get_elements(selector).then((elements) => {
            elements.forEach((element) => {
                let title = element.innerText;

                chrome.storage.sync.get(['keywords'], (options) => {
                    options.keywords.forEach((keyword) => {
                        if (title.indexOf(keyword) != -1) {
                            element.style.display = "none";
                        }
                    });
                });
            })
        });
    });
};

window.addEventListener("load", main, false);
