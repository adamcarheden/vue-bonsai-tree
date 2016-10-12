<template>
  <div v-bind:class="{ expanded: expanded }">

    <div class='item' @click="expanded = (expanded ? false : true)">
      <div v-if="leaf()" class='expand-btn'>
        <span v-if="expanded">-</span>
        <span v-else>+</span>
      </div>
      <div class='item-content'><slot></slot></div>
    </div>

    <div class='children' v-if="expanded && leaf()"><slot name='children'>&nbsp;</slot></div>

  </div>
</template>
<script>
export default {
  params: ['obj'],
  data: function () {
    return {
      expanded: false
    }
  },
  methods: {
    leaf: function () {
      return ('children' in this.$slots)
    }
  }
}
</script>
<style>
.item {
  display: block;
}
.item-content, .expand-btn {
  display: inline-block;
}
.item-content {
  padding-left: .2em;
}
.children {
  display: block;
  margin-left: 0.5em;
}
</style>
