$.extend({
    alert: function (message, title) {
        $("<div></div>").dialog({
            // Remove the closing 'X' from the dialog
            open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); },
            buttons: { "Ok": function () { $(this).dialog("close"); } },
            close: function (event, ui) { $(this).remove(); },
            resizable: false,
            title: title,
            modal: true
        }).text(message);
    }
});