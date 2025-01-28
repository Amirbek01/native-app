import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SortOptions({ onSort, onFilter, onLimitChange }) {
  const [modalVisible, setModalVisible] = useState(false); // Состояние для модального окна
  const [filterCategory, setFilterCategory] = useState(""); // Категория для фильтрации
  const [productLimit, setProductLimit] = useState(""); // Лимит продуктов

  return (
    <View>
      {/* Кнопка с иконкой для открытия сортировок */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
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

            {/* Сортировка по цене */}
            <Button
              title="Сортировать по цене"
              onPress={() => {
                onSort();
                setModalVisible(false); // Закрыть окно после выбора
              }}
            />

            {/* Фильтрация по категории */}
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Введите категорию"
                value={filterCategory}
                onChangeText={(text) => setFilterCategory(text)}
                style={styles.input}
              />
              <Button
                title="Фильтровать"
                onPress={() => {
                  onFilter(filterCategory);
                  setModalVisible(false); // Закрыть окно после выбора
                }}
              />
            </View>

            {/* Изменение лимита продуктов */}
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Количество продуктов"
                value={productLimit}
                onChangeText={(text) => setProductLimit(text)}
                style={styles.input}
                keyboardType="numeric"
              />
              <Button
                title="Применить лимит"
                onPress={() => {
                  const limit = parseInt(productLimit, 10);
                  if (!isNaN(limit) && limit > 0) {
                    onLimitChange(limit);
                  } else {
                    alert("Введите корректное число");
                  }
                  setModalVisible(false); // Закрыть окно после выбора
                }}
              />
            </View>

            {/* Кнопка закрытия */}
            <Button
              title="Закрыть"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    position: "absolute",
    top: 20,
    right: 20,
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

