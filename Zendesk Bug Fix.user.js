// ==UserScript==
// @name         Zendesk Bug Fix
// @namespace    http://example.com
// @version      1.0
// @description  Add Remo Search to zendesk
// @author       Jake Buchanan
// @run-at       document-end
// @match        https://remotasks.zendesk.com/*
// @match        https://remotasks.zendesk.com/agent/tickets/*
// @match        https://remotask.com/en/remoadmin/tools/lookup/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zendesk.com
// @downloadURL  https://drive.google.com/uc?export=download&id=1m9RE454Iy8j_2C2ZSQD_d1P_2Y6OW8E9
// @updateURL    https://drive.google.com/uc?export=download&id=1m9RE454Iy8j_2C2ZSQD_d1P_2Y6OW8E9
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    function replaceEmailLinks(emailLinks) {
        emailLinks.forEach(function(emailLink) {
            const emailAddress = emailLink.textContent;
            const lookupURL = `https://www.remotasks.com/en/remoadmin/tools/lookup/${encodeURIComponent(emailAddress)}`;
            emailLink.href = lookupURL;
        });
    }

    function handleDOMChanges(mutationsList) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // New elements were added to the DOM
                const newEmailLinks = document.querySelectorAll('a.email[href^="mailto:"]:not(.replaced)');
                replaceEmailLinks(newEmailLinks);
                newEmailLinks.forEach(function(emailLink) {
                    emailLink.classList.add('replaced');
                });
            }
        });
    }

    const observer = new MutationObserver(handleDOMChanges);

    observer.observe(document.body, { childList: true, subtree: true });

    const initialEmailLinks = document.querySelectorAll('a.email[href^="mailto:"]');
    replaceEmailLinks(initialEmailLinks);
    initialEmailLinks.forEach(function(emailLink) {
        emailLink.classList.add('replaced');
    });
})();
