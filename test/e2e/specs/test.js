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
			.assert.elementPresent('#app > #root > .bonsai-tree-indicator')
			.assert.elementPresent('#app > #root > .bonsai-tree-indicator > .bonsai-tree-expand')
			.assert.elementPresent('#app > #root > .bonsai-tree-item')
			.assert.cssClassPresent('#app > #root','bonsai-tree')
			.assert.cssClassPresent('#app > #root','bonsai-tree-collapsed')
			.assert.cssClassPresent('#app > #root','bonsai-tree-has-content')
			.assert.elementNotPresent('#app > #root > .bonsai-tree-item > .bonsai-tree-content')
			.click('#app > #root > .bonsai-tree-indicator')
			.waitForElementPresent('#app > #root > .bonsai-tree-item > .bonsai-tree-content', 2000)
			.assert.elementPresent('#app > #root > .bonsai-tree-indicator > .bonsai-tree-collapse')
			.assert.cssClassPresent('#app > #root','bonsai-tree-expanded')
			.end()

	}
}
