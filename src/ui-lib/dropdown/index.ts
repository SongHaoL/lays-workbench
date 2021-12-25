import { App as Application }  from 'vue'
import Dropdown from './dropdown.vue'
import DropdownItem from './dropdown-item.vue'
import DropdownItemPlain from './dropdown-item-plain.vue'

export default {
  install(app: Application) {
    app.component('VDropdown', Dropdown)
    app.component('VDropdownItem', DropdownItem)
    app.component('VDropdownItemPlain', DropdownItemPlain)
  },
}
