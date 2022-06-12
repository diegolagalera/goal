import Main from '@/components/Main.vue'
import { shallowMount } from '@vue/test-utils'


  describe('Main.vue', () => {
  it('renders props.todos when passed', () => {
    const todos = [
        {'id': 1, 'title': 'ab', 'completed': true },
        {'id': 2, 'title': 'a', 'completed': true },
        {'id': 3, 'title': 'a', 'completed': true },
    ]
    const wrapper = shallowMount(Main, {
      propsData: { todos }
    })
    expect(wrapper.props().todos).toBe(todos)
  })
})