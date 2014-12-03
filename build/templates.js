this["JST"] = this["JST"] || {};

this["JST"]["legend"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li class=\"list-group-item\">\n  <span class=\"badge\" style=\"background:"
    + escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"color","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n  <p>"
    + escapeExpression(((helper = (helper = helpers.agency || (depth0 != null ? depth0.agency : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"agency","hash":{},"data":data}) : helper)))
    + "</p>\n  <p><small><strong>Average salary:</strong> "
    + escapeExpression(((helper = (helper = helpers.average || (depth0 != null ? depth0.average : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"average","hash":{},"data":data}) : helper)))
    + "</small></p>\n</li>\n";
},"useData":true});