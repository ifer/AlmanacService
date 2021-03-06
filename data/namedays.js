const mobileNameMap = new Map([
    [-43, ['ΘΕΟΔ', 'ΘΟΔ', 'ΘΕΌΔ', 'ΘΌΔ', 'THEOD', 'THOD']],
    [-8, ['ΛΑΖΑΡ', 'ΛΆΖΑΡ', 'LAZAR']],
    [0, ['ΑΝΑΣΤ', 'ΤΑΣ', 'ΛΑΜΠ', 'ΠΑΣΧ', 'ΤΆΣ', 'ΛΆΜΠ', 'ANAST', 'TAS', 'LAMB', 'LAB', 'LAMB', 'PASX', 'PASCH']],
    [5, ['ΖΩΗ', 'ΖΩΉ', 'ZOI', 'ZOH', 'ZOE']],
    [7, ['ΘΩΜ', 'THOM']],
]);

const fixedNameMap = new Map([
    [
        '0101',
        ['ΒΑΣΙΛ', 'ΒΙΚΗ', 'BIKΥ', 'ΚΙΚΗ', 'ΒΑΣΊΛ', 'ΒΊΚΗ', 'BΊKΥ', 'ΚΙΚΗ', 'VASIL', 'VASSIL', 'VIKI', 'VIKY', 'KIKI'],
    ],
    ['0103', ['ΕΥΔΟΚΙΑ', 'ΕΥΔΟΚΊΑ', 'EVDOKIA']],
    [
        '0107',
        [
            'ΑΝΑΡΓΥΡΟΣ',
            'ΑΡΓΥΡ',
            'ΚΟΣΜΑΣ',
            'ΔΑΜΙΑΝ',
            'ΑΝΆΡΓΥΡΟΣ',
            'ΑΡΓΎΡ',
            'ΚΟΣΜΆΣ',
            'ANARGIROS',
            'ANARGYROS',
            'ARGIR',
            'ARGYR',
            'KOSMAS',
            'DAMIAN',
        ],
    ],
    [
        '0111',
        [
            'ΑΝΑΡΓΥΡΟΣ',
            'ΑΡΓΥΡ',
            'ΚΟΣΜΑΣ',
            'ΔΑΜΙΑΝ',
            'ΑΝΆΡΓΥΡΟΣ',
            'ΑΡΓΎΡ',
            'ΚΟΣΜΆΣ',
            'ANARGIROS',
            'ANARGYROS',
            'ARGIR',
            'ARGYR',
            'KOSMAS',
            'DAMIAN',
        ],
    ],
    ['0310', ['ΔΙΟΝΥΣ', 'ΝΤΕΝ', 'ΔΙΟΝΎΣ', 'ΝΤΈΝ', 'DIONIS', 'DENI']],
    ['0406', ['ΜΑΡΘΑ', 'ΜΆΡΘΑ', 'MARTHA']],
    ['0412', ['ΒΑΡΒΑΡΑ', 'ΒΑΡΒΆΡΑ', 'VARVARA']],
    ['0505', ['ΕΙΡΗΝ', 'ΕΙΡΉΝ', 'EIRIN']],
    ['0512', ['ΣΑΒΒ', 'ΣΆΒΒ', 'SAV']],
    [
        '0601',
        [
            'ΦΩΤ',
            'ΦΑΝ',
            'ΟΥΡΑΝΙΑ',
            'ΡΑΝΙΑ',
            'ΘΕΟΧΑΡΗΣ',
            'ΦΏΤ',
            'ΦΆΝ',
            'ΟΥΡΑΝΊΑ',
            'ΡΆΝΙΑ',
            'ΘΕΟΧΆΡΗΣ',
            'FOT',
            'FAN',
            'OURANIA',
            'RANIA',
            'THEOHARIS',
            'THEOXARIS',
        ],
    ],
    ['0608', ['ΣΩΤΗΡ', 'ΣΩΤΉΡ', 'SOTIR']],
    ['0612', ['ΝΙΚ', 'ΝΊΚ', 'NIK']],
    ['0701', ['ΙΩΑΝ', 'ΓΙΑΝ', 'ΠΡΟΔΡ', 'ΙΩΆΝ', 'ΓΙΆΝ', 'ΠΡΌΔΡ', 'IOAN', 'GIAN', 'YIAN', 'YAN', 'PRODR']],
    ['0707', ['ΚΥΡΙΑΚ', 'ΚΥΡΙΆΚ', 'KIRIAK', 'KYRIAK']],
    ['0806', ['ΚΑΛΛΙΟΠΗ', 'ΠΟΠΗ', 'ΚΑΛΛΙΌΠΗ', 'ΠΌΠΗ', 'KALLIOPI', 'POPI']],
    ['0809', ['ΧΑΡΑ', 'ΧΑΡΆ', 'HARA', 'XARA', 'CHARA']],
    [
        '0811',
        [
            'ΜΙΧΑ',
            'ΓΑΒΡΙΗΛ',
            'ΑΓΓΕΛ',
            'ΣΤΑΜΑΤ',
            'ΜΙΧΆ',
            'ΓΑΒΡΙΉΛ',
            'ΆΓΓΕΛ',
            'ΣΤΑΜΆΤ',
            'MIXA',
            'MIHA',
            'GAVRIHL',
            'GAVRIL',
            'AGGEL',
            'ANGEL',
            'STAMAT',
        ],
    ],
    ['0905', ['ΧΡΙΣΤΟΦΟΡΟΣ', 'ΧΡΙΣΤΌΦΟΡΟΣ', 'XRISTOFOROS', 'CHRISTOFOROS']],
    ['0911', ['ΝΕΚΤΑΡ', 'ΝΕΚΤΆΡ', 'NEKTAR']],
    ['0912', ['ΑΝΝΑ', 'ΆΝΝΑ', 'ANNA']],
    ['1002', ['ΧΑΡ', 'ΧΑΡΙΚΛΕΙΑ', 'ΜΠΑΜΠΗΣ', 'ΧΆΡ', 'ΧΑΡΊΚΛΕΙΑ', 'ΜΠΆΜΠΗΣ', 'HAR', 'HARIKLEIA', 'MPAMPIS', 'BABIS']],
    ['1107', ['ΕΥΦΗΜ', 'ΟΛΓΑ', 'ΌΛΓΑ', 'EYFIM', 'EFIM', 'OLGA']],
    ['1109', ['ΕΥΑΝΘΙΑ', 'ΕΥΗ', 'ΕΦΗ', 'ΕΥΑΝΘΊΑ', 'ΕΎΗ', 'ΈΦΗ', 'EVANTHIA', 'EVI', 'EFI']],
    ['1212', ['ΣΠΥΡ', 'ΣΠΎΡ', 'SPIR']],
    ['1309', ['ΑΡΙΣΤΕΙΔΗΣ', 'ΑΡΗΣ', 'ΑΡΙΣΤΕΊΔΗΣ', 'ΆΡΗΣ', 'ARISTIDES', 'ARISTIDIS', 'ARIS', 'ΚΟΡΝΗΛ', 'KORNILIOS']],
    ['1311', ['ΧΡΥΣΟΣΤ', 'ΧΡΥΣΌΣΤ', 'XRISOST', 'XRYSOST', 'CHRYSOST']],
    ['1312', ['ΕΥΣΤΡ', 'ΣΤΡAT', 'ΣΤΡΆT', 'EFSTR', 'STRAT']],
    ['1409', ['ΣΤΑΥΡ', 'ΣΤΑΎΡ', 'STAVR']],
    ['1411', ['ΦΙΛΙΠΠ', 'ΦΊΛΙΠΠ', 'FILIP', 'PHILIP']],
    ['1504', ['ΛΕΩΝΙΔΑΣ', 'ΛΕΩΝΊΔΑΣ', 'LEONIDAS']],
    ['1505', ['ΑΧΙΛΛ', 'AHIL']],
    ['1508', ['ΜΑΡΙ', 'ΠΑΝΑΓ', 'ΔΕΣΠ', 'ΜΑΡΊ', 'ΜΆΡΙ', 'ΠΑΝΆΓ', 'ΔΈΣΠ', 'MARI', 'PANAG', 'DESP', 'ΤΑΚΗΣ', 'TAKIS']],
    ['1509', ['ΝΙΚΗΤΑΣ', 'ΝΙΚΉΤΑΣ', 'NIKITAS']],
    ['1512', ['ΕΛΕΥΘΕΡ', 'ΛΕΥΤ', 'ΕΛΕΥΘΈΡ', 'ELEFTHER', 'LEFT']],
    ['1603', ['ΧΡΙΣΤΟΔΟΥΛ', 'ΧΡΙΣΤΌΔΟΥΛ', 'CHRISTODOUL', 'XRISTODOUL']],
    ['1701', ['ΑΝΤΩΝ', 'ΤΟΝ', 'ΑΝΤΏΝ', 'ΤΌΝ', 'ANTON']],
    ['1705', ['ΑΝΔΡΟΝ', 'ΝΙΚΗ', 'ΑΝΔΡΌΝ', 'ΝΊΚΗ', 'ANDRONIK', 'NIKI']],
    ['1707', ['ΜΑΡΙΝ', 'ΜΑΡΊΝ', 'MARIN']],
    ['1709', ['ΣΟΦΙΑ', 'ΕΛΠΙΔΑ', 'ΑΓΑΠΗ', 'ΣΟΦΊΑ', 'ΕΛΠΊΔΑ', 'ΑΓΆΠΗ', 'SOFIA', 'SOPHIA', 'ELPIDA', 'AGAPI']],
    ['1712', ['ΔΙΟΝΥΣ', 'NTEN', 'ΔΙΟΝΎΣ', 'NTΈN', 'DIONIS', 'DIONYS', 'DEN']],
    ['1801', ['ΑΘΑΝ', 'ΘΑΝ', 'ΝΑΣΟΣ', 'ΚΥΡΙΛ', 'ΘΆΝ', 'ΝΆΣΟΣ', 'ΚΎΡΙΛ', 'ATHAN', 'TON', 'THAN', 'NASOS', 'KIRIL']],
    ['1810', ['ΛΟΥΚΑΣ', 'ΛΟΥΚΆΣ', 'LOUKAS']],
    ['2001', ['ΕΥΘΥΜ', 'ΘΥΜ', 'ΕΦΗ', 'ΕΥΘΎΜ', 'ΘΎΜ', 'ΈΦΗ', 'EFTHIM', 'THIM', 'EFI', 'ΦΑΙΗ', 'FAYE']],
    ['2005', ['ΛΥΔΙΑ', 'ΛΥΔΊΑ', 'LYDIA']],
    ['2007', ['ΗΛΙΑΣ', 'ΗΛΊΑΣ', 'ILIAS']],
    ['2009', ['ΕΥΣΤΑΘ', 'ΣΤΑΘ', 'ΕΥΣΤΆΘ', 'ΣΤΆΘ', 'EFSTATH', 'STATH']],
    ['2010', ['ΑΡΤΕΜ', 'ΓΕΡΑΣ', 'ΑΡΤΈΜ', 'ΓΕΡΆΣ', 'ARTEM', 'GERAS']],
    [
        '2105',
        [
            'ΚΩΝΣΤΑΝΤ',
            'ΚΩΣΤ',
            'ΕΛΕΝ',
            'ΚΩΣΤ',
            'ΕΛΈΝ',
            'ΈΛΕΝ',
            'ΝΤΙΝΑ',
            'ΝΤΊΝΑ',
            'ΝΊΝΑ',
            'ΝΙΝΑ',
            'KONSTANT',
            'KOST',
            'ELENI',
            'DINA',
            'NINA',
        ],
    ],
    ['2101', ['ΜΑΞΙΜ', 'ΠΑΤΡΟΚΛΟΣ', 'ΜΆΧΙΜ', 'ΠΆΤΡΟΚΛΟΣ', 'MAXIM', 'PATROKLOS']],
    ['2110', ['ΧΡΙΣΤΟΔΟΥΛ', 'ΧΡΙΣΤΌΔΟΥΛ', 'CHRISTODOUL', 'XRISTODOUL']],
    [
        '2111',
        [
            'ΜΑΡΙ',
            'ΠΑΝΑΓ',
            'ΔΕΣΠ',
            'ΜΑΡΊ',
            'ΜΆΡΙ',
            'ΜΑΪΡΑ',
            'ΜΑΙΡΑ',
            'MAIRA',
            'ΠΑΝΆΓ',
            'ΔΈΣΠ',
            'ΤΑΚΗΣ',
            'ΤΆΚΗΣ',
            'MARI',
            'PANAG',
            'DESP',
            'TAKIS',
        ],
    ],
    ['2207', ['ΜΑΓΔ', 'ΜΑΡΚΕΛ', 'ΜΆΓΔ', 'ΜΑΡΚΈΛ', 'MAGD', 'MARKEL']],
    [
        '2304',
        [
            'ΓΕΩΡΓ',
            'ΓΙΩΡΓ',
            'ΓΩΓΩ',
            'ΓΙΟΥΛΑ',
            'ΤΖΙΝΑ',
            'ΓΕΏΡΓ',
            'ΓΙΏΡΓ',
            'ΓΩΓΏ',
            'ΓΙΟΎΛΑ',
            'ΤΖΊΝΑ',
            'GEORG',
            'GIORG',
            'GOGO',
            'GIOULA',
            'TZINA',
            'GINA',
        ],
    ],
    ['2310', ['ΙΑΚΩΒ', 'ΙΑΚΏΒ', 'IAKOV']],
    ['2401', ['ΞΕΝΗ', 'ΞΈΝΗ', 'XENI']],
    ['2404', ['ΕΛΙΣΑΒΕΤ', 'ΕΛΛΗ', 'ΕΛΙΣΆΒΕΤ', 'ΈΛΛΗ', 'ELISAVET', 'ELLI', 'ELI']],
    ['2412', ['ΕΥΓΕΝ', 'ΤΡΙΣΕΥΓΕΝΗ', 'ΕΥΓΈΝ', 'ΤΡΙΣΕΎΓΕΝΗ', 'EVGEN', 'TRISEVGENI']],
    ['2501', ['ΓΡΗΓΟΡ', 'ΜΑΡΓΑΡΙΤΑ', 'ΓΡΗΓΌΡ', 'ΜΑΡΓΑΡΊΤΑ', 'GRIGOR', 'MARGARITA']],
    ['2503', ['ΕΥΑΓΓ', 'ΒΑΓΓΕ', 'ΑΓΓΕΛ', 'ΕΥΆΓΓ', 'ΒΑΓΓΈ', 'ΆΓΓΕΛ', 'EVAG', 'VAGE', 'ANGEL', 'VANGE', 'AGEL', 'ANGEL']],
    ['2504', ['ΜΑΡΚ', 'ΜΆΡΚ', 'MARK']],
    ['2511', ['ΑΙΚΑΤΕΡ', 'ΚΑΤΕΡ', 'AIKATER', 'KATER']],
    [
        '2512',
        [
            'ΧΡΗΣΤ',
            'ΧΡΙΣΤ',
            'ΕΜΜΑΝ',
            'ΜΑΝΩΛ',
            'ΜΑΝΟΣ',
            'ΧΡΥΣ',
            'ΧΡΉΣΤ',
            'ΧΡΊΣΤ',
            'ΜΑΝΏΛ',
            'ΜΆΝΟΣ',
            'ΧΡΥΣ',
            'XRIS',
            'XRHST',
            'XRYS',
            'CHRIS',
            'CHRHST',
            'CHRYS',
            'EMMAN',
            'MANOL',
            'MANOS',
        ],
    ],
    ['2601', ['ΞΕΝΟΦ', 'XENOF']],
    ['2607', ['ΠΑΡΑΣΚΕΥ', 'ΒΟΥΛΑ', 'ΒΟΎΛΑ', 'PARASKE', 'VOULA']],
    ['2609', ['ΘΕΟΛ', 'THEOL']],
    ['2610', ['ΔΗΜ', 'ΔΉΜ', 'DIM']],
    ['2611', ['ΣΤΥΛ', 'ΣΤΕΛ', 'ΣΤΈΛ', 'STIL', 'STYL', 'STEL']],
    ['2612', ['ΕΜΜΑΝ', 'ΜΑΝΩΛ', 'ΜΑΝΟΣ', 'ΙΩΣΗΦ', 'ΜΑΝΏΛ', 'ΜΆΝΟΣ', 'EMMAN', 'ΙΩΣΉΦ', 'MANOL', 'MANOS', 'IOSIF']],
    ['2707', ['ΠΑΝΤΕΛ', 'PANTEL']],
    ['2712', ['ΣΤΕΦΑΝ', 'ΣΤΈΦΑΝ', 'STEFAN', 'STEPHAN']],
    ['2805', ['ΕΥΤΥΧ', 'ΕΥΤΎΧ', 'EFTIX']],
    ['2906', ['ΠΕΤΡ', 'ΠΙΕΡ', 'ΠΑΥΛ', 'ΠΈΤΡ', 'ΠΑΎΛ', 'PETR', 'PIER', 'PAVL']],
    ['2909', ['ΚΥΡΙΑΚ', 'ΚΥΡΙΆΚ', 'KYRIAK', 'KIRIAK']],
    ['3006', ['ΑΠΟΣΤΟΛ', 'ΑΠΌΣΤΟΛ', 'ΑΠΟΣΤΌΛ', 'APOSTOL']],
    ['3008', ['ΑΛΕΞ', 'ΑΛΈΞ', 'ALEX', 'ΑΛΕΚ', 'ΑΛΈΚ', 'ALEK']],
    ['3011', ['ΑΝΔΡ', 'ΆΝΔΡ', 'ANDR']],
    ['3101', ['ΕΥΔΟΞ', 'EVDOX']],
    ['0509', ['ΖΑΧΑΡ', 'ZAHAR', 'ZACHAR']],
    ['0802', ['ΖΑΧΑΡ', 'ZAHAR', 'ZACHAR']],
    ['1011', ['ΟΡΕΣΤΗΣ', 'ORESTIS']],
]);

module.exports = { mobileNameMap, fixedNameMap };
