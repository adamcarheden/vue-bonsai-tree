<template>
	<div class='bonsai-tree' v-bind:class="{ 'bonsai-tree-expanded': (hasContent && expanded), 'bonsai-tree-collapsed': (hasContent && !expanded), 'bonsai-tree-has-content': hasContent, 'bonsai-tree-no-content': !hasContent }">
		<div class='bonsai-tree-indicator' @click="toggle">
			<template v-if="hasContent">
				<span v-if="expanded" class='bonsai-tree-collapse'><slot name='collapse'>{{ collapse }}</slot></span>
				<span v-else          class='bonsai-tree-expand'  ><slot name='expand'>{{ expand }}</slot></span>
			</template>
		</div>
		<div class='bonsai-tree-item'>
			<div class='bonsai-tree-item-content' @click="toggle">
				<template v-if="hasItem"><slot>{{ item }}</slot></template>
				<template v-else>{{ item }}</template>
			</div>
			<div class='bonsai-tree-content' v-if="expanded && hasContent"><slot name='content'>{{ content }}</slot></div>
		</div>
	</div>
</template>
<style scoped>
.bonsai-tree-indicator, .bonsai-tree-item {
	display: table-cell;
}
</style>
<script>
export default {
	props: {
		item: {
			type: String,
			default: '',
		},
		expand: {
			type: String,
			default: '+'
		},
		collapse: {
			type: String,
			default: '-'
		},
		content: {
			type: String,
			default: ''
		},
		initialState: {
			type: String,
			default: 'collapsed',
			validator: function (value) {
				return ['expanded', 'collapsed'].indexOf(value.toLowerCase()) >= 0
			}
		}
	},
	data: function () {
		return {
			expanded: false
		}
	},
	created: function () {
		this.expanded = this.initialState === 'expanded'
	},
	computed: {
		hasItem: function () {
			// Elements with no body (<bonsai-tree/> and <bonsai-tree></bonsai-tree>) result in slots being empty
			if (!('default' in this.$slots)) return false
			if (this.$slots.default.length <= 0) return false // I think this can't ever happen
			// If text is undefined, it's an element that hasn't been consumed by another slot.
			// If the user bothers with that, we treat it as the item. We don't even check if it's empty
			if (this.$slots.default[0].text !== undefined && this.$slots.default[0].text.trim() === '') return false
			return true
		},
		hasContent: function () {
			return ('content' in this.$slots) || this.content !== ''
		}
	},
	methods: {
		toggle: function () {
			this.expanded = !this.expanded
		},
	}
}
</script>
