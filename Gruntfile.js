var fs = require('fs');
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      mediaelement: {
        src: [
        'src/js/me-header.js',
        'src/js/me-namespace.js',
        'src/js/me-utility.js',
        'src/js/me-plugindetector.js',
        'src/js/me-featuredetection.js',
        'src/js/me-mediaelements.js',
        'src/js/me-shim.js',
        'src/js/me-i18n.js',
        'src/js/me-i18n-locale-de.js',
        'src/js/me-i18n-locale-zh.js'
        ],
        dest:'build/mediaelement.js'
      },
      mediaelementplayer: {
        src: [
        'src/js/mep-header.js',
        'src/js/mep-library.js',
        'src/js/mep-player.js',
        'src/js/mep-feature-playpause.js',
        'src/js/mep-feature-stop.js',
        'src/js/mep-feature-progress.js',
        'src/js/mep-feature-time.js',
        'src/js/mep-feature-volume.js',
        'src/js/mep-feature-fullscreen.js',
        'src/js/mep-feature-tracks.js',
        'src/js/mep-feature-contextmenu.js',
        'src/js/mep-feature-postroll.js'
        ],
        dest:'build/mediaelementplayer.js'
      },
      combined: {
        src: [
          'build/mediaelement.js',
          'build/mediaelementplayer.js'
        ],
        dest:'build/mediaelement-and-player.js'
      }
    },
    cssmin: {
        minify: {
        expand: true,
        cwd: 'src/css/',
        src: ['mediaelementplayer.css'],
        dest: 'build/',
        ext: '.min.css'
      }
    },
    copy: {
      assets: {
        files: [
          {expand: true, flatten: true, src: ['src/css/*', '!src/css/*.fw.*'], dest: 'build/', filter: 'isFile'}
        ]
      }
      
    },
    uglify: {
      options: {
        mangle: false,
        compress: {
          global_defs: {
            "DEBUG": false
          },
          drop_console: true,
          dead_code: false
        }  
      },
      mediaelement: {
        options: {
          banner: fs.readFileSync('./src/js/me-header.js').toString() + '\n'
        },
        files: {
          'build/mediaelement.min.js': ['build/mediaelement.js']
        }
      },
      mediaelementplayer: {
        options: {
          banner: fs.readFileSync('./src/js/mep-header.js').toString() + '\n'
        },
        files: {
          'build/mediaelementplayer.min.js': ['build/mediaelementplayer.js']
        }
      },
      combined: {
        options: {
          banner: fs.readFileSync('./src/js/me-header.js').toString() + '\n' + fs.readFileSync('./src/js/mep-header.js').toString() + '\n'
        },
        files: {
          'build/mediaelement-and-player.min.js': ['build/mediaelement-and-player.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'copy', 'cssmin']);

};