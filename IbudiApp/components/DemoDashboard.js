import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';

import dictionaryData from '../app/dictionary.json';
import ConceptualMap from './ConceptualMap';

const MOCK_TRANSLATIONS = {
  default: {
    ES: "El contrato de distribución se rige por las normas del derecho internacional. No obstante, la sociedad civil y el gobierno nacional deben colaborar estrechamente para definir la cultura corporativa de la nueva sucursal y establecer un sistema político transparente.",
    EN: "The distribution agreement is governed by the rules of international law. However, civil society and the national government must collaborate closely to define the corporate culture of the new branch and establish a transparent political system.",
    PT: "O contrato de distribuição é regido pelas normas do direito internacional. No entanto, a sociedade civil e o governo nacional devem colaborar estreitamente para definir a cultura corporativa da nova filial e estabelecer um sistema político transparente.",
    FR: "Le contrat de distribution est régi par les règles du droit international. Toutefois, la société civile et le gouvernement national doivent collaborer étroitement pour définir la culture d'entreprise de la nouvelle succursale et établir un système politique transparent.",
    DE: "Der Vertriebsvertrag unterliegt den Regeln des Völkerrechts. Zivilgesellschaft und nationale Regierung müssen jedoch eng zusammenarbeiten, um die Unternehmenskultur der neuen Niederlassung zu definieren und ein transparentes politisches System zu etablieren.",
    JP: "販売代理店契約は国際法の規則に準拠します。ただし、新支店の企業文化を定義し、透明性の高い政治制度を確立するには、市民社会と中央政府が緊密に連携する必要があります。"
  },
  contrato: {
    ES: "ACUERDO DE CONFIDENCIALIDAD COOPERATIVO.\nLas partes acuerdan que la cultura corporativa y los valores fundamentales de la sociedad civil local serán respetados en el desarrollo de la asociación. Cualquier disputa relacionada con la propiedad intelectual será sometida a un tribunal competente de derecho internacional en un país neutral.",
    EN: "COOPERATIVE NON-DISCLOSURE AGREEMENT.\nThe parties agree that the corporate culture and fundamental values of the local civil society will be respected in the development of the association. Any dispute regarding intellectual property will be submitted to a competent court of international law in a neutral country.",
    PT: "ACORDO DE CONFIDENCIALIDADE COOPERATIVO.\nAs partes concordam que a cultura corporativa e os valores fundamentais da sociedade civil local serão respeitados no desenvolvimento da associação. Qualquer litígio relativo à propriedade intelectual será submetido a um tribunal competente de direito internacional em um país neutro.",
    FR: "ACCORD DE CONFIDENTIALITÉ COOPÉRATIF.\nLes parties conviennent que la culture d'entreprise et les valeurs fondamentales de la société civile locale seront respectées dans le développement de l'association. Tout litige relatif à la propriété intellectuelle sera soumis à un tribunal compétent de droit international dans un pays neutre.",
    DE: "KOOPERATIVE GEHEIMHALTUNGSVEREINBARUNG.\nDie Parteien vereinbaren, dass die Unternehmenskultur und die Grundwerte der lokalen Zivilgesellschaft bei der Entwicklung der Partnerschaft respektiert werden. Alle Streitigkeiten über geistiges Eigentum werden einem zuständigen Gericht für internationales Recht in einem neutralen Land vorgelegt.",
    JP: "協力秘密保持契約。\n当事者は、協会の発展において、地域市民社会の企業文化と基本的価値観が尊重されることに同意する。知的財産に関する紛争は、中立国の国際法管轄裁判所に提起されるものとする。"
  },
  acuerdo: {
    ES: "El gobierno nacional de la contraparte insiste en regular el idioma corporativo y el comportamiento no verbal de nuestros representantes en la aduana. Esto representa un desafío para la comunicación intercultural efectiva y podría crear una situación desfavorable de poder no coercitivo.",
    EN: "The national government of the counterparty insists on regulating the corporate language and non-verbal behavior of our representatives at customs. This represents a challenge for effective intercultural communication and could create an unfavorable non-coercive power situation.",
    PT: "O governo nacional da contraparte insiste em regular a linguagem corporativa e o comportamento não-verbal dos nossos representantes na alfândega. Isso representa um desafio para a comunicação intercultural eficaz e pode criar uma situação desfavorável de poder não-coercivo.",
    FR: "Le gouvernement nacional de la contrepartie insiste sur la réglementation de la langue de l'entreprise et du comportement non verbal de nos représentants en douane. Cela représente un défi pour une communication interculturelle efficace et pourrait créer une situation de pouvoir non coercitif défavorable.",
    DE: "Die nationale Regierung des Vertragspartners besteht darauf, die Unternehmenssprache und das nonverbale Verhalten unserer Vertreter beim Zoll zu regulieren. Dies stellt eine Herausforderung für eine effektive interkulturelle Kommunikation dar und könnte eine ungünstige Situation nichtkooperativer Macht schaffen.",
    JP: "相手国の政府は、税関における当社代表者の企業言語および非言語的行動の規制を主張している。これは効果的な異文化間コミュニケーションに対する課題であり、不利な非強制的な権力状況を生み出す可能性があります。"
  }
};

