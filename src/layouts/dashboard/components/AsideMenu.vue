<template>
	<div>
		<!-- for mobile view -->
		<TransitionRoot as="template" :show="sidebarOpen">
			<Dialog
				as="div"
				class="relative z-40 sm:hidden "
				@close="
					sidebarOpen = false;
					$emit('closeSidebar');
				"
			>
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
				</TransitionChild>
				<div class="fixed inset-0 z-40 flex">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="-translate-x-full"
					>
						<DialogPanel
							class="relative flex w-full max-w-xs flex-1 flex-col bg-gradient-to-l rounded-l-main bg-white from-primary-600 to-primary-400 h-full"
						>
							<TransitionChild
								as="template"
								enter="ease-in-out duration-300"
								enter-from="opacity-0"
								enter-to="opacity-100"
								leave="ease-in-out duration-300"
								leave-from="opacity-100"
								leave-to="opacity-0"
							>
								<div class="absolute top-0 right-0 -mr-12 pt-2">
									<button
										type="button"
										class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 ring-inset ring-white text-white flex-center"
										@click="
											sidebarOpen = false;
											$emit('closeSidebar');
										"
									>
										<i class="fi fi-sr-angle-left flex-center"></i>
									</button>
								</div>
							</TransitionChild>
              <menu-item />
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>

		<!-- for desktop view -->
    <div class="hidden lg:inset-y-0 lg:flex lg:w-[262px] lg:flex-col rounded-l-main bg-white overflow-hidden shadow-aside fixed !top-[74px] aside-height">
			<menu-item />
		</div>
	</div>
</template>

<script setup>
import {
	Dialog,
	DialogPanel,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue';
import MenuItem from './MenuItem.vue';
const props = defineProps({
	sidebarOpen: {
		type: Boolean,
		default: false,
	},
});
</script>
<style>
.aside-height {
  height: calc(100vh - 85px)
}
</style>
