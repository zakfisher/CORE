(function() {
    // Collections
    var Users = Backbone.Collection.extend({
        url: '/users'
    });

    // Models
    var User = Backbone.Model.extend({
        urlRoot: '/users'
    });

    // Views
    var View = Backbone.View.extend({
        el: '#id',
        render: function() {
            this.$el.html(_.template($('#template'), {}));
        }
    });
    var view = new View;

    // Router
    var Router = Backbone.Extend.Router({
        routes: {
            '' : 'home'
        },
        initialize: function() {
            Backbone.history.start({pushState: true});
        },
        home: function() {}
    });
    var router = new Router;

    // This method allows us to use pushState without triggering a refresh
    $(document).on('click', 'a[data-bypass]', function (e) {
        e.preventDefault();
        router.navigate($(e.currentTarget).attr('href'), true);
    });
})();