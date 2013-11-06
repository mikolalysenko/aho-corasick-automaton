"use strict"

var bounds = require("binary-search-bounds")

module.exports = createStateMachine

function ACState(symbols, children, next, value) {
  this.symbols = symbols
  this.children = children
  this.next = next
  this.value = value
}

ACState.prototype.push = function(c) {
  var state = this
  while(true) {
    var sym = state.symbols
    var i = bounds.eq(sym, c)
    if(i < 0) {
      if(state.next === state) {
        break
      }
      state = state.next
    } else {
      state = state.children[i]
      break
    }
  }
  return state
}

function trieToAutomata(trie) {
  var symbols = trie.symbols.slice()
  var children = new Array(trie.children.length)
  for(var i=0; i<children.length; ++i) {
    children[i] = trieToAutomata(trie.children[i])
  }
  return new ACState(symbols, children, null, trie.value, null)
}

function createStateMachine(trie) {
  //First pass: translate trie to automata
  var root = trieToAutomata(trie)
  root.next = root

  //Second pass: iterate over trie in bfs order, attach prefixes
  var Q = root.children.slice()
  for(var i=0; i<Q.length; ++i) {
    Q[i].next = root
  }
  var ptr = 0
  while(ptr < Q.length) {
    var r = Q[ptr++]
    var sym = r.symbols
    var children = r.children
    var n = sym.length
    for(var i=0; i<n; ++i) {
      var a = sym[i]
      var u = children[i]
      u.next = root
      Q.push(u)
      var v = r.next
      do {
        var j = bounds.eq(v.symbols, a)
        if(j >= 0) {
          u.next = v.children[j]
          break
        } else {
          v = v.next
        }
      } while(v !== root)
    }
  }

  //Done: return root
  return root
}