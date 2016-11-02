<template>
	<div id="app">

	<bonsai-tree id='root'>
		A Bonsai element can appear anywhere. <br/>Every outermost element can be the root of a tree (<span style='font-style: oblique; color: red'>&larr; Click anywhere</span>)
		<div slot='content'>

			<bonsai-tree>
				Inner elements with the <span class='hl'>slot=content</span> attribute will be hidden or shown when you click the parent.
				<div slot='content'>I see you</div>
				<div slot='content'>I see you too</div>
			</bonsai-tree>

			<bonsai-tree content="This is an attribute of its parent. Since it has no children of its own, the indicator (+/-) on the left isn't displayed">
				You can also define simple text content as an attribute.
			</bonsai-tree>

			<bonsai-tree content="You'll never see me">
				If you have both the attribute and the slot, the slot takes precidence
				<span slot='content'>This is the slot. The parent has an attribute too, but you'll never see it.</span>
			</bonsai-tree>

			<bonsai-tree>
				Each bonsai-tree element may have only one content (slot or attribute). For multiple children, put more bonsai-tree elements in the element with the content slot.
				<div slot='content'>
					<bonsai-tree>
						Son
						<div slot='content'>
							<bonsai-tree>Grandson</bonsai-tree>
							<bonsai-tree>Granddaughter
								<span slot='content'>Great-granddaughter</span>
							</bonsai-tree>
						</div>
					</bonsai-tree>
					<bonsai-tree>
						Daughter
						<span slot='content'>Grandson</span>
					</bonsai-tree>
				</div>
			</bonsai-tree>

			<!-- We can even customize the expand/collapse buttons -->
			<bonsai-tree>
				Don't like the +/-? You can customize them by adding elements with <span class='hl'>slot=expand</span> or <span class='hl'>slot=collapse</span> attributes.
				<span slot='expand'>&larr;</span>
				<span slot='collapse'>&rarr;</span>
				<div slot='content'>
					<bonsai-tree expand='<<<' collapse='>>>' >
						<span class='hl'>expand</span> and <span class='hl'>collapse</span> attributes on the bonsai-tree element work too.
						<span slot='content'>Slots take precidence though.</span>
					</bonsai-tree>
					<bonsai-tree class='style-indicator' expand='' collapse=''>
						Or you can set expand/collapse to empty strings and do it with CSS.
						<div slot='content'>
							Because real programmers don't mix style and content. ;)
						</div>
					</bonsai-tree>
				</div>
			</bonsai-tree>

			<bonsai-tree>
				Children aren't indented by default.
				<div slot='content'>
					<bonsai-tree>
						You can do that with CSS too.
						<span slot='content'>
							<bonsai-tree>
								mouseover highlighting is done with css too. Just select based on the <span class='hl'>bonsai-tree-expanded</span> and <span class='hl'>bonsai-tree-collapsed</span> classes set on the bonsai-tree element when the user clicks.
								<span slot='content'>Don't forget to use <span class='hl'>&gt;</span> in your css to select only direct decendents rather than all decendents.</span>
							</bonsai-tree>
						</span>
					</bonsai-tree>
				</div>
			</bonsai-tree>

			<!-- Here's what you get with all the defaults -->
			<bonsai-tree/>

		</div>
	</bonsai-tree>
	</div>

	</div>
</template>

<script>
import bonsaiTree from './components/bonsai-tree'

var obj = {
	a: 'A',
	b: 'B',
	c: '123',
	d: 'XYZ'
}

export default {
	data: function () {
		return {
			obj: obj
		}
	},
	components: {
		bonsaiTree
	}
}
</script>

<style>
html {
	height: 100%;
}

body {
	align-items: center;
	justify-content: center;
	height: 100%;
}
#app, #readme {
	margin-left: auto;
	margin-right: auto;
	display: table;
}
.bonsai-tree-content, .bonsai-tree.no-content .bonsai-tree-item-content { 
	margin-left: 1em;
}
.bonsai-tree-indicator {
	width: 1em;
	display: inline-block;
	text-align: right;
}
.bonsai-tree-item-content {
	margin-bottom: 0.5em;
}
.bonsai-tree-content {
	margin-bottom: 1em;
}
.bonsai-tree-collapsed > .bonsai-tree-item:hover > .bonsai-tree-item-content {
	background: rgba(255,255,0,0.3)
}
.bonsai-tree-expanded > .bonsai-tree-item:hover > .bonsai-tree-item-content {
	background: rgba(255,0,0,0.3)
}
.hl {
	font-weight: bold;
}
.style-indicator.bonsai-tree-expanded > .bonsai-tree-item > .bonsai-tree-item-content:before {
	content: '<--'
}
.style-indicator.bonsai-tree-collapsed > .bonsai-tree-item > .bonsai-tree-item-content:before {
	content: '-->'
}

</style>
