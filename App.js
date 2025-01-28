import { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
} from "react-native";
import Card from "./components/Card";
import SortOptions from "./components/SortOptions"; // Исправленный компонент

export default function App() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]); // Отсортированные продукты
  const [ascending, setAscending] = useState(true); // Флаг направления сортировки

  // Функция получения продуктов
  async function getProducts(limit = 10) {
    const URL = `https://dummyjson.com/products?limit=${limit}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data.products || [];
  }

  // Загрузка данных при старте
  useEffect(() => {
    async function init() {
      const products = await getProducts();
      setProducts(products || []);
      setSortedProducts(products || []); // Сохраняем без сортировки
    }
    init();
  }, []);

  // Сортировка по цене
  const sortProducts = () => {
    const sorted = [...sortedProducts].sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
    setAscending(!ascending);
  };

  // Фильтрация по категории
  const filterProducts = (category) => {
    if (!category) {
      setSortedProducts(products); // Если категория пустая, показываем весь список
      return;
    }
    const filtered = products.filter((item) =>
      item.category.toLowerCase().includes(category.toLowerCase())
    );
    setSortedProducts(filtered);
  };

  // Изменение лимита продуктов
  const changeProductLimit = async (limit) => {
    const products = await getProducts(limit);
    setProducts(products);
    setSortedProducts(products);
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={{ textAlign: "left", fontSize: 24, margin: 10 }}>
        List of Products
      </Text>
      {/* Компонент сортировки и фильтрации */}
      <SortOptions
        onSort={() => {
          console.log("Сортировка вызвана!");
          sortProducts();
        }}
        onFilter={(category) => {
          console.log("Фильтрация вызвана! Категория:", category);
          filterProducts(category);
        }}
        onLimitChange={(limit) => {
          console.log("Лимит изменён! Новое значение:", limit);
          changeProductLimit(limit);
        }}
      />
      
      {/* Список продуктов */}
      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card item={item} />}
        ListEmptyComponent={<Text style={styles.loading}>Загрузка...</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#b1afa9",
    marginTop: 26,
    flex: 1,
  },
  loading: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});
