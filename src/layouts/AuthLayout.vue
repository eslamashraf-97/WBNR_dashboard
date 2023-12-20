<template>
	<div class="auth-layouts">
		<nav class="p-10 pt-16 flex justify-around flex-wrap">
			<div>
				<img
					src="@/assets/images/myr-logo.svg"
          alt="wbnr"
          class="w-[150px]"
				/>
			</div>
		</nav>
		<div class="container-auth mt-24 md:w-[545px] m-auto px-3">
			<transition name="fade" appear mode="out-in">
				<router-view />
			</transition>
		</div>
	</div>
</template>

<script setup>
</script>

<!--<style lang="scss">-->
<!--$max-width: 512px;-->
<!--.auth-layouts {-->
<!--	height: 100vh;-->
<!--	main {-->
<!--		width: 100%;-->
<!--		max-width: $max-width;-->
<!--	}-->
<!--	&__main-img {-->
<!--		img {-->
<!--			max-width: $max-width;-->
<!--		}-->
<!--	}-->
<!--}-->
<!--@media (min-width: 768px) and (max-width: 1023px) {-->
<!--	main {-->
<!--		max-width: 50%;-->
<!--	}-->
<!--	.auth-layouts {-->
<!--		&__main-img {-->
<!--			img {-->
<!--				max-width: 50%;-->
<!--			}-->
<!--		}-->
<!--	}-->
<!--}-->
<!--.container-auth {-->
<!--	max-width: 867px;-->
<!--}-->
<!--.register-link {-->
<!--	position: relative;-->
<!--	//cursor: pointer;-->
<!--}-->
<!--.register-link:not(:first-child)::before {-->
<!--	position: absolute;-->
<!--	content: "";-->
<!--	height: 4px;-->
<!--	width: 32px;-->
<!--	top: 11px;-->
<!--	left: -46px;-->
<!--	background: theme('colors.text.100');;-->
<!--}-->
<!--.active-kyc-link::before {-->
<!--	background: theme('colors.primaryb.500') !important;-->
<!--}-->
<!--</style>-->
