module.exports = function(grunt) {
  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  var srcFiles = [
      "engine.js",
      "game.js",
  ];
  var libFiles = [
      "pixi.js",
      "index.html",
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      build: "bin",
      src: "src",
    },

    copy: {
      build: {
        files: [
          { expand: true, cwd: '<%= dirs.src %>/', src: libFiles, dest: '<%= dirs.build %>/' }
        ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [
          { expand: true, cwd: '<%= dirs.src %>/', src: srcFiles, dest: '<%= dirs.build %>/' }
        ]
      }
    },

  });

  // Default task(s).
  grunt.registerTask('default', ['copy', 'uglify']);
};
