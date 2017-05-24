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

  suggest(input) {
    if (!input) {
      return 'please enter some letters';
    }

    let currentNode = this.root;
    let inputValue = [...input.toLowerCase()]

    // let nodeLetters = [];
    let finalArray = []

    // find base node
    let newCurrentNode = this.findNode(inputValue, currentNode)

    // find children words
    this.findChildrenWords(input, newCurrentNode)
    //return finalArray
  }

  findChildrenWords(inputValue, currentNode, suggestedArray = []) {
    //console.log(inputValue, currentNode);
     let keys = Object.keys(currentNode.children);
     //console.log(keys);

    keys.forEach((element)  => {
      //console.log(element);

      //console.log(currentNode);
      let newCurrentNode = this.findNode(element, currentNode)
      console.log(newCurrentNode);
    })
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
    for(var i =0; i < words.length; i++) {
      this.insert(words[i])
    }
    console.log(this.wordCount);
  }

}

export default Trie;
