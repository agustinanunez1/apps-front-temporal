import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';


export default function CatalogoScreen() {
  const [servicios, setServicios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const router = useRouter();
  const [busqueda, setBusqueda] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Servicios',
    });
  }, [navigation]);



  useEffect(() => {
  const datos = [
    {
      id: '1',
      titulo: 'Lavado Básico',
      precio: 1500,
      imagen: require('../assets/images/image.png'),
      descripcion: 'Lavado exterior rápido.',
    },
    {
      id: '2',
      titulo: 'Lavado Completo',
      precio: 3000,
      imagen: require('../assets/images/image.png'),
      descripcion: 'Interior y exterior con aspirado.',
    },
  ];
  setServicios(datos);
}, []);


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSeleccionado(item)}>
      <View style={styles.card}>
        <Image source={item.imagen} style={styles.imagen} />
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.precio}>${item.precio}</Text>
      </View>
    </TouchableOpacity>
  );
  const serviciosFiltrados = servicios.filter((servicio) =>
    servicio.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Buscar servicio..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.buscador}
      />

      <FlatList
        data={serviciosFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />

      {/* Modal para la card ampliada */}
      <Modal
        visible={!!seleccionado}
        transparent
        animationType="fade"
        onRequestClose={() => setSeleccionado(null)}
      >
        <BlurView intensity={180} style={StyleSheet.absoluteFill}>
          <Pressable
            style={styles.modalFondo}
            onPress={() => setSeleccionado(null)}
          >
            <View style={styles.modalCard}>
              <Image
                //source={seleccionado?.imagen}
                style={styles.modalImagen}
              />
              <Text style={styles.modalTitulo}>{seleccionado?.titulo}</Text>
              <Text style={styles.modalDescripcion}>
                {seleccionado?.descripcion}
              </Text>
              <Text style={styles.modalPrecio}>${seleccionado?.precio}</Text>
              <TouchableOpacity
                style={styles.botonReservar}
                onPress={() => router.push({
                pathname: '/reservar',
                params: {
                  servicio: seleccionado?.titulo,
                  precio: seleccionado?.precio,
                  },
                })}
              >
                <Text style={styles.botonTexto}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  imagen: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  descripcion: {
    fontSize: 14,
    marginTop: 4,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#007bff',
  },
  modalFondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    elevation: 10,
  },
  modalImagen: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  modalDescripcion: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  modalPrecio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 8,
  },
  botonReservar: {
    marginTop: 16,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buscador: {
    height: 40,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  backgroundColor: '#fff',
  }

});

