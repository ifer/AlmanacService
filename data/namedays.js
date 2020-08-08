const mobileNameMap = new Map([
    [-43, ['ΘΕΟΔ', 'ΘΟΔ', 'THEOD', 'THOD']],
    [-8, ['ΛΑΖΑΡ', 'LAZAR']],
    [0, ['ΑΝΑΣΤ', 'ΤΑΣ', 'ΛΑΜΠ', 'ΠΑΣΧ', 'ANAST', 'TAS', 'LAMB', 'LAB', 'LAMB', 'PASX']],
    [5, ['ΖΩΗ', 'ZOI', 'ZOH', 'ZOE']],
    [7, ['ΘΩΜ', 'THOM']],
]);

const fixedNameMap = new Map([
    ['0101', ['ΒΑΣΙΛ', 'VASIL']],
    ['0103', ['ΕΥΔΟΚΙΑ', 'EVDOKIA']],
    [
        '0107',
        ['ΑΝΑΡΓΥΡΟΣ', 'ΑΡΓΥΡ', 'ΚΟΣΜΑΣ', 'ΔΑΜΙΑΝ', 'ANARGIROS', 'ANARGYROS', 'ARGIR', 'ARGYR', 'KOSMAS', 'DAMIAN'],
    ],
    ['0111', ['ΑΝΑΡΓΥΡ', 'ΚΟΣΜΑΣ', 'ΔΑΜΙΑΝΟΣ', 'ΑΡΓΥΡ', 'ANARGIR', 'ANARGYR', 'ARGYR', 'ARGIR', 'KOSMAS', 'DAMIANOS']],
    ['0310', ['ΔΙΟΝΥΣ', 'ΝΤΕΝ', 'DIONIS', 'DENI']],
    ['0406', ['ΜΑΡΘΑ', 'MARTHA']],
    ['0412', ['ΒΑΡΒΑΡΑ', 'VARVARA']],
    ['0505', ['ΕΙΡΗΝ', 'EIRIN', 'IRIN', 'IREN']],
    ['0512', ['ΣΑΒΒ', 'SAV']],
    [
        '0601',
        ['ΦΩΤ', 'ΦΑΝ', 'ΟΥΡΑΝΙΑ', 'ΡΑΝΙΑ', 'ΘΕΟΧΑΡΗΣ', 'FOT', 'FAN', 'OURANIA', 'RANIA', 'THEOHARIS', 'THEOXARIS'],
    ],
    ['0608', ['ΣΩΤΗΡ', 'SOTIR']],
    ['0612', ['ΝΙΚ', 'NIK']],
    ['0701', ['ΙΩΑΝ', 'ΓΙΑΝ', 'ΠΡΟΔΡ', 'IOAN', 'GIAN', 'YIAN', 'YAN', 'PRODR']],
    ['0707', ['ΚΥΡΙΑΚ', 'KIRIAK', 'KYRIAK']],
    ['0809', ['ΧΑΡΑ', 'HARA', 'XARA']],
    ['0811', ['ΜΙΧΑ', 'ΓΑΒΡΙΗΛ', 'ΑΓΓΕΛ', 'ΣΤΑΜΑΤ', 'MIXA', 'MIHA', 'GAVRIHL', 'GAVRIL', 'AGGEL', 'ANGEL', 'STAMAT']],
    ['0905', ['ΧΡΙΣΤΟΦΟΡΟΣ', 'XRISTOFOROS']],
    ['0911', ['ΝΕΚΤΑΡ', 'NEKTAR']],
    ['0912', ['ΑΝΝΑ', 'ANNA']],
    ['1002', ['ΧΑΡ', 'ΧΑΡΙΚΛΕΙΑ', 'ΜΠΑΜΠΗΣ', 'HAR', 'HARIKLEIA', 'MPAMPIS', 'BABIS']],
    ['1107', ['ΕΥΦΗΜ', 'ΟΛΓΑ', 'EYFIM', 'EFIM', 'OLGA']],
    ['1109', ['ΕΥΑΝΘΙΑ', 'ΕΥΗ', 'ΕΦΗ', 'EVANTHIA', 'EVI', 'EFI']],
    ['1212', ['ΣΠΥΡ', 'SPIR']],
    ['1309', ['ΑΡΙΣΤΕΙΔΗΣ', 'ΑΡΗΣ', 'ARISTIDES', 'ARISTIDIS', 'ARIS', 'ΚΟΡΝΗΛ', 'KORNILIOS']],
    ['1311', ['ΧΡΥΣΟΣΤ', 'XRISOST', 'XRYSOST']],
    ['1312', ['ΕΥΣΤΡ', 'ΣΤΡAT', 'EFSTR', 'STRAT']],
    ['1409', ['ΣΤΑΥΡ', 'STAVR']],
    ['1411', ['ΦΙΛΙΠΠ', 'FILIP']],
    ['1504', ['ΛΕΩΝΙΔΑΣ', 'LEONIDAS']],
    ['1505', ['ΑΧΙΛΛ', 'AHIL']],
    ['1508', ['ΜΑΡΙ', 'ΠΑΝΑΓ', 'ΔΕΣΠ', 'MARI', 'PANAG', 'DESP', 'ΤΑΚΗΣ', 'TAKIS']],
    ['1509', ['ΝΙΚΗΤΑΣ', 'NIKITAS']],
    ['1512', ['ΕΛΕΥΘΕΡ', 'ΛΕΥT', 'ELEFTHER', 'LEFT']],
    ['1701', ['ΑΝΤΩΝ', 'ΤΟΝ', 'ANTON']],
    ['1705', ['ΑΝΔΡΟΝΙΚ', 'ΝΙΚΗ', 'ANDRONIK', 'NIKI']],
    ['1707', ['ΜΑΡΙΝ', 'MARIN']],
    ['1709', ['ΣΟΦΙΑ', 'ΕΛΠΙΔΑ', 'ΑΓΑΠΗ', 'SOFIA', 'ELPIDA', 'AGAPI']],
    ['1712', ['ΔΙΟΝΥΣ', 'NTEN', 'DIONIS', 'DIONYS', 'DEN']],
    ['1801', ['ΑΘΑΝ', 'ΘΑΝ', 'ΝΑΣΟΣ', 'ΚΥΡΙΛ', 'ATHAN', 'TON', 'THAN', 'NASOS', 'KIRIL']],
    ['1810', ['ΛΟΥΚΑΣ', 'LOUKAS']],
    ['2001', ['ΕΥΘΥΜ', 'ΘΥΜ', 'ΕΦΗ', 'EFTHIM', 'THIM', 'EFI', 'ΦΑΙΗ', 'FAYE']],
    ['2005', ['ΛΥΔΙΑ', 'LYDIA']],
    ['2007', ['ΗΛΙΑΣ', 'ILIAS']],
    ['2009', ['ΕΥΣΤΑΘ', 'ΣΤΑΘ', 'EFSTATH', 'STATH']],
    ['2010', ['ΑΡΤΕΜ', 'ΓΕΡΑΣ', 'ARTEM', 'GERAS']],
    ['2105', ['ΚΩΝΣΤΑΝΤ', 'ΚΩΣΤ', 'ΕΛΕΝΗ', 'KONSTANT', 'KOST', 'ELENI', 'ΝΤΙΝΑ', 'DINA', 'ΝΙΝΑ', 'NINA']],
    ['2111', ['ΜΑΡΙ', 'ΠΑΝΑΓ', 'ΔΕΣΠ', 'MARI', 'PANAG', 'DESP']],
    ['2207', ['ΜΑΓΔ', 'ΜΑΡΚΕΛ', 'MAGD', 'MARKEL']],
    ['2304', ['ΓΕΩΡΓ', 'ΓΙΩΡΓ', 'ΓΩΓΩ', 'ΓΙΟΥΛΑ', 'ΤΖΙΝΑ', 'GEORG', 'GIORG', 'GOGO', 'GIOULA', 'TZINA', 'GINA']],
    ['2310', ['ΙΑΚΩΒ', 'IAKOV']],
    ['2401', ['ΞΕΝΗ', 'XENI']],
    ['2404', ['ΕΛΙΣΑΒΕΤ', 'ΕΛΛΗ', 'ELISAVET', 'ELLI', 'ELI', 'ELISABETH']],
    ['2412', ['ΕΥΓΕΝ', 'ΤΡΙΣΕΥΓΕΝΗ', 'EVGEN', 'TRISEVGENI']],
    ['2501', ['ΓΡΗΓΟΡ', 'ΜΑΡΓΑΡΙΤΑ', 'GRIGOR', 'MARGARITA']],
    ['2503', ['ΕΥΑΓΓ', 'ΒΑΓΓΕ', 'ΑΓΓΕΛ', 'EVAG', 'VAGE', 'ANGEL', 'VANGE', 'AGEL', 'ANGEL']],
    ['2504', ['ΜΑΡΚ', 'MARK']],
    ['2511', ['ΑΙΚΑΤΕΡ', 'ΚΑΤΕΡ', 'AIKATER', 'KATER']],
    ['2512', ['ΧΡΗΣΤ', 'ΧΡΙΣΤ', 'ΕΜΜΑΝ', 'ΜΑΝΩΛ', 'ΧΡΥΣ', 'XRIST', 'XRHST', 'XRYS', 'EMMAN', 'MANOL']],
    ['2601', ['ΞΕΝΟΦ', 'XENOF']],
    ['2607', ['ΠΑΡΑΣΚΕΥ', 'ΒΟΥΛΑ', 'PARASKE', 'VOULA']],
    ['2609', ['ΘΕΟΛ', 'THEOL']],
    ['2610', ['ΔΗΜ', 'DIM']],
    ['2611', ['ΣΤΥΛ', 'ΣΤΕΛ', 'STIL', 'STYL', 'STEL']],
    ['2612', ['ΕΜΜΑΝ', 'ΜΑΝΩΛ', 'ΙΩΣΗΦ', 'EMMAN', 'MANOL', 'IOSIF']],
    ['2707', ['ΠΑΝΤΕΛ', 'PANTEL']],
    ['2712', ['ΣΤΕΦΑΝ', 'STEFAN']],
    ['2805', ['ΕΥΤΥΧ', 'EFTIX']],
    ['2906', ['ΠΕΤΡ', 'ΠΙΕΡ', 'ΠΑΥΛ', 'PETR', 'PIER', 'PAVL']],
    ['2909', ['ΚΥΡΙΑΚ', 'KYRIAK', 'KIRIAK']],
    ['3006', ['ΑΠΟΣΤΟΛ', 'APOSTOL']],
    ['3008', ['ΑΛΕΞ', 'ALEX']],
    ['3011', ['ΑΝΔΡ', 'ANDR']],
    ['3101', ['ΕΥΔΟΞ', 'EVDOX']],
    ['0509', ['ΖΑΧΑΡ', 'ZAHAR', 'ZACHAR']],
    ['0802', ['ΖΑΧΑΡ', 'ZAHAR', 'ZACHAR']],
]);

module.exports = { mobileNameMap, fixedNameMap };
