<template>
  <div id="app">

  <!-- A simple root element: It's content becomes the item text, except for the 'content' slot, which appears below and can be shown or hidden -->
  <bonsai initialState='expanded'>
    Tree Root

    <!-- The 'content' slot can contain other <bonsai> elements, creating a tree -->
    <div slot='content'>

      <!-- We can define content as an attribute instead of a slot -->
      <bonsai content='Quick, hide me! Hide me!'>
        It's the cops
      </bonsai>

      <!-- Slots take precedence over attributes -->
      <bonsai content="You'll never see me">
        Do you see me?
        <span slot='content'>I see you</span>
      </bonsai>

      <!-- We can define the item text as an attribute too -->
      <bonsai item='Look at me'>
        <div slot='content'>
          <!-- But any text in the body constitutes a slot for the item, so that slot still takes precedence over the attribute -->
          <bonsai item='The invisible man'>
            Keven Bacon
          </bonsai>
        </div>
      </bonsai>

      <!-- We can even customize the expand/collapse buttons -->
      <bonsai>
        Click me
        <span slot='expand'>&larr;</span>
        <span slot='collapse'>&rarr;</span>
        <div slot='content'>
          <!-- Attributes work for that as well -->
          <bonsai expand="&" collapse='|'>
            Me Too
            <span slot='content'>
              <!-- You can, of course, mix and match -->
              <bonsai item='Deep' collapse="^" >
                <span slot='content'>Throat</span>
                <!-- That's handy, because Vue escapes HTML entities (like &Darr; below) that it finds in attirbutes -->
                <span slot='expand'>&Darr;</span>
              </bonsai>
            </span> 
          </bonsai>
        </div>
      </bonsai>

      <!-- Here's what you get with all the defaults -->
      <bonsai/>

    </div>
  </bonsai>

  <hr/>
    <bonsai>
      Root node a={{ obj.a }}
      <div slot='content'>

        <bonsai>
          First Child
          <div slot='content'>
            <bonsai>I'm a leaf {{obj.b}}</bonsai>
          </div>
        </bonsai>

        <bonsai>
          Second Child
          <div slot='content'>grandkid {{obj.c}} {{obj.d}}</div>
        </bonsai>

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
.bonsai-content {
  margin-left: 1em;
}
.bonsai-collapsed > .bonsai-item:hover {
  background: rgba(255,255,0,0.3)
}
.bonsai-expanded > .bonsai-item:hover {
  background: rgba(255,0,0,0.3)
}


</style>
