import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import React, { useState } from 'react';


export default function ReservasScreen() {
  const navigation = useNavigation();
  const { servicio, precio } = useLocalSearchParams(); // si pasás props por navegación

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const diasDisponibles = {
    '2025-06-01': { marked: true },
    '2025-06-02': { marked: true },
    '2025-06-05': { marked: true },
  };

  const horasDisponiblesPorDia = {
    '2025-06-01': ['10:00', '11:00', '14:00'],
    '2025-06-02': ['09:00', '13:00', '15:00'],
    '2025-06-05': ['08:30', '10:30'],
  };

  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const horas = horasDisponiblesPorDia[diaSeleccionado] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{servicio}</Text>

      <Text style={styles.subtitulo}>Día</Text>
      <Calendar
        markedDates={{
          ...diasDisponibles,
          [diaSeleccionado]: {
            selected: true,
            selectedColor: '#2196F3',
          },
        }}
        onDayPress={(day) => setDiaSeleccionado(day.dateString)}
      />

      {diaSeleccionado && (
        <>
          <Text style={styles.subtitulo}>Hora</Text>
          <FlatList
            data={horas}
            horizontal
            contentContainerStyle={{ paddingVertical: 10 }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.horaItem,
                  horaSeleccionada === item && styles.horaSeleccionada,
                ]}
                onPress={() => setHoraSeleccionada(item)}
              >
                <Text
                  style={{
                    color: horaSeleccionada === item ? '#fff' : '#333',
                    fontWeight: 'bold',
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <View style={styles.pago}>
        <Text style={styles.precioTexto}>
          Total a pagar: ${precio}
        </Text>
        <TouchableOpacity
          style={styles.botonPagar}
          onPress={() =>
            Alert.alert('Reserva confirmada', '¡Gracias por tu pago!')
          }
        >
          <Text style={styles.botonTexto}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { fontSize: 18, fontWeight: '600', marginTop: 20 },
  horaItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  horaSeleccionada: {
    backgroundColor: '#2196F3',
  },
  pago: {
    marginTop: 30,
    alignItems: 'center',
  },
  precioTexto: {
    fontSize: 20,
    marginBottom: 10,
  },
  botonPagar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});