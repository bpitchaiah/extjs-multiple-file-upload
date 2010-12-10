Ext.onReady(function() {
    var file = new Ext.ux.form.FileField({
        fieldLabel: 'Files'
    });
    var form = new Ext.form.FormPanel({
        title: 'File Uploader'
        , items: [file]
        , renderTo: 'form'
    });
    //new Ext.Window({
    //    title: 'blah'
    //}).show();
});
