import { expect } from 'chai';
import Trie from '../scripts/Trie.js'
import fs from 'fs'
require('locus');

describe('Insert', function() {
  this.timeout(20000)
  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('Should be a class', () => {
    expect(trie).isObject
  })

  it('should be able to insert a letter', () => {
    trie.insert("p")
    expect(trie.root.children.p.letter).to.equal('p')
  })

  it('should be able to insert a word', () => {
    trie.insert("piz")

    expect(trie.root.children.p.letter).to.equal('p')
    expect(trie.root.children.p.children.i.letter).to.equal('i')
    expect(trie.root.children.p.children.i.children.z.letter).to.equal('z')
  })

  it('should be able to add small words after big wors with the same chars', () => {
    trie.insert("pizza")

    expect(trie.root.children.p.children.i.children.z.children.z.children.a.isCompleteWord).to.equal(true)
    expect(trie.root.children.p.children.i.children.z.children.z.isCompleteWord).to.equal(false)

    trie.insert("piz")

    expect(trie.root.children.p.children.i.children.z.isCompleteWord).to.equal(true)

    trie.insert("pi")

    expect(trie.root.children.p.children.i.isCompleteWord).to.equal(true)

  })

  describe('Count', () => {

    beforeEach(() => {
      trie = new Trie();
    })

  it('should count the words in the tree', () => {
    expect(trie.count()).to.equal(0);
    trie.insert("p")
    expect(trie.count()).to.equal(1);
    trie.insert("pi")
    expect(trie.count()).to.equal(2);
    trie.insert("pizza")
    expect(trie.count()).to.equal(3);
    trie.insert("purple")
    //eval(locus)

  })
})

  describe('Suggest', () => {

    beforeEach(() => {
      trie = new Trie();
    })

  it.only('should suggest a word', () => {

    trie.insert("pizza")
    trie.insert("pea")
    trie.insert("pie")
    trie.insert("pieface")
    trie.insert("piecandy")
    trie.insert("pienapple")
    trie.insert("breakfast")
    trie.insert("cat")

    expect(trie.suggest('pie')).to.deep.equal([ 'pie', 'pieface' ])
  })
})

  describe('Populate', () => {

    beforeEach(() => {
      trie = new Trie();
    })

    it('should import words from the dictionary', () => {

      const text = "/usr/share/dict/words";

      let dictionary = fs.readFileSync(text).toString().trim().split('\n');
      trie.populate(dictionary);

      expect(trie.wordCount).to.equal(235886);
      //expect(trie.count).to.equal(235886);
    })
  })

  describe('Recursion', () => {

    beforeEach(() => {
      trie = new Trie();
    })

    it('should return a full string', () => {
      trie.insert('pizza')

      expect(trie.suggest('pi')).to.deep.equal([ 'pizza' ])
    })

})
})
