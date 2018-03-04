function Edge() {
  return {
    type : "edge",
    destiny : null,
    value : 0,
  }
}

function Vertex(name) {
  return {
    type : "vertex",
    name : name,
    edgeList : []
    }
}

function Graph() {
  return {
    vertexList : [],
    addVertex : function(vertex) {
      this.vertexList.push(vertex)
    },

    lessCostPath : function(source,destiny) {
      for (var i = 0; i < this.vertexList.length; i++) 
        this.vertexList[i].opt = { 
          state :  0,
          previous : null,
          estimate : null
        }
      //Algorithm apply
      var vertex = sourceVertex = this.vertexList.find(function(i) { return i.name == source });
      vertex.opt.estimate = 0;
      vertex.opt.state = 1;
      vertex.opt.previous = vertex;
      do {
      for (var i = 0, j = vertex.edgeList.length; i < j; i++) {
        vertex.opt.state = 1;
        var edge = vertex.edgeList[i];
        var estimate_value = vertex.opt.estimate + edge.value;
        if (edge.destiny.opt.estimate === null || estimate_value < edge.destiny.opt.estimate) {
          edge.destiny.opt.estimate = estimate_value;
          edge.destiny.opt.previous = vertex;
        }
      }
      var openVertexList = vertex.edgeList.filter(function(elm) { if (elm.destiny.opt.state == 0) return elm.destiny });
      openVertexList = openVertexList.map(function(elm) { return elm.destiny; });
      vertex = openVertexList.sort(function(a,b) { return a.opt.estimate -  b.opt.estimate })[0];
      if (vertex == undefined)
        vertex = this.vertexList.filter(function(i) { return i.state == 0; })[0];
      } while (vertex != undefined)

      //Route calculate.
      var destinyVertex  = this.vertexList.find(function(i) { return i.name == destiny });
      if (destinyVertex == undefined)
         return null;
      var path = [];
      var walkVertex = destinyVertex;
      path.push(destinyVertex);
      var totalCost = 0;
      do {
        totalCost += walkVertex.opt.estimate;
        walkVertex = walkVertex.opt.previous;
        path.push(walkVertex);
      } while (walkVertex.name != sourceVertex.name);
      path.reverse();
      return { 'totalCost' : totalCost,
        'path' : path  };
    }
  }
}
