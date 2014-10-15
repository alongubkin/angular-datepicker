
/*!
 * This Gruntfile is used to build the project files.
 */

/*jshint
    node: true
 */


module.exports = function( grunt ) {

    // Read the package manifest.
    var packageJSON = grunt.file.readJSON( 'package.json' )


    // Add the “curly” template delimiters.
    grunt.template.addDelimiters( 'curly', '{%', '%}' )


    // Load the NPM tasks.
    grunt.loadNpmTasks( 'grunt-contrib-concat' )
    grunt.loadNpmTasks( 'grunt-contrib-watch' )
    grunt.loadNpmTasks( 'grunt-contrib-copy' )
    grunt.loadNpmTasks( 'grunt-contrib-less' )
    grunt.loadNpmTasks( 'grunt-contrib-clean' )
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' )
    grunt.loadNpmTasks( 'grunt-contrib-uglify' )


    // Setup the initial configurations.
    grunt.initConfig({


        // Add the package data.
        pkg: packageJSON,


        // Set up the directories.
        dirs: {
            src: {
                pickers: 'src',
                themes: 'src/themes',
                //translations: 'src/translations'
            },
            min: {
                pickers: 'build/',
                themes: 'build/themes',
                //translations: 'lib/compressed/translations'
            }
        },

        // Copy over files to destination directions.
        copy: {
			/*
            translations: {
                expand: true,
                cwd: '<%= dirs.src.translations %>',
                src: [ '*' ],
                dest: '<%= dirs.min.translations %>'
            },*/
        },


        // Compile LESS into CSS.
        less: {
            options: {
                style: 'expanded'
            },
            themes: {
                files: {
                    '<%= dirs.min.themes %>/default.css': [ '<%= dirs.src.themes %>/base.less', '<%= dirs.src.themes %>/default.less' ],
                    '<%= dirs.min.themes %>/classic.css': [ '<%= dirs.src.themes %>/base.less', '<%= dirs.src.themes %>/classic.less' ],
                    '<%= dirs.min.themes %>/default.date.css': [ '<%= dirs.src.themes %>/base.date.less', '<%= dirs.src.themes %>/default.date.less' ],
                    '<%= dirs.min.themes %>/default.time.css': [ '<%= dirs.src.themes %>/base.time.less', '<%= dirs.src.themes %>/default.time.less' ],
                    '<%= dirs.min.themes %>/classic.date.css': [ '<%= dirs.src.themes %>/base.date.less', '<%= dirs.src.themes %>/classic.date.less' ],
                    '<%= dirs.min.themes %>/classic.time.css': [ '<%= dirs.src.themes %>/base.time.less', '<%= dirs.src.themes %>/classic.time.less' ],
                    '<%= dirs.min.themes %>/rtl.css': [ '<%= dirs.src.themes %>/rtl.less' ]
                }
            }
        },


        // Concatenate the files and add the banner.
        concat: {
            options: {
                process: function( content ) {
                    return grunt.template.process( content, { delimiters: 'curly' } )
                }
            },
            pickers: {
                src: [ '<%= dirs.min.pickers %>/picker.js', '<%= dirs.min.pickers %>/picker.js', '<%= dirs.min.pickers %>/picker.date.js', '<%= dirs.min.pickers %>/picker.time.js', '<%= dirs.min.pickers %>/legacy.js', '<%= dirs.min.pickers %>/directives.js'],
                dest: '<%= dirs.min.pickers %>/angular-datepicker.js'
            },
            devPickers: {
                src: [ 'src/picker.js', 'src/picker.date.js', 'src/picker.time.js', 'src/legacy.js', 'src/directives.js'],
                dest: '<%= dirs.min.pickers %>/angular-datepicker.js'
            }
        },

        // Minify all the things!
        uglify: {
            options: {
                preserveComments: 'some'
            },
            pickers: {
                files: [
                    {
                        expand : true,
                        cwd : '<%= dirs.src.pickers %>',
                        src   : [ '**/*.js' ],
                        dest : '<%= dirs.min.pickers %>'
                    }
                ]
            }
        },
        cssmin: {
            pickers: {
                expand: true,
                cwd: '<%= dirs.min.pickers %>',
                src: [ '**/*.css' ],
                dest: '<%= dirs.min.pickers %>'
            }
        },
        clean: {
            pickers: [ '<%= dirs.min.pickers %>/*.js', '!<%= dirs.min.pickers %>/angular-datepicker.js' ],
        },

    }) //grunt.initConfig


    // Register the tasks.
    grunt.registerTask( 'picker', [ 'less:themes', 'uglify:pickers', 'cssmin:pickers', 'uglify:pickers', 'concat:pickers', 'clean:pickers' ] )
    grunt.registerTask( 'dev', [ 'less:themes', 'cssmin:pickers', 'concat:devPickers', 'clean:pickers' ] )
} //module.exports


