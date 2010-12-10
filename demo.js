Ext.onReady(function() {
    Ext.QuickTips.init();

    var fileField = new Ext.ux.form.FileField({
        fieldLabel: 'Files'
        , allowBlank: false
    });
    var url = '/';

    var upload = function(file, url, onSuccess, onError) {
        var xhr = new XMLHttpRequest();

        Ext.Ajax.request({
            url: url
            , method: 'POST'
            , headers: {
                'X-File-Name': file.fileName
                , 'X-File-Size': file.fileSize
            }
        });
    };

    var formPanel = new Ext.form.FormPanel({
        title: 'File Uploader'
        , url: url
        , items: [fileField]
        , renderTo: 'form'
        , standardSubmit: true
        , buttons: [{
            text: 'Upload'
            , handler: function() {
                var form = formPanel.getForm();
                if (form.isValid()) {
                    var files = fileField.getFileList();
                    var i = 0;
                    var n = files.length;
                    var file;
                    while (i < n) {
                        file = files[i];
                        i++;
                    }
                    //form.submit();
                }
            }
        }]
    });
    //new Ext.Window({
    //    title: 'blah'
    //}).show();
});
