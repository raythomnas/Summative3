// Bella start
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),
  
      jshint: {
        options: {
          esversion: 6,
        },
        all: ['Gruntfile.js', 'js/*.js']
      },
      sass: {                              
        dist: {                           
          options: {                       
            style: 'expanded'
          },
          files: {                         
            'css/style.css': 'sass/style.scss'       
          }
        }
      },
      csslint: {
        lax: {
          options: {
            import: false,
            'order-alphabetical': false
          },
          src: ['css/*.css', '!*.min.css']
        }
      },
      watch: {
        all: {
          files: ['js/*.js', 'sass/*.scss', 'css/style.css', 'index.html'],
          tasks: ['csslint', 'sass', 'jshint'],
          options: {
            spawn: false,
          }
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    // Default task(s).
    grunt.registerTask('default', ['watch']);
  };
// Bella end