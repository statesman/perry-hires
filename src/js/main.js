(function($, _, d3, numeral) {

  $(function() {

    var color = d3.scale.category20c();

    var drawChart = function(data) {
      var width = 847.5,
          height = 750;

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
        });

      d3.selectAll("input").on("change", function change() {
        var val = this.value;
        var value = function(d) {
          if(val === "count") {
            return 1;
          }
          return d['Annual salary'];
        };

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

      // Setup popovers
      $('.hire').popover({
        content: function() {
          var data = ['<strong>' + $(this).data('name') + '</strong>'];
          data.push($(this).data('agency'));
          data.push('Salary: ' + numeral($(this).data('salary')).format('$0,0'));
          data.push('Hired: ' + moment($(this).data('hired')).format('MMM D, YYYY'));
          return data.join('<br />');
        },
        html: true,
        trigger: 'hover'
      });

    };

    // Write color legend
    var drawLegend = function(data) {
      data = data.slice(0, 8);
      _.each(data, function(agency) {
        // Calculate the average salary for the agency
        var average = (_.reduce(agency.children, function(memo, hire){
          return memo + hire['Annual salary'];
        }, 0)) / agency.children.length;
        // Then add each agency to the legend
        $('#legend').append(JST.legend({
          color: color(agency.name),
          count: agency.children.length,
          agency: agency.name,
          average: numeral(average).format('$0,0')
        }));
      });
    };

    // A breakdown by salary of all hires
    var salaryBreakdown = function(data) {
      // Format the breakdown
      var breakdown = _.chain(data)
      .countBy(function(salary) {
        if(salary <= 50000.99) {
          return 'less than $50k';
        }
        else if(salary <= 100000.99) {
          return '$50k to $100k';
        }
        else if(salary <= 200000.99) {
          return '$100k to $200k';
        }
        else {
          return 'more than $200k';
        }
      })
      .map(function(count, bucket) {
        return {
          count: count,
          bucket: bucket
        };
      })
      .sortBy(function(breakdown) {
        return -breakdown.count;
      })
      .value();
      // Write it to the DOM
      var total = data.length;
      _.each(breakdown, function(category) {
        $('#salary-breakdown').append(JST.salarybar({
          width: category.count / total * 100,
          bucket: category.bucket
        }));
      });
      console.log(breakdown);
    };

    // Get the JSON and fire the draw process
    $.ajax({
      dataType: 'json',
      url: 'perry-hires.json',
      success: function(data) {
        salaryBreakdown(_.pluck(data, 'Annual salary'));
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
        .sortBy(function(agency) {
          return -agency.children.length;
        })
        .value();
        drawLegend(grouped);
        drawChart({
          name: "Perry hires",
          children: grouped
        });
      }
    });

  });

}(jQuery, _, d3, numeral));
