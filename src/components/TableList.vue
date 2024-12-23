<template>
  <div>
  <h1>Список Компаний</h1>

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
h1 {
  text-align: center;
}
table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #4caf50;
  color: #fff;
  text-transform: uppercase;
}

th,
td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
  cursor: pointer;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}



.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