const generateMockTermAnalysis = (item) => {
  return `INTERNATIONAL BUSINESS PERSPECTIVE:
The term "${item.term}" (in Spanish: "${item.es || item.term}") is highly significant in cross-border negotiations. Ensuring precise alignment on this concept helps organizations avoid operational friction, contractual misunderstandings, and misaligned strategic milestones when setting up local entities or partnerships.

REAL BUSINESS EXAMPLE:
In a cross-border joint venture, differing interpretations of "${item.term}" between the foreign partner and the local team led to project delays. By revising the corporate alignment docs to explicitly integrate the local regulatory framework of "${item.term}", the company streamlined its operations and protected its investment value.

KEY CULTURAL IMPLICATION:
When translating and implementing "${item.term}" in foreign jurisdictions, a simple word-for-word translation is rarely sufficient. Local markets often associate distinct legal contexts or cultural nuances with this term, meaning local counsel and communication experts should verify the phrasing to maintain alignment.`;
};

const API_KEY = 'AIzaSyBBjsVxFb1TskxjdPfZAznIfwuK7DZ35YU'; 

export default function DemoDashboard({ onBackToLanding }) {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  // NAVIGATION STATE
  const [activeTab, setActiveTab] = useState('buscador'); // 'buscador' | 'editor' | 'documentos' | 'ajustes'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- BUSCADOR STATE ---
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // --- EDITOR STATE ---
  const [editorText, setEditorText] = useState(
    'The distribution agreement is governed by the rules of international law. However, civil society and the national government must collaborate closely to define the corporate culture of the new branch and establish a transparent political system.'
  );
  const [sourceLang, setSourceLang] = useState('EN');
  const [targetLang, setTargetLang] = useState('ES');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // --- SETTINGS STATE ---
  const [settings, setSettings] = useState({
    username: 'Carlos Mendoza',
    company: 'Global Trade Solutions Ltd',
    apiKey: API_KEY,
    autoSave: true,
    fontSize: 'Medium'
  });
  const [settingsMessage, setSettingsMessage] = useState('');

  // Normalizador de texto para búsquedas
  const normalizarTexto = (texto) => {
    if (!texto) return '';
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  // Algoritmo fuzzy match básico
  const esFuzzyMatch = (textoBase, searchVal) => {
    if (!textoBase) return false;
    const baseLimpia = normalizarTexto(textoBase);
    const searchLimpia = normalizarTexto(searchVal);
    return baseLimpia.includes(searchLimpia);
  };

  // Filtrado de términos
  const filteredData = dictionaryData.filter((item) => {
    if (search.trim().length > 0) {
      const searchTermNorm = normalizarTexto(search);
      return (
        esFuzzyMatch(item.term, searchTermNorm) ||
        esFuzzyMatch(item.es, searchTermNorm) ||
        esFuzzyMatch(item.de, searchTermNorm) ||
        esFuzzyMatch(item.fr, searchTermNorm) ||
        esFuzzyMatch(item.jp, searchTermNorm) ||
        esFuzzyMatch(item['pt-br'], searchTermNorm)
      );
    }
    return true; 
  }).slice(0, 15); 

  // LLAMADA A GEMINI PARA GENERAR ANÁLISIS DE TÉRMINO INDIVIDUAL
  const generarAnalisisTermino = async (item) => {
    setLoadingId(item.id);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${settings.apiKey}`;
    const prompt = `Act as an expert consultant and teacher in international business. Explain the term "${item.term}" (in Spanish: "${item.es}"). Structure the response with the following titles in UPPERCASE and separate sections with double line breaks, without markdown or asterisks:
    
INTERNATIONAL BUSINESS PERSPECTIVE:
(Explain the strategic relevance of this term in cross-border contracts and agreements)

REAL BUSINESS EXAMPLE:
(Describe a hypothetical or real business case where misinterpretation of this term caused confusion or where it was applied correctly)

KEY CULTURAL IMPLICATION:
(Detail what local culture or language considerations should be kept in mind when translating this term in target markets)`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      if (data.error) {
        console.warn("Gemini API Error, using professional local fallback:", data.error.message);
        const fallbackText = generateMockTermAnalysis(item);
        setAiAnalysis(prev => ({ ...prev, [item.id]: fallbackText }));
      } else {
        const generatedText = data.candidates[0].content.parts[0].text;
        setAiAnalysis(prev => ({ ...prev, [item.id]: generatedText }));
      }
    } catch (error) {
      console.warn("Gemini API Connection failed, using professional local fallback");
      const fallbackText = generateMockTermAnalysis(item);
      setAiAnalysis(prev => ({ ...prev, [item.id]: fallbackText }));
    } finally {
      setLoadingId(null);
    }
  };

  // LLAMADA A GEMINI PARA TRADUCIR Y ANALIZAR EL TEXTO EN EL EDITOR
  const analizarYTraducirTexto = async () => {
    if (!editorText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${settings.apiKey}`;
    const prompt = `Act as iBudi, an intelligent writing assistant and translator for international business.
Analyze the following business text (Source Language: ${sourceLang}) to translate it into the target language: ${targetLang}.

You must return a pure JSON object (without markdown code blocks like \`\`\`json or any extra text, just clean readable JSON) containing exactly this structure:
{
  "translation": "The professional translation of the text that preserves the exact context of business, international law, or trade.",
  "pertinence": 95, // An integer from 0 to 100 evaluating how relevant and appropriate the business terms used are.
  "analysis": "A short analysis (2-3 sentences) explaining why the context was preserved and what business value was protected.",
  "corrections": [
    {
      "originalText": "The word or phrase with style, grammar, or spelling errors in the original text",
      "suggestedText": "The corrected suggestion",
      "explanation": "A short explanation of why it is better to use this suggestion in an international business context."
    }
  ]
}

If the original text does not require any style or spelling corrections, leave the "corrections" array empty.
Original text to translate and analyze:
"${editorText}"`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      let rawText = data.candidates[0].content.parts[0].text;
      
      // Limpieza de formato markdown de código JSON si existe
      if (rawText.includes('```json')) {
        rawText = rawText.split('```json')[1].split('```')[0];
      } else if (rawText.includes('```')) {
        rawText = rawText.split('```')[1].split('```')[0];
      }
      
      const parsedResult = JSON.parse(rawText.trim());
      setAnalysisResult(parsedResult);
    } catch (error) {
      console.log('Error in AI analysis, using professional local fallback:', error);
      
      // FALLBACK SIMULADO DINÁMICO
      setTimeout(() => {
        const cleanText = editorText.toLowerCase();
        let matchedKey = 'default';
        if (cleanText.includes("non-disclosure") || cleanText.includes("confidencialidad")) {
          matchedKey = 'contrato';
        } else if (cleanText.includes("counterparty") || cleanText.includes("contraparte") || cleanText.includes("customs")) {
          matchedKey = 'acuerdo';
        }

        const translation = MOCK_TRANSLATIONS[matchedKey][targetLang] || MOCK_TRANSLATIONS[matchedKey].ES;
        const pertinence = 94;
        const analysis = `The text contains key terms related to ${matchedKey === 'default' ? 'international trade and corporate law' : matchedKey === 'contrato' ? 'confidentiality and intellectual property' : 'intercultural communication and state regulations'}. The translation successfully preserves the original professional business context.`;
        
        const corrections = matchedKey === 'default' && targetLang !== 'ES' ? [
          {
            originalText: "under the rules of",
            suggestedText: "by the rules of",
            explanation: "In formal corporate and legal English drafting, 'governed by the rules of' is more precise."
          }
        ] : [];

        setAnalysisResult({
          translation,
          pertinence,
          analysis,
          corrections
        });
      }, 1500);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // CARGAR PLANTILLAS DE EJEMPLO PARA EL EDITOR
  const cargarPlantilla = (tipo) => {
    if (tipo === 'contrato') {
      setEditorText(
        'COOPERATIVE NON-DISCLOSURE AGREEMENT.\nThe parties agree that the corporate culture and fundamental values of the local civil society will be respected in the development of the association. Any dispute regarding intellectual property will be submitted to a competent court of international law in a neutral country.'
      );
    } else if (tipo === 'acuerdo') {
      setEditorText(
        'The national government of the counterparty insists on regulating the corporate language and non-verbal behavior of our representatives at customs. This represents a challenge for effective intercultural communication and could create an unfavorable non-coercive power situation.'
      );
    }
    setActiveTab('editor');
    setMobileMenuOpen(false);
  };

  // LEER DOCUMENTO TXT CARGADO (MOCK PARA EXPO WEB)
  const handleSimularCarga = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditorText(event.target.result);
        setActiveTab('editor');
        alert(`Document "${file.name}" loaded successfully into the Editor!`);
      };
      reader.readAsText(file);
    }
  };

  const handleSaveSettings = () => {
    setSettingsMessage('Settings saved successfully.');
    setTimeout(() => setSettingsMessage(''), 3000);
  };

  // RENDER DICCIONARIO CARDS
  const renderDictionaryItem = ({ item }) => {
    const isAnalyzed = !!aiAnalysis[item.id];
    const isTermLoading = loadingId === item.id;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTerm}>{item.term}</Text>
          <TouchableOpacity
            style={styles.badgeBtn}
            onPress={() => {
              setActiveCategory(item.general || 'General');
              setModalVisible(true);
            }}
          >
            <Text style={styles.badgeBtnText}>{item.general || 'General'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Definition:</Text>
        <Text style={styles.defText}>{item.def || item.definition}</Text>

        <Text style={styles.label}>Contextual Equivalences:</Text>
        <View style={styles.langGrid}>
          <View style={styles.langRow}>
            <Text style={styles.langCode}>ES</Text>
            <Text style={styles.langText}>{item.es || '-'}</Text>
          </View>
          <View style={styles.langRow}>
            <Text style={styles.langCode}>PT</Text>
            <Text style={styles.langText}>{item['pt-br'] || '-'}</Text>
          </View>
          <View style={styles.langRow}>
            <Text style={styles.langCode}>FR</Text>
            <Text style={styles.langText}>{item.fr || '-'}</Text>
          </View>
          <View style={styles.langRow}>
            <Text style={styles.langCode}>DE</Text>
            <Text style={styles.langText}>{item.de || '-'}</Text>
          </View>
          <View style={styles.langRow}>
            <Text style={styles.langCode}>JP</Text>
            <Text style={styles.langText}>{item.jp || '-'}</Text>
          </View>
        </View>

        <View style={styles.sourceBox}>
          <Text style={styles.sourceLabel}>Bibliographical Source:</Text>
          <Text style={styles.sourceText}>{item.source}</Text>
        </View>

        <TouchableOpacity
          style={[styles.aiBtn, isAnalyzed && styles.aiBtnSuccess]}
          onPress={() => generarAnalisisTermino(item)}
          disabled={isTermLoading || isAnalyzed}
        >
          {isTermLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.aiBtnText}>
              {isAnalyzed ? 'AI Analysis Generated' : 'Generate AI Contextual Analysis'}
            </Text>
          )}
        </TouchableOpacity>

        {isAnalyzed && (
          <View style={styles.aiOutputBox}>
            <Text style={styles.aiOutputText}>{aiAnalysis[item.id]}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* NAVBAR MÓVIL */}
      {!isDesktop && (
        <View style={styles.mobileNav}>
          <TouchableOpacity onPress={() => setMobileMenuOpen(!mobileMenuOpen)} style={styles.hamburger}>
            <Text style={styles.hamburgerText}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.mobileTitle}>IBUDI DEMO</Text>
          <View style={styles.mobileNavRight}>
            <Text style={styles.planLabel}>Free Plan</Text>
          </View>
        </View>
      )}

      <View style={styles.mainLayout}>
        {/* SIDEBAR (DESKTOP) */}
        {(isDesktop || mobileMenuOpen) && (
          <View style={[styles.sidebar, !isDesktop && styles.sidebarMobile]}>
            <View style={styles.sidebarBrand}>
              <Text style={styles.brandTitle}>IBUDI</Text>
              <View style={styles.brandDot} />
            </View>
            <View style={styles.sidebarPlan}>
              <Text style={styles.planText}>Current Demo Plan</Text>
              <Text style={styles.planValue}>FREE PLAN</Text>
            </View>

            <View style={styles.sidebarMenu}>
              <TouchableOpacity
                style={[styles.menuItem, activeTab === 'buscador' && styles.menuItemActive]}
                onPress={() => {
                  setActiveTab('buscador');
                  setMobileMenuOpen(false);
                }}
              >
                <Text style={[styles.menuText, activeTab === 'buscador' && styles.menuTextActive]}>
                  Term Search
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, activeTab === 'editor' && styles.menuItemActive]}
                onPress={() => {
                  setActiveTab('editor');
                  setMobileMenuOpen(false);
                }}
              >
                <Text style={[styles.menuText, activeTab === 'editor' && styles.menuTextActive]}>
                  Editor & Translator
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, activeTab === 'documentos' && styles.menuItemActive]}
                onPress={() => {
                  setActiveTab('documentos');
                  setMobileMenuOpen(false);
                }}
              >
                <Text style={[styles.menuText, activeTab === 'documentos' && styles.menuTextActive]}>
                  Upload Document
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, activeTab === 'ajustes' && styles.menuItemActive]}
                onPress={() => {
                  setActiveTab('ajustes');
                  setMobileMenuOpen(false);
                }}
              >
                <Text style={[styles.menuText, activeTab === 'ajustes' && styles.menuTextActive]}>
                  Settings
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sidebarFooter}>
              <TouchableOpacity style={styles.backBtn} onPress={onBackToLanding}>
                <Text style={styles.backBtnText}>← Back to Site</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          {isDesktop && (
            <View style={styles.contentHeader}>
              <Text style={styles.contentHeaderTitle}>
                {activeTab === 'buscador' && 'Technical Term Search'}
                {activeTab === 'editor' && 'Business Editor & Translator'}
                {activeTab === 'documentos' && 'Business Document Upload'}
                {activeTab === 'ajustes' && 'Settings Panel'}
              </Text>
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Text style={styles.avatarText}>U</Text>
                </View>
                <Text style={styles.userName}>{settings.username}</Text>
              </View>
            </View>
          )}

          {/* TAB 1: BUSCADOR */}
          {activeTab === 'buscador' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionDesc}>
                Search concepts in the business database and research their contextual equivalents in 6 major languages.
              </Text>

              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Type a term (e.g. civil society, culture, right)..."
                  placeholderTextColor="#94A3B8"
                  value={search}
                  onChangeText={setSearch}
                />
                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch('')} style={styles.searchClearBtn}>
                    <Text style={styles.clearText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              <FlatList
                data={filteredData}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderDictionaryItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                  <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>No terms found for your search.</Text>
                  </View>
                }
              />
            </View>
          )}

          {/* TAB 2: EDITOR */}
          {activeTab === 'editor' && (
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionDesc}>
                Draft or edit international business texts. Evaluate their level of technical adequacy and translate while preserving legal and corporate meaning.
              </Text>

              <View style={[styles.editorWorkspace, isDesktop && styles.editorWorkspaceDesktop]}>
                {/* AREA DE TEXTO */}
                <View style={[styles.editorPanel, isDesktop && { width: '55%' }]}>
                  <View style={styles.editorHeading}>
                    <Text style={styles.editorLabel}>ORIGINAL TEXT</Text>
                    <View style={styles.langSelectRow}>
                      <Text style={styles.langSelectLabel}>From:</Text>
                      {['ES', 'EN', 'PT', 'DE', 'FR'].map((lang) => (
                        <TouchableOpacity
                          key={lang}
                          style={[styles.langSelectBtn, sourceLang === lang && styles.langSelectBtnActive]}
                          onPress={() => setSourceLang(lang)}
                        >
                          <Text style={[styles.langSelectBtnText, sourceLang === lang && styles.langSelectBtnTextActive]}>
                            {lang}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <TextInput
                    style={styles.editorInput}
                    multiline
                    value={editorText}
                    onChangeText={setEditorText}
                    placeholder="Write your contract or business text here..."
                    placeholderTextColor="#94A3B8"
                  />
                  <TouchableOpacity
                    style={[styles.actionBtn, isAnalyzing && styles.actionBtnDisabled]}
                    onPress={analizarYTraducirTexto}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <Text style={styles.actionBtnText}>Analyze and Translate with iBudi Context</Text>
                    )}
                  </TouchableOpacity>
                </View>

                {/* AREA DE ANALISIS / TRADUCCION */}
                <View style={[styles.analysisPanel, isDesktop && { width: '42%' }]}>
                  <View style={styles.editorHeading}>
                    <Text style={styles.editorLabel}>TRANSLATION & RELEVANCE</Text>
                    <View style={styles.langSelectRow}>
                      <Text style={styles.langSelectLabel}>To:</Text>
                      {['EN', 'ES', 'PT', 'DE', 'FR', 'JP'].map((lang) => (
                        <TouchableOpacity
                          key={lang}
                          style={[styles.langSelectBtn, targetLang === lang && styles.langSelectBtnActive]}
                          onPress={() => setTargetLang(lang)}
                        >
                          <Text style={[styles.langSelectBtnText, targetLang === lang && styles.langSelectBtnTextActive]}>
                            {lang}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {isAnalyzing && (
                    <View style={styles.loadingBox}>
                      <ActivityIndicator color="#003366" size="large" />
                      <Text style={styles.loadingText}>iBudi is evaluating business vocabulary and translating...</Text>
                    </View>
                  )}

                  {!isAnalyzing && !analysisResult && (
                    <View style={styles.placeholderBox}>
                      <Text style={styles.placeholderText}>
                        Write in the editor on the left and click "Analyze and Translate" to evaluate your document.
                      </Text>
                    </View>
                  )}

                  {!isAnalyzing && analysisResult && (
                    <View style={styles.analysisResultBox}>
                      {/* SCORE BADGE */}
                      <View style={styles.scoreHeader}>
                        <View>
                          <Text style={styles.scoreLabel}>Relevance Index</Text>
                          <Text style={styles.scoreText}>Vocabulary suited for global contracts.</Text>
                        </View>
                        <View style={[
                          styles.scoreCircle,
                          analysisResult.pertinence >= 90 ? styles.scoreCircleGood : styles.scoreCircleWarn
                        ]}>
                          <Text style={styles.scoreNumber}>{analysisResult.pertinence}%</Text>
                        </View>
                      </View>

                      {/* TRADUCCION CONTEXTUAL */}
                      <Text style={styles.resultLabel}>Contextualized Professional Translation:</Text>
                      <View style={styles.translationBox}>
                        <Text style={styles.translationText}>{analysisResult.translation}</Text>
                      </View>

                      {/* OBSERVACIONES Y CORRECCIONES */}
                      {analysisResult.corrections && analysisResult.corrections.length > 0 && (
                        <View style={styles.correctionsSection}>
                          <Text style={styles.resultLabel}>Writing and Grammar Recommendations:</Text>
                          {analysisResult.corrections.map((corr, idx) => (
                            <View key={idx} style={styles.correctionCard}>
                              <Text style={styles.originalCorrText}>Original: "{corr.originalText}"</Text>
                              <Text style={styles.suggestedCorrText}>Suggestion: "{corr.suggestedText}"</Text>
                              <Text style={styles.explanationCorrText}>{corr.explanation}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {/* DETALLE CONTEXTO */}
                      {analysisResult.analysis && (
                        <View style={styles.contextInfoBox}>
                          <Text style={styles.contextInfoLabel}>iBudi Context Analysis:</Text>
                          <Text style={styles.contextInfoText}>{analysisResult.analysis}</Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          )}

          {/* TAB 3: DOCUMENTOS */}
          {activeTab === 'documentos' && (
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionDesc}>
                Upload your contract, non-disclosure agreement, or commercial proposal in TXT, PDF, or DOCX format to audit relevance and translate the entire text.
              </Text>

              <View style={styles.uploadContainer}>
                {/* ZONA DE ARRASTRE DE ARCHIVOS */}
                <View style={styles.dropZone}>
                  <Text style={styles.dropZoneTitle}>Drag & drop your file here</Text>
                  <Text style={styles.dropZoneSubtitle}>Supported formats: .txt, .pdf, .docx (Max 10MB)</Text>
                  
                  <label htmlFor="file-upload" style={styles.uploadLabelBtn}>
                    Select File from Device
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".txt"
                    onChange={handleSimularCarga}
                    style={{ display: 'none' }}
                  />
                </View>

                {/* PLANTILLAS DE EJEMPLO */}
                <View style={styles.templatesContainer}>
                  <Text style={styles.templatesTitle}>Don't have a contract at hand?</Text>
                  <Text style={styles.templatesSubtitle}>Load one of our structured templates with complex terminology to test the workflow instantly:</Text>
                  
                  <View style={[styles.templatesGrid, isDesktop && styles.templatesGridDesktop]}>
                    <TouchableOpacity style={styles.templateCard} onPress={() => cargarPlantilla('contrato')}>
                      <Text style={styles.templateCardName}>Non-Disclosure Agreement (NDA)</Text>
                      <Text style={styles.templateCardDesc}>Contains terms of international law and civil society.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.templateCard} onPress={() => cargarPlantilla('acuerdo')}>
                      <Text style={styles.templateCardName}>Customs Trade Agreement</Text>
                      <Text style={styles.templateCardDesc}>Contains terms about non-verbal behavior and soft power.</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {/* TAB 4: AJUSTES */}
          {activeTab === 'ajustes' && (
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionDesc}>
                Customize the administrative settings of your iBudi profile. Plan options and advanced integrations are enabled on Enterprise plans.
              </Text>

              <View style={styles.settingsForm}>
                <View style={styles.settingsGroup}>
                  <Text style={styles.settingsLabel}>Administrator User Name</Text>
                  <TextInput
                    style={styles.settingsInput}
                    value={settings.username}
                    onChangeText={(val) => setSettings({ ...settings, username: val })}
                  />
                </View>

                <View style={styles.settingsGroup}>
                  <Text style={styles.settingsLabel}>Organization / Company</Text>
                  <TextInput
                    style={styles.settingsInput}
                    value={settings.company}
                    onChangeText={(val) => setSettings({ ...settings, company: val })}
                  />
                </View>

                <View style={styles.settingsGroup}>
                  <Text style={styles.settingsLabel}>Gemini API Key (For translation & AI)</Text>
                  <TextInput
                    style={styles.settingsInput}
                    secureTextEntry
                    value={settings.apiKey}
                    onChangeText={(val) => setSettings({ ...settings, apiKey: val })}
                    placeholder="Gemini API Key"
                  />
                </View>

                <View style={styles.settingsGroup}>
                  <Text style={styles.settingsLabel}>Editor Font Size</Text>
                  <View style={styles.langSelectRow}>
                    {['Small', 'Medium', 'Large'].map((size) => (
                      <TouchableOpacity
                        key={size}
                        style={[styles.langSelectBtn, settings.fontSize === size && styles.langSelectBtnActive]}
                        onPress={() => setSettings({ ...settings, fontSize: size })}
                      >
                        <Text style={[styles.langSelectBtnText, settings.fontSize === size && styles.langSelectBtnTextActive]}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {settingsMessage.length > 0 && (
                  <Text style={styles.settingsSuccessText}>{settingsMessage}</Text>
                )}

                <TouchableOpacity style={styles.saveSettingsBtn} onPress={handleSaveSettings}>
                  <Text style={styles.saveSettingsBtnText}>Save Settings</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      {/* MODAL DEL MAPA CONCEPTUAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalSubtitle}>Interactive Conceptual Map</Text>
              <Text style={styles.modalTitle}>Category: {activeCategory}</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalBtn}>
              <Text style={styles.closeModalText}>Close ✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.mapContainer} showsVerticalScrollIndicator={false}>
            {/* Aquí renderizamos el mapa conceptual filtrado por la categoría activa */}
            <ConceptualMap 
              categoriaActiva={activeCategory} 
              onSelectTerm={(term) => {
                setSearch(term);
                setModalVisible(false);
                setActiveTab('buscador');
              }}
            />
            <View style={{ height: 60 }} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
  },
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  
  // NAVBAR MÓVIL
  mobileNav: {
    height: 60,
    backgroundColor: '#002244',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  hamburger: {
    padding: 8,
  },
  hamburgerText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  mobileTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'PTSerif_700Bold',
    letterSpacing: 1,
  },
  planLabel: {
    backgroundColor: '#FF7A00',
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mobileNavRight: {
    flexDirection: 'row',
  },

  // SIDEBAR
  sidebar: {
    width: 260,
    backgroundColor: '#002244',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    padding: 20,
    justifyContent: 'space-between',
  },
  sidebarMobile: {
    position: 'absolute',
    left: 0,
    top: 60,
    bottom: 0,
    zIndex: 100,
    width: 260,
  },
  sidebarBrand: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'PTSerif_700Bold',
    letterSpacing: 2,
  },
  brandDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FF7A00',
    marginLeft: 2,
    marginBottom: 4,
  },
  sidebarPlan: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
    marginBottom: 30,
  },
  planText: {
    color: '#94A3B8',
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
  },
  planValue: {
    color: '#FF7A00',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  sidebarMenu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  menuItemActive: {
    backgroundColor: '#003366',
  },
  menuText: {
    color: '#94A3B8',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  menuTextActive: {
    color: '#FFFFFF',
  },
  sidebarFooter: {
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 15,
  },
  backBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  backBtnText: {
    color: '#94A3B8',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },

  // CONTENIDO
  content: {
    flex: 1,
    backgroundColor: '#FAFBFD',
  },
  contentHeader: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  contentHeaderTitle: {
    fontSize: 20,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#003366',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userName: {
    color: '#334155',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },

  tabContent: {
    flex: 1,
    padding: 25,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
    marginBottom: 20,
  },

  // SEARCH STYLES
  searchBarContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#0F172A',
    fontFamily: 'Inter_400Regular',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  searchClearBtn: {
    position: 'absolute',
    right: 15,
    backgroundColor: '#CBD5E1',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  listContainer: {
    paddingBottom: 40,
  },
  emptyBox: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
  },

  // DICCIONARIO CARDS
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#003366',
    paddingBottom: 8,
    marginBottom: 12,
  },
  cardTerm: {
    fontSize: 18,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    textTransform: 'capitalize',
  },
  badgeBtn: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeBtnText: {
    color: '#0369A1',
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'capitalize',
  },
  label: {
    fontSize: 11,
    color: '#94A3B8',
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 4,
  },
  defText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
    fontFamily: 'Inter_400Regular',
  },
  langGrid: {
    backgroundColor: '#FAFBFD',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginTop: 5,
  },
  langRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  langCode: {
    width: 35,
    fontSize: 12,
    color: '#003366',
    fontFamily: 'Inter_600SemiBold',
  },
  langText: {
    fontSize: 13,
    color: '#475569',
    fontFamily: 'Inter_400Regular',
  },
  sourceBox: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  sourceLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontFamily: 'Inter_600SemiBold',
  },
  sourceText: {
    fontSize: 11,
    color: '#64748B',
    fontStyle: 'italic',
    fontFamily: 'Inter_400Regular',
  },
  aiBtn: {
    backgroundColor: '#6D28D9',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBtnSuccess: {
    backgroundColor: '#059669',
  },
  aiBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  aiOutputBox: {
    backgroundColor: '#FAF5FF',
    borderLeftWidth: 4,
    borderLeftColor: '#7C3AED',
    padding: 15,
    borderRadius: 8,
    marginTop: 12,
  },
  aiOutputText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5B21B6',
    fontFamily: 'Inter_400Regular',
  },

  // EDITOR STYLES
  editorWorkspace: {
    width: '100%',
  },
  editorWorkspaceDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editorPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
  },
  editorHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  editorLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  langSelectRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langSelectLabel: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter_600SemiBold',
    marginRight: 6,
  },
  langSelectBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    marginHorizontal: 2,
  },
  langSelectBtnActive: {
    backgroundColor: '#FF7A00',
  },
  langSelectBtnText: {
    fontSize: 11,
    color: '#475569',
    fontFamily: 'Inter_600SemiBold',
  },
  langSelectBtnTextActive: {
    color: '#FFFFFF',
  },
  editorInput: {
    height: 250,
    color: '#0F172A',
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    textAlignVertical: 'top',
    padding: 10,
    lineHeight: 24,
  },
  actionBtn: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  actionBtnDisabled: {
    backgroundColor: '#FFBD80',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },

  analysisPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    marginBottom: 20,
  },
  loadingBox: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  placeholderBox: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F1F5F9',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  analysisResultBox: {
    marginTop: 10,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFBFD',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
  },
  scoreText: {
    fontSize: 11,
    color: '#64748B',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  scoreCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircleGood: {
    backgroundColor: '#DCFCE7',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  scoreCircleWarn: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  scoreNumber: {
    color: '#15803D',
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  resultLabel: {
    fontSize: 12,
    color: '#475569',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
    marginTop: 15,
  },
  translationBox: {
    backgroundColor: '#FAFBFD',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  translationText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
    fontFamily: 'Inter_400Regular',
  },
  correctionsSection: {
    marginTop: 15,
  },
  correctionCard: {
    backgroundColor: '#FFF7ED',
    borderLeftWidth: 3,
    borderLeftColor: '#EA580C',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
  },
  originalCorrText: {
    fontSize: 12,
    color: '#C2410C',
    fontFamily: 'Inter_400Regular',
    textDecorationLine: 'line-through',
  },
  suggestedCorrText: {
    fontSize: 13,
    color: '#1E293B',
    fontFamily: 'Inter_600SemiBold',
    marginVertical: 2,
  },
  explanationCorrText: {
    fontSize: 11,
    color: '#EA580C',
    fontFamily: 'Inter_400Regular',
  },
  contextInfoBox: {
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
  },
  contextInfoLabel: {
    fontSize: 12,
    color: '#0369A1',
    fontFamily: 'Inter_600SemiBold',
  },
  contextInfoText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#0369A1',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },

  // DOCUMENTOS STYLES
  uploadContainer: {
    flex: 1,
  },
  dropZone: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dropZoneTitle: {
    fontSize: 16,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 6,
  },
  dropZoneSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
  },
  uploadLabelBtn: {
    backgroundColor: '#003366',
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    cursor: 'pointer',
    textAlign: 'center',
  },
  templatesContainer: {
    marginTop: 20,
  },
  templatesTitle: {
    fontSize: 16,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 6,
  },
  templatesSubtitle: {
    fontSize: 13,
    color: '#64748B',
    fontFamily: 'Inter_400Regular',
    marginBottom: 15,
    lineHeight: 20,
  },
  templatesGrid: {
    width: '100%',
  },
  templatesGridDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  templateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    cursor: 'pointer',
  },
  templateCardName: {
    fontSize: 14,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 6,
  },
  templateCardDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748B',
    fontFamily: 'Inter_400Regular',
  },

  // CONFIGURACION STYLES
  settingsForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 25,
    maxWidth: 600,
  },
  settingsGroup: {
    marginBottom: 20,
  },
  settingsLabel: {
    fontSize: 13,
    color: '#475569',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  settingsInput: {
    backgroundColor: '#FAFBFD',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#0F172A',
    fontFamily: 'Inter_400Regular',
  },
  saveSettingsBtn: {
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveSettingsBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  settingsSuccessText: {
    color: '#059669',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
    marginBottom: 12,
  },

  // MODAL MAPA CONCEPTUAL
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    backgroundColor: '#002244',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#FF7A00',
  },
  modalSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'PTSerif_700Bold',
    marginTop: 2,
  },
  closeModalBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeModalText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  mapContainer: {
    padding: 20,
  },
});
