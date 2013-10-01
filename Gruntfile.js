// Grunt configuration updated to latest Grunt.  That means your minimum
// version necessary to run these tasks is Grunt 0.4.
module.exports = function(grunt) {
  "use strict";

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: '.',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Empty and remove `dist/` directory.
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Run your source code through JSHint's defaults.
    jshint: ["app/**/*.js"],

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      release: {
        options: {
          // Include the main ration file.
          mainConfigFile: "app/config.js",

          // Setting the base url to the distribution directory allows the
          // Uglify minification process to correctly map paths for Source
          // Maps.
          baseUrl: "dist/app",

          // Include Almond to slim down the built filesize.
          name: "almond",

          // Set main.js as the main entry point.
          include: ["main"],
          insertRequire: ["main"],

          // Since we bootstrap with nested `require` calls this option allows
          // R.js to find them.
          findNestedDependencies: true,

          // Wrap everything in an IIFE.
          wrap: true,

          // Output file.
          out: "dist/source.min.js",

          // Enable Source Map generation.
          generateSourceMaps: true,

          // Do not preserve any license comments when working with source maps.
          // These options are incompatible.
          preserveLicenseComments: false,

          // Minify using UglifyJS.
          optimize: "uglify2"
        }
      }
    },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects.  Instead of manually specifying your stylesheets inside the
    // HTML, you can use `@imports` and this task will concatenate only those
    // paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      "dist/styles.css": {
        // Point this to where your `index.css` file is location.
        src: "app/styles/index.css",

        // The relative path to use for the @imports.
        paths: ["app/styles"],

        // Rewrite image paths during release to be relative to the `img`
        // directory.
        forceRelative: "/app/img/"
      }
    },

    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Create the server and livereload on changes
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            yeomanConfig.app
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            'test',
            yeomanConfig.app,
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: yeomanConfig.dist
        }
      }
    },

    // Minfiy the distribution CSS.
    cssmin: {
      release: {
        files: {
          "dist/styles.min.css": ["dist/styles.css"]
        }
      },
      server: {
        files: {

        }
      }
    },

    server: {
      options: {
        host: "0.0.0.0",
        port: 8000
      },

      development: {},

      release: {
        options: {
          prefix: "dist"
        }
      },

      test: {
        options: {
          forever: false,
          port: 8001
        }
      }
    },

    processhtml: {
      release: {
        files: {
          "dist/index.html": ["index.html"]
        }
      }
    },

    // Move vendor and app logic during a build.
    copy: {
      release: {
        files: [
          {
            src: ["app/**"],
            dest: "dist/"
          },
          {
            src: "vendor/**",
            dest: "dist/"
          }
        ]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',
            'bower_components/sass-bootstrap/fonts/*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    karma: {
      options: {
        basePath: process.cwd(),
        runnerPort: 9999,
        port: 9876,
        singleRun: true,
        colors: true,
        captureTimeout: 7000,

        reporters: ["progress"],
        browsers: ["PhantomJS"],

        plugins: [
          "karma-jasmine",
          "karma-mocha",
          "karma-qunit",
          "karma-phantomjs-launcher"
        ],

        proxies: {
          "/base": "http://localhost:<%=server.test.options.port%>"
        }
      },

      jasmine: {
        options: {
          frameworks: ["jasmine"],

          files: [
            "vendor/bower/requirejs/require.js",
            "test/jasmine/test-runner.js"
          ]
        }
      }
    },
    modernizr: {
      devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
      outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        '<%= yeoman.dist %>/scripts/{,*/}*.js',
        '<%= yeoman.dist %>/styles/{,*/}*.css',
        '!<%= yeoman.dist %>/scripts/vendor/*'
      ],
      uglify: true
    },
    concurrent: {
      server: [
        'compass',
        'coffee:dist',
        'copy:styles'
      ],
      test: [
        'coffee',
        'copy:styles'
      ],
      dist: [
        'coffee',
        'compass',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    bower: {
      options: {
        exclude: ['modernizr']
      },
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", [
    "clean"
    , "jshint"
    , "processhtml"
    , "copy"
    , "requirejs"
    , "styles"
    , "cssmin"
  ]);

  // The test task take care of starting test server and running tests.
  grunt.registerTask("test", [
    "jshint"
    , "server:test"
    , "karma"
  ]);
};