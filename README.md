aho-corasick-automaton
======================
A streaming [Aho-Corasick](http://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_string_matching_algorithm) automata for matching strings.  This module is a low level interface, but can be used to construct more complex algorithms.

# Example

```javascript
var createTrie = require("array-trie")
var createAC = require("aho-corasick-automaton")

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
for(var state=automata, i=0; i<data.length; ) {

  //Process next symbol
  state=state.push(data[i++])

  //Print out all matches at position i
  if(state.value !== undefined) {
    console.log("matches at position", i, ":")
    for(var cur = state; cur.value !== undefined; cur = cur.next) {
      console.log(cur.value)  
    }
  }
}
```

Here is some example output from the above program:

```
matches at position 2 :
4
matches at position 3 :
1
5
matches at position 4 :
2
matches at position 8 :
3
```

# Install

    npm install aho-corasick-automata

# API

```javascript
var createAC = require("aho-corasick-automata")
```

## Constructor

### `var root = createAC(trie)`
Creates an Aho-Corasick automata from the trie encoded as an [array-trie](https://github.com/mikolalysenko/array-trie)

**Returns** A new Aho-Corasick automata

## Methods

### `automata.push(symbol)`
Returns the next state of the automata after processing `symbol`

* `symbol` is the next character in the stream to process

**Returns** The next state of the automata

### `automata.value`
A value representing the terminal of the automata.  `undefined` if there is no trie entry at this point

### `automata.next`
A pointer to the next entry in the linked list of values at this automata state.  If the `value` is undefined, then this is the last node in this list.

# Credits
(c) 2013 Mikola Lysenko. MIT License