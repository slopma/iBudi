import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import dictionaryData from '../app/dictionary.json'; // Asegúrate de que esta ruta siga siendo correcta

const ConceptualMap = ({ categoriaActiva, onSelectTerm }) => {
  // Inicializamos valores de animación
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  // Ejecutamos la animación al montar el componente o cambiar la categoría
  useEffect(() => {
    // Reiniciar valores
    fadeAnim.setValue(0);
    translateYAnim.setValue(20);

    // Arrancar animación suave de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [categoriaActiva]);

  const groupedData = dictionaryData.reduce((acc, item) => {
    const category = item.general ? item.general.trim() : 'General';
    const subcategory = item.sub ? item.sub.trim() : 'General Concepts';

    if (categoriaActiva && category !== categoriaActiva) return acc;

    if (!acc[category]) acc[category] = {};
    if (!acc[category][subcategory]) acc[category][subcategory] = [];
    acc[category][subcategory].push(item.term);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {Object.keys(groupedData).map((category, catIdx) => (
        <Animated.View 
          key={catIdx} 
          style={[
            styles.categoryNode, 
            { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }
          ]}
        >
          {/* Nodo Principal */}
          <View style={styles.mainNode}>
            <Text style={styles.nodeText}>{category}</Text>
          </View>

          {/* Ramas de Subcategorías */}
          <View style={styles.branchContainer}>
            {Object.keys(groupedData[category]).map((subcat, subIdx) => (
              <View key={subIdx} style={styles.subCategoryWrapper}>
                <View style={styles.lineBranch} />
                
                <View style={styles.subNode}>
                  <Text style={styles.subNodeText}>{subcat}</Text>
                </View>

                {/* Hojas (Términos) */}
                <View style={styles.termsContainer}>
                  {groupedData[category][subcat].map((term, termIdx) => (
                    <TouchableOpacity 
                      key={termIdx} 
                      style={styles.termLeaf}
                      onPress={() => onSelectTerm && onSelectTerm(term)}
                    >
                      <View style={styles.dot} />
                      <Text style={styles.termText}>{term}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  categoryNode: { width: '100%', marginBottom: 40, alignItems: 'center' },
  mainNode: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 12,
    minWidth: 160,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nodeText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  branchContainer: { width: '90%', marginTop: 15 },
  subCategoryWrapper: { 
    marginLeft: 20, 
    borderLeftWidth: 2, 
    borderLeftColor: '#bdc3c7', 
    paddingLeft: 20, 
    marginBottom: 20 
  },
  lineBranch: { 
    position: 'absolute', 
    left: 0, 
    top: 20, 
    width: 20, 
    height: 2, 
    backgroundColor: '#bdc3c7' 
  },
  subNode: {
    backgroundColor: '#ffffff', 
    padding: 12, 
    borderRadius: 10, 
    borderWidth: 1.5, 
    borderColor: '#3498db', 
    marginBottom: 12,
    elevation: 2,
  },
  subNodeText: { color: '#2980b9', fontWeight: '700', fontSize: 14 },
  termsContainer: { marginLeft: 10 },
  termLeaf: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#95a5a6', marginRight: 12 },
  termText: { color: '#34495e', fontSize: 14 },
});

export default ConceptualMap;