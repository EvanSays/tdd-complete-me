import Node from '../scripts/Node.js'
require('locus');
const columnify = require('columnify')

class Trie {
  constructor() {
    this.root = new Node;
    this.wordCount = 0;
  }

  insert(string) {

    const splitString = [...string.toLowerCase()]
    let currentNode = this.root;

    splitString.forEach((char,index, array) => {
      if(!currentNode.children[char]){
        currentNode.children[char] = new Node(char);
      }
      currentNode = currentNode.children[char]
      if(index === array.length - 1) {
        currentNode.isCompleteWord = true;
      }
    })
    // no duplicate words
    this.wordCount += 1;
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    if(!word) {
      return "please input word"
    }
    let currentNode = this.root.children;
    let inputValue = [...word.toLowerCase()]

    let finalLetters = [];
    let finalArray = [];

    inputValue.forEach((element) => {

      if(currentNode[element]){
        finalLetters.push(element)

        if(currentNode[element].isCompleteWord === true){
          finalLetters = finalLetters.join('');
          finalArray.push(finalLetters)
        }
        currentNode = currentNode[element].children
      }

    })
    return finalArray
  }
  
  populate(words) {
    for(var i =0; i < words.length; i++) {
      this.insert(words[i])
    }
    console.log(this.wordCount);
  }

}

export default Trie;
