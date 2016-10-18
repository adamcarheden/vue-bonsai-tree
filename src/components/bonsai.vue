<template>
  <div class='bonsai' v-bind:class="{ 'bonsai-expanded': (hasContent && expanded), 'bonsai-collapsed': (hasContent && !expanded), content: hasContent, 'no-content': !hasContent }">
    <div class='bonsai-item' @click="expanded = (expanded ? false : true)">
      <template v-if="hasContent"><span v-if="expanded" class='bonsai-indicator bonsai-collapse'><slot name='collapse'>{{ collapse }}</slot></span><span v-else class='bonsai-indicator bonsai-expand'><slot name='expand'>{{ expand }}</slot></span></template><span v-if="hasItem" class='bonsai-item-content'><slot>{{ item }}</slot></span><span v-else class='bonsai-item-content'>{{ item }}</span>
    </div>
    <div class='bonsai-content' v-if="expanded && hasContent"><slot name='content'>{{ content }}</slot></div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: String,
      default: ''
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
      // Elements with no body (<bonsai/> and <bonsai></bonsai>) result in slots being empty
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
  }
}
</script>
