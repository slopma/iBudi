import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';

export default function LandingPage({ onStartDemo }) {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* NAVBAR */}
      <View style={[styles.navbar, isDesktop && styles.navbarDesktop]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>IBUDI</Text>
          <View style={styles.logoDot} />
        </View>
        
        {isDesktop && (
          <View style={styles.navLinks}>
            <Text style={styles.navLink}>Features</Text>
            <Text style={styles.navLink}>Value Proposition</Text>
            <Text style={styles.navLink}>Plans</Text>
          </View>
        )}

        <TouchableOpacity style={styles.navbarBtn} onPress={onStartDemo}>
          <Text style={styles.navbarBtnText}>Try Demo</Text>
        </TouchableOpacity>
      </View>

      {/* HERO SECTION */}
      <View style={[styles.heroSection, isDesktop && styles.heroSectionDesktop]}>
        <View style={[styles.heroContent, isDesktop && { width: '50%', paddingRight: 40 }]}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>MVP Functional Demo</Text>
          </View>
          <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
            International Business Translation Without Context Loss
          </Text>
          <Text style={styles.heroSubtitle}>
            Common translators translate word-for-word, losing the actual meaning. 
            iBudi analyzes your contracts and business documents to ensure an exact contextual translation, 
            showing terminology relevance across 6 commercial languages.
          </Text>

          <View style={styles.heroBtnGroup}>
            <TouchableOpacity style={styles.heroBtnPrimary} onPress={onStartDemo}>
              <Text style={styles.heroBtnPrimaryText}>Start Free Demo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HERO VISUAL MOCKUP */}
        <View style={[styles.heroVisual, isDesktop ? { width: '50%' } : { width: '100%', marginTop: 40 }]}>
          <View style={styles.mockupContainer}>
            <View style={styles.mockupHeader}>
              <View style={styles.mockupDots}>
                <View style={[styles.mockupDot, { backgroundColor: '#FF5F56' }]} />
                <View style={[styles.mockupDot, { backgroundColor: '#FFBD2E' }]} />
                <View style={[styles.mockupDot, { backgroundColor: '#27C93F' }]} />
              </View>
              <Text style={styles.mockupTitle}>ibudi_assistant_workspace.exe</Text>
            </View>
            <View style={styles.mockupBody}>
              <Text style={styles.mockupLabel}>ORIGINAL DOCUMENT (Spanish)</Text>
              <Text style={styles.mockupText}>
                El contrato se rige bajo las normas del <Text style={styles.highlightWord}>derecho internacional</Text> y la <Text style={styles.highlightWord}>sociedad civil</Text>...
              </Text>
              <View style={styles.mockupAnalysis}>
                <Text style={styles.analysisTitle}>iBudi Recommendation (English)</Text>
                <Text style={styles.analysisText}>
                  "The contract is governed under the rules of <Text style={styles.correctWord}>international law</Text> and <Text style={styles.correctWord}>civil society</Text>."
                </Text>
                <View style={styles.metricsRow}>
                  <View style={styles.metricBadge}>
                    <Text style={styles.metricBadgeText}>Business Relevance: 98%</Text>
                  </View>
                  <View style={[styles.metricBadge, { backgroundColor: '#E0F2FE' }]}>
                    <Text style={[styles.metricBadgeText, { color: '#0369A1' }]}>Context: Legal / Corporate</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* VALUE PROPOSITION */}
      <View style={styles.valueSection}>
        <Text style={styles.sectionTitle}>Why iBudi?</Text>
        <Text style={styles.sectionSubtitle}>
          Designed to mitigate million-dollar losses and ensure successful international negotiations.
        </Text>

        <View style={[styles.gridContainer, isDesktop && styles.gridContainerDesktop]}>
          <View style={[styles.card, isDesktop && styles.cardDesktop]}>
            <Text style={styles.cardTitle}>Context Preservation</Text>
            <Text style={styles.cardDescription}>
              Understands the legal, financial, and commercial background of each term, avoiding incorrect literal translations.
            </Text>
          </View>

          <View style={[styles.card, isDesktop && styles.cardDesktop]}>
            <Text style={styles.cardTitle}>Multilingual Dictionary</Text>
            <Text style={styles.cardDescription}>
              Access to the exact contextual equivalence of business concepts in Spanish, English, German, French, Japanese, and Portuguese.
            </Text>
          </View>

          <View style={[styles.card, isDesktop && styles.cardDesktop]}>
            <Text style={styles.cardTitle}>Terminological Relevance</Text>
            <Text style={styles.cardDescription}>
              A unique metric system that evaluates and scores the percentage of adequacy and accuracy of the technical vocabulary used.
            </Text>
          </View>
        </View>
      </View>

      {/* SUBSCRIPTION PLANS */}
      <View style={styles.plansSection}>
        <Text style={styles.sectionTitle}>Plans for Every Need</Text>
        <Text style={styles.sectionSubtitle}>
          Choose the level of support your business requires. (All plans focus on business value).
        </Text>

        <View style={[styles.plansGrid, isDesktop && styles.plansGridDesktop]}>
          {/* PLAN FREE (DEMO ACTIVE) */}
          <View style={[styles.planCard, styles.planCardActive, isDesktop && styles.planCardDesktop]}>
            <View style={styles.activePlanBadge}>
              <Text style={styles.activePlanBadgeText}>DEMO PLAN</Text>
            </View>
            <Text style={styles.planName}>Free</Text>
            <Text style={styles.planDesc}>Ideal for exploring the iBudi ecosystem and testing basic search functions.</Text>
            <View style={styles.divider} />
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Business term search engine</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Basic translations to 6 languages</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Workspace with integrated AI analysis</Text>
            </View>
            <TouchableOpacity style={[styles.planBtn, styles.planBtnActive]} onPress={onStartDemo}>
              <Text style={[styles.planBtnText, styles.planBtnTextActive]}>Start Free Demo</Text>
            </TouchableOpacity>
          </View>

          {/* PLAN SINGLE */}
          <View style={[styles.planCard, isDesktop && styles.planCardDesktop]}>
            <Text style={styles.planName}>Single</Text>
            <Text style={styles.planDesc}>For independent translators and international trade professionals.</Text>
            <View style={styles.divider} />
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Everything in the Free Plan</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Unlimited deep AI analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Advanced writing suggestions</Text>
            </View>
            <TouchableOpacity style={styles.planBtn} onPress={onStartDemo}>
              <Text style={styles.planBtnText}>Choose Plan</Text>
            </TouchableOpacity>
          </View>

          {/* PLAN PROFESSIONAL */}
          <View style={[styles.planCard, isDesktop && styles.planCardDesktop]}>
            <Text style={styles.planName}>Professional</Text>
            <Text style={styles.planDesc}>For law firms and mid-sized international business agencies.</Text>
            <View style={styles.divider} />
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Everything in the Single Plan</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Bulk contract uploading</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Real-time collaboration</Text>
            </View>
            <TouchableOpacity style={styles.planBtn} onPress={onStartDemo}>
              <Text style={styles.planBtnText}>Choose Plan</Text>
            </TouchableOpacity>
          </View>

          {/* PLAN ENTERPRISE */}
          <View style={[styles.planCard, isDesktop && styles.planCardDesktop]}>
            <Text style={styles.planName}>Enterprise</Text>
            <Text style={styles.planDesc}>For multinational corporations requiring large-scale integrations.</Text>
            <View style={styles.divider} />
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Everything in the Professional Plan</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>System keyboard integration</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>Dedicated API and priority support</Text>
            </View>
            <TouchableOpacity style={styles.planBtn} onPress={onStartDemo}>
              <Text style={styles.planBtnText}>Choose Plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 iBudi. International Business Value Proposition and MVP. Developed with excellence.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  navbarDesktop: {
    paddingHorizontal: 80,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  logoText: {
    fontSize: 24,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    letterSpacing: 2,
  },
  logoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF7A00',
    marginLeft: 3,
    marginBottom: 5,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginHorizontal: 20,
    fontSize: 15,
    color: '#475569',
    fontFamily: 'Inter_600SemiBold',
    cursor: 'pointer',
  },
  navbarBtn: {
    backgroundColor: '#003366',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  navbarBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },

  // HERO
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#FAFBFD',
    alignItems: 'center',
  },
  heroSectionDesktop: {
    paddingHorizontal: 80,
    paddingVertical: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FFEDD5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#EA580C',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 40,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 20,
  },
  heroTitleDesktop: {
    fontSize: 48,
    lineHeight: 56,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 26,
    color: '#475569',
    fontFamily: 'Inter_400Regular',
    marginBottom: 35,
  },
  heroBtnGroup: {
    flexDirection: 'row',
    width: '100%',
  },
  heroBtnPrimary: {
    backgroundColor: '#FF7A00',
    paddingHorizontal: 25,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  heroBtnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },

  // VISUAL MOCKUP
  heroVisual: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockupContainer: {
    backgroundColor: '#0F172A',
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  mockupHeader: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  mockupDots: {
    flexDirection: 'row',
    marginRight: 15,
  },
  mockupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  mockupTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  mockupBody: {
    padding: 20,
  },
  mockupLabel: {
    color: '#64748B',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  mockupText: {
    color: '#E2E8F0',
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
  },
  highlightWord: {
    color: '#F97316',
    textDecorationLine: 'underline',
    fontFamily: 'Inter_600SemiBold',
  },
  mockupAnalysis: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#F97316',
  },
  analysisTitle: {
    color: '#F97316',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  analysisText: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  correctWord: {
    color: '#38BDF8',
    fontFamily: 'Inter_600SemiBold',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  metricBadgeText: {
    fontSize: 11,
    color: '#C2410C',
    fontFamily: 'Inter_600SemiBold',
  },

  // VALUE PROP
  valueSection: {
    paddingHorizontal: 20,
    paddingVertical: 80,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 28,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    maxWidth: 600,
    marginBottom: 50,
  },
  gridContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  gridContainerDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardDesktop: {
    width: '31%',
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 18,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#64748B',
    fontFamily: 'Inter_400Regular',
  },

  // PLANS
  plansSection: {
    paddingHorizontal: 20,
    paddingVertical: 80,
    backgroundColor: '#FAFBFD',
    alignItems: 'center',
  },
  plansGrid: {
    width: '100%',
    paddingHorizontal: 10,
  },
  plansGridDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    flexWrap: 'wrap',
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 30,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
  },
  planCardDesktop: {
    width: '23%',
    marginBottom: 0,
  },
  planCardActive: {
    borderColor: '#FF7A00',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  activePlanBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#FF7A00',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activePlanBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  planName: {
    fontSize: 22,
    color: '#002244',
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 10,
    marginTop: 5,
  },
  planDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
    fontFamily: 'Inter_400Regular',
    height: 60,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  featureCheck: {
    color: '#27C93F',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: '#475569',
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  planBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  planBtnActive: {
    backgroundColor: '#FF7A00',
  },
  planBtnText: {
    color: '#475569',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  planBtnTextActive: {
    color: '#FFFFFF',
  },

  // FOOTER
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#002244',
    alignItems: 'center',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
