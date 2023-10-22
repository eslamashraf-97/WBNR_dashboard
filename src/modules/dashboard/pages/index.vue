<template>
    <div class="lg:grid grid-cols-4 gap-5">
      <!-- right -->
      <div class="lg:col-span-4 xl:col-span-3">
        <section class="mb-10">
          <h5 class="text-gray-secondary text-4xl mb-6">لوحة التحكم</h5>
          <statistics-cards />
        </section>

        <section class="mb-10">
          <h5 class="text-dark text-2xl mb-4">عائلتي</h5>
          <family-details />
        </section>

        <section class="mb-10">
          <h5 class="text-dark text-2xl mb-4">شركاؤنا</h5>
          <select-partners />
          <donwload-insurance-document />
        </section>

      </div>

      <!-- left -->
      <div class="lg:col-span-4 xl:col-span-1">
          <bank-cards class="mb-10"/>
          <payment-transactions />
        </div>
    </div>
</template>

<script setup>
import StatisticsCards from "@modules/dashboard/components/StatisticsCards.vue";
import FamilyDetails from "@modules/dashboard/components/FamilyDetails.vue";
import DonwloadInsuranceDocument from "@modules/dashboard/components/DonwloadInsuranceDocument.vue";
import SelectPartners from "@modules/dashboard/components/SelectPartners.vue";
import PaymentTransactions from "@modules/dashboard/components/PaymentTransactions.vue";
import BankCards from "@modules/dashboard/components/BankCards.vue";
</script>
