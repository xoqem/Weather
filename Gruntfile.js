module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>',
      banner_text: 'Weather v<%= meta.version %> - ' +
        'https://github.com/xoqem/Weather - <%= grunt.template.today("isoDateTime") %>',
      banner: '/* <%= meta.banner_text %> */\n',
      html_banner: '<!-- <%= meta.banner_text %> -->\n'
    },
    clean: [ 'dist', 'tmp'],
    compress: {
      debug: {
        options: {
          archive: 'dist/debug.tar.gz'
        },
        files: [
          {expand: true, cwd: 'tmp/debug', src: ['**/*'], dest: '<%= pkg.name %>-<%= meta.version %>'}
        ]
      },
      release: {
        options: {
          archive: 'dist/release.tar.gz'
        },
        files: [
          {expand: true, cwd: 'tmp/release', src: ['**/*'], dest: '<%= pkg.name %>-<%= meta.version %>'}
        ]
      }
    },
    concat: {
      css: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: ['css/**/*.css'],
        dest: 'tmp/debug/css/styles.css'
      },
      index: {
        options: {
          banner: '<%= meta.html_banner %>'
        },
        src: ['index.html'],
        dest: 'tmp/debug/index.html'
      }
    },
    copy: {
      images: {
        files: [
          {expand: true, cwd: 'images', src: ['**'], dest: 'tmp/debug/images/'}
        ]
      },
      js: {
        files: [
          {expand: true, cwd: 'js', src: ['**'], dest: 'tmp/debug/js/'}
        ]
      },
      templates: {
        files: [
          {expand: true, cwd: 'templates', src: ['**'], dest: 'tmp/debug/templates/'}
        ]
      },
      release: {
        files: [
          {expand: true, cwd: 'tmp/debug', src: ['**'], dest: 'tmp/release/'}
        ]
      }
    },
    cssmin: {
      release: {
        files: {
          "tmp/release/styles.css": ["tmp/release/styles.css"]
        }
      }
    },
    uglify: {
      release: {
        files: [
          {
            expand: true,
            cwd: 'tmp/release/js/',
            src: ['**/*.js'],
            dest: 'tmp/release/js/'
          }
        ]
      }
    },
    watch: {
      css: {
        files: 'css/**/*.css',
        tasks: ['concat:css']
      },
      html: {
        files: 'html/**/*.html',
        tasks: ['concat:index']
      },
      images: {
        files: 'images/**',
        tasks: ['copy:images']
      },
      js: {
        files: 'js/**/*.js',
        tasks: ['jshint', 'copy:js']
      },
      templates: {
        files: 'templates/**/*.tpl',
        tasks: ['copy:templates']
      }
    },
    jshint: {
      files: ['js/**/*.js'],
      options: {
        globals: {
          $: false,
          App: true,
          console: false
        }
      }
    }
  });

  // load dependencies
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // default task
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'copy', 'uglify', 'cssmin', 'compress']);
  grunt.registerTask('test', []);
};
