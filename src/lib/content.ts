export type NavigationItem = {
  label: string;
  href: string;
};

type HeroData = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type HomeFeature = {
  title: string;
  href: string;
  description: string;
  image: string;
};

type HomePage = {
  kind: "home";
  slug: "";
  title: string;
  description: string;
  hero: HeroData;
  highlights: string[];
  features: HomeFeature[];
  story: {
    title: string;
    paragraphs: string[];
    image: string;
  };
  gallery: string[];
};

type ServiceSection = {
  title: string;
  text?: string[];
  bullets?: string[];
  note?: string;
};

type ServicePage = {
  kind: "service";
  slug: string;
  title: string;
  description: string;
  hero: HeroData;
  intro?: string;
  badges: string[];
  gallery: string[];
  sections: ServiceSection[];
  testimonials?: { name: string; quote: string }[];
  formSubject: string;
};

type ContactPage = {
  kind: "contact";
  slug: "kontakt";
  title: string;
  description: string;
  hero: HeroData;
  companyInfo: string[];
  formSubject: string;
};

export type SitePage = HomePage | ServicePage | ContactPage;

export const navigation: NavigationItem[] = [
  { label: "Domov", href: "/" },
  { label: "Kurzy varenia", href: "/kurzy-varenia/" },
  { label: "Diagnostika zdravia", href: "/diagnostika-zdravia/" },
  { label: "Shiatsu", href: "/shiatsu/" },
  { label: "Očisty", href: "/pravidelne-ocisty/" },
  { label: "Kontakt", href: "/kontakt/" },
];

export const contactDetails = {
  company: "Živý Klub Zdravia s.r.o.",
  address: "Kukučínova 142/88, 901 01 Malacky",
  email: "zivyklubzdraviamalacky@gmail.com",
  phone: "+421 918 606 701",
  phoneLink: "+421918606701",
  ico: "52594904",
  dic: "2121093227",
};

