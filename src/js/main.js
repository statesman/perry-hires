(function($, _, d3) {

  $(function() {

    $.ajax({
      dataType: 'json',
      url: 'perry-hires.json',
      success: function(data) {
        var grouped = _.chain(data)
          .groupBy(function(hire) {
            return hire['Agency name'];
          })
          .map(function(hires, agency) {
            return {
              name: agency,
              children: hires
            };
          })
          .value();
        drawChart({
          name: "Perry hires",
          children: grouped
        });
      }
    });

    var drawChart = function(data) {
      var width = 1170,
      height = 600;

      var color = d3.scale.category20c();

      var treemap = d3.layout.treemap()
        .size([width, height])
        .sticky(true)
        .value(function(d) { return d['Annual salary']; });

      var div = d3.select("#chart")
        .style("position", "relative")
        .style("width", width + "px")
        .style("height", height + "px");

      var node = div.datum(data).selectAll(".node")
        .data(treemap.nodes)
        .enter().append("div")
        .attr("class", "node")
        .call(position)
        .style("background", function(d) {
          if(!d.children) {
            return color(d['Agency name']);
          }
        })
        .classed('agency', function(d) {
          if(d.children) {
            return true;
          }
        })
        .classed('hire', function(d) {
          if(!d.children) {
            return true;
          }
        })
        .attr('data-name', function(d) {
          if(!d.children) {
            var name = d['First name'];
            if(d.MI.length !== 0) {
              name = name + ' ' + d.MI + '.';
            }
            return name + ' ' + d['Last name'];
          }
        })
        .attr('data-agency', function(d) {
          if(!d.children) {
            return d['Agency name'];
          }
        })
        .attr('data-hired', function(d) {
          if(!d.children) {
            return d['Hire date'];
          }
        })
        .attr('data-salary', function(d) {
          if(!d.children) {
            return d['Annual salary'];
          }
        })
        .text(function(d) {
          if(!d.children) {
            return d['First name'][0] + '. ' + d['Last name'];
          }
        });

      d3.selectAll("input").on("change", function change() {
        var value = this.value === "count" ? function() { return 1; } : function(d) { return d['Annual salary']; };

        node
          .data(treemap.value(value).nodes)
          .transition()
          .duration(1500)
          .call(position);
      });

      function position() {
        this.style("left", function(d) { return d.x + "px"; })
          .style("top", function(d) { return d.y + "px"; })
          .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
          .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
      }

      $('.hire').popover({
        content: function() {
          var data = ['<strong>' + $(this).data('name') + '</strong>'];
          data.push($(this).data('agency'));
          data.push('Salary: ' + $(this).data('salary'));
          data.push('Hired: ' + $(this).data('hired'));
          return data.join('<br />');
        },
        html: true,
        trigger: 'hover'
      });
    };

  });

}(jQuery, _, d3));
