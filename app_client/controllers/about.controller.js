/* global angular */
(function() {
  function ctrlAbout(aaData) {
    var vm = this;
    
    aaData.setTitle("AA | About");
    
    var content = "";
    content += "<p>Website meant for ardent readers and even more passionate writers. It doesn't matter which group you belong to, it's free to use for you all.</p>";
    content += "<p>You want to read novels? Go ahead, not even registering is necessary. Though by registering you do get a few more awesome features, like the ability to write reviews for all the novels you love, give them your rating, whose average is going to be shown on novel's description/details page. Or a Library, you get this feature, too. For free! It helps you keep track of all the novels you love, keeps them all grouped in a single place and makes them easier to find when you want them.</p>";
    content += "<p>As for all authors wanting to enrich the community, after a simple register, simply by clicking on User Panel and visiting \"Author\" page from there, a single click on a button \"Create a new novel\" is all that separates you from beginning your creative journey! Add a novel, or multiple novels if you so desire, and begin writing! A simple interface, no distractions! Just you, a page, and your imaginary world waiting to be written!</p>";
    content += "<p>Join us on our journey of enriching community of readers and writers!</p>";
    
    vm.pageHeader = {
      title: "ArdentAngel",
      subtitle: "Stories, that's all that matters"
    };
    vm.pageFooter = {
       left: [
        {
          title: "About",
          href: "/about"
        }
      ],
      right: ""
    };
    vm.content = content;
  }
  ctrlAbout.$inject = ['aaData'];
  
  angular
    .module('aa-novels')
    .controller('about.controller', ctrlAbout);
})();