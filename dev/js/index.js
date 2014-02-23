App = {};
App.init = function() {
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
};

// If testing dev instance, we need to
// load external scripts because they
// haven't been concatenated yet.
if (location.host.split('.')[0] == 'dev') {
    $.when(
        $.getScript('/js/underscore.min.js'),
        $.getScript('/js/backbone.min.js'),
        $.getScript('/js/helpers.js')
    ).done(App.init);
}
else App.init();