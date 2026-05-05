function dfs(word, words) {
    const vowels = ["A", "E", "I", "O", "U"]; //모음

    if (word.length > 5) return;
    if (word.length > 0) words.push(word);

    for (let i = 0; i < vowels.length; i++) {
        dfs(word + vowels[i], words);
    }
}

function solution(word) {
    const dictionary = [];
    dfs("", dictionary); //사전 채우기

    return dictionary.indexOf(word) + 1;
}
