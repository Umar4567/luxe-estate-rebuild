import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, Clock, Phone, Mail, MapPin } from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: Array<{ label: string; id: string }>;
  timestamp: Date;
}

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: '👋 Welcome to Luxe Estate Support! I\'m your AI Assistant.',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'bot',
      text: 'Adarsh Group - A name synonymous with quality and trust since its inception has built its reputation brick by brick, not just meeting expectations, but far exceeding them. Building beautiful homes that are nestled in natural surroundings yet a stone\'s throw away from the hustle-bustle of the city is a dream we have been realizing for over three decades.',
      timestamp: new Date(),
    },
    {
      id: '3',
      type: 'bot',
      text: 'May I know if you are looking for?',
      options: [
        { label: '🏠 Property for purchase', id: 'property_purchase' },
        { label: '❓ Generic Queries', id: 'generic_queries' },
        { label: '📚 FAQ & Tips', id: 'faq_tips' },
        { label: '💡 Investment Insights', id: 'investment_insights' },
        { label: '🏦 Financing Options', id: 'financing_options' },
        { label: '🎯 Find Perfect Home', id: 'find_home' },
        { label: '📅 Schedule a Tour', id: 'schedule_tour' },
        { label: '❓ Customer Q&A', id: 'customer_qa' },
        { label: '🤝 Vendor/Joint Ventures', id: 'vendor_ventures' },
        { label: '💼 Career', id: 'career' },
        { label: '📋 More Info', id: 'more_info' },
      ],
      timestamp: new Date(),
    },
  ]);

  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (optionId: string, optionLabel: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: optionLabel,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botReply = '';
      let botOptions: Array<{ label: string; id: string }> | undefined;

      switch (optionId) {
        case 'property_purchase':
          botReply = '🏠 Great! You\'re interested in purchasing a property.\n\nWe offer:\n• Luxury Villas\n• Modern Penthouses\n• Oceanfront Estates\n• Premium Condos\n\nWould you like to:';
          botOptions = [
            { label: '🔍 Browse Properties', id: 'browse_properties' },
            { label: '💰 Check Pricing', id: 'check_pricing' },
            { label: '📞 Talk to Agent', id: 'talk_to_agent' },
          ];
          break;

        case 'generic_queries':
          botReply = '❓ We\'re happy to help! Popular questions:\n\n• What are your payment plans?\n• What amenities are included?\n• How far from the city center?\n• What\'s the current availability?\n\nOr ask your custom question below:';
          break;

        case 'faq_tips':
          botReply = '📚 FAQ & Real Estate Tips\n\nSelect a topic:';
          botOptions = [
            { label: '❓ How to get pre-approved?', id: 'faq_preapproval' },
            { label: '🏡 First-time buyer guide', id: 'faq_firsttime' },
            { label: '📊 What\'s included in price?', id: 'faq_included' },
            { label: '💡 Investment tips', id: 'faq_tips_invest' },
          ];
          break;

        case 'faq_preapproval':
          botReply = '✅ How to Get Pre-Approved:\n\n1. Check your credit score (700+ ideal)\n2. Gather financial documents (bank statements, tax returns)\n3. Submit application to our lenders\n4. Property appraisal conducted\n5. Receive pre-approval letter\n\n⏱️ Process: 3-5 business days\n\n📞 Call our finance team for guidance!';
          break;

        case 'faq_firsttime':
          botReply = '🏡 First-Time Buyer Guide:\n\n✨ 6 Steps to Success:\n1. Get pre-approved for a mortgage\n2. Browse properties within budget\n3. Schedule property tours\n4. Make an offer\n5. Home inspection & appraisal\n6. Final walkthrough & closing\n\n💰 Budget: Calculate 20% down payment + closing costs\n📋 Timeline: Usually 30-45 days from offer to closing\n\nWe guide you every step!';
          break;

        case 'faq_included':
          botReply = '📋 What\'s Included in Price:\n\n✅ Property & Land\n✅ All Fixtures & Fittings\n✅ Smart Home Systems\n✅ Parking Spaces\n✅ Premium Finishes\n✅ Warranty (1-2 years)\n\n❌ Typically NOT Included:\n• Furniture (unless specified)\n• Personal items\n• Some appliances\n\nCustomization available! Ask about add-ons.';
          break;

        case 'faq_tips_invest':
          botReply = '💡 Real Estate Investment Tips:\n\n1️⃣ Location > Size (prime locations appreciate faster)\n2️⃣ Buy for cash flow (rent potential for investors)\n3️⃣ Research market trends (growth areas)\n4️⃣ Diversify portfolio (mix property types)\n5️⃣ Consider rental yield (typical: 4-8%)\n6️⃣ Plan exit strategy (resale vs. hold)\n\n📊 Our properties: Avg. 6-7% annual appreciation\n\nWant investment analysis?';
          break;

        case 'investment_insights':
          botReply = '💡 Investment Insights\n\nExplore key metrics:';
          botOptions = [
            { label: '📈 Expected ROI', id: 'invest_roi' },
            { label: '🏠 Rental yield info', id: 'invest_yield' },
            { label: '📊 Market trends', id: 'invest_trends' },
            { label: '🎯 Best investment areas', id: 'invest_areas' },
          ];
          break;

        case 'invest_roi':
          botReply = '📈 Expected Return on Investment (ROI):\n\n🏖️ Oceanfront Estate\nInitial: $22.8M → 5 Years: $28.5M (25% ROI)\n\n🏢 Penthouse Suite\nInitial: $15.2M → 5 Years: $18.6M (22% ROI)\n\n🏔️ Mountain Villa\nInitial: $12.5M → 5 Years: $15.2M (22% ROI)\n\n📊 Average Market Growth: 5-7% annually\n\nNote: Past performance ≠ guaranteed future results\nConsult financial advisor for personalized projections!';
          break;

        case 'invest_yield':
          botReply = '🏠 Rental Yield Information:\n\n💰 Average Rental Yield: 4-8% per annum\n\nExample (Penthouse Suite - $15.2M):\n• Annual Rent: $600,000-$800,000\n• Monthly Rent: $50,000-$67,000\n• Yield: ~4.7%\n\n✅ High-demand locations guarantee occupancy\n✅ Professional management available\n✅ Annual rent increases: 2-3%\n\n📞 Property management service: 8-10% of rent\n\nInterested in rental program?';
          break;

        case 'invest_trends':
          botReply = '📊 Current Market Trends (2024):\n\n📈 Growth Markets:\n• Beverly Hills: +7.2% YoY\n• Manhattan: +5.8% YoY\n• Malibu: +6.5% YoY\n• Miami: +8.1% YoY\n\n🔍 Market Drivers:\n✅ Low interest rates\n✅ High demand for luxury\n✅ Limited supply\n✅ Strong buyer demographics\n\n⚠️ Forecast: Stable-to-bullish through 2025\n\nWant property-specific analysis?';
          break;

        case 'invest_areas':
          botReply = '🎯 Best Investment Areas (Currently):\n\n🥇 TIER 1 (Highest Growth):\n• Miami, FL (+8.1% annually)\n• Aspen, CO (+7.5% annually)\n\n🥈 TIER 2 (Strong Performance):\n• Beverly Hills, CA (+7.2%)\n• Malibu, CA (+6.5%)\n\n🥉 TIER 3 (Steady Growth):\n• Manhattan, NY (+5.8%)\n• Boston, MA (+5.2%)\n\n💡 Best for: Luxury + Growth + Strong Rental Demand\n\nSchedule investor consultation?';
          break;

        case 'financing_options':
          botReply = '🏦 Financing Options\n\nChoose your financing path:';
          botOptions = [
            { label: '📋 Mortgage programs', id: 'financing_mortgage' },
            { label: '💳 Payment plans', id: 'financing_plans' },
            { label: '📊 Interest rates', id: 'financing_rates' },
            { label: '✅ Eligibility requirements', id: 'financing_eligibility' },
          ];
          break;

        case 'financing_mortgage':
          botReply = '📋 Mortgage Programs Available:\n\n1️⃣ Fixed-Rate (15/20/30 years)\n✅ Stable monthly payments\n✅ Predictable over time\n💰 Rates: 6.5-7.5% (market dependent)\n\n2️⃣ Adjustable-Rate (ARM)\n✅ Lower initial rates\n✅ Adjusts after 5/7 years\n💰 Rates: 5.8-6.8% initially\n\n3️⃣ Interest-Only Option\n✅ Pay only interest (5-10 years)\n✅ Lower monthly payments initially\n💰 Then convert to principal + interest\n\n4️⃣ Jumbo Loans (>$1M)\n✅ Customized terms\n✅ Specialized lender partnerships\n\n📞 Get pre-approval: 48-72 hours!';
          break;

        case 'financing_plans':
          botReply = '💳 Flexible Payment Plans:\n\n📅 PLAN A: 50/50 Split\n• 50% down payment at signing\n• 50% on possession\n• Duration: Flexible\n\n📅 PLAN B: Staged Payment\n• 30% booking\n• 35% mid-construction\n• 35% on completion\n• Duration: 18-24 months\n\n📅 PLAN C: Post-Possession\n• 40% at booking\n• 60% after 6 months possession\n• Zero interest if paid on time\n\n📅 PLAN D: Custom\n• Tailor to your cash flow\n• Special rates for bulk purchases\n\n💰 Special: 5% discount for full upfront payment!\n\nWhich suits you best?';
          break;

        case 'financing_rates':
          botReply = '📊 Current Interest Rates (2024):\n\n🏦 Our Partner Lenders:\n\n30-Year Fixed:\n💰 6.5-7.0% (Tier 1 credit)\n💰 7.0-7.5% (Tier 2 credit)\n\n15-Year Fixed:\n💰 6.0-6.5% (Tier 1 credit)\n💰 6.5-7.0% (Tier 2 credit)\n\n7/1 ARM:\n💰 5.8-6.2% (Tier 1 credit)\n💰 6.2-6.8% (Tier 2 credit)\n\n📈 Rates Updated: Weekly\n✅ Lock rates for 60 days\n\n💡 Higher down payment = Lower rate\n📞 Get personalized quote in 24 hours!';
          break;

        case 'financing_eligibility':
          botReply = '✅ Financing Eligibility Requirements:\n\n📋 Basic Criteria:\n✅ Credit Score: 700+ (620 minimum)\n✅ Debt-to-Income: <43% (43-50% with strong reserves)\n✅ Employment: 2+ years stable history\n✅ Savings: 2-6 months mortgage reserves\n\n💼 For Self-Employed/Business Owners:\n✅ Tax returns: 2 years\n✅ Business financials: Verified\n✅ Higher down payment may be required\n\n📊 For Investors:\n✅ Strong cash reserves (6-12 months)\n✅ Rental history documentation\n✅ Portfolio verification\n✅ Down payment: 25-30% minimum\n\n📞 Unsure? Schedule free consultation!\n✅ We help optimize your financial profile!';
          break;

        case 'find_home':
          botReply = '🎯 Find Your Perfect Home - Quick Quiz\n\nLet\'s narrow down your ideal property!';
          botOptions = [
            { label: '💰 What\'s your budget?', id: 'quiz_budget' },
            { label: '📍 Preferred location?', id: 'quiz_location' },
            { label: '🏠 Property type?', id: 'quiz_type' },
          ];
          break;

        case 'quiz_budget':
          botReply = '💰 Budget Range:\n\nSelect your price range:';
          botOptions = [
            { label: '💵 $3M - $8M', id: 'budget_3_8' },
            { label: '💵 $8M - $15M', id: 'budget_8_15' },
            { label: '💵 $15M - $25M', id: 'budget_15_25' },
            { label: '💵 $25M+', id: 'budget_25plus' },
          ];
          break;

        case 'budget_3_8':
          botReply = '✅ Budget: $3M - $8M\n\n🎯 Recommended Properties:\n\n🏙️ Luxury Condo ($3.2M)\n📍 Prime location, modern amenities\n🛏️ 3 beds | 2.5 baths\n\n🏛️ Modern Villa ($8.5M)\n📍 Contemporary design, smart home\n🛏️ 5 beds | 4 baths\n\n📞 Ready to view? Call our agents!\n☎️ +1-555-123-4567';
          break;

        case 'budget_8_15':
          botReply = '✅ Budget: $8M - $15M\n\n🎯 Recommended Properties:\n\n🏔️ Mountain Villa ($12.5M)\n📍 Stunning views, luxury finishes\n🛏️ 6 beds | 5 baths\n\n🏢 Penthouse Suite ($15.2M)\n📍 Skyline views, premium amenities\n🛏️ 4 beds | 3.5 baths\n\n📞 Schedule private viewing!\n☎️ +1-555-123-4567';
          break;

        case 'budget_15_25':
          botReply = '✅ Budget: $15M - $25M\n\n🎯 Recommended Properties:\n\n🏖️ Oceanfront Estate ($22.8M)\n📍 Beachfront, ultimate luxury\n🛏️ 8 beds | 7 baths\n\nNote: Our premium properties in this range are typically custom showcased.\n\n📞 Get exclusive viewings!\n☎️ +1-555-123-4567';
          break;

        case 'budget_25plus':
          botReply = '💎 Budget: $25M+\n\n🎯 Ultra-Luxury Portfolio\n\nWe have exclusive off-market properties in this range, including:\n\n✨ Custom developments\n✨ Trophy assets\n✨ Investment portfolios\n✨ Bespoke luxury experiences\n\n📞 Exclusive Concierge Service\n☎️ VIP Line: +1-555-999-8888\n📧 vip@luxeestates.com\n💬 WhatsApp Priority: Available 24/7';
          break;

        case 'quiz_location':
          botReply = '📍 Preferred Location:\n\nWhere would you like to invest?';
          botOptions = [
            { label: '🌴 Miami, Florida', id: 'loc_miami' },
            { label: '🏔️ Aspen, Colorado', id: 'loc_aspen' },
            { label: '🌆 Beverly Hills, California', id: 'loc_beverly' },
            { label: '🌊 Malibu, California', id: 'loc_malibu' },
            { label: '🗽 Manhattan, New York', id: 'loc_manhattan' },
            { label: '🇺🇸 Boston, Massachusetts', id: 'loc_boston' },
          ];
          break;

        case 'loc_miami':
          botReply = '🌴 Miami, Florida - The Ultimate Destination\n\n📊 Market Insights:\n✅ Fastest growing: +8.1% annually\n✅ Strong rental demand (6-8% yield)\n✅ Perfect for investors & luxury buyers\n✅ Year-round climate\n\n🏠 Available Properties:\n• Luxury Condo: $3.2M\n• Modern Villa: $8.5M\n• Premium Penthouse: $15.2M\n\n☀️ Why Miami?\n• Tax advantages\n• International appeal\n• Growing luxury market\n\n📞 Miami specialist: +1-555-123-4567';
          break;

        case 'loc_aspen':
          botReply = '🏔️ Aspen, Colorado - Mountain Luxury Paradise\n\n📊 Market Insights:\n✅ Exclusive mountain destination: +7.5% growth\n✅ Premium rental market (summer & winter)\n✅ World-class amenities & lifestyle\n✅ Perfect for high-net-worth individuals\n\n🏠 Available Properties:\n• Mountain Villa: $12.5M\n• Luxury Estate: Custom options\n\n❄️ Why Aspen?\n• World-class skiing\n• Cultural hub\n• Elite community\n• Strong investment potential\n\n📞 Mountain property expert: +1-555-123-4567';
          break;

        case 'loc_beverly':
          botReply = '🌆 Beverly Hills, California - Hollywood\'s Crown Jewel\n\n📊 Market Insights:\n✅ Iconic luxury market: +7.2% growth\n✅ Strong appreciation potential\n✅ Celebrity & mogul enclave\n✅ Steady 4-6% rental yield\n\n🏠 Available Properties:\n• Modern Villa: $8.5M\n• Premium Penthouse: $15.2M\n\n💎 Why Beverly Hills?\n• Most prestigious address\n• Top schools & shopping\n• Security & privacy\n• Best-in-class amenities\n\n📞 Beverly Hills specialist: +1-555-123-4567';
          break;

        case 'loc_malibu':
          botReply = '🌊 Malibu, California - Beachfront Paradise\n\n📊 Market Insights:\n✅ Coastal luxury: +6.5% growth\n✅ Limited supply increases value\n✅ High tourism rental demand\n✅ 5-7% annual yield\n\n🏠 Available Properties:\n• Oceanfront Estate: $22.8M\n• Beach Villa: $12.5M+\n\n🏖️ Why Malibu?\n• Pristine beaches\n• Privacy & exclusivity\n• Hollywood connections\n• Environmental beauty\n\n📞 Coastal property expert: +1-555-123-4567';
          break;

        case 'loc_manhattan':
          botReply = '🗽 Manhattan, New York - The City That Never Sleeps\n\n📊 Market Insights:\n✅ Steady growth: +5.8% annually\n✅ Global business hub\n✅ Strong rental market (4-6% yield)\n✅ Timeless investment\n\n🏠 Available Properties:\n• Luxury Penthouse: $15.2M+\n• Premium Condo: $3.2M+\n\n🏙️ Why Manhattan?\n• Financial capital\n• World-class dining & culture\n• Unmatched walkability\n• Strong international demand\n\n📞 NYC specialist: +1-555-123-4567';
          break;

        case 'loc_boston':
          botReply = '🇺🇸 Boston, Massachusetts - Historic Luxury Meets Innovation\n\n📊 Market Insights:\n✅ Growing market: +5.2% annually\n✅ Tech hub prosperity\n✅ Strong institutional foundation\n✅ 4-5% rental yield\n\n🏠 Available Properties:\n• Modern Villa: $8.5M+\n• Premium Penthouse: $15.2M+\n\n🎓 Why Boston?\n• Prestigious universities\n• Thriving tech scene\n• Rich history & culture\n• Excellent schools\n\n📞 Boston property team: +1-555-123-4567';
          break;

        case 'quiz_type':
          botReply = '🏠 Property Type Preference:\n\nWhat\'s your ideal property?';
          botOptions = [
            { label: '🏖️ Oceanfront/Beachfront', id: 'type_ocean' },
            { label: '🏔️ Mountain/Resort', id: 'type_mountain' },
            { label: '🏢 Urban/Penthouse', id: 'type_urban' },
            { label: '🏡 Villa/Estate', id: 'type_villa' },
            { label: '🏙️ Downtown Luxury Condo', id: 'type_condo' },
          ];
          break;

        case 'type_ocean':
          botReply = '🏖️ Oceanfront Properties - Lifestyle & Investment\n\n✨ Premium Features:\n✅ Direct beachfront access\n✅ Sunset views (premium value)\n✅ Water sports amenities\n✅ Privacy gates & security\n✅ High rental potential\n\n💰 Our Oceanfront Gem:\n🏖️ Oceanfront Estate: $22.8M\n📍 Malibu, California\n🛏️ 8 beds | 7 baths | Ocean views\n\n📈 Investment Potential:\n• Strong appreciation\n• Premium rental rates ($50K+/month)\n• Lifestyle & financial gains\n\n📞 Schedule private tour!\n☎️ +1-555-123-4567';
          break;

        case 'type_mountain':
          botReply = '🏔️ Mountain Properties - Serenity & Prestige\n\n✨ Premium Features:\n✅ Panoramic views\n✅ Private trails & nature\n✅ Ski access (Aspen)\n✅ Air quality & tranquility\n✅ Exclusive communities\n\n💰 Our Mountain Treasures:\n🏔️ Mountain Villa: $12.5M\n📍 Aspen, Colorado\n🛏️ 6 beds | 5 baths | Alpine luxury\n\n📈 Investment Potential:\n• Seasonal rental premium\n• Resort town appreciation\n• Lifestyle value unmatched\n\n📞 Mountain specialist!\n☎️ +1-555-123-4567';
          break;

        case 'type_urban':
          botReply = '🏢 Urban Penthouse - City Sophistication\n\n✨ Premium Features:\n✅ Skyline/city views\n✅ Walking distance to everything\n✅ 24/7 concierge services\n✅ Building amenities (pool, gym)\n✅ Urban investment appeal\n\n💰 Our Urban Palaces:\n🏢 Penthouse Suite: $15.2M\n📍 Manhattan, New York\n🛏️ 4 beds | 3.5 baths | Skyline views\n\n📈 Investment Potential:\n• Consistent appreciation\n• Strong short-term rentals\n• Urban lifestyle premium\n\n📞 NYC luxury specialist!\n☎️ +1-555-123-4567';
          break;

        case 'type_villa':
          botReply = '🏡 Villa/Estate - Space & Elegance\n\n✨ Premium Features:\n✅ Land ownership (privacy)\n✅ Custom architecture\n✅ Multiple living spaces\n✅ Entertainment venues\n✅ Investment & lifestyle blend\n\n💰 Our Villa Collections:\n🏛️ Modern Villa: $8.5M\n🏔️ Mountain Villa: $12.5M\n📍 Various locations\n🛏️ 5-6 beds | Premium finishes\n\n📈 Investment Potential:\n• Land appreciation\n• Generational asset\n• Family compound potential\n\n📞 Villa specialist team!\n☎️ +1-555-123-4567';
          break;

        case 'type_condo':
          botReply = '🏙️ Luxury Condo - Urban Convenience\n\n✨ Premium Features:\n✅ Low maintenance\n✅ Prime locations\n✅ Community amenities\n✅ Entry-level luxury\n✅ Investment potential\n\n💰 Our Condo Masterpiece:\n🏙️ Luxury Condo: $3.2M\n📍 Prime Location\n🛏️ 3 beds | 2.5 baths | Modern design\n\n📈 Investment Potential:\n• Easier entry price\n• Strong rental market\n• Urban growth areas\n• Appreciation potential\n\n📞 Condo investment expert!\n☎️ +1-555-123-4567';
          break;

        case 'schedule_tour':
          botReply = '📅 Schedule Your Private Viewing\n\nWe offer exclusive property tours:\n\n✅ 1-on-1 private viewings\n✅ Virtual tours available\n✅ Custom time slots\n✅ Personalized consultation\n\n📞 Contact our tour specialists:\n\n☎️ Phone: +1-555-123-4567\n📧 Email: tours@luxeestates.com\n💬 WhatsApp: Click to chat\n📅 Website: luxeestates.com/schedule\n\n💡 Best times: 10 AM - 4 PM (EST)\n\nWhat property interests you most?';
          break;

        case 'customer_qa':
          botReply = '❓ Real Customer Questions & Answers\n\nLearn from actual buyer experiences:';
          botOptions = [
            { label: 'Q: How long is closing process?', id: 'qa_closing_time' },
            { label: 'Q: Can I negotiate the price?', id: 'qa_negotiate' },
            { label: 'Q: What about property taxes?', id: 'qa_taxes' },
            { label: 'Q: Is inspection mandatory?', id: 'qa_inspection' },
            { label: 'Q: How is rental income handled?', id: 'qa_rental' },
            { label: 'Q: What if I need to sell quickly?', id: 'qa_quick_sell' },
          ];
          break;

        case 'qa_closing_time':
          botReply = '❓ CUSTOMER QUESTION:\n"How long does the closing process typically take?"\n\n✅ ANSWER FROM OUR EXPERTS:\n\n📅 Timeline Breakdown:\n\n🔵 Average Closing: 30-45 days\n\n📋 Process Steps (Timeline):\n• Week 1: Offer accepted & inspection period\n• Week 2-3: Appraisal conducted\n• Week 3-4: Underwriting review\n• Week 4-5: Title search completed\n• Week 5-6: Final walk-through & closing\n\n⚡ EXPRESS CLOSING (With us):\n• Cash buyers: 10-15 days\n• Pre-approved buyers: 20-25 days\n• Standard buyers: 30-45 days\n\n💡 HOW WE HELP:\n✅ Dedicated closing coordinator\n✅ Expedited underwriting\n✅ Clear communication at each step\n✅ Prepared closing documents\n\n💰 COSTS TO EXPECT:\n• Closing costs: 2-5% of purchase price\n• Included: legal fees, appraisal, title insurance\n\n📞 Questions? Call our closing team: +1-555-123-4567';
          break;

        case 'qa_negotiate':
          botReply = '❓ CUSTOMER QUESTION:\n"Can I negotiate the listed price?"\n\n✅ ANSWER FROM OUR EXPERTS:\n\n🤝 YES - Price Negotiation is COMMON!\n\n📊 NEGOTIATION SCENARIOS:\n\n1️⃣ NEW MARKET CONDITIONS:\n✅ Property on market 60+ days → negotiate\n✅ Multiple similar properties available → leverage\n✅ Buyer\'s market (many homes) → negotiate\n\n2️⃣ INSPECTION FINDINGS:\n✅ Major repairs needed → 5-10% reduction\n✅ Cosmetic issues → 2-3% reduction\n✅ System updates required → negotiate items\n\n3️⃣ MARKET POSITION:\n✅ Luxury market: 5-15% negotiable\n✅ Off-season buys: 5-10% discount possible\n✅ Portfolio deals: 10-20% negotiable\n\n💡 REAL EXAMPLE:\nCustomer Sarah negotiated $1.2M off a $15M penthouse!\n✅ Reason: Inspector found HVAC upgrades needed\n✅ Result: 8% savings on purchase\n\n📞 OUR NEGOTIATION STRATEGY:\n✅ Market analysis & comps research\n✅ Strategic offer positioning\n✅ Professional negotiators\n✅ Maximize buyer position\n\n🎯 TYPICAL OUTCOMES:\n• 3-8% price reduction achieved\n• Additional incentives negotiated\n• Terms favorable to buyers\n\n📞 Want negotiation help? Call: +1-555-123-4567';
          break;

        case 'qa_taxes':
          botReply = '❓ CUSTOMER QUESTION:\n"How much are property taxes and ongoing costs?"\n\n✅ ANSWER FROM OUR EXPERTS:\n\n💰 PROPERTY TAX BREAKDOWN BY LOCATION:\n\n📍 Miami, Florida:\n✅ Tax Rate: 0.83% annually\n✅ Example: $3M property = $24,900/year\n✅ Homestead exemption available: Save $50K+\n\n📍 Beverly Hills, California:\n✅ Tax Rate: 0.76% annually\n✅ Example: $15M property = $114,000/year\n✅ Prop 13 benefits long-term owners\n\n📍 New York (Manhattan):\n✅ Tax Rate: 0.85% annually\n✅ Example: $15M property = $127,500/year\n✅ Additional city taxes apply\n\n📍 Colorado (Aspen):\n✅ Tax Rate: 0.51% annually\n✅ Example: $12M property = $61,200/year\n✅ Most affordable option!\n\n💸 OTHER ANNUAL COSTS:\n🏠 HOA/Maintenance: $200-500/month\n🔒 Security/Insurance: $100-300/month\n🌳 Landscaping/Upkeep: $150-400/month\n⚡ Utilities: $300-800/month\n\n📊 TOTAL ANNUAL BUDGET EXAMPLE ($15M Home):\n• Property Tax: $114,000\n• Insurance: $3,600\n• HOA/Maintenance: $6,000\n• Utilities: $9,600\n• Landscaping: $3,600\n• 💵 TOTAL: ~$137,000/year ($11,400/month)\n\n💡 TAX STRATEGIES:\n✅ Homestead exemptions\n✅ Trust ownership benefits\n✅ Depreciation deductions (investors)\n✅ 1031 exchanges for reinvestment\n\n📞 Consult our tax advisor: +1-555-123-4567';
          break;

        case 'qa_inspection':
          botReply = '❓ CUSTOMER QUESTION:\n"Is a home inspection mandatory? What does it cover?"\n\n✅ ANSWER FROM OUR EXPERTS:\n\n🔍 IS INSPECTION MANDATORY?\n\n✅ NOT legally required (except by lenders)\n✅ HIGHLY RECOMMENDED (protects you!)\n✅ Typical cost: $500-1,500\n✅ Takes 2-4 hours\n\n📋 INSPECTION COVERAGE:\n\n🏗️ STRUCTURAL:\n✅ Foundation integrity\n✅ Walls, roof, chimney\n✅ Basement conditions\n✅ Drainage systems\n\n🔧 MECHANICAL SYSTEMS:\n✅ HVAC (heating/cooling)\n✅ Plumbing (leaks, water pressure)\n✅ Electrical (safety, capacity)\n✅ Water heater age & function\n\n🪟 INTERIOR ELEMENTS:\n✅ Windows & doors\n✅ Flooring conditions\n✅ Drywall/paint\n✅ Kitchen appliances\n\n❌ TYPICALLY NOT INCLUDED:\n• Septic systems (separate inspection)\n• Radon testing (separate test)\n• Pest inspection (separate inspection)\n• Pool/spa (specialized inspector)\n• Environmental concerns (Phase I survey)\n\n💡 REAL CUSTOMER EXPERIENCE:\n\n👤 Michael (Manhattan Penthouse Buyer):\n"Inspection found $50K in HVAC upgrades needed."\n✅ Used as negotiation leverage\n✅ Seller covered $30K in repairs\n✅ Saved on future maintenance!\n\n📊 INSPECTION RESULTS:\n• 20% find major issues (>$10K)\n• 40% find minor issues ($1-5K)\n• 40% pass with flying colors\n\n✅ OUR ADVANTAGE:\nWe provide pre-inspection reports! You know issues BEFORE bidding.\n\n📞 Schedule inspection: +1-555-123-4567';
          break;

        case 'qa_rental':
          botReply = '❓ CUSTOMER QUESTION:\n"How does rental income work if I rent out the property?"\n\n✅ ANSWER FROM OUR EXPERTS:\n\n💰 RENTAL INCOME MODEL:\n\n📊 REVENUE STRUCTURE:\n\n1️⃣ INCOME SOURCES:\n✅ Monthly rent (primary)\n✅ Seasonal premium (high season +30-50%)\n✅ Additional fees (parking, amenities)\n✅ Damage deposits (security)\n\n📈 TYPICAL LUXURY RENTAL RATES:\n\n🏖️ Oceanfront ($22.8M property):\n• Monthly: $50,000-$75,000\n• Annual: $600,000-$900,000\n• Yield: 2.6%-3.9%\n\n🏢 Penthouse ($15.2M property):\n• Monthly: $30,000-$45,000\n• Annual: $360,000-$540,000\n• Yield: 2.4%-3.6%\n\n🏔️ Mountain Villa ($12.5M property):\n• Monthly: $25,000-$40,000\n• Annual: $300,000-$480,000\n• Yield: 2.4%-3.8%\n\n💸 EXPENSES TO DEDUCT:\n\n📋 ANNUAL COSTS:\n✅ Property management: 8-10% of rent\n✅ Maintenance/repairs: 5-10% of rent\n✅ Insurance: $3,600-$8,000/year\n✅ Property taxes: Varies by location\n✅ HOA fees: $2,000-$5,000/month\n✅ Utilities: $300-$800/month\n✅ Vacancy loss (est.): 10-15%\n✅ Advertising/marketing: $500-$2,000/month\n\n📊 PROFIT CALCULATION (Example):\n\nPenthouse $15.2M - $40,000/month rent:\n• Annual Revenue: $480,000\n• Property Mgmt (10%): -$48,000\n• Maintenance (7%): -$33,600\n• Insurance: -$6,000\n• Taxes & HOA: -$60,000\n• Vacancy (12%): -$57,600\n• 💵 NET PROFIT: $274,800/year (57% yield after costs)\n\n✅ OUR PROPERTY MANAGEMENT:\n• Professional tenant screening\n• 24/7 maintenance coordination\n• Monthly financial reporting\n• Full accounting support\n• Handles all tenant issues\n\n📞 Rental income strategy: +1-555-123-4567';
          break;

        case 'qa_quick_sell':
          botReply = '❓ CUSTOMER QUESTION:\n"What if I need to sell quickly? Will I lose money?"\n\n✅ ANSWER FROM OUR EXPERTS:\n\n⏰ QUICK SALE OPTIONS:\n\n1️⃣ TRADITIONAL FAST SALE (30-60 days):\n✅ MLS listing at market price\n✅ Professional marketing push\n✅ Multiple showings/offers\n✅ Competitive bidding\n💰 Typical loss: 0-2% (commission + fees)\n\n2️⃣ EXPRESS SALE (15-30 days):\n✅ Aggressive pricing (2-5% below market)\n✅ Multiple marketing channels\n✅ Weekly open houses\n✅ Direct buyer outreach\n💰 Typical loss: 2-5%\n\n3️⃣ EMERGENCY SALE (7-14 days):\n✅ Motivated seller pricing (5-10% reduction)\n✅ Cash buyers only\n✅ As-is condition\n✅ Direct negotiation\n💰 Typical loss: 5-10%\n\n4️⃣ PORTFOLIO BUYBACK (our option):\n✅ We buy your property directly\n✅ Guaranteed close in 10 days\n✅ No market risk\n✅ Competitive offer (market minus 8-12%)\n💰 Typical loss: 8-12% (but guaranteed!)\n\n💡 REAL CUSTOMER SUCCESS:\n\n👤 Jennifer (Emergency Relocation):\n"Had 20 days to sell $8.5M villa for job transfer."\n✅ Listed at 5% below market ($8.075M)\n✅ Received 3 offers in 10 days\n✅ Sold in 25 days\n✅ Loss: Only 3% ($255K)\n✅ Timeline: Met requirement!\n\n📊 COST ANALYSIS:\n\n📈 TRADITIONAL SALE (90 days):\n• Realtor commission: 5-6%\n• Closing costs: 1-2%\n• Holding costs: $30K/month × 3 = $90K\n• 💵 Total cost: 8-10% loss\n\n⚡ EXPRESS SALE (30 days):\n• Realtor commission: 5-6%\n• Closing costs: 1-2%\n• Holding costs: $30K × 1 = $30K\n• Price reduction: 2-5%\n• 💵 Total cost: 5-8% loss\n\n🚀 EMERGENCY BUYBACK (10 days):\n• No realtor commission\n• No marketing costs\n• No holding costs\n• Direct buyback: 8-12% discount\n• 💵 Total cost: 8-12% loss (but GUARANTEED CLOSE)\n\n✅ WAYS TO MINIMIZE LOSS:\n✅ Maintain property in excellent condition\n✅ Price competitively from day 1\n✅ Use professional staging\n✅ Aggressive marketing\n✅ Flexible closing timeline\n✅ Our fast-track sale program\n\n📞 Need quick sale? Call immediately: +1-555-123-4567\n🔥 We can often close in 10 days!';
          break;

        case 'vendor_ventures':
          botReply = '🤝 Interested in business partnerships?\n\nWe collaborate on:\n• Construction Projects\n• Interior Design\n• Property Management\n• Joint Ventures\n\nContact Details:\n📧 partnerships@luxeestates.com\n📞 +1-555-987-6543';
          break;

        case 'career':
          botReply = '💼 Join Our Team!\n\nOpen Positions:\n• Sales Executive\n• Property Manager\n• Interior Designer\n• Marketing Specialist\n• Operations Head\n\nApply at:\n📧 careers@luxeestates.com';
          break;

        case 'more_info':
          botReply = '📋 Additional Information:\n\n✅ Established: 2008\n✅ Properties: 500+\n✅ Clients: Happy customers in 15+ markets\n✅ Awards: Best Luxury Real Estate Developer\n\nWhat else can I help you with?';
          botOptions = [
            { label: '🏘️ View Master Plan', id: 'master_plan' },
            { label: '📸 Gallery', id: 'gallery' },
            { label: '⭐ Testimonials', id: 'testimonials' },
          ];
          break;

        case 'browse_properties':
          botReply = '🔍 Explore our exclusive collection:\n\n📍 Locations:\n• Beverly Hills, CA\n• Manhattan, NY\n• Malibu, CA\n• Aspen, CO\n• Boston, MA\n• Miami, FL\n\nVisit our Projects page for detailed listings!';
          break;

        case 'check_pricing':
          botReply = '💰 Pricing Information:\n\n🏖️ Oceanfront Estate: $22.8M\n🏢 Penthouse Suite: $15.2M\n🏔️ Mountain Villa: $12.5M\n🏛️ Modern Villa: $8.5M\n🏙️ Historic Penthouse: $6.8M\n🌆 Luxury Condo: $3.2M\n\nFlexible payment plans available!';
          break;

        case 'talk_to_agent':
          botReply = '📞 Our sales team is ready to assist!\n\n☎️ Call: +1-555-123-4567\n💬 WhatsApp: Available 24/7\n📧 Email: sales@luxeestates.com\n⏰ Office Hours: 9 AM - 6 PM (Mon-Fri)\n\nWe respond within 24 hours!';
          break;

        case 'master_plan':
          botReply = '🏘️ Master Plan Features:\n\n✨ 22 Premium Amenities\n🎾 Sports Courts\n👨‍👩‍👧 Family Play Areas\n🌳 Nature Trails\n🅿️ Ample Parking\n🎭 Community Spaces\n\nVisit Projects page to view interactive master plan!';
          break;

        case 'testimonials':
          botReply = '⭐ What Our Clients Say:\n\n"Exceeded all expectations!" - Sarah M.\n"Perfect luxury living!" - John D.\n"Excellent service!" - Emma W.\n"Best investment ever!" - Mike P.\n\nReady to join our happy clients?';
          break;

        default:
          botReply = 'Thank you for your interest. How else can we assist you?';
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        text: botReply,
        options: botOptions,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: userInput,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simulate bot response with AI-like replies
    setTimeout(() => {
      const input = userInput.toLowerCase();
      let botReply = '';

      if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
        botReply = '💰 For detailed pricing, our team can provide a customized quote. Call us at +1-555-123-4567 or schedule a consultation!';
      } else if (input.includes('location') || input.includes('where')) {
        botReply = '📍 We have luxury properties in Beverly Hills, Manhattan, Malibu, Aspen, Boston, and Miami. Which location interests you?';
      } else if (input.includes('amenities') || input.includes('facilities')) {
        botReply = '✨ Our properties include premium amenities: pools, gyms, concierge, smart home systems, and more. Visit our Projects page for details!';
      } else if (input.includes('hello') || input.includes('hi')) {
        botReply = '👋 Hello! How can I assist you today? Browse properties, get info, or schedule a consultation!';
      } else if (input.includes('thank')) {
        botReply = '😊 You\'re welcome! Is there anything else I can help you with?';
      } else if (input.includes('contact') || input.includes('phone')) {
        botReply = '📞 Contact Us:\n☎️ +1-555-123-4567\n📧 info@luxeestates.com\n💬 WhatsApp: 24/7\n⏰ Mon-Fri: 9AM-6PM';
      } else {
        botReply = 'Great question! For more detailed information, I\'d recommend connecting with our sales team. Would you like me to provide contact details or schedule a call?';
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        text: botReply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Chat Support</h3>
          <p className="text-xs text-blue-100">Typically replies in minutes</p>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-blue-700 p-1 rounded transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              {msg.options && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option.id, option.label)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full transition-colors whitespace-nowrap"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">Powered by Luxe Estate Support</p>
      </div>
    </div>
  );
};

export default ChatBot;
