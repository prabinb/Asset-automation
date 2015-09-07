var POObj = function(options){
  this.ponumber = options.ponumber;
  this.supplier = options.supplier;
  this.type = options.type;
  this.make = options.make;
  this.model = options.model;
  this.qty = options.qty;
  this.remaining_qty = options.remaining_qty;
}

Meteor.methods({
  addPO:function(obj){
    console.log("called add po");
    ProcurementOrder.insert(obj);
  },
  searchPO: function(str){
    var result = [];

     var res = ProcurementOrder.find({'ponumber':str})
     .forEach(function(item){
      result.push({
        "ponumber": item.ponumber,
        "supplier": item.supplier,
        "type": item.type,
        "make": item.make,
        "model": item.model,
        "qty": item.qty
      });
    });

    return result;
  },
  getAllPO: function(){
    console.log(ProcurementOrder.find({}));
  },
  getPOCount: function(){
    var count = ProcurementOrder.count();
    console.log(count);
    return count;
  },
  getByPOnumber: function(ponumber){
    var result = [];
    ProcurementOrder
    .find({"ponumber":ponumber})
    .forEach(function(item){
      result.push({
        "ponumber": item.ponumber,
        "supplier": item.supplier,
        "type": item.type,
        "make": item.make,
        "model": item.model,
        "qty": item.qty
      });
    });

    return result;
  }
});
