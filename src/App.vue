<template>
  <div id="app">

  <bonsai >
    A Bonsai element can appear anywhere. <br/>Every outermost element can be the root of a tree (<span style='font-style: oblique; color: red'>&larr; Click anywhere</span>)
    <div slot='content'>

      <bonsai>
        Inner elements with the <span class='hl'>slot=content</span> attribute will be hidden or shown when you click the parent.
        <span slot='content'>I see you</span>
        <span slot='content'>I see you too</span>
      </bonsai>

      <bonsai content="This is an attribute of its parent. Since it has no children of its own, the indicator (+/-) on the left isn't displayed">
        You can also define simple text content as an attribute.
      </bonsai>

      <bonsai content="You'll never see me">
        If you have both the attribute and the slot, the slot takes precidence
        <span slot='content'>This is the slot. The parent has an attribute too, but you'll never see it.</span>
      </bonsai>

      <bonsai>
        Each bonsai element may have only one content (slot or attribute). For multiple children, put more bonsai elements in the element with the content slot.
        <div slot='content'>
          <bonsai>
            Son
            <div slot='content'>
              <bonsai>Grandson</bonsai>
              <bonsai>Granddaughter
                <span slot='content'>Great-granddaughter</slot>
              </bonsai>
            </div>
          </bonsai>
          <bonsai>
            Daughter
            <span slot='content'>Grandson</span>
          </bonsai>
        </div>
      </bonsai>

      <!-- We can even customize the expand/collapse buttons -->
      <bonsai>
        Don't like the +/-? You can customize them by adding elements with <span class='hl'>slot=expand</span> or <span class='hl'>slot=collapse</span> attributes.
        <span slot='expand'>&larr;</span>
        <span slot='collapse'>&rarr;</span>
        <div slot='content'>
          <bonsai expand='<' collapse='>' >
            <span class='hl'>expand</span> and <span class='hl'>collapse</span> attributes on the bonsai element work too.
            <span slot='content'>Slots take precidence though.</span>
          </bonsai>
          <bonsai class='style-indicator' expand='' collapse=''>
            Or you can set expand/collapse to empty strings and do it with CSS.
            <div slot='content'>
              Because real programmers don't mix style and content. ;)
            </div>
          </bonsai>
        </div>
      </bonsai>

      <bonsai>
        Children aren't indented by default.
        <div slot='content'>
          <bonsai>
            You can do that with CSS too.
            <span slot='content'>
              <bonsai>
                mouseover highlighting is done with css too. Just select based on the <span class='hl'>bonsai-expanded</span> and <span class='hl'>bonsai-collapsed</span> classes set on the bonsai element when the user clicks.
                <span slot='content'>Don't forget to use <span class='hl'>&gt;</span> in your css to select only direct decendents rather than all decendents.</span>
              </bonsai>
            </span>
          </bonsai>
        </div>
      </bonsai>

      <!-- Here's what you get with all the defaults -->
      <bonsai/>

    </div>
  </bonsai>

  </div>
</template>

<script>
import bonsai from './components/bonsai'

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
    bonsai
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
.bonsai-content, .bonsai.no-content .bonsai-item-content { 
  margin-left: 1em;
}
.bonsai-indicator {
  width: 1em;
  display: inline-block;
  text-align: right;
}
.bonsai-collapsed > .bonsai-item:hover {
  background: rgba(255,255,0,0.3)
}
.bonsai-expanded > .bonsai-item:hover {
  background: rgba(255,0,0,0.3)
}
.hl {
  font-weight: bold;
}
.style-indicator.bonsai-expanded > .bonsai-item:before {
  content: '<--'
}
.style-indicator.bonsai-collapsed > .bonsai-item:before {
  content: '-->'
}

</style>
