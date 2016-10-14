import Vue from 'vue'
import bonsai from 'src/components/bonsai'

describe('bonsai.vue', () => {

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
    console.log({ic: itemContents})
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
      render: (h) => h(bonsai, { attrs: { item: 'Item Attribute' } }, [txt])
    })
    expect(vm.$el.textContent.trim()).to.equal(txt)
  })
})
