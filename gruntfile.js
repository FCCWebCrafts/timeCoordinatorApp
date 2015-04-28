module.exports = function(grunt){
  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.config.js',
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
  
  grunt.registerTask('default', 'karma');
};