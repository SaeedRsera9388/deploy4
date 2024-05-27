import React, { useState } from "react";
import { Button, Table, Tag, Dropdown, Menu } from "antd";
import "./GetStart.scss";
import Lottie from "lottie-react"; // Import Lottie library
import animationData from "../../assets/select1.json"; // Include your styling here
import HeaderBar from "../Header/HeaderBar";
import PlanHeader from "../PlanHeader/PlanHeader";
import MailList from "../MailList/MailList";
import Footer from "../Footer/SeraFooter";

const GetStart = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedSelections, setSelectedSelections] = useState([]);

  const questions = [
    {
      id: 1,
      text: "Available levels 🌟 ?",
      options: [
        {
          id: 10,
          text: "Beginners",
          selections: ["A1", "A2"],
        },
        {
          id: 20,
          text: "Intermediate",
          selections: ["B1", "B2"],
        },
        {
          id: 30,
          text: "Advanced level",
          selections: ["C1", "C2"],
        },
        // Add more options here
      ],
    },
    {
      id: 2,
      text: "Possibility enrolment of participants ✨",
      options: [
        {
          id: 40,
          text: "Group",
          selections: ["3", "6", "10", "15", "20"],
        },
        {
          id: 50,
          text: "Private",
          selections: ["VIP"],
        },
        // Add more options here
      ],
    },
    {
      id: 3,
      text: "Time schedule for week days ⏰",
      options: [
        {
          id: 50,
          text: "Mon-Fri",
          selections: ["Morning", "Evening"],
        },
        {
          id: 60,
          text: "Saturday",
          selections: ["Afternoon"],
        },
        {
          id: 70,
          text: "Sunday",
          selections: ["Noon"],
        },
        // Add more options here
      ],
    },
    {
      id: 4,
      text: "Available Materials provided from Our Book 📚",
      options: [
        {
          id: 80,
          text: "Books",
          selections: [
            "Grammar",
            "Speaking",
            "Writing",
            "Listening",
            "Expression",
            "Idioms",
            "Vocabularies",
            "Topic",
            "Assignments",
          ],
        },
        {
          id: 90,
          text: "Language",
          selections: [
            "English",
            "Deutsch",
            "Española",
            "polski",
            "Français",
            "العربية",
            "Русский",
            "한국인",
            "Հայոց",
            "اردو",
            "فارسي",
            "हिन्दी",
          ],
        },
        // Add more options here
      ],
    },
    {
      id: 5,
      text: "Special Service 🎉",
      options: [
        {
          id: 100,
          text: "Growth Empowerment",
          selections: ["Podcast", "Externship", "Consultant"],
        },
        // Add more options here
      ],
    },

    // Add more questions here
  ];
  const descriptions = {
    A1: "Beginner Level - Designed for individuals with minimal or no prior knowledge of the language. Focuses on building fundamental vocabulary and basic grammar skills.",
    A2: "Elementary Level - Geared towards learners with basic understanding of the language. Emphasizes expanding vocabulary, improving grammar, and developing simple conversational abilities.",
    B1: "Intermediate Level - Tailored for learners with a grasp of the language's fundamentals. Aims to enhance fluency, comprehension, and communication skills in various everyday situations.",
    B2: "Upper Intermediate Level - Intended for learners with a solid foundation in the language. Focuses on refining grammar, expanding vocabulary, and fostering more complex communication abilities.",
    C1: "Advanced Level - Designed for proficient speakers seeking to refine and polish their language skills. Emphasizes fluency, accuracy, and nuanced expression in both spoken and written communication.",
    C2: "Mastery Level - Geared towards near-native proficiency in the language. Focuses on mastering complex language structures, refining idiomatic expression, and achieving a high level of fluency and accuracy.",
    3: "3 participants: Small group dynamics allow for personalized attention and focused interaction. Each participant receives ample opportunity to engage actively in discussions, receive immediate feedback, and build confidence in a supportive environment.",
    6: "6 participants: With a slightly larger group, participants benefit from diverse perspectives and increased opportunities for group activities and pair work. Interactions become more dynamic, fostering collaborative learning and the sharing of ideas among peers.",
    10: "10 participants: A larger group size provides a rich learning environment with a wider range of experiences and backgrounds. Participants have increased opportunities for group discussions, debates, and team-based activities, enhancing their ability to communicate effectively in various social contexts.",
    15: "15 participants: A sizable group encourages a vibrant exchange of ideas and fosters a sense of community among participants. Group activities become more dynamic and engaging, allowing individuals to practice communication skills in realistic settings while benefiting from the collective knowledge of their peers.",
    20: "20 participants: In a larger group setting, participants have the advantage of exposure to a greater diversity of communication styles and cultural perspectives. Group discussions become more dynamic, challenging participants to articulate their thoughts clearly and assertively amidst a larger audience, simulating real-world communication scenarios.",
    VIP: "VIP program offers an accelerated and intensive learning experience tailored to your needs. With more hours per week and intense sessions, you'll make rapid progress in your language skills. Enjoy the flexibility to customize your schedule and benefit from additional resources and support to maximize your learning potential.",
    Morning:
      "Mon-Fri 08:00-12:00 - Rise and shine with our early bird sessions! Start your day off right by diving into language learning before work. Make the most of your mornings and cover as much material as possible at your own pace.",
    Evening:
      "Mon-Fri 14:00-20:30 - Unwind after work and immerse yourself in language learning during our evening sessions. With ample time to cover materials and practice, you'll make steady progress towards your language goals.",
    Afternoon:
      "Saturday 10:00-17:00 - Spend your Saturday afternoon with us, delving into language learning in a relaxed setting. Whether you're brushing up on your skills or diving into new material, our afternoon sessions provide the perfect opportunity for focused learning.",
    Noon: "10:00-15:00 - Embrace the tranquility of Sunday with our midday sessions. Join us for a leisurely yet productive language learning experience, where you can refine your skills and explore new topics at a comfortable pace. Take advantage of this time to deepen your understanding of the language in a relaxed and supportive environment, setting the tone for a fulfilling week ahead.",
    Grammar:
      "Master the intricacies of language structure and syntax through comprehensive grammar lessons, designed to build a strong foundation for effective communication. Find detailed explanations and examples in our book, which implements all these aspects. This knowledge is compiled from numerous sessions with students around the world, spanning different proficiency levels.",
    Speaking:
      "Cultivate confidence and fluency in spoken language through engaging speaking activities and interactive discussions, allowing you to express yourself with ease in any situation. Our book provides detailed guidance on speaking skills, incorporating diverse activities. This information stems from our extensive experience, gathered from students worldwide.",
    Writing:
      "Hone your written communication skills through guided writing exercises and feedback, enabling you to articulate your thoughts clearly and effectively on paper. You'll find comprehensive writing resources in our book, which cover various writing styles and techniques. These insights are drawn from our collective experiences with students globally.",
    Listening:
      "Sharpen your listening comprehension skills through immersive listening activities and audio materials, improving your ability to understand and respond to spoken language. Our book offers a wealth of listening resources, incorporating diverse materials to enhance your listening skills. These resources are derived from our observations and interactions with students worldwide.",
    Expression:
      "Unlock advanced speaking skills by mastering phrasal verbs, essential for natural and fluent communication in everyday conversations and professional contexts. Our book delves deep into phrasal verbs and their usage, providing ample examples and practice exercises. These insights are distilled from our interactions with students from various cultural backgrounds.",
    Idioms:
      "Expand your repertoire of professional and personal life-related slang and phrases, enriching your language proficiency and cultural understanding. Our book contains a rich collection of idioms and expressions, accompanied by explanations and contextual usage. These materials are curated from our interactions with students globally.",
    Vocabularies:
      "Access a comprehensive range of vocabulary resources tailored to your proficiency level, from beginner to mastery, to support your language assignments and deepen your linguistic knowledge. In our book, you'll find vocabulary lists, exercises, and contextual examples covering a wide range of topics. This knowledge is aggregated from our extensive sessions with students from diverse linguistic backgrounds.",
    Topics:
      "Explore diverse topics relevant to real-life scenarios, including business, market trends, travel, and work, providing valuable insights and practical language skills for various contexts. Our book covers an array of topics with in-depth explanations and language exercises. These insights are gleaned from our interactions with students worldwide.",
    Assignments:
      "Reinforce learning and practice language skills with carefully crafted homework assignments and materials, facilitating continued progress outside of class time. Our book includes a variety of assignments designed to reinforce language skills and encourage independent learning. These assignments are developed based on feedback and experiences gathered from students globally.",
    English:
      "Our mission at Seraslingo is to empower individuals and organizations worldwide through comprehensive language education. We believe in creating a vibrant community where linguistic diversity is celebrated, barriers are broken, and connections are forged. Our vision is to unite cultures, enrich lives, and inspire positive change through the transformative power of language learning. With our latest series of diverse language books, we aim to bring people from around the globe together under one umbrella: Seraslingo. Here, individuals will find everything they need to embark on a journey of personal and professional growth, unlocking endless opportunities and realizing their true potential. Join us in building a brighter, more connected world through the beauty of language.",
    Deutsch:
      "Die Mission dieser Organisation besteht darin, Individuen und Organisationen durch umfassende Sprachbildung zu befähigen, um bedeutungsvolle Verbindungen zu fördern und eine inklusive Lernumgebung zu schaffen. Sie bieten maßgeschneiderte Programme für Einzelpersonen und Unternehmen an, um deren Sprachkenntnisse zu verbessern und sie dabei zu unterstützen, erfolgreich zu kommunizieren. Ihr Engagement erstreckt sich über das traditionelle Klassenzimmer hinaus, um lebenslanges Lernen zu fördern und Gemeinschaften durch verschiedene Aktivitäten zu stärken. Die Vision besteht darin, Kulturen zu vereinen und Leben durch sprachliche Bildung zu bereichern, indem Barrieren abgebaut und Chancen für alle geschaffen werden. Ihr Ziel ist es, positive Veränderungen zu inspirieren und eine weltweit verbundene Gemeinschaft zu schaffen, die von Sprachenvielfalt und gegenseitigem Respekt geprägt ist",
    Española:
      "Nuestra misión es empoderar a individuos y organizaciones a través de la educación lingüística, creando un ambiente inclusivo donde todos puedan prosperar. Ofrecemos programas personalizados para el aprendizaje individual y el desarrollo profesional de equipos empresariales. Además, promovemos el aprendizaje continuo más allá del aula y fomentamos la construcción de comunidades vibrantes que celebren la diversidad cultural. Nuestra visión es unir culturas y enriquecer vidas mediante la educación lingüística, derribando barreras y creando oportunidades para todos. Nos esforzamos por inspirar cambios positivos, siendo líderes en conectar culturas, enriquecer vidas y crear oportunidades accesibles para todos, dejando así un legado duradero de empoderamiento y cambio positivo",
    polski:
      "1. **Wzmacnianie jednostek i organizacji poprzez edukację językową:** Podnoszenie umiejętności językowych indywidualnych uczniów na wszystkich poziomach zaawansowania. Dostosowane programy edukacyjne, odpowiadające na różne style i preferencje uczenia się. 2. **Wzmacnianie organizacji:** Współpraca z firmami z różnych branż (bankowość, finanse, IT) w celu podniesienia umiejętności językowych ich zespołów. Oferowanie dostosowanych programów szkoleniowych i usług konsultingowych, które ułatwiają skuteczną komunikację i operowanie w zglobalizowanym świecie. 3. **Wsparcie dla nauki przez całe życie:** Tworzenie kultury nauki przez całe życie, przekraczającej granice tradycyjnych ustawień klasowych. Oferowanie różnorodnych form nauki, od prywatnych lekcji po specjalistyczne kursy dla osób pragnących wyjechać za granicę. 4. **Kultywowanie społeczności:** Budowanie dynamicznych, integracyjnych wspólnot przez różnorodne programy (kluby konwersacyjne, sesje podcastowe, wspólne działania grupowe). Wspieranie poczucia przynależności i koleżeństwa, które wykracza poza klasę. 5. **Wizja: Łączenie kultur, wzbogacanie życia:** Dążenie do bycia liderem w łączeniu kultur i promowaniu wzajemnego zrozumienia między językowymi podziałami. Wizja świata, w którym różnorodność językowa jest świętowana, a bariery komunikacyjne są eliminowane. 6. **Tworzenie możliwości:** Przełamywanie barier w edukacji i wzmacnianie jednostek z różnych środowisk do osiągania sukcesów. Demokratyzacja dostępu do edukacji językowej i otwieranie drzwi do nowych możliwości. 7. **Inspirowanie zmian:** Aspiracja do bycia katalizatorem pozytywnej transformacji i inspiracji dla jednostek do przekraczania granic. Dążenie do budowania lepszego, bardziej połączonego świata poprzez edukację językową.",
    Français:
      "Notre mission consiste à habiliter les individus et les organisations grâce à une éducation linguistique complète, dans le but de favoriser des connexions significatives et de créer un environnement d'apprentissage inclusif. Nous proposons des programmes sur mesure pour les particuliers et les entreprises, les aidant à améliorer leurs compétences linguistiques et à réussir dans leurs communications. Notre engagement va au-delà des salles de classe traditionnelles pour promouvoir l'apprentissage tout au long de la vie et renforcer les communautés à travers diverses activités. Notre vision est celle d'un monde où les cultures se rejoignent et où la vie est enrichie par l'éducation linguistique, en abolissant les barrières et en offrant des opportunités pour tous. Nous aspirons à inspirer des changements positifs et à créer une communauté mondiale connectée, fondée sur la diversité linguistique et le respect mutuel",
    العربية:
    "مهمتنا هي تمكين الأفراد والمنظمات من خلال التعليم اللغوي، حيث نسعى إلى خلق بيئة شاملة تسمح للجميع بالازدهار. نقدم برامج مخصصة لتعلم الفرد وتطوير الفرق في الشركات. بالإضافة إلى ذلك، نشجع على التعلم المستمر خارج الفصول الدراسية ونشجع على بناء مجتمعات حيوية تحتفي بالتنوع الثقافي.  رؤيتنا هي ربط الثقافات وإثراء الحياة من خلال التعليم اللغوي، حيث نسعى إلى تحطيم الحواجز وخلق الفرص للجميع. نحن نسعى لتحفيز التغيير الإيجابي ونسعى لنكون قادة في ربط الثقافات وإثراء الحياة وخلق فرص يمكن الوصول إليها للجميع، مما يترك إرثًا دائمًا من التمكين والتحفيز والتغيير الإيجابي للأجيال القادمة",
    Русский:
      "Наша миссия состоит в том, чтобы дать возможность отдельным лицам и организациям через языковое образование. Мы стремимся создать обучающую среду, где каждый может процветать. Мы предлагаем индивидуальные программы обучения языку как для отдельных лиц, так и для организаций. Мы поддерживаем идею непрерывного обучения и стремимся к созданию живых и включенных сообществ. Наша цель - объединить культуры и обогатить жизнь через языковое образование. Мы стремимся разрушить барьеры и создать возможности для всех. Мы добиваемся вдохновляющих перемены и стремимся стать лидерами в связывании культур и обогащении жизни, оставляя наследие толерантности, вдохновения и позитивных изменений для будущих поколений.",
    한국인:
      "저희의 미션은 언어 교육을 통해 개인과 조직에 권한을 부여하는 것입니다. 모든 배경과 능력 수준의 학습자가 성공할 수 있는 포용적인 학습 환경을 조성합니다. 개인에게는 언어 학습 목표를 달성할 수 있는 맞춤형 프로그램을 제공하고, 조직에는 언어 능력을 향상시켜 전문 역량을 강화하는 맞춤형 교육 프로그램과 컨설팅 서비스를 제공합니다. 평생 학습 문화를 육성하고 커뮤니티를 강화합니다. 저희의 비전은 문화를 연결하고 삶을 풍요롭게 하는 것입니다. 문화 간의 이해를 증진하고 사람들을 하나로 묶는 다리를 구축하기 위해 노력합니다. 언어 교육을 통해 개인과 커뮤니티의 삶을 풍요롭게 하고 새로운 가능성의 문을 열며 전 세계 개인과 커뮤니티를 위한 성공의 길을 만들고자 합니다. 최종적으로 우리의 비전은 희망과 영감을 주는 긍정적인 변화입니다. 우리는 언어 학습이 제공하는 무한한 가능성을 포용하도록 영감을 주고자 합니다.",
    Հայոց :
      "Ձեզ ենք ներկայացնում «Գիտելիքների Կամուրջներ» նախագիծը, որի նպատակն է համախմբել լեզվական գիտելիքները և ուսուցումները աշխարհի բոլոր անկյուններից։ Մենք ստեղծել ենք բացառիկ ուսումնական միջավայր, որը ընդգրկում է լեզվի ուսուցման նորարարական մեթոդներ՝ ապահովելով յուրաքանչյուրին հաջողության ճանապարհի վրա։ Մեր բարձր մակարդակով պատրաստված քերականական նյութերը և լավագույն համակարգերը կօգնեն ձեզ հասնել ձեր լեզվական նպատակներին։ Մեր թիմը մշտապես հետևում է հաճախորդների պահանջներին և տրամադրում անհատականացված աջակցություն։ Հավատում ենք, որ համապատասխան ռեսուրսների տրամադրման միջոցով յուրաքանչյուր անհատ կարող է օգտվել մեր առաջարկած հնարավորություններից։ Եթե ունեք հարցեր կամ ցանկանում եք քննարկել ձեր անձնական նպատակները, մեր թիմը պատրաստ է աջակցել ձեզ։",
    فارسي:
      "ماموریت این سازمان در توانمندسازی افراد و سازمان‌ها از طریق آموزش زبان جامع است، به‌منظور ترویج ارتباطات معنی‌دار و ایجاد محیط یادگیری شامل. آنها برنامه‌های اختصاصی برای افراد و شرکت‌ها ارائه می‌دهند تا بهبود دانش زبان خود را تجربه کنند و آن‌ها را در ارتباط موفقیت‌آمیز حمایت کنند. تعهد آنها از کلاس درس سنتی فراتر می‌رود تا یادگیری مادام‌العمر را ترویج کند و از طریق فعالیت‌های مختلف جوامع را تقویت کند. چشم‌انداز آنها در اتحاد فرهنگ‌ها و غنی‌سازی زندگی از طریق آموزش زبان است، با کاهش موانع و ایجاد فرصت‌هایی برای همه. هدف آنها الهام بخشیدن به تغییرات مثبت و ایجاد یک جامعه جهانی متصل است که از تنوع زبان و احترام متقابل برخوردار است",
    हिन्दी:
      "हमारा मिशन भाषा की शिक्षा के माध्यम से व्यक्तियों और संगठनों को स्वतंत्र बनाना है। हम एक समग्र शिक्षा संस्थान प्रदान करते हैं जहां व्यक्तियों को अपने पीछे के दृश्य और कौशल की स्तर को सीखने की सुविधा मिलती है। हम व्यक्तियों को व्याकरण, बोलने, लिखने, और सुनने के कौशल में प्रशिक्षित करते हैं। इसके अलावा, हम संगठनों के साथ साझेदारी करते हैं ताकि उनकी भाषाई कौशलों को बढ़ावा दिया जा सके। हम जीवन भर सीखने को प्रोत्साहित करते हैं और समुदाय के पैदावार करते हैं। इसके अलावा, हम भाषा की शिक्षा के माध्यम से जीवनों को मजबूत करने के लिए अभिवृद्धि करते हैं और प्रभावित करने की इच्छा रखते हैं",
    اردو:
    "ہمارا مشن زبان کی تعلیم کے ذریعے افراد اور تنظیموں کو بااختیار بنانا ہے۔ ہم ایک جامع تعلیمی ماحول فراہم کرتے ہیں جہاں افراد اپنی پس منظر اور مہارت کی سطح کو سیکھ سکیں۔ ہم افراد کو گرائمر، بولنے، لکھنے، اور سننے کی مہارتوں میں فراہمی کرتے ہیں۔ اس کے علاوہ، ہم تنظیموں کے ساتھ شراکت کرتے ہیں تاکہ ان کی زبانی مہارتوں کو بڑھایا جا سکے۔ ہم زندگی بھر سیکھنے کو فروغ دیتے ہیں اور کمیونٹی کاشت کرتے ہیں۔ اس کے علاوہ، ہم زبان کی تعلیم کے ذریعے زندگیوں کو تقویت بخشتے ہیں اور متاثر کن تبدیلی کی خواہش رکھتے ہیں۔",
    podcast:
      "🌟 Join Sera Summer! 🌟 Embark on a transformative journey, unlock your potential, and dive into a world of empowerment with our vibrant Speaking Club. Join our Zoom Meeting to practice speaking skills, engage in lively discussions, and enhance fluency in a supportive and interactive environment. Elevate your career, sharpen your communication prowess, and become part of a vibrant global community. Explore leadership, problem-solving, and media literacy with us.🚀🌍💬",
    Externship:
      "Elevate your skills with our tailored Professional Training programs, covering a range of industries including business, marketing, travel, and specialized areas such as driving school signs. Our expert trainers provide practical knowledge and hands-on experience to help you excel in your professional endeavors.",
    Consultant:
      "Access personalized consulting services from our experienced consultants, offering guidance and support in various areas including exam preparation (IELTS, TOEFL), personal career growth, and professional development. Gain valuable insights and strategies to achieve your goals with confidence.",
  };

  const [selectionDescription, setSelectionDescription] = useState("");

  const handleOptionSelect = (questionId, optionId, selection) => {
    // Remove any existing selections
    setSelectedSelections([]);

    // Add the new selection
    const newSelection = { questionId, optionId, selection };
    setSelectedOptions({ [questionId]: { optionId, selection } });
    setSelectedSelections([newSelection]);
    setSelectionDescription(descriptions[selection]);
  };

  const handleRemoveSelection = (removedSelection) => {
    const updatedSelections = selectedSelections.filter(
      (sel) =>
        sel.questionId !== removedSelection.questionId ||
        sel.optionId !== removedSelection.optionId ||
        sel.selection !== removedSelection.selection
    );
    setSelectedSelections(updatedSelections);
    if (updatedSelections.length === 0) {
      setSelectionDescription("");
    } else {
      const lastSelection = updatedSelections[updatedSelections.length - 1];
      setSelectionDescription(descriptions[lastSelection.selection]);
    }
  };

  const getOverviewData = () => {
    return selectedSelections.map((selection) => {
      const question = questions.find((q) => q.id === selection.questionId);
      const selectedOption = question.options.find(
        (opt) => opt.id === selection.optionId
      );

      return {
        key: `${selection.questionId}-${selection.optionId}-${selection.selection}`,
        Question: question.text,
        SelectedOption: selectedOption.text,
        SelectedSelection: (
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => handleRemoveSelection(key)}>
                <Menu.Item key={selection.selection}>
                  <Tag>{selection.selection}</Tag>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button>{selection.selection}</Button>
          </Dropdown>
        ),
        Action: (
          <Button onClick={() => handleRemoveSelection(selection)}>
            Remove
          </Button>
        ),
      };
    });
  };

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="GetStart-container">
        <div className="title-container">
          <h1>FAQ</h1>
          <p>
            Everything you need to know to start your program, learn or send
            your inquiry to get a prompt help!
          </p>
          <Lottie className="select-anim" animationData={animationData} />
        </div>
        <div className="content-wrapper">
          <div className="left-selection">
            <div className="questions-container">
              <h2>Questions</h2>
              {questions.map((question) => (
                <div key={question.id} className="question-container">
                  <h3>{question.text}</h3>
                  {question.options.map((option) => (
                    <Dropdown
                      key={option.id}
                      overlay={
                        <Menu
                          onClick={({ key }) =>
                            handleOptionSelect(question.id, option.id, key)
                          }
                        >
                          {option.selections.map((selection) => (
                            <Menu.Item key={selection}>{selection}</Menu.Item>
                          ))}
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <Button style={{ margin: "5px" }}>{option.text}</Button>
                    </Dropdown>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="right-selections">
            <div className="overview-container">
              <h2>Selection Overview</h2>
              <div className="badge">
                {selectedSelections.length > 0 && (
                  <span className="badge-count">
                    {selectedSelections.length}
                  </span>
                )}
              </div>
              <Table
                dataSource={getOverviewData()}
                columns={[
                  {
                    title: "Question",
                    dataIndex: "Question",
                    key: "Question",
                  },
                  {
                    title: "Option",
                    dataIndex: "SelectedOption",
                    key: "SelectedOption",
                  },
                  {
                    title: "Selection",
                    dataIndex: "SelectedSelection",
                    key: "SelectedSelection",
                  },
                  {
                    title: "Action",
                    dataIndex: "Action",
                    key: "Action",
                  },
                ]}
                pagination={false}
              />
            </div>
            <div className="selection-descriptions">
              <h2>Descriptions</h2>
              <p>{selectionDescription}</p>
            </div>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default GetStart;
