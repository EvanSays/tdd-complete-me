import { expect } from 'chai';
import Trie from '../scripts/Trie.js'
import fs from 'fs'
require('locus');

describe('Insert', function() {

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

    expect(trie.root.children.p
                    .children.i.letter).to.equal('i')

    expect(trie.root.children.p
                    .children.i
                    .children.z.letter).to.equal('z')
  })

  it('should be able to add small words after big wors with the same chars',
  () => {
    trie.insert("pizza")

    expect(trie.root
          .children.p
          .children.i
          .children.z
          .children.z
          .children.a.isCompleteWord).to.equal(true)

    expect(trie.root
          .children.p
          .children.i
          .children.z
          .children.z.isCompleteWord).to.equal(false)

    trie.insert("piz")

    expect(trie.root
          .children.p
          .children.i
          .children.z.isCompleteWord).to.equal(true)

    trie.insert("pi")

    expect(trie.root
          .children.p
          .children.i.isCompleteWord).to.equal(true)

  })
})

describe('Count', () => {
  let trie;

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
  })
})

describe('Suggest', () => {

  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('should suggest a word', () => {

    trie.insert("pizza")
    trie.insert("pea")
    trie.insert("pie")
    trie.insert("pieduck")
    trie.insert("piecandy")
    trie.insert("pienapple")
    trie.insert("breakfast")
    trie.insert("cat")

    expect(trie.suggest('pie')).to.deep.equal(
            [ 'pieduck', 'piecandy', "pienapple" ])
  })

  it('should return a full string', () => {
    trie.insert('pizza')

    expect(trie.suggest('pi')).to.deep.equal([ 'pizza' ])
  })
})


describe('Populate', () => {

  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('should import words from the dictionary', () => {

    const text = "/usr/share/dict/words";

    let dictionary = fs.readFileSync(text).toString().trim().split('\n');

    trie.populate(dictionary);

    expect(trie.wordCount).to.equal(235886);
  })
})

describe('Find Children Words', () => {

  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('should return a full word based on partial user input', () => {

    trie.insert('catcher')

    trie.suggest('ca')

    let passedNode = trie.root.children.c.children.a

    expect(trie.findChildrenWords('ca', passedNode, []))
    .to.deep.equal([ { word: 'catcher', frequency: 0 } ])
  })
})


describe('Select', () => {

  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('should update frequency', () => {

    trie.insert('piz');

    trie.select('piz')

    expect(trie.root
          .children.p
          .children.i
          .frequency).to.equal(0)

    expect(trie.root
          .children.p
          .children.i
          .children.z
          .frequency).to.equal(1)
  })

  it('should place the most frequent used, first', () => {
    trie.insert("pizza")
    trie.insert("pea")
    trie.insert("pie")
    trie.insert("pieduck")
    trie.insert("piecandy")
    trie.insert("pienapple")
    trie.insert("breakfast")
    trie.insert("cat")

    expect(trie.root.children.p
                    .children.i
                    .children.e
                    .children.c
                    .children.a
                    .children.n
                    .children.d
                    .children.y.frequency).to.equal(0)
    expect(trie.suggest('pie')).to.deep.equal(
                        ["pieduck", "piecandy", "pienapple"])

    trie.select('piecandy')

    expect(trie.root.children.p
                    .children.i
                    .children.e
                    .children.c
                    .children.a
                    .children.n
                    .children.d
                    .children.y.frequency).to.equal(1)

    expect(trie.suggest('pie')).to.deep.equal(
                        ["piecandy", "pieduck", "pienapple"])


  })
})
