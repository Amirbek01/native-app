import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SortOptions({ onSort, onFilter, onLimitChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [productLimit, setProductLimit] = useState("");

  const handleSort = () => {
    onSort();
    setModalVisible(false);
  };

  const handleFilter = () => {
    if (!filterCategory.trim()) {
      Alert.alert("Ошибка", "Введите категорию для фильтрации");
      return;
    }
    onFilter(filterCategory.trim());
    setFilterCategory("");
    setModalVisible(false);
  };

  const handleLimitChange = () => {
    const limit = parseInt(productLimit, 10);
    if (isNaN(limit) || limit <= 0) {
      Alert.alert("Ошибка", "Введите корректное число");
      return;
    }
    onLimitChange(limit);
    setProductLimit("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Фильтр-кнопка */}
      <TouchableOpacity
        onPress={() => {
          console.log("Кнопка фильтра нажата!");
          setModalVisible(true);
        }}
        style={styles.iconButton}
      >
        <Icon name="filter" size={30} color="#333" />
      </TouchableOpacity>

      {/* Модальное окно */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Сортировка и фильтры</Text>

            <Button title="Сортировать по цене" onPress={handleSort} />

            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Введите категорию"
                value={filterCategory}
                onChangeText={setFilterCategory}
                style={styles.input}
              />
              <Button title="Фильтровать" onPress={handleFilter} />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Количество продуктов"
                value={productLimit}
                onChangeText={setProductLimit}
                style={styles.input}
                keyboardType="numeric"
              />
              <Button title="Применить лимит" onPress={handleLimitChange} />
            </View>

            <Button title="Закрыть" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10, // Убедиться, что иконка не перекрывается
  },
  iconButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
