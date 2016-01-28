var S = require('string');

var splitMany = function(str) {
    var splitters = arguments.length < 2 ? '\\s' : '';
    for(var a = 1; a < arguments.length; a++) {
        splitters += arguments[a];
    }

    var splitRegex = new RegExp("[" + splitters + "]+", "gm");
    return str.split(splitRegex).filter(function(val) {
        var isNonWhitespace = /\S/gm.test(val);
        return isNonWhitespace;
    });
};

var splitSentences = function(str) {
    var args = ['\\n', '\\r', '\\.'];
    for(var i = arguments.length - 1; i >= 0; i--) {
        Array.prototype.splice.call(args, 0, 0, arguments[i]);
    }
      
    var splitBySentence = splitMany.apply(null, args);
    return splitBySentence.map(function(sentence) {
        var splitOnWord = splitMany(sentence, '\\s');
        var words = [];
        for(var w = 0; w < splitOnWord.length; w++) {
            var word = {
                text : splitOnWord[w],
                previousWord : w > 0 ? words[w - 1] : null,
                nextWord : null
            };
            if(w > 0) {
                words[w - 1].nextWord = word; 
            }
            words.push(word);
        }
        return words;
    });
};

exports.split = splitSentences;