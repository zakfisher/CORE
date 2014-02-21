module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['dev/templates/*'],
                tasks: ['concat:build_html', 'htmlmin']
            },
            css: {
                files: ['dev/sass/*.scss', 'dev/sass/**/*.scss', '!dev/sass/index.min.scss'],
                tasks: ['compass', 'copy:css']
            },
            js: {
                files: ['dev/js/index.js'],
                tasks: ['concat:build_js', 'copy:js', 'uglify', 'clean:js']
            },
            img: {
                files: ['dev/images/*'],
                tasks: ['copy:images']
            },
            api: {
                files: ['dev/api/*', 'dev/api/**/*'],
                tasks: ['copy:api']
            },
            apache: {
                files: ['dev/.htaccess'],
                tasks: ['copy:apache']
            }
        },
        clean: {
            js: {
                src: [
                    'build/js/backbone.min.js',
                    'build/js/concat.js',
                    'build/js/underscore.min.js',
                    'dev/js/concat.js'
                ]
            }
        },
        copy: {
            css: {
                expand: true,
                src: 'css/fonts/*',
                cwd: 'dev/',
                dest: 'build/'
            },
            js: {
                expand: true,
                src: 'js/*',
                cwd: 'dev/',
                dest: 'build/'
            },
            images: {
                expand: true,
                src: 'images/*',
                cwd: 'dev/',
                dest: 'build/'
            },
            api: {
                expand: true,
                src: 'api/**/*',
                cwd: 'dev/',
                dest: 'build/'
            },
            apache: {
                expand: true,
                src: '.htaccess',
                cwd: 'dev/',
                dest: 'build/'
            }
        },
        compass: {
            compressed: {
                options: {
                    sassDir: 'dev/sass',
                    cssDir: 'build/css',
                    outputStyle: 'compressed'
                }
            },
            expanded: {
                options: {
                    sassDir: 'dev/sass',
                    cssDir: 'dev/css',
                    outputStyle: 'expanded'
                }
            }
        },
        concat: {
            build_html: {
                src: [
                    'dev/templates/header.html',
                    'dev/templates/body.html',
                    'dev/templates/footer.html'
                ],
                dest: 'dev/index.html'
            },
            build_js: {
                src: [
                    'dev/js/underscore.min.js',
                    'dev/js/backbone.min.js',
                    'dev/js/helpers.js',
                    'dev/js/index.js'
                ],
                dest: 'dev/js/concat.js'
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'dev/index.html',
                    'build/nojs.html': 'dev/nojs.html',
                    'build/browser.html': 'dev/browser.html'
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'build/js/index.js' : 'dev/js/concat.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['compass', 'concat', 'copy', 'uglify', 'htmlmin', 'clean']);
};