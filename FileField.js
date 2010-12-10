
Ext.ns('Ext.ux.form');
Ext.ns('Ext.util');

//listens to DOM events of Ext.Component's HTMLElement
Ext.util.DomObserver = Ext.extend(Object, {
    constructor: function(config) {
        this.listeners = config.listeners ? config.listeners : config;
    },

    // Component passes itself into plugin's init method
    init: function(c) {
        var p, l = this.listeners;
        for (p in l) {
            if (Ext.isFunction(l[p])) {
                l[p] = this.createHandler(l[p], c);
            } else {
                l[p].fn = this.createHandler(l[p].fn, c);
            }
        }

        // Add the listeners to the Element immediately following the render call
        c.render = c.render.createSequence(function() {
            var e = c.getEl();
            if (e) {
                e.on(l);
            }
        });
    },

    createHandler: function(fn, c) {
        return function(e) {
            fn.call(this, e, c);
        };
    }
});


Ext.ux.form.FileField = Ext.extend(Ext.form.Field, {
    /*plugins: [new Ext.util.DomObserver({
        change: function(evt, c) {
            console.debug(evt);
            console.debug(c);
            files=c;
            e=evt;
        }
    })]
    , */autoCreate: {
        tag: 'input'
        , type: 'file'
        , multiple: 'multiple'
    }
    , listeners: {
        afterrender: function(c) {
            var el = c.el.dom;//HTMLElement
            x = el;
            //el.addEventListener('onchange', function() {
            //    console.debug(arguments);
            //});
            el.onchange = function(evt) {
                console.debug(el.files);
                console.debug(arguments);
            };
        }
    }
});
