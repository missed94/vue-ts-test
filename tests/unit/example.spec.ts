import { shallowMount } from '@vue/test-utils'
import SearchUsers from '@/components/SearchUsers.vue'

describe('SearchUsers.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(SearchUsers)
    expect(wrapper.text()).toMatch(msg)
  })
})
