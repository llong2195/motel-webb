export const WageUnitData = [
    {
        id: 0,
        name: '1 Tháng',
    },
    {
        id: 1,
        name: '2 Tháng',
    },
    {
        id: 2,
        name: '3 Tháng',
    },
];

export const getMoneyFormat = (
    str,
    typeMoneyFormat = '100,000.00',
) => {
    return dotMoney(str, typeMoneyFormat);
};

export const numberFormat = (n) => {
    return dotMoney('' + n, '100,000.00');
};
export const getTimeUnit = (timeUnit) =>
    WageUnitData.find(i => i.id == timeUnit)?.name;
const dotMoney = (str, typeMoneyFormat) => {
    try {
        let thousandsSeparator = '';
        let decimalSeparator = '.';

        let temp = String(str).split('.');

        if (typeMoneyFormat == '100.000,00') {
            thousandsSeparator = '.';
            decimalSeparator = ',';
        } else if (typeMoneyFormat == '100,000.00') {
            thousandsSeparator = ',';
            decimalSeparator = '.';
        }

        if (temp.length < 2) {
            return String(str)
                .replace(/[^\d-]/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        } else {
            if (temp[1].length > 0) {
                return (
                    temp[0]
                        .replace(/[^\d-]/g, '')
                        .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator) +
                    decimalSeparator +
                    temp[1]
                );
            } else {
                return temp[0]
                    .replace(/[^\d-]/g, '')
                    .replace(/\B(?=(\\d{3})+(?!\d))/g, thousandsSeparator);
            }
        }
    } catch (error) {
        console.log(error);
        return str;
    }
};
