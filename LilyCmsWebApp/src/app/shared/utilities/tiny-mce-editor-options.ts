export const tinyMCEEditorOptions: Record<string, any> = {
    base_url: '/tinymce',
    suffix: '.min',
    menubar: false,
    plugins: [
        'autolink lists link image',
        'code autoresize paste'
    ],
    toolbar:
        'bold italic underline strikethrough | \
    numlist bullist | link image | code',
    paste_data_images: true,
    contextmenu: true,
    images_upload_handler: (blobInfo, success, failure) => {
        success("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
    },
    images_dataimg_filter: (img) => {
        return img.hasAttribute('internal-blob');
    }
};
