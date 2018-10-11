module.exports = {
    genImgUrl: function (imgName) {
        if (!$.trim(imgName)) {
            return '';
        }

        var part1 = "https://storage.rcs-rds.ro/content/links/28c4457d-4d2b-4ba3-a56a-dee6d5ae8947/files/get/";

        return part1 + imgName + '.jpg?path=' + imgName + '.jpg';
    },
    getIngredientsArr: function (ingredientsString) {
        if (!$.trim(ingredientsString)){
            return [];
        }

        return $.map(ingredientsString.split(','), function (ingred) {
            return $.trim(ingred);
        });
    },
    getCurrency: function (nr, curr, objFormat) {
        var number = parseFloat(nr);
        if (!number){
            return '';
        }

        number = number % 1 === 0 ? parseInt(number, 10) : number;
        var currency = curr || 'RON';

        if (objFormat) {
            return {
                number: number,
                currency: currency
            };
        }

        return number + ' ' + currency;
    }
};