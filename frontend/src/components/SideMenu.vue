<script setup>
import { useUser } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
const user = useUser();
const { currentUser } = storeToRefs(user);
const { setUser } = user;

const router = useRouter();
const openAccountOption = ref(false);
const accountOption = () => {
  return (openAccountOption.value = !openAccountOption.value);
};

const logout = () => {
  sessionStorage.removeItem("currentUser");
  setUser(null);
  router.push({ name: "LandingPage" });
};
</script>

<template>
  <div>
    <div class="fixed">
      <div class="pt-4 mb-6">
        <svg
          aria-label="X logo"
          width="28"
          height="28"
          viewBox="0 0 300 271"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"
          />
        </svg>
      </div>
      <div class="font-bold text-xl flex flex-col gap-7">
        <p>หน้าแรก</p>
        <p>สำรวจ</p>
        <p>การแจ้งเตือน</p>
        <p>ข้อความ</p>
        <p>ชุมชน</p>
        <p>Premium</p>
        <p>องค์กรที่ได้รับการยืนยัน</p>
        <p>ข้อมูลส่วนตัว</p>
        <p>เพิ่มเติม</p>
        <div
          class="w-56 h-13 -mt-2 bg-white rounded-4xl flex items-center justify-center"
        >
          <h1 class="font-semibold text-black text-sm">โพสต์</h1>
        </div>
      </div>
      <div
        class="relative mt-20 flex gap-5 cursor-pointer"
        @click="accountOption"
      >
        <div class="avatar">
          <div
            class="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2"
          >
            <img
              src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
            />
          </div>
        </div>
        <h1 class="font-bold">{{ currentUser.name }}</h1>
        <div class="absolute -top-35 -left-5" v-if="openAccountOption">
          <div class="bg-black shadow-white shadow-md h-30 w-65 p-5 rounded-md">
            <p class="pb-5 text-md font-semibold cursor-pointer">
              เพิ่มบัญชีที่มีอยู่แล้ว
            </p>
            <p class="text-md font-semibold cursor-pointer" @click="logout">
              ออกจากระบบ
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
