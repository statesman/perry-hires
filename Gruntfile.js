module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Clean files from dist/ before build
    clean: {
      css: ["dist/*.css", "dist/*.css.map"],
      js: ["dist/*.js", "dist/*.js.map"],
      fonts: ["fonts/**"]
    },

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: [
        'bower_components/font-awesome/fonts/**'
        ],
        dest: 'fonts/',
        flatten: true,
        expand: true
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
        paths: ['bower_components/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          "dist/style.css": "src/css/style.less"
        }
      }
    },

    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**.js']
      }
    },

    // Use Uglify to bundle up a pym file for the home page
    uglify: {
      options: {
        sourceMap: true
      },
      homepage: {
        files: {
          'dist/scripts.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/js/tooltip.js',
            'bower_components/bootstrap/js/popover.js',
            'bower_components/underscore/underscore.js',
            'bower_components/numeral/numeral.js',
            'bower_components/moment/moment.js',
            'bower_components/d3/d3.js',
            'bower_components/handlebars/handlebars.runtime.js',
            'build/templates.js',
            'src/js/main.js'
          ]
        }
      }
    },

    // Pre-render Handlebars templates
    handlebars: {
      options: {
        // Returns the filename, with its parent directory if
        // it's in a subdirectory of the src/templates folder
        processName: function(filePath) {
          var path = filePath.toLowerCase(),
          pieces = path.split("/"),
          name = '';
          if(pieces[pieces.length - 2] !== 'templates') {
            name = name + pieces[pieces.length - 2];
          }
          name = name + pieces[pieces.length - 1];
          return name.split(".")[0];
        }
      },
      compile: {
        files: {
          'build/templates.js': ['src/templates/**/*.hbs']
        }
      }
    },

    // Watch for changes in LESS and JavaScript files,
    // relint/retranspile when a file changes
    watch: {
      markup: {
        files: ['index.php']
      },
      scripts: {
        files: ['src/js/**.js'],
        tasks: ['jshint', 'clean:js', 'handlebars', 'uglify']
      },
      styles: {
        files: ['src/css/**.less'],
        tasks: ['clean:css', 'less']
      }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'clean', 'copy', 'handlebars', 'less', 'uglify']);

};
