
class Node {
  constructor(letter = null) {
    this.children = {};
    this.letter = letter;
    this.isCompleteWord = false;
  }
}

export default Node;
