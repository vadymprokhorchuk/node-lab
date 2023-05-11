function pigIt(str){
    let specialChars = ['!', '?', '(', ')', ',', ';', '.']
    let newWords = []
    let words = str.split(' ')
    for (let word of words){
        if (!specialChars.includes(word)){
            let lastChar = word[word.length-1]
            if (specialChars.includes(lastChar)){
                word = word.substring(0, word.length - 1)
            }else{
                lastChar = ''
            }

            word += word[0]
            word += 'ay'
            word += lastChar

            word = word.substring(1)
            newWords.push(word)
        }else{
            newWords.push(word)
        }
    }
    return newWords.join(' ')
}

console.log(pigIt('Quis custodiet! ipsos custodes ?'))
