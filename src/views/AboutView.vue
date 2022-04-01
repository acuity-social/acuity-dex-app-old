<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

let $acuityClient;

async function setOrder() {
  const allAccounts = await web3Accounts();
  const address = allAccounts[0].address;
  const injector = await web3FromAddress(address);

  $acuityClient.api.tx.orderbook
    .setOrder('0x000000000000000000000000000000000000000000000022', '0x000000000000000000000000000000000000000000000023', 123, 456)
    .signAndSend(address, { signer: injector.signer }, (status: any) => {
      console.log(status)
    });
}

// lifecycle hooks
onMounted(async () => {
  $acuityClient = inject('$acuityClient');
  const allInjected = await web3Enable('Acuity Browser');
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
  <button @click="setOrder">Set order</button>
</template>
