this["JST"] = this["JST"] || {};

this["JST"]["legend"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li class=\"list-group-item\">\r\n  <span class=\"badge\" style=\"background:"
    + escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"color","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\r\n  <p class=\"agency\">"
    + escapeExpression(((helper = (helper = helpers.agency || (depth0 != null ? depth0.agency : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"agency","hash":{},"data":data}) : helper)))
    + "</p>\r\n  <p><small><strong>Average salary:</strong> "
    + escapeExpression(((helper = (helper = helpers.average || (depth0 != null ? depth0.average : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"average","hash":{},"data":data}) : helper)))
    + "</small></p>\r\n</li>\r\n";
},"useData":true});



this["JST"]["popover"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<p><strong>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</strong></p>\r\n<p>"
    + escapeExpression(((helper = (helper = helpers.job || (depth0 != null ? depth0.job : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"job","hash":{},"data":data}) : helper)))
    + ", "
    + escapeExpression(((helper = (helper = helpers.agency || (depth0 != null ? depth0.agency : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"agency","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p>Salary: "
    + escapeExpression(((helper = (helper = helpers.salary || (depth0 != null ? depth0.salary : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"salary","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p>Started in current job: "
    + escapeExpression(((helper = (helper = helpers.hired || (depth0 != null ? depth0.hired : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hired","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p>Left Perry's office: "
    + escapeExpression(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"left","hash":{},"data":data}) : helper)))
    + "</p>\r\n";
},"useData":true});



this["JST"]["salarybar"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"salary\">"
    + escapeExpression(((helper = (helper = helpers.bucket || (depth0 != null ? depth0.bucket : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bucket","hash":{},"data":data}) : helper)))
    + "<span class=\"salary-bar pull-right\" style=\"width:"
    + escapeExpression(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"width","hash":{},"data":data}) : helper)))
    + "%\"></span></div>\r\n";
},"useData":true});