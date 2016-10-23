// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'default e2e tests': function (browser) {
		// automatically uses dev Server port from /config.index.js
		// default: http://localhost:8080
		// see nightwatch.conf.js
		const devServer = browser.globals.devServerURL

		// Make sure clicking expands things
		browser
			.url(devServer)
			.waitForElementVisible('#app', 5000)
			.assert.elementPresent('#app > #root > .bonsai-indicator')
			.assert.elementPresent('#app > #root > .bonsai-indicator > .bonsai-expand')
			.assert.elementPresent('#app > #root > .bonsai-item')
			.assert.cssClassPresent('#app > #root','bonsai')
			.assert.cssClassPresent('#app > #root','bonsai-collapsed')
			.assert.cssClassPresent('#app > #root','bonsai-has-content')
			.assert.elementNotPresent('#app > #root > .bonsai-item > .bonsai-content')
			.click('#app > #root > .bonsai-indicator')
			.waitForElementPresent('#app > #root > .bonsai-item > .bonsai-content', 2000)
			.assert.elementPresent('#app > #root > .bonsai-indicator > .bonsai-collapse')
			.assert.cssClassPresent('#app > #root','bonsai-expanded')
			.end()

	}
}
