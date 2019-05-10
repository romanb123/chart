$(document).ready(function () {
    sendRequest();
    function sendRequest() {
        $.ajax({
            url: "example.php",
            success:
                function (data) {
                    $('#listposts').html(data); //insert text of test.php into your div

                },
            complete: function () {
                // Schedule the next request when the current one's complete
                setInterval(sendRequest, 5000); // The interval set to 5 seconds
            }
        });
    };
});