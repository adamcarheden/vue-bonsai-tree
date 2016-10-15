import Vue from 'vue'
import bonsai from 'src/components/bonsai'

describe('bonsai.vue', () => {



  var testBonsai = function(vm, item, children, expand, collapse, expanded) {
    // Test our own arguments
    expect(vm, 'Argument vm to testBonsai is undefind').not.to.equal(undefined)
    expect(vm instanceof Object, 'Argument vm to testBonsai is a '+Object.prototype.toString.call(vm)).to.equal(true)
    // typeof is broken due to babel. instanceof doesn't seem to work with strings. karma's to.be.a throws an error from chai. Why must everything be perpetually broken!!!
    // expect(item, 'Argument item to testBonsai is a '+Object.prototype.toString.call(item)).to.be.a(String)

    // We should always have the bonsai class
    expect(vm.$el.attributes.getNamedItem('class').value, 'bonsai class missing').to.equal('bonsai')

    // Structure
    const items = vm.$el.querySelectorAll('.bonsai-item')
    expect(items.length, 'One bonsai-item').to.equal(1)
    const itemContents = items[0].querySelectorAll('.bonsai-item-content')
    expect(itemContents.length, 'One bonsai-item-content').to.equal(1)
    if (item !== undefined) expect(itemContents[0].textContent.trim(),'item content').to.equal(item)

  }

  // <bonsai/>, <bonsai><bonsai>
  it('empty bonsai', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, [])
    })
    testBonsai(vm,'') 
  })

  // <bonsai>item text<bonsai>
  it('item from default slot', () => {
    var item = 'Hello, Bonsai!'
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, [item])
    })
    testBonsai(vm,item) 
  })
  // <bonsai><div>item text</div><bonsai>
  it('item from default slot in a <div>', () => {
    var item = 'Hello, Bonsai!'
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, [h('div',item)])
    })
    testBonsai(vm,item) 
  })

  // <bonsai item='item text'><bonsai>
  it('item from attribute', () => {
    var item = 'Hello, Bonsai!'
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, {attrs: { item: item}}, [])
    })
    testBonsai(vm,item) 
  })

  // <bonsai item='unused text'>item text<bonsai>
  it('Slot takes presidence over attribute for item', () => {
    var item = 'Hello, Bonsai!'
    var attr = 'Hello, World!'
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, {attrs: { item: attr}}, [item])
    })
    testBonsai(vm,item) 
  })

  // <bonsai>Item text<div slot='content'>Child text</div><bonsai>
  // <bonsai item='item text'> <div slot='content'>Child text</div><bonsai>

/*
  it('tot', () => {
    const item = 'Hello, bonsai!'
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, { attrs: { item: item } }, [])
    })
    testBonsai(vm, item) 
  })

  // Resulting structure
  it('should containt an item and content with appropriate classes', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, { attrs: { item: 'Hello, World!' } }, [])
    })
    expect(vm.$el.attributes.getNamedItem('class').value).to.equal('bonsai')
    const items = vm.$el.querySelectorAll('.bonsai-item')
    expect(items.length).to.equal(1)
    const itemContents = items[0].querySelectorAll('.bonsai-item-content')
    expect(itemContents.length).to.equal(1)
  })
  it('should contain item', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, { attrs: { item: 'Hello, World!' } }, [])
    })
    expect(vm.$el.attributes.getNamedItem('class').value).to.equal('bonsai')
  })

  // Resulting content
  it('should render content as item', () => {
    const txt = 'Hello, World!'
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, [txt])
    })
    expect(vm.$el.textContent.trim()).to.equal('Hello, World!')
  })
  it('should render the "item" attribute', () => {
    const txt = 'Hello, World!'
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(bonsai, { attrs: { item: txt } }, [])
    })
    expect(vm.$el.textContent.trim()).to.equal(txt)
  })
  it('should prefer content to "item" attribute', () => {
    const txt = 'Template Content'
    const vm = new Vue({
      el: document.createElement('div'),
      render: function (ce) {
        return ce(bonsai, {attrs: { item: 'actest'}}, [ce('span',txt)])
      }
    })
    expect(vm.$el.textContent.trim()).to.equal(txt)
  })
*/

})
