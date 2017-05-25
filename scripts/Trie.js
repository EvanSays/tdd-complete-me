import Node from '../scripts/Node.js'
require('locus');

class Trie {
  constructor() {
    this.root = new Node;
    this.wordCount = 0;
  }

  insert(string) {

    const splitString = [...string.toLowerCase()]
    let currentNode = this.root;

    splitString.forEach((char, index, array) => {

      if (!currentNode.children[char]) {
        currentNode.children[char] = new Node(char);
      }
      currentNode = currentNode.children[char]
      if (index === array.length - 1) {
        currentNode.isCompleteWord = true;
      }
    })
    
    this.wordCount += 1;
  }

  count() {
    return this.wordCount;
  }

  suggest(input) {
    if (!input) {
      return 'please enter some letters';
    }

    let currentNode;
    let inputValue = [...input.toLowerCase()]
    let finalArray = []

    // find base node
    currentNode = this.findNode(inputValue, this.root)

    // find children words
    return this.findChildrenWords(input, currentNode, finalArray)

  }

  findChildrenWords(inputValue, node, finalArray) {

    let newWord = inputValue;

    let currentNode = node;

    let keys = Object.keys(currentNode.children);

    keys.forEach((element)  => {

      let completeWord = newWord + currentNode.children[element].letter

      if (currentNode.children[element].isCompleteWord === true) {
        finalArray.push(completeWord)
      }

      if (currentNode.children) {
        finalArray =
                    this.findChildrenWords(
                    completeWord, currentNode.children[element], finalArray)
      }
    })

    return finalArray;
  }

  findNode(inputValue, currentNode) {

    inputValue.forEach((element) => {
      if (currentNode.children[element]) {
        currentNode = currentNode.children[element];
      }
    })
    return currentNode
  }

  populate(words) {
    for (var i = 0; i < words.length; i++) {
      this.insert(words[i])
    }
  }
}

export default Trie;
