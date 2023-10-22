// primevue
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import ProgressBar from 'primevue/progressbar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabMenu from 'primevue/tabmenu';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import Chart from 'primevue/chart';
import Toast from 'primevue/toast';
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import InputSwitch from 'primevue/inputswitch';
import Divider from 'primevue/divider';
import SpeedDial from 'primevue/speeddial';
import MultiSelect from 'primevue/multiselect';

// custom
import AppButton from '@/components/global/AppButton.vue';
import MainSelect from '@/components/global/formElements/MainSelect.vue';
import MainRadioGroup from '@/components/global/MainRadioGroup.vue';
import MainCheckbox from '@/components/global/MainCheckbox.vue';
import Box from '@/components/global/Box.vue';
import Loader from '@/components/global/Loader.vue';
import SpinnerLoading from '@/components/global/loading/SpinnerLoading.vue';
import SkeletonCard from '@/components/global/loading/SkeletonCard.vue';
import InputField from '@/components/global/formElements/InputField.vue';
import LargeInput from '@/components/global/formElements/LargeInput.vue';
import LottieFile from '@/components/global/LottieFile.vue';
import MainTable from '@/components/global/table/MainTable.vue'
export default {
	install: (app) => {
		app
			.component('LottieFile', LottieFile)
			.component('MultiSelect', MultiSelect)
			.component('SpeedDial', SpeedDial)
			.component('Divider', Divider)
			.component('AppButton', AppButton)
			.component('InputSwitch', InputSwitch)
			.component('InputText', InputText)
			.component('InputNumber', InputNumber)
			.component('Dropdown', Dropdown)
			.component('Checkbox', Checkbox)
			.component('Textarea', Textarea)
			.component('ProgressBar', ProgressBar)
			.component('DataTable', DataTable)
			.component('Column', Column)
			.component('TabMenu', TabMenu)
			.component('Dialog', Dialog)
			.component('Button', Button)
			.component('OverlayPanel', OverlayPanel)
			.component('Chart', Chart)
			.component('Toast', Toast)
			.component('Box', Box)
			.component('Paginator', Paginator)
			.component('MainRadioGroup', MainRadioGroup)
			.component('MainCheckbox', MainCheckbox)
			.component('MainSelect', MainSelect)
			.component('Loader', Loader)
			.component('SpinnerLoading', SpinnerLoading)
			.component('Skeleton', Skeleton)
			.component('SkeletonCard', SkeletonCard)
			.component('InputField', InputField)
			.component('LargeInput', LargeInput)
			.component('MainTable', MainTable)
	},
};
