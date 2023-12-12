import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, Button, Linking, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Logoff } from '../service/reqFirebase';

const Perfil = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleLogout = () => {
    fazerLogout();
    setLoggedIn(false);

    navigation.navigate('Login');
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleGoBack = () => {
    setShowCamera(false);
  };

  const handleToggleCamera = () => {
    setShowCamera(!showCamera);
  };

  const takePicture = async () => {
    if (camera) {
      try {
        const { uri } = await camera.takePictureAsync();
        console.log('Foto tirada:', uri);

        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('MyAppPhotos', asset, false);
        console.log('Foto salva no armazenamento local');
      } catch (error) {
        console.error('Erro ao tirar a foto:', error);
      }
    }
  };

  const sendSMS = () => {
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const openMaps = () => {
    const url = 'https://www.google.com/maps/search/?api=1&query=';
    Linking.openURL(url);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleToggleCamera}>
        <FontAwesome name="camera" size={24} color="#8CBEAA" style={styles.icon} />
        <Text style={styles.buttonText}>Abrir Câmera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <FontAwesome name="comment" size={24} color="#8CBEAA" style={styles.icon} />
        <Text style={styles.buttonText}>Configurar SMS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openMaps}>
        <FontAwesome name="map-marker" size={24} color="#8CBEAA" style={styles.icon} />
        <Text style={styles.buttonText}>Localização GPS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={Logoff}>
      <Ionicons name="exit-outline" size={24} color="#8CBEAA" style={styles.icon} />        
      <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      {showCamera && (
        <Camera style={styles.camera} type={type} ref={(ref) => (camera = ref)}>
          <View style={styles.cameraButtonsContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
              <Text style={styles.cameraButtonText}>Trocar câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <Text style={styles.cameraButtonText}>Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={handleGoBack}>
              <Text style={styles.cameraButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Configurar SMS</Text>
            <TextInput
              style={styles.input}
              placeholder="Número de Telefone"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mensagem"
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <Button title="Enviar SMS" onPress={sendSMS} />
            <Button title="Fechar" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8CBEAA',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F0F2EB',
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  cameraButton: {
    padding: 15,
    backgroundColor: '#8CBEAA',
    borderRadius: 8,
  },
  cameraButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: 300,
  },
});

export default Perfil;
