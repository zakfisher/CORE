$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    if (options.url.indexOf('http') == -1 && options.url.indexOf('.html') == -1) {
        options.url = location.origin + '/api' + options.url;
    }
});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

Date.prototype.getDateString = function(short) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = months[this.getMonth()];
    if (short) month = month.substr(0, 3);
    return month + ' ' + this.getDate() + ', ' + this.getFullYear();
};

$.validate = function(type, value) {
    var regex;
    switch (type) {
        case 'ip':
            regex = new RegExp(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g);
            break;
        case 'email':
            regex = new RegExp(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/);
            break;
        case 'hex':
            regex = new RegExp(/^#(?:[0-9a-f]{3}){1,2}$/i);
            break;
        case 'zip':
            regex = new RegExp(/^\d{5}$/);
            break;
        case 'password':
            var errors = [];
            if (value.length < 8) errors.push("Password must be at least 8 characters.");
            if (value.search(/[a-z]/) < 0) errors.push("Password must contain at least one lowercase letter.");
            if (value.search(/[A-Z]/) < 0) errors.push("Password must contain at least one uppercase letter.");
            if (value.search(/[0-9]/) < 0) errors.push("Password must contain at least one number.");
            if (errors.length > 0) return errors[0];
            return true;
        default:
    }
    return regex.exec(value);
};