function main(){
    const username = 'nanodino';

    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        if (!row.textContent.includes(username)) {
            row.style.display = 'none';
        }
    });
}

const observer = new MutationObserver(function(mutationsList, _observer) {
    for(let mutation of mutationsList) {
        if(mutation.addedNodes.length) {
            main();
        }
    }
});

observer.observe(document, { childList: true, subtree: true });