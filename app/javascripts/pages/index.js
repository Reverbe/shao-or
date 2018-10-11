// own css
require('../../../node_modules/skeleton-css/css/normalize.css');
require('../../../node_modules/skeleton-css/css/skeleton.css');
require('styles/scss/themes/default.scss');

// JS dependencies
var mT = require('../common/microtemplating.js');
var tabletop = require('tabletop');
require('../common/tooltip.js');

// own JS dependencies
require('../custom/navbar.js');
require('../custom/preLoader.js');
require('../custom/mainImgSlider.js');
var DataAdapt = require('../custom/dataAdapt.js');
var Utils = require('../custom/Utils.js');

// compiledHTML templates
var templates = {
    foodRow: mT(require('../templates/foodRow.html')),
    orarRow: mT(require('../templates/orarRow.html'))
};

// JS CODE
var elements = {
    mainTitle: $("#mainSectionTitle"),
    menuSlideContent: $("#menuSlideContent"),
    contactSlideContent: $("#contactSlideContent"),
    orarSlideContent: $("#orarSlideContent"),
    topSection: $("#topSection"),
    navBar: $("#navBar"),
    chevronSlider: $("#chevronSlider")
};
var productImgArr = [];

var mainLoader = elements.menuSlideContent.shaoPreLoader({
    text: 'Aducem mancarea...'
}).data('shaoPreLoader');

tabletop.init({
    key: '1UHTAIBDoPBxue1Pe7w2J_tJN-2Cd0E-l7HU7wwpESNU',
    callback: function (data) {
        var foodArr = data['Mancaruri']['elements'];
        var foodContent = $.map(foodArr, function (foodRow, idx) {
            var pozaUrl = DataAdapt.genImgUrl(foodRow['Poza']);
            if ( $.inArray(pozaUrl, productImgArr) === -1 ) {
                productImgArr.push(pozaUrl);
            }

            var templData = {
                id: 'foodRow-' + idx,
                nume: foodRow['Nume'],
                imgLarge: pozaUrl,
                ingredients: DataAdapt.getIngredientsArr(foodRow['IngredienteBaza']),
                ingredientsString: foodRow['IngredienteBaza'],
                ingredientsOptional: DataAdapt.getIngredientsArr(foodRow['IngredienteAlegere']),
                ingredientsOptionalString: foodRow['IngredienteAlegere'],
                price: DataAdapt.getCurrency(foodRow['Pret'], null, true),
                weight: {
                    number: foodRow['Gramaj'],
                    um: foodRow['UnitateMasura']
                }
            };

            return templates.foodRow(templData);
        }).join('');

        elements.menuSlideContent.append(foodContent);
        mainLoader.hide();

        elements.topSection.shaoMainImgSlider({
            imgs: productImgArr
        });

        var orarArr = data['Orar']['elements'];
        var orarContent = $.map(orarArr, function (orarRow, idx) {
            var valueVal = orarRow['OraDeschidere'] ? orarRow['OraDeschidere'] + ' - ' + orarRow['OraInchidere'] : 'Inchis';
            var templData = {
                id: 'orarRow-' + idx,
                label: orarRow['Zi'],
                value: $.trim(valueVal) ? valueVal : 'Inchis'
            };

            return templates.orarRow(templData);
        }).join('');
        elements.orarSlideContent.append(orarContent);

        $('.js-has-tooltip').tipr();
    }
});


var contactContent = $.map(
    [
        {label: 'Telefon', value: '0744 512 301'}
    ], function (contactRow, idx) {
        return templates.orarRow($.extend(contactRow, {id:'contactRow-' + idx}));
    }
).join('');

elements.contactSlideContent.append(contactContent);

elements.navBar.shaoNavbar({
    callbacks: {
        onNavClick: function (e) {
            elements.chevronSlider.removeClass('animating');
        },
        onTopSlideNotVisible: function (e) {
            elements.chevronSlider.removeClass('animating');
        }
    }
});

setTimeout(function () {
    elements.mainTitle.find('.main-section-title-inner-h1').addClass('big-font-again');
}, 1000);
setTimeout(function () {
    elements.mainTitle.find('.main-section-title-inner-h2').addClass('big-font-again-h2');
}, 1500);
setTimeout(function () {
    elements.mainTitle.addClass('with-drop-shadow');
}, 2000);