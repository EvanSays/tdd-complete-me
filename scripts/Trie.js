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
    let finalArray = [];

    // find base node
    currentNode = this.findNode(inputValue, this.root)

    // find children words
    this.findChildrenWords(input, currentNode, finalArray)

    return finalArray.sort(function (a, b) {
      return b.frequency - a.frequency
    }).reduce((finalArray, obj) => {
      finalArray.push(obj.word)
      return finalArray
    }, [])

  }

  findChildrenWords(inputValue, currentNode, finalArray) {

    let newWord = inputValue;

    let keys = Object.keys(currentNode.children);

    keys.forEach((element)  => {
      let completeWord = newWord + element

      if (currentNode.children[element].isCompleteWord === true) {

        finalArray.push(
          {word: completeWord,
            frequency: currentNode.children[element].frequency})
      }

      if (currentNode.children) {
        this.findChildrenWords(
            completeWord, currentNode.children[element], finalArray)
      }
    })

    return finalArray;
  }

  findNode(inputValue, currentNode) {

    inputValue.forEach((element) => {
      currentNode.children[element] ?
      currentNode = currentNode.children[element] : null
    })
    return currentNode
  }

  populate(words) {
    for (var i = 0; i < words.length; i++) {
      this.insert(words[i])
    }
  }

  select(string) {
    const newString = [...string.toLowerCase()]
    let currentNode = this.root
    let node = this.findNode(newString, currentNode)

    node.isCompleteWord ? node.frequency++ : null

  }
}

export default Trie;