const homePage: HomePage = {
  kind: "home",
  slug: "",
  title: "Živý Klub Zdravia",
  description:
    "Kurzy varenia, shiatsu, diagnostika zdravia a pravidelné očisty pre pokojnejší a vedomejší životný štýl.",
  hero: {
    eyebrow: "Kurzy varenia, shiatsu, diagnostika a očisty",
    title: "Spomaľte a načerpajte novú energiu",
    description:
      "Doprajte si oddych, naučte sa niečo nové a objavte cestu k rovnováhe vďaka našim kurzom varenia, shiatsu masážam a očistným rituálom.",
    image: "/mirror/site/wp-content/uploads/2025/03/1A2A3734-scaled-1.jpg",
    imageAlt: "Živý Klub Zdravia",
  },
  highlights: [],
  features: [
    {
      title: "Kurzy varenia",
      href: "/kurzy-varenia/",
      description:
        "Objavte radosť z varenia a naučte sa pripravovať sezónne, zdravé a chutné jedlá. Vytvorte si inšpiratívne menu plné čerstvých surovín a spoznajte nové kulinárske techniky.",
      image: "/uploads/zivy-klub/kurzy-home.jpg",
    },
    {
      title: "Shiatsu",
      href: "/shiatsu/",
      description:
        "Zharmonizujte telo i myseľ vďaka japonskej liečebnej masáži shiatsu. Jemným tlakom na meridiány podporíte plynulý tok energie Ki, uvoľníte napätie a zlepšíte celkovú vitalitu.",
      image: "/mirror/site/wp-content/uploads/2025/03/poslat-shiatsu-4-scaled-1.jpg",
    },
    {
      title: "Diagnostika zdravia",
      href: "/diagnostika-zdravia/",
      description:
        "Získajte komplexný prehľad o svojom zdravotnom stave a individuálne rady na zlepšenie kondície. Na meraní zistíte, ktoré orgány potrebujú podporu, a naučíte sa, ako ich posilniť.",
      image: "/uploads/zivy-klub/diagnostika-bonsai.jpg",
    },
    {
      title: "Pravidelné očisty",
      href: "/pravidelne-ocisty/",
      description:
        "Doprajte svojmu telu pravidelný reštart a vyskúšajte očistné kúry z čerstvých surovín. Vychutnajte si ľahké a vyvážené menu, ktoré dodá energiu, pocit ľahkosti a podporí harmonické fungovanie organizmu.",
      image: "/mirror/site/wp-content/uploads/2025/03/20230321_060805-2-scaled.jpg",
    },
  ],
  story: {
    title: "Môj príbeh",
    paragraphs: [
      "Po vyše 20 rokoch v gastronómii a 15 rokoch podnikania som zistil, že mnoho ľudí si šetrí svoje sny na neskôr. Pritom už zajtrajšok nemusí prísť. Žime tu a teraz.",
      "Často nám však chýba energia, lebo sa nesprávne stravujeme a robíme prácu, ktorá nás nenapĺňa. Preto som sa rozhodol pomáhať tým, ktorí chcú od života viac, objaviť ich skutočný potenciál a plnohodnotne žiť.",
      "Ponúkam stretnutia a rozhovory, kde ľudí motivujem, aby nestrácali čas. Využívam pritom svoje skúsenosti s varením podľa 5 prvkov z tradičnej čínskej medicíny, bankovaním, diagnostikou a prácou s telom.",
      "Neustále sa vzdelávam a verím, že spoločne môžeme žiť zdravšie, šťastnejšie a robiť to, čo nás baví teraz, nie až keď na to bude čas.",
    ],
    image: "/mirror/site/wp-content/uploads/2025/01/Martin-Profilovka-kucharska-scaled.jpg",
  },
  gallery: [
    "/mirror/site/wp-content/uploads/2025/03/1A2A3734-scaled-1-1024x683.jpg",
    "/uploads/zivy-klub/kurzy-hero.jpg",
    "/mirror/site/wp-content/uploads/2025/03/DSC_1562-1-2048x1363-1-1024x682.jpg",
    "/mirror/site/wp-content/uploads/2025/03/poslat-shiatsu-4-scaled-1-1024x683.jpg",
    "/mirror/site/wp-content/uploads/2025/03/1A2A3089-2048x1365-1-1024x683.jpg",
    "/mirror/site/wp-content/uploads/2025/03/1A2A3746-1024x683.jpg",
    "/mirror/site/wp-content/uploads/2025/03/image-2-1-scaled-e1741475000345-1024x645.jpg",
    "/uploads/zivy-klub/ocista-hero.jpg",
  ],
};

