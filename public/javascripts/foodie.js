$(document).ready(function () {
  const url = "http://localhost:3000";

  $.getJSON(`${url}/admin/fetch_all_types`, function (data) {
    alert(JSON.stringify(data));
    data.category.map((item) => {
      $("#foodid").append($("<a>").text(item.foodtype).val(item.foodid));
    });

    $("#foodid").formSelect();
  });
});
