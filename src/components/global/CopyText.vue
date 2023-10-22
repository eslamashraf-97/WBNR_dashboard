<template xmlns="">
  <div>
      <p class="text-text-200 text-sm mb-1">{{ title }}:</p>
      <p class="text-sm font-normal flex items-center gap-2 leading-6">{{ text }} <slot><img @click="copyIban" class="cursor-pointer" src="@/assets/icons/Copy.svg"/></slot></p>
  </div>
</template>

<script setup>
import {success} from "@/plugins/toast";
import i18n from "@/plugins/i18n";

const { t }= i18n.global
const props = defineProps({
        title: {
            type: String,
        },
        text: {
            type: String,
        }
})

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        success(`${props.title}`, t('alerts.copied_iban'))
    } catch (err) {
        console.error('Unable to copy to clipboard', err)
    }
    document.body.removeChild(textArea);
}
function copyIban () {
    if(window.isSecureContext) {
        navigator.clipboard.writeText(props.text)
        success(`${props.text}`, t('alerts.copied_iban'))
    } else {
        unsecuredCopyToClipboard(props.text)
    }
}
</script>
