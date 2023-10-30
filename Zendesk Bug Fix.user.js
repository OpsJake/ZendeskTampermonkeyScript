// ==UserScript==
// @name         Zendesk Bug Fix
// @namespace    http://example.com
// @version      1.5
// @description  Add Remo Search to zendesk
// @author       Jake Buchanan
// @run-at       document-end
// @match        https://remotasks.zendesk.com/*
// @match        https://remotasks.zendesk.com/agent/tickets/*
// @match        https://www.remotasks.com/en/remoadmin/tools/lookup/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zendesk.com
// @downloadURL  https://github.com/OpsJake/ZendeskTampermonkeyScript/raw/main/Zendesk%20Bug%20Fix.user.js
// @updateURL    https://github.com/OpsJake/ZendeskTampermonkeyScript/raw/main/Zendesk%20Bug%20Fix.user.js
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
                const newEmailLinks = document.querySelectorAll('a.email[href^="mailto:"]:not(.replaced)');
                replaceEmailLinks(newEmailLinks);
                newEmailLinks.forEach(function(emailLink) {
                    emailLink.classList.add('replaced');
                });
            }
        });
    }
    function checkForErrorMessage() {
    const elementWithClass = document.querySelector('.jss2');
        if (elementWithClass) {
            const text = elementWithClass.textContent;
            const errorText = "There was an error";
        if (text.includes(errorText)) {
            window.close();
            alert('The email was not found.');
            }
        }
    }
    function handlePageChange() {
        if(event.target && event.target.location.href.includes('remotasks.com')) {
            checkForErrorMessage();
        }
    }
    window.addEventListener('load', handlePageChange);
    const observer = new MutationObserver(handleDOMChanges);
    observer.observe(document.body, { childList: true, subtree: true });
    const initialEmailLinks = document.querySelectorAll('a.email[href^="mailto:"]');
    replaceEmailLinks(initialEmailLinks);
    initialEmailLinks.forEach(function(emailLink) {
        emailLink.classList.add('replaced');
    });
})();
