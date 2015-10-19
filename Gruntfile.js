/* jscs: disable */
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      'default': {
        src: [
          'result/'
        ]
      },
      after: {
        src: [
          'result/node_modules/',
          'result/include/',
        ]
      }
    },
    browserify: {
      chrome: {
        options: {
          transform: [
            [
              'babelify', {
                loose: 'all',
                comments: false,
              },
            ],
          ],
        },
        files: [
          {
            expand: true,
            src: [
              'result/*.js',
              '!result/node_modules/**/*.js',
            ],
          },
        ],
      },
    },
    less: {
      chrome: {
        options: {
          customFunctions: {
            static_url: function(less, url) {
              return 'url("chrome-extension://__MSG_@@extension_id__/' + url.value + '")';
            },
          },
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.less',
            dest: 'result/',
            ext: '.css',
          },
        ],
      },
    },
    copy: {
      prepare: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.js',
            dest: 'result/',
          }, {
            expand: true,
            cwd: 'src/static/',
            src: [
              '**/*.png',
              '**/*.gif',
              '**/*.html',
            ],
            dest: 'result/static/',
            flatten: true,
            filter: 'isFile',
          },
        ],
      },
      resources: {
        options: {
          process: function(content, srcpath) {
            if (srcpath.match(/\.(js|json)$/i)) {
              content = content.replace('__VERSION__', grunt.config('pkg.version'));
            }

            return content;
          },

          noProcess: [
            '**/*.{png,gif,jpg,ico,psd,ttf,otf,woff,svg}',
          ],
        },
        files: [
          {
            src: 'src/manifest.json',
            dest: 'result/manifest.json',
          },
          {
            src: 'CHANGELOG',
            dest: 'result/CHANGELOG',
          },
          {
            src: 'README',
            dest: 'result/README',
          },
          {
            src: 'LICENSE',
            dest: 'result/LICENSE',
          },
        ],
      },
    },
    crx: {
      build: {
        src: [
          'result/**/*',
        ],
        dest: 'dist/list-manager-<%= pkg.version %>.crx',
        options: {
          privateKey: 'result.pem',
        },
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-crx');

  grunt.registerTask('build', [
    'clean',
    'copy:prepare',
    'copy:resources',
    'less',
    'browserify',
    'clean:after',
  ]);

  grunt.registerTask('build-crx', [
    'build',
    'crx:build',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};

