function askForConfirmation() {
    return confirm('Are you sure you want to merge this pull request after 3pm?');
}

function mergePullRequest(event) {
    if (!askForConfirmation()) {
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
    // use the giant selector so the popup window does not reappear when clicking cancel
    const mergeButton = document.querySelectordocument.querySelector('#partial-pull-merging > div.merge-pr.js-merge-pr.js-details-container.Details.is-merging.is-updating-via-merge > div > div > div > div > div.merge-message > div > div > button.merge-box-button.btn-group-merge.rounded-left-2.btn.btn-primary.BtnGroup-item.js-details-target.hx_create-pr-button');
    if (mergeButton && isAfter3pm()) {
        mergeButton.removeEventListener('click', mergePullRequest); 
        mergeButton.addEventListener('click', mergePullRequest);
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

main();
