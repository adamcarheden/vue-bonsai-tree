<template>
  <div v-bind:class="{ expanded: expanded }">

    <div class='item' @click="expanded = (expanded ? false : true)">
      <div v-if="isLeaf" class='expand-btn'>
        <span v-if="expanded" class='collapse'><slot name='collapse'>{{ collapse }}</slot></span>
        <span v-else          class='expand'>  <slot name='expand'>  {{ expand }}  </slot></span>
      </div>
      <div class='item-content'>
        <span v-if="hasItem"><slot>{{ item }}</slot></span>
        <span v-else>{{ item }}</span>
      </div>
    </div>

    <div class='content' v-if="expanded && isLeaf"><slot name='content'>{{ content }}</slot></div>

  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: String,
      default: 'Bonsai!'
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
      // That's an inconcistency in the Vue API. The left-hand site of the || is the workaround
      return (!('default' in this.$slots)) || this.$slots.default[0].text.trim() !== ''
    },
    isLeaf: function () {
      return ('content' in this.$slots) || this.content !== ''
    }
  }
}
</script>
<style scoped>
.item {
  display: block;
}
.item-content, .expand-btn {
  display: inline-block;
}
.item-content {
  padding-left: .2em;
}
.content {
  display: block;
  margin-left: 0.5em;
}
</style>
