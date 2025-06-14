const accordions = document.querySelectorAll('.accordian');

accordions.forEach(accordion => {
    const question = accordion.querySelector('.question');
    const icon = question.querySelector('.icon'); // Update to use the class in your HTML
    const answer = accordion.querySelector('.answer');

    question.addEventListener('click', () => {
        if (icon.classList.contains('active')) {
            icon.classList.remove('active');
            answer.style.maxHeight = null;
        } else {
            icon.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

$(document).ready(function () {
    $('.loader').hide();
    $('#result').hide();

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#selectedImage').attr('src', e.target.result);
                $('#selectedImage').show(); // Show the image preview
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    

    $("#imageUpload").change(function () {
        readURL(this);
    });

    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        $(this).hide();
        $('.loader').show();
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html('Result: ' + data.result);
                console.log('Success!');
            },
        });
    });
});
