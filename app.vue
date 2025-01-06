<template>
  <div class="bg-gray-100 h-screen">
    <header class="p-4 border-b border-gray-300">
      <div class="flex justify-between">
        <span>
          Pseudo Encrypt
        </span>
        <div class="flex space-x-4">
          <a href="https://github.com/dimakolbasin/pseudo-encrypt" target="_blank" class="text-gray-600 hover:text-black">
            <i class="fab fa-github text-2xl"></i>
          </a>
          <a href="https://www.npmjs.com/package/pseudo-encrypt" target="_blank" class="text-gray-600 hover:text-black">
            <i class="fab fa-npm text-2xl"></i>
          </a>
        </div>
      </div>
    </header>
    <div class="form-wrapper flex flex-col items-center justify-center">
      <div class="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <div class="flex justify-center mb-4">
          <label class="inline-flex items-center">
            <input type="radio" value="encrypt" v-model="activeTab" class="form-radio" />
            <span class="ml-2">Encrypt</span>
          </label>
          <label class="inline-flex items-center ml-4">
            <input type="radio" value="decrypt" v-model="activeTab" class="form-radio" />
            <span class="ml-2">Decrypt</span>
          </label>
        </div>

        <div>
          <label :for="activeTab + 'Input'" class="block text-sm font-medium text-gray-700">
            {{ activeTab === 'decrypt' ? 'Encrypted Input' : 'Plain Text (max 24 chars)' }}
          </label>
          <div class="relative">
            <input
                :id="activeTab + 'Input'"
                v-model="data[activeTab].input"
                :maxlength="activeTab === 'encrypt' ? 24 : undefined"
                type="text"
                class="mt-1 block w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button @click="clearInput" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black">
              ✖
            </button>
          </div>
          <button
              @click="handleAction"
              :class="activeTab === 'decrypt' ? 'bg-green-500' : 'bg-blue-500'"
              class="w-full text-white py-2 px-4 rounded hover:opacity-90 mt-2"
          >
            {{ activeTab === 'decrypt' ? 'Decrypt' : 'Encrypt' }}
          </button>
          <div class="flex items-center mt-4">
            <input
                v-model="data[activeTab].output"
                type="text"
                disabled
                class="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
            <button @click="copyToClipboard(data[activeTab].output)" class="ml-2">
              📋
            </button>
          </div>
        </div>
      </div>

      <div v-if="showNotification" class="fixed top-0 left-0 right-0 flex justify-center mt-4">
        <div class="bg-black text-white text-sm py-2 px-4 rounded shadow-md">
          Text copied to clipboard!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { decryptText, encryptText } from 'pseudo-encrypt';

enum Mode {
  Encrypt = 'encrypt',
  Decrypt = 'decrypt'
}

const activeTab = ref<Mode>(Mode.Encrypt);

const data = ref({
  [Mode.Encrypt]: { input: '', output: '' },
  [Mode.Decrypt]: { input: '', output: '' }
});

const showNotification = ref(false);

const handleAction = () => {
  if (activeTab.value === Mode.Encrypt) {
    if (data.value[Mode.Encrypt].input.length > 24) {
      alert('Text must be 24 characters or less.');
      return;
    }
    data.value[Mode.Encrypt].output = encryptText(data.value[Mode.Encrypt].input);
  } else {
    const isValidFormat = /^([0-9a-zA-Z]{1,6}-)*[0-9a-zA-Z]{1,6}$/.test(data.value[Mode.Decrypt].input);
    if (!isValidFormat) {
      alert('Invalid encrypted text format. Use xx-xx-xx format.');
      return;
    }
    data.value[Mode.Decrypt].output = decryptText(data.value[Mode.Decrypt].input);
  }
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 2000);
  });
};

const clearInput = () => {
  data.value[activeTab.value].input = '';
};

watch(() => data.value[activeTab.value].input, () => {
  data.value[activeTab.value].output = '';
});
</script>

<style scoped>
.form-wrapper {
  height: calc(100% - 60px);
}
</style>
