"use strict"

var createTrie = require("array-trie")
var createAC = require("../aho-corasick")

var trie = createTrie()

//First build the trie data structure
trie.set([1,2,3], 1)
trie.set([2,3,4], 2)
trie.set([6,7,8], 3)
trie.set([1,2], 4)
trie.set([2,3], 5)

//Next construct the automata and use it to 
var automata = createAC(trie)

//Now run it on some data
var data = [1,2,3,4,5,6,7,8,9]
for(var state=automata, i=0; i<data.length; state=state.push(data[i++])) {
  //Print out all matches at position i
  if(state.value !== undefined) {
    console.log("matches at position", i, ":")
    for(var cur = state; cur.value !== undefined; cur = cur.next) {
      console.log(cur.value)  
    }
  }
}
