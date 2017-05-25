import { expect } from 'chai';
import Node from '../scripts/Node.js'

describe('TDD with Node', () => {

  let node;

  beforeEach(() => {
    node = new Node();
  })

  it('Should be a class', () => {
    expect(node).isObject
  })

  it('should have a property of children set to an object', () => {
    expect(node.children).to.deep.equal({})
  })

  // it('should have a property of letter', () => {
  //   expect(node.letter).instanceOf(node)
  // })

  it('should not have a complete word', () => {

    expect(node.isCompleteWord).to.equal(false)
  })
})
