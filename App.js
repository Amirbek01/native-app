import { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button, 
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import Card from './components/Card';
import SortOptions from './components/SortOptions'; // Импорт компонента

export default function App() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]); // Отсортированные продукты
  const [ascending, setAscending] = useState(true); // Флаг направления сортировки

  async function getProducts() {
    const URL = "https://dummyjson.com/products";
    const response = await fetch(URL);
    const data = await response.json();
    return data.products.slice(0,10);
  }

  useEffect(() => {
    async function init() {
      const products = await getProducts();
      setProducts(products || []);
      setSortedProducts(products || []); // Изначально сохраняем без сортировки
    }
    
    init();
  }, []);
  const sortProducts = () => {
    const sorted = [...sortedProducts].sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
    setAscending(!ascending);
  };

  const filterProducts = (category) => {
    const filtered = products.filter((item) => item.category === category);
    setSortedProducts(filtered);
  };

  const changeProductLimit = async (limit) => {
    const products = await getProducts(limit);
    setProducts(products);
    setSortedProducts(products);
  };


  return (
    <SafeAreaView style={styles.main}>
        <SortOptions
          onSort={sortProducts}
          onFilter={filterProducts}
          onLimitChange={changeProductLimit}
        />

          <FlatList
            data={sortedProducts || []}
            renderItem={({item}) => <Card item={item} />}
          /> :
          <Text>Loading</Text>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main : {
    backgroundColor: "#b1afa9",
    marginTop: 26,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  }
});


