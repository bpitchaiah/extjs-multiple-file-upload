
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

//File proxy
Ext.util.File = Ext.extend(Object, {
    constructor: function(file) {
        var me = this;
        me.dom = file;
        me.getName = function() {

        };
    }
});

Ext.ux.form.FileField = (function() {
    var isAvailable = function() {
        var input = document.createElement('input');
        input.type = 'file';
        return ('multiple' in input
            && typeof File !== 'undefined'
            && typeof FileReader !== 'undefined'
            && typeof (new XMLHttpRequest()).upload !== 'undefined');
    };

    var constructor = function(config) {
        if (!isAvailable()) {
            throw 'browser does not support File API';
        }

        var me = this;

        me.inputId = Ext.id();//id of <input>
        me.infoId = Ext.id();//id of <div> used to display information (progress bar..etc)
        me.inputEl = undefined;//<input type="file"> as Ext.Element
        me.infoEl =  undefined;//<div class="file-field-info"> as Ext.Element

        var getDomInput = function() {
            return Ext.get(me.inputId).dom;
        };

        var defaults = {
            getFileList: function() {
                return getDomInput().files;
            }
            , autoCreate: {
                tag: 'div'
                , children: [{
                    tag: 'input'
                    , type: 'file'
                    , id: me.inputId
                    , multiple: 'multiple'
                }
                , {
                    tag: 'div'
                    , id: me.infoId
                    , cls: 'file-field-info'
                }]
            }
            , getRawValue: function() {
                return getDomInput().value;
            }
            , listeners: {
                afterrender: function(c) {
                    var input = getDomInput();
                    me.infoEl = Ext.get(me.infoId);//Ext.Element

                    input.onchange = function(evt) {
                        var files = input.files;
                        var i = 0;
                        var n = files.length;
                        var file;
                        me.infoEl.update('');//remove all children

                        while (i < n) {
                            file = files[i];
                            console.debug(file);
                            me.infoEl.createChild({
                                tag: 'div'
                                , html: file.fileName
                            });
                            i++;
                        }
                    };
                }
            }

        };

        Ext.ux.form.FileField.superclass.constructor.call(me, Ext.apply(defaults, config));
    };

    return Ext.extend(Ext.form.TextField, { constructor: constructor });
})();
