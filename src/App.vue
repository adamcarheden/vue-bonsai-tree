<template>
  <div id="app">
    <bonsai>
      Root node a={{ obj.a }}
      <div slot='children'>

        <bonsai>
          First Child
          <div slot='children'>
            <bonsai>I'm a leaf {{obj.b}}</bonsai>
          </div>
        </bonsai>

        <bonsai>
          Second Child
          <div slot='children'>grandkid {{obj.c}} {{obj.d}}</div>
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
</style>
