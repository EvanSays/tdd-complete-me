
class Node {
  constructor(letter = null) {
    this.children = {};
    this.letter = letter;
    this.isCompleteWord = false;
    this.frequency = 0;
  }
}

export default Node;
