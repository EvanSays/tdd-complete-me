Insert 'pizza'
Insert 'pie'
Insert 'breakfast'

search 'pi'

expect ['pizza', 'pie']

//___________________________________________________________________________//

currentNode = this.root.children

/*
{ p: Node { children: { i: [Object] }, letter: 'p', isCompleteWord: false },
  b: Node { children: { r: [Object] }, letter: 'b', isCompleteWord: false },
  c: Node { children: { a: [Object] }, letter: 'c', isCompleteWord: false } }
*/

//___________________________________________________________________________//

// obtain currentNode keys
keys = Object.keys(currentNode)
/*
[ 'p', 'b', 'c' ]
*/

//___________________________________________________________________________//

let index = 0;

// Loop over keys
keys.forEach((key) => {

    // key = p   search[i] = p
    if (key === search[index]) {

    //push currentnode.letter to array
    array.push(key)

    //reset currentNode to new area
      currentNode = currentNode[key].children

    // get keys again?

    // loop over keys, looking for a match until;

  })




  }
})
