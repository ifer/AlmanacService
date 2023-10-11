const mobileNameMap = new Map([
    [-43, ['ΘΕΟΔΩΡΟΣ', 'ΘΕΟΔΩΡΑ']],
    [-8, ['ΛΑΖΑΡΟΣ']],
    [0, ['ΑΝΑΣΤΑΣΙΟΣ', 'ΤΑΣΟΣ', 'ΤΑΣΙΑ', 'ΛΑΜΠΗΣ', 'ΠΑΣΧΑΛΗΣ', 'ΠΑΣΧΑΛΙΑ']],
    [5, ['ΖΩΗ']],
    [7, ['ΘΩΜΑΣ']],
]);

const fixedNameMap = new Map([
    ['0101', ['ΒΑΣΙΛΗΣ', 'ΒΑΣΙΛΕΙΑ', 'ΒΑΣΙΛΙΚΗ', 'BIKΥ', 'ΚΙΚΗ']],
    ['0103', ['ΕΥΔΟΚΙΑ']],
    ['0107', ['ΑΝΑΡΓΥΡΟΣ', 'ΑΡΓΥΡΗΣ', 'ΚΟΣΜΑΣ', 'ΔΑΜΙΑΝΟΣ']],
    ['0111', ['ΑΝΑΡΓΥΡΟΣ', 'ΑΡΓΥΡΗΣ', 'ΚΟΣΜΑΣ', 'ΔΑΜΙΑΝΟΣ']],
    ['0310', ['ΔΙΟΝΥΣΙΟΣ', 'ΝΤΕΝΗΣ']],
    ['0406', ['ΜΑΡΘΑ']],
    ['0412', ['ΒΑΡΒΑΡΑ']],
    ['0505', ['ΕΙΡΗΝΗ']],
    ['0512', ['ΣΑΒΒΑΣ']],
    ['0601', ['ΦΩΤΗΣ', 'ΦΑΝΗΣ', 'ΦΩΤΕΙΝΗ', 'ΟΥΡΑΝΙΑ', 'ΡΑΝΙΑ', 'ΘΕΟΧΑΡΗΣ']],
    ['0608', ['ΣΩΤΗΡΗΣ', 'ΣΩΤΗΡΙΑ', 'ΣΩΤΗ']],
    ['0612', ['ΝΙΚΟΛΑΟΣ', 'ΝΙΚΟΣ', 'ΝΙΚΟΛΙΑ', 'NIKΟΛΕΤΤΑ']],
    ['0701', ['ΙΩΑΝΝΗΣ', 'ΓΙΑΝΝΗΣ', 'ΠΡΟΔΡΟΜΟΣ']],
    ['0707', ['ΚΥΡΙΑΚΟΣ', 'ΚΥΡΙΑΚΗ', 'ΚΟΥΛΗΣ']],
    ['0806', ['ΚΑΛΛΙΟΠΗ', 'ΠΟΠΗ']],
    ['0809', ['ΧΑΡΑ']],
    ['0811', ['ΜΙΧΑΗΛ', 'ΜΙΧΑΛΗΣ', 'ΓΑΒΡΙΗΛ', 'ΓΑΒΡΙΛΗΣ', 'ΑΓΓΕΛΟΣ', 'ΣΤΑΜΑΤΗΣ', 'ΑΓΓΕΛΙΚΗ', 'ΣΤΑΜΑΤΙΑ']],
    ['0905', ['ΧΡΙΣΤΟΦΟΡΟΣ']],
    ['0911', ['ΝΕΚΤΑΡΙΟΣ', 'ΝΕΚΤΑΡΙΑ']],
    ['0912', ['ΑΝΝΑ', 'ΑΝΝΥ']],
    ['1002', ['ΧΑΡΑΛΑΜΠΟΣ', 'ΧΑΡΙΚΛΕΙΑ', 'ΜΠΑΜΠΗΣ']],
    ['1107', ['ΕΥΦΗΜΙΑ', 'ΟΛΓΑ', 'ΕΦΗ']],
    ['1109', ['ΕΥΑΝΘΙΑ', 'ΕΥΗ', 'ΕΦΗ']],
    ['1212', ['ΣΠΥΡΙΔΩΝ', 'ΣΠΥΡΟΣ', 'ΣΠΥΙΔΟΥΛΑ']],
    ['1309', ['ΑΡΙΣΤΕΙΔΗΣ', 'ΑΡΗΣ', 'ΚΟΡΝΗΛΙΟΣ', 'ΚΟΡΝΗΛΙΑ', 'ΛΙΑ']],
    ['1311', ['ΧΡΥΣΟΣΤΟΜΟΣ']],
    ['1312', ['ΕΥΣΤΡΑΤΙΟΣ', 'ΣΤΡATΗΣ']],
    ['1409', ['ΣΤΑΥΡΟΣ', 'ΣΤΑΥΡΟΥΛΑ']],
    ['1411', ['ΦΙΛΙΠΠΟΣ']],
    ['1504', ['ΛΕΩΝΙΔΑΣ']],
    ['1505', ['ΑΧΙΛΛΕΑΣ']],
    ['1508', ['ΜΑΡΙΑ', 'ΜΑΡΙΟΣ', 'ΠΑΝΑΓΙΩΤΗΣ', 'ΤΑΚΗΣ', 'ΠΑΝΑΓΙΩΤΑ', 'ΓΙΩΤΑ', 'ΔΕΣΠΟΙΝΑ']],
    ['1509', ['ΝΙΚΗΤΑΣ']],
    ['1512', ['ΕΛΕΥΘΕΡΙΟΣ', 'ΕΛΕΥΘΕΡΙΑ', 'ΛΕΥΤΕΡΗΣ']],
    ['1603', ['ΧΡΙΣΤΟΔΟΥΛΟΣ']],
    ['1701', ['ΑΝΤΩΝΗΣ', 'ΑΝΤΩΝΙΑ', 'ΤΟΝΗΣ', 'ΤΟΝΙΑ']],
    ['1705', ['ΑΝΔΡΟΝΙΚΟΣ', 'ΑΝΔΡΟΝΙΚΗ', 'ΝΙΚΗ']],
    ['1707', ['ΜΑΡΙΝΑ', 'ΜΑΡΙΝΟΣ']],
    ['1709', ['ΣΟΦΙΑ', 'ΕΛΠΙΔΑ', 'ΑΓΑΠΗ']],
    ['1712', ['ΔΙΟΝΥΣΙΟΣ', 'ΔΙΟΝΥΣΙΑ', 'NTENΗΣ']],
    ['1801', ['ΑΘΑΝΑΣΙΟΣ', 'ΑΘΑΝΑΣΙΑ', 'ΘΑΝΟΣ', 'ΝΑΣΟΣ', 'ΚΥΡΙΛΛΟΣ']],
    ['1810', ['ΛΟΥΚΑΣ']],
    ['2001', ['ΕΥΘΥΜΙΟΣ', 'ΕΥΘΥΜΙΑ', 'ΘΥΜΙΟΣ', 'ΕΦΗ', 'ΦΑΙΗ']],
    ['2005', ['ΛΥΔΙΑ']],
    ['2007', ['ΗΛΙΑΣ']],
    ['2009', ['ΕΥΣΤΑΘΙΟΣ', 'ΕΥΣΤΑΘΙΑ', 'ΣΤΑΘΗΣ']],
    ['2010', ['ΑΡΤΕΜΙΟΣ', 'ΑΡΤΕΜΗΣ', 'ΓΕΡΑΣΙΜΟΣ']],
    ['2105', ['ΚΩΝΣΤΑΝΤΙΝΟΣ', 'ΚΩΝΣΤΑΝΤΙΝΑ', 'ΝΤΙΝΟΣ', 'ΚΩΣΤΑΣ', 'ΝΙΝΑ', 'ΕΛΕΝΗ', 'ΝΤΙΝΑ']],
    ['2101', ['ΜΑΞΙΜΟΣ', 'ΠΑΤΡΟΚΛΟΣ']],
    ['2110', ['ΧΡΙΣΤΟΔΟΥΛΟΣ']],
    ['2111', ['ΜΑΡΙΑ', 'ΜΑΡΙΟΣ', 'ΠΑΝΑΓΙΩΤΗΣ', 'ΤΑΚΗΣ', 'ΠΑΝΑΓΙΩΤΑ', 'ΓΙΩΤΑ', 'ΔΕΣΠΟΙΝΑ']],
    ['2207', ['ΜΑΓΔ', 'ΜΑΡΚΕΛ', 'ΜΆΓΔ', 'ΜΑΡΚΈΛ', 'MAGD', 'MARKEL']],
    ['2304', ['ΓΕΩΡΓΙΟΣ', 'ΓΕΩΡΓΙΑ', 'ΓΙΩΡΓΟΣ', 'ΓΩΓΩ', 'ΓΙΟΥΛΑ', 'ΤΖΩΡΤΖΙΝΑ', 'ΤΖΙΝΑ']],
    ['2310', ['ΙΑΚΩΒΟΣ']],
    ['2401', ['ΞΕΝΗ']],
    ['2404', ['ΕΛΙΣΑΒΕΤ', 'ΕΛΛΗ']],
    ['2412', ['ΕΥΓΕΝΙΟΣ', 'ΕΥΓΕΝΙΑ', 'ΤΡΙΣΕΥΓΕΝΗ']],
    ['2501', ['ΓΡΗΓΟΡΙΟΣ', 'ΓΡΗΓΟΡΗΣ', 'ΜΑΡΓΑΡΙΤΑ']],
    ['2503', ['ΕΥΑΓΓΕΛΟΣ', 'ΕΥΑΓΓΕΛΙΑ', 'ΕΥΑ', 'ΒΑΓΓΕΛΗΣ', 'ΒΑΓΓΕΛΙΩ', 'ΑΓΓΕΛΟΣ']],
    ['2504', ['ΜΑΡΚΟΣ']],
    ['2511', ['ΑΙΚΑΤΕΡΙΝΗ', 'ΚΑΤΕΡΙΝΑ', 'ΚΑΤΙΝΑ', 'ΚΑΤΙΑ']],
    ['2512', ['ΧΡΗΣΤΟΣ', 'ΧΡΙΣΤΟΣ', 'ΧΡΙΣΤΙΝΑ', 'ΕΜΜΑΝΟΥΗΛ', 'ΜΑΝΩΛΗΣ', 'ΜΑΝΟΣ', 'ΧΡΥΣΑ']],
    ['2601', ['ΞΕΝΟΦΩΝ']],
    ['2607', ['ΠΑΡΑΣΚΕΥΗ', 'ΒΟΥΛΑ']],
    ['2609', ['ΘΕΟΛΟΓΟΣ']],
    ['2610', ['ΔΗΜΗΤΡΗΣ', 'ΔΗΜΗΤΡΑ', 'ΔΗΜΗΤΡΟΥΛΑ', 'ΜΗΤΣΟΣ', 'ΜΙΜΗΣ', 'ΔΗΜΟΣ']],
    ['2611', ['ΣΤΥΛΙΑΝΟΣ', 'ΣΤΕΛΙΟΣ', 'ΣΤΥΛΙΑΝΗ', 'ΣΤΕΛΛΑ']],
    ['2612', ['ΕΜΜΑΝΟΥΗΛ', 'ΜΑΝΩΛΗΣ', 'ΜΑΝΟΣ', 'ΙΩΣΗΦ']],
    ['2707', ['ΠΑΝΤΕΛΕΗΜΩΝ', 'ΠΑΝΤΕΛΗΣ']],
    ['2712', ['ΣΤΕΦΑΝΟΣ', 'ΣΤΕΦΑΝΙΑ']],
    ['2805', ['ΕΥΤΥΧΗΣ', 'ΕΥΤΥΧΙΑ']],
    ['2906', ['ΠΕΤΡΟΣ', 'ΠΕΤΡΟΥΛΑ', 'ΠΙΕΡΕΤΑ', 'ΠΑΥΛΟΣ', 'ΠΑΥΛΙΝΑ']],
    ['2909', ['ΚΥΡΙΑΚΟΣ', 'ΚΥΡΙΑΚΗ']],
    ['3006', ['ΑΠΟΣΤΟΛΟΣ', 'ΑΠΟΣΤΟΛΗΣ']],
    ['3008', ['ΑΛΕΞΑΝΔΡΟΣ', 'ΑΛΕΞΑΝΔΡΑ', 'ΑΛΕΞΗΣ', 'ΑΛΕΞΙΑ']],
    ['3011', ['ΑΝΔΡΕΑΣ', 'ΑΝΔΡΙΑΝΗ']],
    ['3101', ['ΕΥΔΟΞΙΑ', 'ΕΥΗ']],
    ['0509', ['ΖΑΧΑΡΙΑΣ', 'ΖΑΧΑΡΟΥΛΑ']],
    ['0802', ['ΖΑΧΑΡΙΑΣ', 'ΖΑΧΑΡΟΥΛΑ']],
    ['1011', ['ΟΡΕΣΤΗΣ']],
]);

module.exports = { mobileNameMap, fixedNameMap };
