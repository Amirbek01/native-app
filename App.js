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

export default function App() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]); // Отсортированные продукты
  const [ascending, setAscending] = useState(true); // Флаг направления сортировки
  const [category, setCategory] = useState(""); // Категория для фильтрации
  const [limit, setLimit] = useState(10); // Лимит продуктов

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
  }, [limit]);
  const sortProducts = () => {
    const sorted = [...sortedProducts].sort((a, b) => {
      if (ascending) {
        return a.price - b.price ;
      }
      else {
        return b.price - a.price;
      }
        
    });
    setSortedProducts(sorted);
    setAscending(!ascending);
  }
  const filterProducts = () => { 
    Alert.prompt("Введите категорию", "", (text) => {
      setCategory(text);
      filter(text);
      const filtered = products.filter((item) => {
        return item.category === category;
      });
      setSortedProducts(filtered);
    });
    
  }


  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.title}>Products</Text>
      <Button
        title={`Сортировать по цене (${ascending ? "↑" : "↓"})`}
        onPress={sortProducts}
      />

      <Button 
        title="Фильтровать по категории"
        onPress={filterProducts}
      />
      
      {
        products.length > 0 ?
          <FlatList
            data={sortedProducts || []}
            renderItem={({item}) => <Card item={item} />}
          /> :
          <Text>Loading</Text>
      }
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


