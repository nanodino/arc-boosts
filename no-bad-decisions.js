function askForConfirmation() {
    return confirm('Are you going to stick around to monitor these changes? It is after 3pm');
}

function mergePullRequest(event) {
    if (isAfter3pm() && !askForConfirmation()) {
        event.preventDefault();
        console.log('Pull request not merged');
    } else {
        console.log('Pull request merged');
    }
}

function getPullRequestTime() {
    return new Date().getHours();
}

function isAfter3pm() {
    return getPullRequestTime() >= 15;
}

function main() {
    // use the giant selectors so the popup window does not reappear when clicking cancel
    const mergeButton = document.querySelector('#partial-pull-merging > div.merge-pr.js-merge-pr.js-details-container.Details.is-merging.is-updating-via-merge > div > div > div > div > div.merge-message > div > div > button.merge-box-button.btn-group-merge.rounded-left-2.btn.btn-primary.BtnGroup-item.js-details-target.hx_create-pr-button');
    const squashButton = document.querySelector('#partial-pull-merging > div.merge-pr.js-merge-pr.js-details-container.Details.is-squashing.is-updating-via-merge > div.js-merge-message-container > div > div > div > div.merge-message > div > div > button.merge-box-button.btn-group-squash.rounded-left-2.btn.btn-primary.BtnGroup-item.js-details-target.hx_create-pr-button')
     if(mergeButton){
        confirm('Are you sure you don\'t want to SQUASH and merge here?')
        mergeButton.removeEventListener('click', mergePullRequest);
        mergeButton.addEventListener('click', mergePullRequest);
     }
    if (squashButton && isAfter3pm()) {
        squashButton.removeEventListener('click', mergePullRequest); 
        squashButton.addEventListener('click', mergePullRequest);
    } else {
        console.log('Pull request not merged');
    }
}

const observer = new MutationObserver(function(mutationsList, _observer) {
    for(let mutation of mutationsList) {
        if(mutation.addedNodes.length) {
            main();
        }
    }
});

observer.observe(document, { childList: true, subtree: true });
