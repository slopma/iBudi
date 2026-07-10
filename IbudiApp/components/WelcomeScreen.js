import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Image, StatusBar, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const idiomas = [
  { texto: "Welcome to IBUDI", lang: "EN"},
  { texto: "Bienvenido a IBUDI", lang: "ES" },
  { texto: "Bem-vindo ao IBUDI", lang: "PT-BR" },
  { texto: "Bienvenue à IBUDI", lang: "FR" },
  { texto: "Willkommen bei IBUDI", lang: "DE" },
  { texto: "IBUDIへようこそ", lang: "JP" }
];

export default function WelcomeScreen({ onFinished }) {
  const [index, setIndex] = useState(0);
  
  // --- Controladores de Animación ---
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  
  const textOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Secuencia de entrada espectacular
    Animated.sequence([
      // Paso A: El logo aparece con un efecto de rebote (Spring)
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4, // Define qué tanto "rebota"
          tension: 50, // Define la velocidad del rebote
          useNativeDriver: true,
        }),
      ]),
      // Paso B: El título entra deslizándose suavemente desde abajo
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 2. Lógica para rotar los idiomas
    const animarTexto = () => {
      // Aparece
      Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start(() => {
        // Espera un poco y desaparece
        setTimeout(() => {
          Animated.timing(textOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start();
        }, 800);
      });
    };

    animarTexto(); // Ejecuta el primer idioma

    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev === idiomas.length - 1) {
          clearInterval(timer);
          
          // 3. Salida final: Desvanecer toda la pantalla hacia el buscador
          setTimeout(() => {
            Animated.timing(screenOpacity, {
              toValue: 0,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }).start(() => {
              if (onFinished) onFinished();
            });
          }, 400); // Pequeña pausa antes de desaparecer todo
          
          return prev;
        }
        animarTexto();
        return prev + 1;
      });
    }, 1500); // Tiempo total por cada idioma

    return () => clearInterval(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />
      
      <View style={styles.contentContainer}>
        
        {/* LOGO */}
        <Animated.View style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <Image 
            source={require('../assets/images/Logo.png')} 
            style={styles.logo}
            resizeMode="contain" 
          />
        </Animated.View>

        {/* TÍTULO IBUDI */}
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
          <Text style={styles.brandName}>IBUDI</Text>
          <View style={styles.divider} />
        </Animated.View>

        {/* TEXTO MULTILINGÜE */}
        <View style={styles.textWrapper}>
          <Animated.Text style={[styles.welcomeText, { opacity: textOpacity }]}>
            {idiomas[index].texto}
          </Animated.Text>
        </View>

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366', // Fondo azul profundo
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: width * 0.55, // Aumentamos el tamaño al 55% de la pantalla
    height: width * 0.55,
  },
  brandName: {
    fontSize: 42, // Más grande y dominante
    color: '#FFFFFF', // Texto blanco
    fontFamily: 'PTSerif_700Bold',
    letterSpacing: 8,
    textAlign: 'center',
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#F59E0B', // Un pequeño toque dorado/naranja para separar
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 2,
  },
  textWrapper: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#CBD5E1', // Gris claro/azulado para que contraste sin competir con el título
    fontFamily: 'Inter_400Regular', // Cambiado a regular para que se vea más fino y elegante
    textAlign: 'center',
    letterSpacing: 1,
  },
});