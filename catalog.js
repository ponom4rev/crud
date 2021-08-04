$(document).ready(function (){
    load_data();
    function load_data(){
        $.ajax({
            url:"get_image.php",
            method:"POST",
            success:function (data){
                $('#list_of_game').html(data);
            }
        })
    }

    $('#user_dialog').dialog({
        autoOpen: false,
        width: 400
    });


    $('#add').click(function (){
        $('#user_dialog').attr('title','Add Data');
        $('#action').val('insert');
        $('#form_action').val("Insert");
        $('#user_form')[0].reset();
        $('#form_action').attr('disabled',false);
        $('#user_dialog').dialog('open');
    })

    $('#user_form').on('submit',function (event){
        event.preventDefault();
        var error_name_of_game = '';
        var error_short_description = '';
        var error_full_description = '';
        var error_image_of_game = '';

        if($('#name_of_game').val().trim() == '')
        {
            error_name_of_game = 'Name of game is required';
            $('#error_name_of_game').text(error_name_of_game);
            $('#name_of_game').css('border-color','#cc0000');
        }
        else
        {
            error_name_of_game = '';
            $('#error_name_of_game').text(error_name_of_game);
            $('#name_of_game').css('border-color','');
        }

        if($('#short_description').val().trim() == '')
        {
            error_short_description = 'Short description is required';
            $('#error_short_description').text(error_short_description);
            $('#short_description').css('border-color','#cc0000');
        }
        else
        {
            error_short_description = '';
            $('#error_short_description').text(error_short_description);
            $('#short_description').css('border-color','');
        }

        if($('#full_description').val().trim() == '')
        {
            error_full_description = 'Full description is required';
            $('#error_full_description').text(error_full_description);
            $('#full_description').css('border-color','#cc0000');
        }
        else
        {
            error_full_description = '';
            $('#error_full_description').text(error_full_description);
            $('#full_description').css('border-color','');
        }
        var input_file = $('#image_of_game').val().trim();
        if(input_file == '')
        {
            error_image_of_game = 'Image is required';
            $('#error_image_of_game').text(error_image_of_game);
            $('#image_of_game').css('border-color','#cc0000');
        }
        else
        {
            var split_input_file = input_file.split('.');
            var format_input_file = split_input_file[split_input_file.length - 1];
            if(format_input_file != "jpg" && format_input_file != "jpeg" && format_input_file != "png")
            {
                error_image_of_game = 'Invalid uploaded file format';
                $('#error_image_of_game').text(error_image_of_game);
                $('#image_of_game').css('border-color','#cc0000');
            }
            else
            {
                error_image_of_game = '';
                $('#error_image_of_game').text(error_image_of_game);
                $('#image_of_game').css('border-color','');
            }
        }

        if(error_full_description.length == 0 && error_name_of_game.length == 0 && error_short_description.length == 0 && error_image_of_game.length == 0)
        {
            $('form_action').attr('disabled', 'disabled');
            var temp_form_data = $(this).serialize();
            var split_file = $('#image_of_game').val().split("\\");
            var name_of_file = split_file[split_file.length - 1];
            var form_data = "image_of_game=" + name_of_file + "&" + temp_form_data;
            console.log(form_data);
            $.ajax({
                url:"action.php",
                method: "POST",
                data:form_data,
                success:function(data)
                {
                    $('#user_dialog').dialog('close');
                    $('#action_alert').html(data);
                    $('#action_alert').dialog('open');
                    load_data();
                }
            })
        }
        else
        {
            return false;
        }
    })

    $('#action_alert').dialog({
        autoOpen: false
    })

    $(document).on('click','.edit', function(){
        var id = $(this).attr("id");
        var action = 'fetch_single';
        console.log(id);
        $.ajax({
            url:"action.php",
            method:"POST",
            data:{id:id,action:action},
            dataType:"json",
            success:function(data){
                console.log(data.name_of_game);
                console.log(data.path_to_img);
                $('#name_of_game').val(data.name_of_game);
                $('#short_description').val(data.short_description);
                $('#full_description').val(data.full_description);
                //$('#image_of_game').val(data.path_to_img);
                $('#user_dialog').attr('title', 'Edit Data');
                $('#action').val('update');
                $('#hidden_id').val(id);
                $('#form_action').val('Update');
                $('#user_dialog').dialog('open');
            }
        })

        $('#delete_confirmation').dialog({
            autoOpen:false,
            modal: true,
            buttons:{
                Ok : function(){
                    var id = $(this).data('id');
                    var action = 'delete';
                    $.ajax({
                        url:"action.php",
                        method:"POST",
                        data:{id:id, action:action},
                        success:function(data)
                        {
                            $('#delete_confirmation').dialog('close');
                            $('#action_alert').html(data);
                            $('#action_alert').dialog('open');
                            load_data();
                        }
                    });
                },
                Cancel : function(){
                    $(this).dialog('close');
                }
            }
        });

        $(document).on('click', '.delete', function (){
            var id = $(this).attr("id");
            $('#delete_confirmation').data('id',id).dialog('open');
        })
    })

});