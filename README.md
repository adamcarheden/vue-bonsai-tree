# vue-bonsai-tree

> A collapsable tree [Vue](https://vuejs.org/) component designed to render hand-coded markup rather a javascript data structure.

If you can munge your data into a hierarchy of javascript objects in a prescribed format, there are [plenty](https://github.com/10quality/vue-tree-view) of [other](https://github.com/weibangtuo/vue-tree) Vue tree components for that. I needed one to render hand-coded markup rather than an arbitrary hierarchy of data. 

## Demo

[Live Demo](https://plnkr.co/edit/OHcXtj?p=preview)

## Install
``` bash
npm install vue-bonsai-tree --save
```

## Use
``` html
<div id='app'>
	<bonsai-tree>
		Parent
		<div slot='content' expand='more'>
			<div slot='collapse'>less</div>
			<bonsai-tree content='Grandkid'>Child</bonsai-tree>
		</div>
	</bonsai-tree>
</div>
<script src='vue.js'></script>
<script src='vue-bonsai-tree.js'></script>
<script>
	var app = new Vue({
		el: '#app',
		components: {
			'bonsai-tree': window['vue-bonsai-tree'].BonsaiTree
		}
	})
</script>
```

## Contribute

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run karma unit tests
npm run unit

# run nightwatch e2e tests
npm run e2e

# run all tests
npm test

# build minified release (vue-bonsai-tree.js)
npm release

```

Don't be intimidated by all the files. This project uses the [vue-cli](https://github.com/vuejs/vue-cli) webpack boilerplate to get up and running with webpack, live reload, karma and nightwatch quickly. The only files you really need to touch will be:

* src/components/bonsai-tree.vue
* test/unit/specs/bonsai-tree.spec.js
* test/e2e/specs/bonsai-tree.js

PRs welcome. 
Emiting expand/collapse events would be a nice feature. (15 min to code, 2 hours to write automated regression testing ;)
More complete e2e testing would also be helpful. 

