<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.id">
          <td>{{ company._id }}</td>
          <td>{{ company.name.ru }}</td>
          <td>{{ formatISODate(company.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Вперёд</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchCompanies } from "../api/api.js";

const companies = ref([]);
const currentPage = ref(1);
const perPage = 10;
const totalPages = ref(1);

const loadCompanies = async () => {
  try {
    const response = await fetchCompanies(currentPage.value, perPage);
    companies.value = response.data.items;
    totalPages.value = Math.ceil(response.data.total / perPage);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
};

const formatISODate = (dateString)  => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadCompanies();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadCompanies();
  }
};

onMounted(async () => {
 await loadCompanies();
});
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
