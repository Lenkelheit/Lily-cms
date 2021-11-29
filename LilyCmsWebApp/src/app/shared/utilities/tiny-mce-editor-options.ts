export const tinyMCEEditorOptions: Record<string, any> = {
    base_url: '/tinymce',
    suffix: '.min',
    menubar: true,
    selector: 'textarea', // todo
    plugins: [
        'autolink lists link image',
        'code autoresize paste',
        'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
    ],
    toolbar:
        'undo redo | bold italic underline strikethrough | \
    numlist bullist | link image | code | \
    fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    toolbar_mode: 'sliding',
    importcss_append: true,
    paste_data_images: true,
    contextmenu: true,
    images_upload_handler: (blobInfo, success, failure) => {
        success("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
    },
    images_dataimg_filter: (img) => {
        return img.hasAttribute('internal-blob');
    },
    deprecation_warnings: false
};
