chrome.runtime.onInstalled.addListener(function() {
	chrome.contentSettings['images'].set({
		primaryPattern: '<all_urls>',
		setting: 'block'
	})
});