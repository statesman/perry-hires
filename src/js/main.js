
(function($, _, d3, numeral) {

  $(function() {

    var color = d3.scale.category20c();

    var drawChart = function(data, width, height) {
      var treemap = d3.layout.treemap()
        .size([width, height])
        .sticky(true)
        .value(function(d) { return d.salary; });

      var div = d3.select("#chart")
        .style('height', height + 'px');

      var node = div.datum(data).selectAll(".node")
        .data(treemap.nodes)
        .enter().append("div")
        .attr("class", "node")
        .call(position)
        .style("background", function(d) {
          if(d.depth === 0) {
            return null;
          }
          else if(d.children) {
            return color(d.name);
          }
          else {
            return color(d.agency);
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
            var name = d.first;
            if(d.middle) {
              name = name + ' ' + d.middle + '.';
            }
            return name + ' ' + d.last;
          }
        })
        .attr('data-agency', function(d) {
          if(!d.children) {
            return d.agency;
          }
          else {
            return d.name;
          }
        })
        .attr('data-hired', function(d) {
          if(!d.children) {
            return d.start;
          }
        })
        .attr('data-job', function(d) {
          if(!d.children) {
            return d.title;
          }
        })
        .attr('data-salary', function(d) {
          if(!d.children) {
            return d.salary;
          }
        })
        .attr('data-left', function(d) {
          if(!d.children) {
            return d.left;
          }
        });

      d3.selectAll("input").on("change", function change() {
        var val = this.value;
        var value = function(d) {
          if(val === "count") {
            return 1;
          }
          return d.salary;
        };

        node
          .data(treemap.value(value).nodes)
          .call(position);
      });

      function position() {
        this
          .style("left", function(d) {
            return (d.x / width * 100) + "%";
          })
          .style("top", function(d) {
            return (d.y / height * 100) + "%";
          })
          .style("width", function(d) {
            return (Math.max(0, d.dx - 1) / width * 100) + "%";
          })
          .style("height", function(d) {
            return (Math.max(0, d.dy - 1) / height * 100) + "%";
          });
      }

      // Setup popovers
      $('.hire').popover({
        content: function() {
          return JST.popover({
            name: $(this).data('name'),
            job: $(this).data('job'),
            agency: $(this).data('agency'),
            salary: numeral($(this).data('salary')).format('$0,0'),
            hired: moment($(this).data('hired')).format('MMM D, YYYY'),
            left: moment($(this).data('left')).format('MMM D, YYYY')
          });
        },
        html: true,
        trigger: 'hover',
        placement: 'auto left',
        viewport: '#chart'
      });

    };

    // Get the size of the chart, based on available space; returns an array
    // that is width, height
    var chartHeight = function() {
      var winWidth = $(window).width();
      if(winWidth > 768) { // small Bootstrap breakpoint
        var winHeight = $(window).height();
        var navHeight = $('nav.navbar').outerHeight();
        return winHeight - navHeight - 2;
      }
      else {
        return 250;
      }
    };

    // Write color legend
    var drawLegend = function(data) {
      data = data.slice(0, 11);
      _.each(data, function(agency) {
        // Calculate the average salary for the agency
        var average = (_.reduce(agency.children, function(memo, hire){
          return memo + hire.salary;
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

    // Highlight agencies when they're hovered over
    var chart = $('#chart');
    $('#legend')
      .on('mouseenter', function() {
        chart.addClass('by-agency');
      })
      .on('mouseleave', function() {
        chart.removeClass('by-agency');
      })
      .on('mouseleave', '.list-group-item', function() {
        chart.find('.selected').removeClass('selected');
      })
      .on('mouseenter', '.list-group-item', function() {
        var agencyName = $(this).find('.agency').text();
        chart.find('.agency[data-agency="' + agencyName + '"]').addClass('selected');
      });

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
    };

    // Get the JSON and fire the draw process
    $.ajax({
      dataType: 'json',
      url: 'Perry-hires-updated.json',
      success: function(data) {
        salaryBreakdown(_.pluck(data, 'salary'));
        var grouped = _.chain(data)
        .groupBy(function(hire) {
          return hire.agency;
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
        }, $('#chart').width(), chartHeight());
      }
    });

    $(window).resize(_.debounce(function() {
      $('#chart').height(chartHeight());
    }, 500));

  });

}(jQuery, _, d3, numeral));