const pages: Record<string, SitePage> = {
  "": homePage,
  "kurzy-varenia": {
    kind: "service",
    slug: "kurzy-varenia",
    title: "Kurzy varenia",
    description:
      "Kurzy varenia podľa 5 elementov, práce so zeleninou, obilninami a kvasenou zeleninou.",
    hero: {
      eyebrow: "Kurzy zdravého varenia",
      title: "Varenie podľa 5 elementov",
      description:
        "Na kurze sa naučíte prirodzene upraviť a používať zdraviu prospešné potraviny v praxi, rýchlo a s ľahkosťou navariť zdravé a energické jedlo, pripraviť si kvalitné a zdravé raňajky a skombinovať si jedlo podľa piatich elementov tak, aby vám prospelo.",
      image: "/uploads/zivy-klub/kurzy-hero.jpg",
      imageAlt: "Kurz varenia v bistre",
    },
    intro: undefined,
    badges: ["69 EUR / osoba", "Menu od raňajok po dezert", "Jedlo si spolu aj vychutnáme"],
    gallery: [
      "/uploads/zivy-klub/kurzy-hero.jpg",
      "/uploads/zivy-klub/kurzy-home.jpg",
      "/mirror/site/wp-content/uploads/2021/07/IMG_8800-3-1024x768.jpg",
    ],
    formSubject: "Dopyt na kurz varenia",
    sections: [
      {
        title: "Varenie podľa 5 elementov",
        text: ["Na kurze sa naučíte:"],
        bullets: [
          "prirodzene upraviť a používať zdraviu prospešné potraviny v praxi",
          "rýchlo a s ľahkosťou navariť zdravé a energické jedlo",
          "poznať základné zložky zdravej stravy človeka a ich vzájomný pomer",
          "pripraviť si kvalitné a zdravé raňajky",
          "skombinovať si jedlo podľa piatich elementov - obilniny, strukoviny a zeleninu tak, aby vám prospeli",
          "tipy ako zvýšiť váš výkon vo vašej práci a byť odolný voči stresu",
        ],
        note:
          "Na čo sa môžete tešiť: Spoločne vytvoríme kompletné menu od raňajok až po dezert a takto vytvorené jedlo spolu aj skonzumujeme. Varenie môže byť aj zábava a relax zároveň. Cena kurzu: - 69 EUR / osoba.",
      },
      {
        title: "Čarujeme so zeleninou",
        text: ["Na kurze sa naučíte:"],
        bullets: [
          "prečo je zelenina dôležitá v našej strave",
          "akú energiu získame z rôznych druhov zeleniny",
          "aké tepelné prípravy zeleniny použiť ,aby nás zelenina vyliečila",
          "aké techniky prípravy zeleniny nekombinovať",
          "techniku prípravy zeleniny ak sa chceme uvoľniť alebo posilniť",
          "namiešať správny pomer zeleniny a obilniny",
          "prečo máme chuť na sladké, alkohol, pečivo, mäso alebo syr",
        ],
        note:
          "Na čo sa môžete tešiť: Spoločne vytvorené jedlo spolu aj skonzumujeme. Varenie môže byť aj zábava a relax zároveň. Cena kurzu: 69 EUR / osoba.",
      },
      {
        title: "Obilniny a kvasená zelenina",
        text: ["Na kurze sa naučíte:"],
        bullets: [
          "prospešnosť obilnín pre náš organizmus",
          "akú energiu majú rôzne druhy obilnín a ako si správne vybrať tú vhodnú pre nás",
          "prípravu obilnín tak, aby sme z nich vyťažili pre nás čo najviac energie",
          "techniky prípravy obilnín vhodné v lete a v zime",
          "pomer obilniny a vody pre jednotlivé druhy",
          "dĺžky a kombinácie varenia obilnín",
          "rôzne techniky prípravy",
          "prečo je kvasená zelenina vhodná pre náš organizmus",
          "ako kvasiť úspešne",
          "rôzne druhy kvasenej zeleniny",
          "energie kvasenej zeleniny",
        ],
        note:
          "Na čo sa môžete tešiť: Spoločne vytvorené jedlo spolu aj skonzumujeme. Varenie môže byť aj zábava a relax zároveň. Cena kurzu: - 69 EUR / osoba.",
      },
      {
        title: "V cene je zahrnuté",
        bullets: [
          "kurz v krásnych priestoroch Bistra",
          "potraviny z ktorých budeme spolu čarovať zdravé jedlo",
          "nealkoholické nápoje / káva",
          "Jedlo, kotré spolu vytvoríme spolu skonzumujeme a to, ktoré spolu nezjeme si vezmete zabalené domov",
        ],
      },
    ],
  },
  "diagnostika-zdravia": {
    kind: "service",
    slug: "diagnostika-zdravia",
    title: "Diagnostika zdravia",
    description:
      "Meranie, individuálna konzultácia a odporúčania pre výživu, doplnky a životný štýl.",
    hero: {
      eyebrow: "Meranie a konzultácia",
      title: "Počas merania sa dozvieš, ako je na tom:",
      description:
        "Zenské a mužské orgány, tráviace ústrojenstvo, stav pečene, žlčníka a pankreasu, hladina vitamínov a minerálov, stav celkovej imunity, nervová sústava, stav štítnej žľazy, stav kožného kolagénu, srdcovo-cievny a obehový systém, stav kostí, hladina cukru v krvi, jedovaté a toxické látky v organizme, stav pľúc a dýchacieho ústrojenstva a funkcia obličiek.",
      image: "/mirror/site/wp-content/uploads/2025/03/1A2A3089-2048x1365-1-1024x683.jpg",
      imageAlt: "Diagnostika zdravia a individuálna konzultácia",
    },
    badges: ["Individuálna konzultácia", "Výživa a doplnky", "Celodenný program s Martinom"],
    gallery: [
      "/uploads/zivy-klub/diagnostika-bonsai.jpg",
      "/mirror/site/wp-content/uploads/2020/11/treatment-1327811_1280-1024x680.jpg",
      "/mirror/site/wp-content/uploads/2025/03/image-2-1-scaled-e1741475000345-1024x645.jpg",
    ],
    formSubject: "Dopyt na diagnostiku zdravia",
    sections: [
      {
        title: "Čo vieme pri meraní sledovať",
        bullets: [
          "Ženské a mužské orgány",
          "Tráviace ústrojenstvo",
          "Stav pečene, žlčníka a pankreasu",
          "Hladina vitamínov a minerálov",
          "Stav celkovej imunity",
          "Nervová sústava",
          "Stav štítnej žľazy",
          "Stav kožného kolagénu",
          "Srdcovo-cievny a obehový systém",
          "Stav kostí",
          "Hladina cukru v krvi",
          "Jedovaté a toxické látky v organizme",
          "Stav pľúc a dýchacieho ústrojenstva",
          "Funkcia obličiek",
        ],
      },
      {
        title: "Meranie a individuálna konzultácia",
        text: [
          "Mnohým mojim klientom, ktorí sa odhodlali zmeniť svoje návyky, stravu a aspoň čiastočne štýl života, sa citeľne upravili mnohé chronické ťažkosti ako vysoký krvný tlak, nespavosť, rôzne chronické bolesti, a mnohé iné.",
        ],
        bullets: [
          "Rád Ti poradím, ako môžeš úpravou stravy zlepšiť svoje zdravie a vitalitu.",
          "Pomôžem Ti s výberom vhodných doplnkov pre Tvoje telo.",
        ],
        note: "Ak sa cítiš oslovený, objednaj sa na konzultáciu.",
      },
      {
        title: "Zdravý deň s Martinom: Varenie, cvičenie a pohoda na mieru",
        text: [
          "Ahojte, milí priatelia!",
          "Chcem vám predstaviť svoj kurz, ktorý je úplne iný. Predstavte si, že prídete ráno a začneme deň malým cvičením, aby sme si naštartovali metabolizmus a energiu. Je to skvelý spôsob, ako sa naladiť na zdravé varenie!",
          "Po cvičení si spolu pripravíme výživné raňajky. Mám pre vás niekoľko chutných receptov, ktoré vás na celý deň nabudia. Bude to skvelý zážitok a naučíme sa niečo nové!",
          "Následne sa pozrieme na váš osobný rozbor. Na základe vášho dátumu narodenia zistíme, aké potraviny sú pre vás najvhodnejšie. Je to fascinujúci proces, ktorý vám pomôže lepšie pochopiť, ako strava ovplyvňuje vaše zdravie a pohodu.",
          "Po obede si spolu zoberieme čas na nákup. Ukážem vám, ako vyberať čerstvé a zdravé suroviny, ktoré sú kľúčové pre naše varenie.",
          "A nakoniec, večer si spolu pripravíme chutnú večeru. Budeme sa snažiť zohľadniť vaše osobné preferencie a vytvoríme jedlo, ktoré nielen skvele chutí, ale je aj zdravotne prospešné pre vás. Spoločne sa naučíme, ako kombinovať ingrediencie tak, aby sme podporili vaše zdravie a pohodu.",
          "Na konci dňa si nájdeme chvíľu na diskusiu, kde si môžeme vymeniť zážitky a tipy. Tento kurz nie je len o varení - je to skutočná cesta k lepšiemu zdraviu a pohode.",
          "Teším sa na vás a verím, že si tento deň užijete rovnako ako ja! Prihláste sa a objavme spolu tajomstvá zdravej stravy.",
        ],
        note: "Trvanie kurzu od 8:00 do 18:00 spolu 10 hodin za skvelu cenu 200,00EUR.",
      },
    ],
  },
  shiatsu: {
    kind: "service",
    slug: "shiatsu",
    title: "Shiatsu",
    description:
      "Japonská liečebná masáž, ktorá harmonizuje tok energie Ki, uvoľňuje napätie a podporuje prirodzené uzdravovanie tela.",
    hero: {
      eyebrow: "Terapia pre telo aj myseľ",
      title: "Pravidelná terapia shiatsu udržuje správny tok energie Ki v plynulom pohybe",
      description:
        "Shiatsu, japonská liečebná masáž, spriechodňuje a harmonizuje tok energie v našom tele. Shiatsu doslovne znamená tlak prstom, ale využíva sa aj tlak lakťom, kolenom alebo chodidlom. Tlakom sa pôsobí na akupresúrne body a body na dráhach (meridiánoch), kadiaľ prúdi životná energia (KI), ktorá sa neustále premieňa. Stres, vyčerpanosť, nesprávne stravovanie, nedostatok aktivity sú malým príkladom, čo môže blokovať energiu v jej plynutí. To sa následne prejaví bolesťami hlavy, poruchami spánku, tráviacimi problémami, bolesťami chrbtice, kĺbov, svalov",
      image: "/uploads/zivy-klub/shiatsu-hero.jpg",
      imageAlt: "Shiatsu terapia",
    },
    badges: ["90 min základné ošetrenie", "120 min s kompletnou diagnostikou", "Vhodné aj počas tehotenstva"],
    gallery: [
      "/mirror/site/wp-content/uploads/2025/03/poslat-shiatsu-4-scaled-1-1024x683.jpg",
    ],
    formSubject: "Dopyt na shiatsu terapiu",
    sections: [
      {
        title: "Ako shiatsu funguje",
        text: [
          "Pomocou shiatsu sa dajú blokády diagnostikovať a telo ošetriť tlakom na meridiány, rotáciami kĺbov, jemným naťahovaním končatín tak, aby sa v ňom zaktivizovali uzdravovacie sily a prinavrátila sa harmónia a zdravie. Shiatsu je vhodné pre ľudí v každom veku a v období tehotenstva je veľkou podporou pre mamičku a dieťatko. V poslednom štádiu tehotenstva je shiatsu užitočné pre prípravu na samotný pôrod. Shiatsu podnecuje rozvoj osobnosti, sme kreatívnejší, vitálnejší, ohybnejší, vnímavejší voči sebe a svojmu okoliu. Ošetrenie prebieha na zemi na matraci v pohodlnom oblečení.",
        ],
      },
      {
        title: "Čo terapia prináša",
        bullets: [
          "diagnostiku blokád a ich uvoľnenie cez tlak na meridiány",
          "rotácie kĺbov a jemné naťahovanie končatín",
          "aktiváciu prirodzených uzdravovacích síl tela",
          "väčšiu vitalitu, ohybnosť a citlivejšie vnímanie seba aj okolia",
        ],
      },
      {
        title: "Možnosti ošetrení",
        bullets: [
          "základné ošetrenie shiatsu na 90 minút",
          "základné ošetrenie s kompletnou diagnostikou na 120 minút",
        ],
      },
    ],
    testimonials: [
      {
        name: "Zuzana",
        quote:
          "Chcela by som sa úprimne poďakovať za úžasnú shiatsu masáž. Cítim sa uvoľnená, plná energie a vnútornej harmónie. Martinov profesionálny prístup, citlivé ruky a hlboké porozumenie telu robia z jeho masáží skutočný zážitok. Ďakujem, že mi pomohol zbaviť sa napätia a priniesol mi pocit pohody. Určite sa rada opäť vrátim!",
      },
      {
        name: "Zuzana",
        quote:
          "Odporúčam vyskúšať tento tip masáže. Martin pracuje v Malackách ale urcite nájdete aj v Trnave, stačí dať do Google shiatsu masáž. Ja som ju absolvovala 2x a ten pocit potom je neuveriteľný. A osobne odporúčam Martina.",
      },
      {
        name: "Katarin",
        quote:
          "Mala som možnosť vyskúšať, za čo velmi pekne ďakujem ))odporúčam túto skvelú harmonizujúcu masáž, ktorá zenergetizuje, uvoľní, lieči a nabudí. Martin si dáva velmi záležať a je citlivý a dôkladný masér 🙏😍",
      },
      {
        name: "Zlatica",
        quote:
          "Absolvovala som včera. Ten pocit na nezaplatenie neverila by som, aká som ohybná",
      },
      {
        name: "Viera",
        quote:
          "Mozem len potvrdit tieto mudre slova. Vcera som bola na Shiatsu masazi a spala som kludne a bez prerusenia celu noc az do rana, co sa mi v poslednej dobe casto nestava. Vdaka nej som zistila, ktoremu organu mojho tela sa mam viac venovat a podporovat ho. Vrelo doporucujem kazdemu, kto by chcel ziskat take znalosti, viac porozumiet svojmu telu a v neposlednom rade dostat cenne rady. Matko dakujem Ti velmi pekne za Tvoju trpezlivost, sikovne a lieciace ruky a velmi prijemne prostredie, v ktorom som sa dobre citila a urcite aj oddychla. Prajem Ti vela spokojnych zakaznikov, nech sa Ti dari a urcite sa este ozvem, ked budem citit, ze potrebujem zopakovat tuto techniku, zrevitalizovat si svoje telo a posilnit funkciu svojich oslabenych organ",
      },
    ],
  },
  "pravidelne-ocisty": {
    kind: "service",
    slug: "pravidelne-ocisty",
    title: "Jarná očista",
    description:
      "Päťdňová očista s denným menu pripraveným podľa piatich elementov a s možnosťou doplnkového balíka.",
    hero: {
      eyebrow: "Sezónny reštart",
      title: "Jeseň aj jar sú vhodné obdobie na upratovanie v našich príbytkoch aj v našom tele",
      description:
        "Jeseň 🍂🍁🎋je rovnako ako aj jar vhodné obdobie na upratovanie v našich príbytkoch 🏠, ale rovnakú pozornosť si zaslúži aj naše telo 🕺🏾💃. . Počas očisty sa z tela vyplavujú nahromadené toxíny, tráviaci trakt sa prečistí a telo je schopné oveľa lepšie príjmať vitamíny a minerály. Prirodzene sa nám zvýši imunita a celkovo to blahodárne vplýva aj na našu vitalitu. 🌈 V našom Bistre už pravideľne dva krát do roka takútu očistu ponúkame na jar a na jeseň.",
      image: "/uploads/zivy-klub/ocista-hero.jpg",
      imageAlt: "Pravidelné očisty",
    },
    badges: ["5 dní jedla", "Ranné vyzdvihnutie v Bistre", "Balík PLUS aj s doplnkom"],
    gallery: [
      "/uploads/zivy-klub/ocista-hero.jpg",
      "/mirror/site/wp-content/uploads/2025/03/1A2A3734-scaled-1-1024x683.jpg",
      "/mirror/site/wp-content/uploads/2025/03/DSC_1562-1-2048x1363-1-1024x682.jpg",
    ],
    formSubject: "Dopyt na pravidelnú očistu",
    sections: [
      {
        title: "Ako očista prebieha",
        text: [
          "Náš tím každý deň nad ránom pripraví 3 balíčky jedla na celý deň: raňajky, obed a večeru. Menu bude zostavené v súlade s piatimi elementami a každý deň podporíme iný element.",
          "Strava nebude obsahovať žiaden tuk, strukoviny ani cukor, čiže ani žiadne ovocie. Takto pripravené jedlo z kapacitných dôvodov nerozvážame a bude pripravené na vyzdvihnutie už od pol ôsmej v našom Bistre.",
        ],
      },
      {
        title: "Denný plán",
        bullets: [
          "Pondelok: špalda, zelená zelenina, kyslá kapusta",
          "UTOROK / pohánka, kukurica, červená zelenina , čínska kapusta",
          "STREDA / pšeno, nahý ovos, oranžová zelenina, šalátová uhorka, karfiol",
          "ŠTVRTOK / natural ryža, biela zelenina",
          "PIATOK / pohánka / strukovina, mrkva",
        ],
      },
      {
        title: "Balíčky a cenník",
        bullets: [
          "Základná očista - (65 EUR) Obsahuje jedlo na 5 dní (raňajky, obedy a večere) eko obaly",
          "Očista PLUS - (90 EUR) Obsahuje jedlo na 5 dní (raňajky, obedy a večere) eko obaly a 1 výživový doplnok na obdobie 1 mesiaca podľa Vášho výberu.",
        ],
        note:
          "Platba: Po registrácii je potrebné očistu zaplatiť najneskôr 4 dni pred Vašim termínom buď v hotovosti v našom Bistre, alebo TU:",
      },
    ],
  },
  "spolocny-stol-radosti": {
    kind: "service",
    slug: "spolocny-stol-radosti",
    title: "Spoločný stôl radosti",
    description:
      "Víkend plný varenia, pohybu a spoločného času v Penzióne Harmónia v Modre.",
    hero: {
      eyebrow: "Víkendový pobyt",
      title: "Víkend plný varenia, pohybu a spoločného času",
      description:
        "Pozývam vás na víkendový pobyt pri veľkom stole, dobrom jedle a pokojnom tempe. Budeme spolu variť, jesť, hýbať sa, oddychovať a rozprávať sa o veciach, ktoré robia život jednoduchší a zdravší.",
      image: "/uploads/spolocny-stol-radosti/zvonku.jpeg",
      imageAlt: "Penzión Harmónia v Modre",
    },
    intro:
      "Penzión Harmónia - Modra, časť Harmónia. Termín: 19. - 21. jún. Malá skupina do 8 ľudí. Cena: 220 EUR / osoba alebo 400 EUR za manželský pár.",
    badges: [
      "Penzión Harmónia - Modra, Harmónia",
      "19. - 21. jún",
      "220 EUR / osoba",
      "400 EUR / pár",
    ],
    gallery: [
      "/uploads/spolocny-stol-radosti/zvonku.jpeg",
      "/uploads/spolocny-stol-radosti/stol.jpeg",
      "/uploads/spolocny-stol-radosti/obyvacka.jpeg",
    ],
    formSubject: "Dopyt na pobyt Spoločný stôl radosti",
    sections: [
      {
        title: "Pozvánka",
        text: [
          "Pozývam vás na víkendový pobyt, ktorý vznikol z jednoduchej myšlienky.",
          "Veľký stôl. Dobré jedlo. Ľudia, ktorí majú chuť spomaliť a stráviť spolu čas.",
          "Varenie je pre mňa viac než práca. Je to spôsob, ako sa stretnúť, ako sa porozprávať, ako si oddýchnuť a ako sa niečo naučiť o sebe aj o živote.",
          "Počas tohto víkendu budeme spolu variť, jesť, hýbať sa, oddychovať a rozprávať sa o veciach, ktoré robia život jednoduchší a zdravší.",
          "Nebude to len kurz varenia. Bude to spoločný čas pri jednom stole.",
        ],
      },
      {
        title: "Čo nás čaká",
        text: [
          "Počas pobytu budeme pripravovať vyváženú rastlinnú stravu, ktorá je jednoduchá, výživná a dá sa ľahko preniesť do bežného života.",
          "Nebudeme len variť. Budeme sa spolu učiť rozumieť jedlu a tomu, ako nás ovplyvňuje.",
          "Tieto veci vysvetlím jednoducho a prakticky tak, aby ste si z víkendu odniesli niečo, čo môžete používať každý deň.",
        ],
        bullets: [
          "rovnováha yin a yang v jedle a živote",
          "ako prispôsobiť stravu ročnému obdobiu",
          "ako mení energiu potravín spôsob varenia, krájania a úpravy",
          "prečo je dôležité jesť spolu a nie v rýchlosti",
        ],
      },
      {
        title: "Piatok",
        bullets: [
          "príchod",
          "spoločné varenie večere",
          "zoznámenie a prvé posedenie pri stole",
        ],
        note: "Program bude prirodzený a pokojný. Nebudeme sa nikam ponáhľať.",
      },
      {
        title: "Sobota",
        bullets: [
          "ranné rozhýbanie tela",
          "spoločná príprava raňajok, obeda a večere - nie je to povinné, môžete len prísť k stolu na jedlo",
          "popoludňajší oddych alebo prechádzka v prírode",
          "večera podľa počasia - grilovanie, opekanie na ohni, posedenie vonku alebo sauna",
        ],
        note:
          "Keďže leto patrí podľa tradičnej čínskej medicíny elementu ohňa, budeme sa dotýkať aj tejto témy - energie radosti, pohybu, hudby a spoločnosti.",
      },
      {
        title: "Nedeľa",
        bullets: [
          "pokojné ráno",
          "spoločná príprava slávnostného obeda",
          "záverečné posedenie pri stole",
          "odchod domov",
        ],
      },
      {
        title: "Čo je v cene",
        bullets: [
          "ubytovanie na 2 noci",
          "všetky spoločné jedlá - raňajky, obedy, večere",
          "kurz a spoločné varenie",
          "ranné pohybové rozcvičky",
          "spoločný program počas víkendu",
        ],
      },
      {
        title: "Ubytovanie",
        text: [
          "Útulne zariadená chatka pre osem osôb je trojpodlažná a disponuje s jednou jednolôžkovou, s dvomi dvojlôžkovými a s jednou trojlôžkovou izbou.",
          "Taktiež má priestrannú obývaciu miestnosť s televízorom, vybavenú kuchynku s jedálenským kútom a dve kúpeľne. Terasa ponúka príjemné posedenie v tieni stromov.",
        ],
      },
      {
        title: "Pre koho je pobyt vhodný",
        bullets: [
          "pre ľudí, ktorí majú radi jedlo a chcú sa naučiť variť jednoduchšie",
          "pre tých, ktorí chcú spomaliť a na chvíľu vypnúť z každodenného tempa",
          "pre ľudí, ktorí radi trávia čas v prírode",
          "pre tých, ktorí chcú zažiť atmosféru spoločného stola",
        ],
        note:
          "Skupina bude malá - maximálne 8 ľudí, aby sme mali dostatok priestoru na spoločný čas aj rozhovory.",
      },
      {
        title: "Myšlienka do budúcna",
        text: [
          "Tento víkend je začiatok.",
          "Ak sa myšlienka spoločného stola ujme, budú postupne vznikať ďalšie pobyty počas roka. Každý z nich sa môže viac venovať jednému z piatich elementov a tomu, ako ovplyvňuje jedlo, pohyb a náš život.",
        ],
      },
    ],
  },
  kontakt: {
    kind: "contact",
    slug: "kontakt",
    title: "Kontakt",
    description:
      "Kontaktujte Živý Klub Zdravia v Malackách a napíšte, o ktorú službu máte záujem.",
    hero: {
      eyebrow: "Kontakt",
      title: "Máte nejaké otázky?",
      description:
        "Jednoducho napíšte krátku správu s čím by ste potrebovali poradiť a my sa Vám za okamih ozveme.",
      image: "/mirror/site/wp-content/uploads/2025/03/1A2A3089-2048x1365-1-1024x683.jpg",
      imageAlt: "Kontakt",
    },
    companyInfo: [
      "Živý Klub Zdravia s.r.o.",
      "Kukučínova 142/88, 901 01 Malacky",
      "IČO 52594904",
      "DIČ 2121093227",
      "Spoločnosť je zapísaná v Obchodnom registri Mestského súdu Bratislava III vložka 140454/B",
    ],
    formSubject: "Dopyt z kontaktnej stránky",
  },
};

export function getPage(segments?: string[]) {
  const slug = (segments ?? []).join("/");
  return pages[slug] ?? null;
}

export function getAllSlugs() {
  return Object.keys(pages);
}

export function getServicePages() {
  return Object.values(pages).filter((page): page is ServicePage => page.kind === "service");
}
