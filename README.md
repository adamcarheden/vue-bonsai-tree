# vue-bonsai-tree

> A collapsable tree [Vue](https://vuejs.org/) component designed to render hand-coded markup rather a javascript data structure.

If you can munge your data into a hierarchy of javascript objects in a prescribed format, there are [plenty](https://github.com/10quality/vue-tree-view) of [other](https://github.com/weibangtuo/vue-tree) Vue tree components for that. I needed one to render hand-coded markup rather than an arbitrary hierarchy of data. 



## Install
``` bash
npm install vue-bonsai-tree --save
```

## Use
``` html
<script>
	var app = new Vue({
		el: '#app'
	})
</script>
<div id='app'>
	<bonsai-tree>
		Parent
		<div slot='content' expand='more'>
			<slot='collapse'>less</slot>
			<bonsai-tree content='Grandkid'>Child</bonsai-tree>
		</div>
	</bonsai-tree>
</div>
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
PRs welcome. 
Emiting expand/collapse events would be a nice feature. (15 min to code, 2 hours to write automated regression testing ;)
More complete e2e testing would also be helpful. 

