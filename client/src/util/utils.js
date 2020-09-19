function noGreekAccents(s) {
    let out = '';

    let len = s.length;
    for (let i = 0; i < len; i++) {
        let c = s.charAt(i);
        switch (c) {
            case 'ά':
                out += 'α';
                break;
            case 'Ά':
                out += 'Α';
                break;

            case 'έ':
                out += 'ε';
                break;
            case 'Έ':
                out += 'Ε';
                break;

            case 'ό':
                out += 'ο';
                break;
            case 'Ό':
                out += 'Ο';
                break;

            case 'ώ':
                out += 'ω';
                break;
            case 'Ώ':
                out += 'Ω';
                break;

            case 'ί':
                out += 'ι';
                break;
            case 'ϊ':
                out += 'ι';
                break;
            case 'Ί':
                out += 'Ι';
                break;
            case 'Ϊ':
                out += 'Ι';
                break;

            case 'ύ':
                out += 'υ';
                break;
            case 'ϋ':
                out += 'υ';
                break;
            case 'Ύ':
                out += 'Υ';
                break;
            case 'Ϋ':
                out += 'Υ';
                break;

            case 'ή':
                out += 'η';
                break;
            case 'Ή':
                out += 'Η';
                break;
            default:
                out += c;
                break;
        }
    }

    return out;
}

export { noGreekAccents };
