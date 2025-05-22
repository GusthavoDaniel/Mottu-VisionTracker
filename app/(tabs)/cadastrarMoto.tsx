import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { useMotoContext } from '../contexts/MotoContext';
import { useTheme } from '../contexts/ThemeContext';
import { Animated } from 'react-native';


const MODELOS_MOTOS = ['CG 160', 'Factor 125', 'Biz 125'];


const CORES_MOTOS = ['Preta', 'Verde Mottu'];

export default function CadastrarMotoScreen() {
  const { adicionarMoto } = useMotoContext();
  const router = useRouter();
  const { colors, isDark } = useTheme();
  
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState(MODELOS_MOTOS[0]);
  const [cor, setCor] = useState(CORES_MOTOS[1]); 
  const [mostrarModelosPicker, setMostrarModelosPicker] = useState(false);
  const [mostrarCoresPicker, setMostrarCoresPicker] = useState(false);

  const handleCadastrar = () => {
    if (!placa) {
      Alert.alert('Erro', 'Por favor, insira a placa da moto');
      return;
    }

    
    const placaRegex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;
    if (!placaRegex.test(placa)) {
      Alert.alert('Erro', 'Formato de placa inválido. Use o formato AAA0A00');
      return;
    }

    const novaMoto = {
      id: Date.now().toString(),
      placa,
      modelo,
      cor,
      posX: 50,
      posY: 50,
      pan: new Animated.ValueXY({ x: 50, y: 50 }),
      historico: [`Cadastrada em ${new Date().toLocaleString()}`],
    };
    
    adicionarMoto(novaMoto);
    
    Alert.alert('Sucesso', `Moto ${modelo} de placa ${placa} cadastrada com sucesso!`);
    setPlaca('');
    setModelo(MODELOS_MOTOS[0]);
    setCor(CORES_MOTOS[1]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContainer, { backgroundColor: colors.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Cadastrar Nova Moto</Text>
          <View style={[styles.logoPlaceholder, { backgroundColor: '#00EF7F' }]}>
            <Text style={styles.logoText}>MOTTU</Text>
          </View>
        </View>
        
        <View style={styles.motoPreview}>
          <View 
            style={[
              styles.motoColorPreview, 
              { backgroundColor: cor === 'Verde Mottu' ? '#00EF7F' : '#000000' }
            ]}
          />
          <Text style={[styles.motoPreviewText, { color: colors.text }]}>
            {modelo} - {cor}
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Placa da Moto</Text>
          <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5' }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="AAA0A00"
              placeholderTextColor={colors.text + '80'}
              value={placa}
              onChangeText={(text) => setPlaca(text.toUpperCase())}
              autoCapitalize="characters"
              maxLength={7}
            />
          </View>
          
          <Text style={[styles.label, { color: colors.text }]}>Modelo da Moto</Text>
          <TouchableOpacity 
            style={[styles.pickerButton, { borderColor: colors.border, backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5' }]}
            onPress={() => setMostrarModelosPicker(!mostrarModelosPicker)}
          >
            <Text style={[styles.pickerButtonText, { color: colors.text }]}>{modelo}</Text>
            <Text style={{ color: colors.text }}>{mostrarModelosPicker ? "▲" : "▼"}</Text>
          </TouchableOpacity>
          
          {mostrarModelosPicker && (
            <View style={[styles.pickerOptions, { backgroundColor: isDark ? '#2C2C2C' : '#FFFFFF', borderColor: colors.border }]}>
              {MODELOS_MOTOS.map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={[
                    styles.pickerItem, 
                    modelo === item && { backgroundColor: colors.accent + '30' }
                  ]}
                  onPress={() => {
                    setModelo(item);
                    setMostrarModelosPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, { color: colors.text }]}>{item}</Text>
                  {modelo === item && <Text style={{ color: colors.accent }}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          <Text style={[styles.label, { color: colors.text }]}>Cor da Moto</Text>
          <TouchableOpacity 
            style={[styles.pickerButton, { borderColor: colors.border, backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5' }]}
            onPress={() => setMostrarCoresPicker(!mostrarCoresPicker)}
          >
            <Text style={[styles.pickerButtonText, { color: colors.text }]}>{cor}</Text>
            <View 
              style={[
                styles.colorPreview, 
                { backgroundColor: cor === 'Verde Mottu' ? '#00EF7F' : '#000000' }
              ]} 
            />
            <Text style={{ color: colors.text }}>{mostrarCoresPicker ? "▲" : "▼"}</Text>
          </TouchableOpacity>
          
          {mostrarCoresPicker && (
            <View style={[styles.pickerOptions, { backgroundColor: isDark ? '#2C2C2C' : '#FFFFFF', borderColor: colors.border }]}>
              {CORES_MOTOS.map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={[
                    styles.pickerItem, 
                    cor === item && { backgroundColor: colors.accent + '30' }
                  ]}
                  onPress={() => {
                    setCor(item);
                    setMostrarCoresPicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, { color: colors.text }]}>{item}</Text>
                  <View 
                    style={[
                      styles.colorPreview, 
                      { backgroundColor: item === 'Verde Mottu' ? '#00EF7F' : '#000000' }
                    ]} 
                  />
                  {cor === item && <Text style={{ color: colors.accent }}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={handleCadastrar}
        >
          <Text style={[styles.buttonText, { color: isDark ? '#000000' : '#FFFFFF' }]}>Cadastrar Moto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.backButton, { borderColor: colors.accent }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { color: colors.accent }]}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  logoPlaceholder: {
    width: 80,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#000',
    fontWeight: 'bold',
  },
  motoPreview: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  motoColorPreview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  motoPreviewText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pickerButtonText: {
    flex: 1,
  },
  pickerOptions: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: -10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDDDDD',
  },
  pickerItemText: {
    fontSize: 16,
  },
  colorPreview: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});
