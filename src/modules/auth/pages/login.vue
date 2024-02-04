<template>
  <div>
    <ValidationForm @submit="signIn">
      <div class="form-group">
        <label>اسم المستخدم</label>
        <InputField
          v-model="user.user"
          type="text"
          validation="required"
          placeholder="1234567"
          name="mobile-number"
        />
      </div>
      <div class="form-group">
        <label>كلمة السر</label>
        <InputField
          v-model="user.password"
          type="password"
          validation="required"
          placeholder="ادخل كلمة المرور"
          name="password"
        />
      </div>
      <div class="sign-up__button-action mt-4">
        <AppButton class="w-full" type="submit" :loading="loading"
          >تسجيل الدخول</AppButton
        >
      </div>
    </ValidationForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import authService from "../services/auth.services";
import { token } from "@/firebase";
import { useRouter } from "vue-router";
const user = ref({
  user: "",
  password: "",
});
const loading = ref(false);
const router = useRouter();
async function signIn() {
  loading.value = true;
  let loginResponse = await authService.login(user.value);
  localStorage.setItem("access_token", loginResponse.data.meta.token);

  let infoResponse = await authService.getInfo();
  localStorage.setItem("userInfo", JSON.stringify(infoResponse.data.data));
  localStorage.setItem(
    "permissions",
    JSON.stringify(infoResponse.data.data.permissions.map((data) => data.slug))
  );

  let fcm = token;
  // await authService.sendFcmToken({ fcm_token: fcm })

  router.push({ name: "index" });

  loading.value = false;

  // authService.login(user.value).then(async res => {
  //   if(false) {
  //     authService.sendFcmToken({ fcm_token: await token })
  //   }
  //   localStorage.setItem('access_token', res.data.meta.token)
  //   authService.getInfo().then(response => {
  //     localStorage.setItem('userInfo', JSON.stringify(response.data.data))
  //     localStorage.setItem('permissions', JSON.stringify(response.data.data.permissions.map(data => data.slug)))
  //   }).then(() => {
  //     router.push({ name: 'index' })
  //   })
  // }).finally(() => loading.value = false)
}
</script>

<style scoped></style>
