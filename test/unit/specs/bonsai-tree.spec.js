import Vue from 'vue'
import bonsaiTree from 'src/components/bonsai-tree'

describe('bonsai-tree.vue', () => {

	var testBonsai = function(vm, expected) {

		const defaults = {
			item: '',
			expand: '+',
			collapse: '-',
			content: '',
			initialState: 'collapsed',
		}

		var ex = {}
		//Object.keys(defaults).each(function(k) { // Something babel-related in Vue webpack's dependency hell breaks this
		for (var k in defaults) {
			ex[k] = (k in expected) ? expected[k] : defaults[k]
		}
		ex.expanded = ex.initialState === 'expanded'

		// Test our own arguments
		expect(vm, 'Argument vm to testBonsai is undefind').not.to.equal(undefined)
		expect(vm instanceof Object, `Argument vm to testBonsai is a ${Object.prototype.toString.call(vm)}`).to.equal(true)
		// typeof is broken due to babel. instanceof doesn't seem to work with strings. karma's to.be.a throws an error from chai. Why must everything be perpetually broken!!!
		//expect(ex.item, 'Argument item to testBonsai is a '+Object.prototype.toString.call(ex.item)).to.be.a(String)
		//expect(ex.item, 'Argument item to testBonsai is a '+(typeof ex.item)).to.be.a(String)

		const hasContent = ex.content !== ''

		// We should always have the bonsai-tree class
		expect(vm.$el.attributes.getNamedItem('class').value, 'bonsai-tree class missing').to.match(/^( .*)?bonsai-tree( .*)?$/)

		// ...and one to indicate if there's content
		const contentClass = hasContent ? 'bonsai-tree-has-content' : 'bonsai-tree-no-content'
		expect(vm.$el.attributes.getNamedItem('class').value, `${contentClass} class missing`).to.match(new RegExp(`^(.* )?${contentClass}( .*)?$`))

		// Indicator
		const bonsaiTreeIndicators = vm.$el.querySelectorAll('.bonsai-tree-indicator')
		expect(bonsaiTreeIndicators.length, 'One bonsai-tree-indicator').to.equal(1)
		if (hasContent) {
			// If there's content, we must have an expanded or collapsed class at the top level
			const stateClass = ex.expanded ? 'bonsai-tree-expanded' : 'bonsai-tree-collapsed'
			expect(vm.$el.attributes.getNamedItem('class').value, `${stateClass} class missing`).to.match(new RegExp(`^(.* )?${stateClass}( .*)?$`))
			var indicatorClass = ex.expanded ? 'bonsai-tree-collapse' : 'bonsai-tree-expand'
			// And we must have an indicator
			const indicators = bonsaiTreeIndicators[0].querySelectorAll(`.${indicatorClass}`)
			expect(indicators.length, `One ${indicatorClass}`).to.equal(1)
			expect(indicators[0].textContent.trim(),'indicator').to.equal(ex.expanded ? ex.collapse : ex.expand)
		}

		// Item
		const items = vm.$el.querySelectorAll('.bonsai-tree-item')
		expect(items.length, 'One bonsai-tree-item').to.equal(1)
		const itemContents = items[0].querySelectorAll('.bonsai-tree-item-content')
		expect(itemContents.length, 'One bonsai-tree-item-content').to.equal(1)
		expect(itemContents[0].textContent.trim(),'item content').to.equal(ex.item)

		// Content
		const bonsaiTreeContent = items[0].querySelectorAll('.bonsai-tree-content')
		if (hasContent && ex.expanded) {
			expect(bonsaiTreeContent.length, `Content not rendered`).to.equal(1)
			expect(bonsaiTreeContent[0].textContent.trim(),'content').to.equal(ex.content)
		} else {
			expect(bonsaiTreeContent.length, `Content should not be rendered, but we found it`).to.equal(0)
		}
	}

	// <bonsai-tree/>, <bonsai-tree></bonsai-tree>
	it('Empty bonsai-tree', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(bonsaiTree, [])
		})
		testBonsai(vm, {item: ''}) 
	})

	// <bonsai-tree initialState='expanded'>Item <div slot='content'>Content</div></bonsai-tree>
	it('Default values (expanded)', () => {
		const expanded = true
		const vals = {
			'item': 'Hello, World!',
			'content': 'No kids',
			'collapse': '-',
			'initialState': expanded ? 'expanded' : 'collapsed',
		}
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(bonsaiTree, {attrs: {initialState: vals.initialState}}, [vals.item, h('div', {slot: 'content'}, [vals.content])])
		})
		testBonsai(vm, vals)
	})
	// <bonsai-tree initialState='collapsed'>Item <div slot='content'>Content</div></bonsai-tree>
	it('Default values (collapsed)', () => {
		const expanded = false
		const vals = {
			'item': 'Hello, World!',
			'content': 'No kids',
			'expand': '+',
			'initialState': expanded ? 'expanded' : 'collapsed',
		}
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(bonsaiTree, {attrs: {initialState: vals.initialState}}, [vals.item, h('div', {slot: 'content'}, [vals.content])])
		})
		testBonsai(vm, vals)
	})

	// <bonsai-tree item='item text' content='content text' collapse='^' expand='_'></bonsai-tree>
	it('Do attributes work?', () => {
		const expanded = true
		const vals = {
			'item': 'at:Hello, World!',
			'content': 'at:No kids',
			'expand': 'at:_',
			'collapse': 'at:^',
			'initialState': expanded ? 'expanded' : 'collapsed',
		}
		// Vue's render function apparenly pushes values out of attrs,
		// because it ends up empty after the new Vue() call.
		// We therefore must copy it
		var vals2 = {}
		Object.assign(vals2, vals)
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(bonsaiTree, {attrs: vals2})
		})
		testBonsai(vm, vals)
	})

	// <bonsai-tree item='unused text' content='more unused' collapse='^' expand='_'>
	//    <div slot='expand'>more</div>
	//    <div slot='collapse'>less</div>
	//    item text
	//    <div slot='content'>read content</div>
	// <bonsai-tree>
	it('Slots take presidence over attributes', () => {
		const expanded = true
		const slots = {
			'item': 'Hello, Bonsai!',
			'content': 'So many children',
			'expand': 'more',
			'collapse': 'less',
			'initialState': expanded ? 'expanded' : 'collapsed',
		}
		const attrs = {
			'item': 'Hello, World!',
			'content': 'No kids',
			'expand': '_',
			'collapse': '^',
			'initialState': expanded ? 'expanded' : 'collapsed',
		}
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(bonsaiTree, 
				{attrs: attrs}, [
					h('div', {slot: 'expand'}, [slots.expand]),
					h('div', {slot: 'collapse'}, [slots.collapse]),
					slots.item,
					h('div', {slot: 'content'}, [slots.content]),
				]
			)
		})
		testBonsai(vm, slots)
	})
})
